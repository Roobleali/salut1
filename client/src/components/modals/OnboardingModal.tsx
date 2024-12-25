import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ArrowLeft, Building2, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  currentSoftware: z.string().min(1, "Please describe your current software"),
  painPoints: z.string().min(1, "Please describe your requirements"),
  industry: z.string().min(1, "Please select an industry"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  cui: z.string().min(1, "CUI is required"),
  address: z.string().optional(),
  county: z.string().optional(),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const INDUSTRIES = [
  "Manufacturing",
  "Real Estate",
  "Healthcare",
  "Retail",
  "Education",
  "Services",
  "Hospitality",
];

const STEPS = {
  1: "Current Software Solutions",
  2: "Business Requirements",
  3: "Your Industry",
  4: "Company Information",
  5: "Contact Details",
} as const;

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSoftware: "",
      painPoints: "",
      industry: "",
      name: "",
      email: "",
      company: "",
      cui: "",
      address: "",
      county: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast({
        title: "Success!",
        description: "Your information has been submitted. We'll be in touch soon.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const lookupCompany = async (cui: string) => {
    if (!cui) {
      toast({
        title: "Error",
        description: "Please enter a CUI number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/anaf-lookup?cui=${cui}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch company data");
      }

      if (data.found) {
        form.setValue("company", data.denumire || "");
        form.setValue("address", data.adresa || "");
        form.setValue("county", data.judet || "");
        form.setValue("phone", data.telefon || "");

        toast({
          title: "Company Found",
          description: "Company information has been automatically filled.",
        });
      } else {
        toast({
          title: "Company Not Found",
          description: data.error || "Please enter company details manually.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Company lookup error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch company data. Please try again or enter details manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateCurrentStep = () => {
    const currentFields = {
      1: ["currentSoftware"],
      2: ["painPoints"],
      3: ["industry"],
      4: ["cui", "company"],
      5: ["name", "email"],
    }[step as keyof typeof STEPS];

    if (!currentFields) return true;

    const isValid = currentFields.every((field) => {
      const value = form.getValues(field as keyof FormData);
      return !formSchema.shape[field as keyof FormData].isOptional() ? value && value.length > 0 : true;
    });

    if (!isValid) {
      currentFields.forEach((field) => {
        form.trigger(field as keyof FormData);
      });
    }

    return isValid;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Get Started with Salut Enterprise</DialogTitle>
          <DialogDescription>
            Step {step} of {Object.keys(STEPS).length}: {STEPS[step as keyof typeof STEPS]}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <FormField
                control={form.control}
                name="currentSoftware"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What software solutions are you currently using?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Excel, SAP, Custom solutions..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 2 && (
              <FormField
                control={form.control}
                name="painPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your main challenges or requirements?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your business needs and pain points..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 3 && (
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Your Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase()}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 4 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cui"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company CUI</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Enter CUI" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => lookupCompany(field.value)}
                          disabled={isLoading || !field.value}
                          className="min-w-[100px]"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Search className="mr-2 h-4 w-4" />
                              Lookup
                            </>
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <FormControl>
                          <Input placeholder="County" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => Math.max(s - 1, 1))}
                disabled={step === 1 || isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              {step < 5 ? (
                <Button
                  type="button"
                  onClick={() => {
                    if (validateCurrentStep()) {
                      setStep((s) => Math.min(s + 1, 5));
                    }
                  }}
                  disabled={isLoading}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}