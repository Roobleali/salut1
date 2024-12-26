import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const INDUSTRIES = [
  { id: "manufacturing", label: "Manufacturing" },
  { id: "real-estate", label: "Real Estate" },
  { id: "retail", label: "Retail & E-commerce" },
  { id: "horeca", label: "HORECA" },
  { id: "construction", label: "Construction" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "other", label: "Other" },
];

const GOALS = [
  { id: "automation", label: "Automate Manual Processes" },
  { id: "efficiency", label: "Improve Operational Efficiency" },
  { id: "costs", label: "Reduce Operational Costs" },
  { id: "growth", label: "Scale Business Operations" },
  { id: "customer", label: "Enhance Customer Experience" },
  { id: "other", label: "Other" },
];

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  otherIndustry: z.string().optional(),
  goal: z.string().min(1, "Please select your main goal"),
  otherGoal: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().optional(),
});

type OnboardingFormData = z.infer<typeof formSchema>;

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingDialog({ open, onOpenChange }: OnboardingDialogProps) {
  const { toast } = useToast();
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      otherIndustry: "",
      goal: "",
      otherGoal: "",
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const selectedIndustry = form.watch("industry");
  const selectedGoal = form.watch("goal");

  const ODOO_CONFIG = {
    url: process.env.NEXT_PUBLIC_ODOO_URL || '',
    db: process.env.NEXT_PUBLIC_ODOO_DB || '',
    username: process.env.NEXT_PUBLIC_ODOO_USERNAME || '',
    password: process.env.NEXT_PUBLIC_ODOO_PASSWORD || '',
  };

  const OdooCompanyForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState('FORM');
    const form = useForm({
      defaultValues: {
        company: '',
        email: '',
        phone: '',
        address: '',
        county: '',
        adminName: '',
        adminPassword: '',
      }
    });

    const createXmlRpcClient = (endpoint) => {
      const baseUrl = ODOO_CONFIG.url.replace(/\/$/, '');
      const clientOptions = {
        headers: {
          'User-Agent': 'Web-Client/1.0',
          'Content-Type': 'text/xml',
          'Accept': 'text/xml',
        },
        cookies: true,
        timeout: 60000,
      };

      return xmlrpc.createClient({
        ...clientOptions,
        url: `${baseUrl}:8069/xmlrpc/2/${endpoint}`,
      });
    };

    const authenticate = async () => {
      const commonClient = createXmlRpcClient('common');

      return new Promise((resolve, reject) => {
        commonClient.methodCall('authenticate', [
          ODOO_CONFIG.db,
          ODOO_CONFIG.username,
          ODOO_CONFIG.password,
          { lang: 'en_US', tz: 'UTC' }
        ], (err, uid) => {
          if (err || !uid) {
            reject(new Error('Authentication failed'));
            return;
          }
          resolve(uid);
        });
      });
    };

    const executeKw = async (uid, model, method, args = [], kwargs = {}) => {
      const objectClient = createXmlRpcClient('object');

      return new Promise((resolve, reject) => {
        objectClient.methodCall('execute_kw', [
          ODOO_CONFIG.db,
          uid,
          ODOO_CONFIG.password,
          model,
          method,
          args,
          kwargs
        ], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    const createCompany = async (companyData) => {
      const uid = await authenticate();

      // Check if company exists
      const companyCount = await executeKw(
        uid,
        'res.company',
        'search_count',
        [[['name', '=', companyData.name]]]
      );

      if (companyCount > 0) {
        throw new Error('A company with this name already exists');
      }

      // Create partner
      const partnerId = await executeKw(
        uid,
        'res.partner',
        'create',
        [{
          name: companyData.name,
          email: companyData.email,
          phone: companyData.phone,
          street: companyData.street,
          city: companyData.city,
          is_company: true,
          company_type: 'company',
        }]
      );

      // Create company
      const companyId = await executeKw(
        uid,
        'res.company',
        'create',
        [{
          name: companyData.name,
          partner_id: partnerId,
        }]
      );

      // Create admin user
      const userId = await createAdminUser(uid, {
        name: companyData.adminName,
        login: companyData.email,
        password: companyData.adminPassword,
        companyId,
        partnerId,
      });

      return {
        companyId,
        userId,
        redirectUrl: `${ODOO_CONFIG.url}/web/login?login=${encodeURIComponent(companyData.email)}&redirect=/web`
      };
    };

    const createAdminUser = async (uid, userData) => {
      // Get admin group IDs
      const groupPromises = [
        'base.group_user',
        'base.group_system',
        'base.group_erp_manager',
        'account.group_account_manager',
        'sales_team.group_sale_manager',
        'stock.group_stock_manager',
        'hr.group_hr_manager'
      ].map(xmlId => getGroupId(uid, xmlId));

      const adminGroups = (await Promise.all(groupPromises)).filter(id => id);

      const userCreateData = {
        name: userData.name,
        login: userData.login,
        password: userData.password,
        company_id: userData.companyId,
        company_ids: [[6, 0, [userData.companyId]]],
        groups_id: [[6, 0, adminGroups]],
        partner_id: userData.partnerId,
        notification_type: 'email',
        share: false,
        active: true,
      };

      return executeKw(
        uid,
        'res.users',
        'create',
        [userCreateData],
        {
          context: {
            no_reset_password: true,
            create_user: true,
            mail_create_nosubscribe: true,
            mail_notrack: true,
          }
        }
      );
    };

    const getGroupId = async (uid, xmlId) => {
      const [module, name] = xmlId.split('.');
      const result = await executeKw(
        uid,
        'ir.model.data',
        'search_read',
        [[['module', '=', module], ['name', '=', name]], ['res_id']]
      );
      return result?.[0]?.res_id;
    };

    const onSubmit = async (data) => {
      setIsLoading(true);
      try {
        if (!data.company?.trim()) {
          form.setError('company', {
            type: 'manual',
            message: 'Company name is required',
          });
          throw new Error('Company name is required');
        }

        const companyData = {
          name: data.company.trim(),
          email: data.email,
          phone: data.phone || undefined,
          street: data.address || undefined,
          city: data.county || undefined,
          adminName: data.adminName,
          adminPassword: data.adminPassword,
        };

        const result = await createCompany(companyData);

        toast({
          title: 'Success',
          description: 'Your company has been created successfully. Redirecting to your dashboard...',
        });

        setStep('COMPLETED');

        setTimeout(() => {
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
          }
        }, 2000);

      } catch (error) {
        console.error('Submission error:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Failed to process your request',
        });
      } finally {
        setIsLoading(false);
      }
    };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Started with SalutTech</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select your industry</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {INDUSTRIES.map((industry) => (
                        <FormItem key={industry.id}>
                          <FormControl>
                            <RadioGroupItem
                              value={industry.id}
                              id={`industry-${industry.id}`}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`industry-${industry.id}`}
                            className="flex items-center justify-center p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-gray-50"
                          >
                            {industry.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedIndustry === "other" && (
              <FormField
                control={form.control}
                name="otherIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify your industry</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your industry" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What is your main goal?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {GOALS.map((goal) => (
                        <FormItem key={goal.id}>
                          <FormControl>
                            <RadioGroupItem
                              value={goal.id}
                              id={`goal-${goal.id}`}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`goal-${goal.id}`}
                            className="flex items-center justify-center p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-gray-50"
                          >
                            {goal.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedGoal === "other" && (
              <FormField
                control={form.control}
                name="otherGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify your goal</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your goal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="your@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your company name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any specific requirements or questions?"
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
