import { useState } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ArrowLeft, Building2, Search, Factory, Building, Store, GraduationCap, Briefcase, UtensilsCrossed, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  currentSoftware: z.string().min(1, "Please describe your current software"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  cui: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  address: z.string().optional(),
  county: z.string().optional(),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const INDUSTRIES = [
  { value: "manufacturing", label: "Manufacturing", icon: Factory, description: "Production and assembly operations" },
  { value: "real_estate", label: "Real Estate", icon: Building, description: "Property management and sales" },
  { value: "retail", label: "Retail", icon: Store, description: "Retail and commerce" },
  { value: "education", label: "Education", icon: GraduationCap, description: "Educational institutions" },
  { value: "services", label: "Services", icon: Briefcase, description: "Professional services" },
  { value: "hospitality", label: "Hospitality", icon: UtensilsCrossed, description: "Hotels and restaurants" },
];

const STEPS = {
  1: "Select Your Industry",
  2: "Current Software & Needs",
  3: "Company Details",
  4: "Request Submitted",
} as const;

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      currentSoftware: "",
      company: "",
      cui: "",
      email: "",
      address: "",
      county: "",
      phone: "",
    },
    mode: "onSubmit", // Only show errors when form is submitted
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

      setStep(4); // Move to success state
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
      1: ["industry"],
      2: ["currentSoftware"],
      3: ["company", "email"],
    }[step as keyof typeof STEPS];

    if (!currentFields) return true;

    return currentFields.every((field) => {
      const value = form.getValues(field as keyof FormData);
      return !formSchema.shape[field as keyof FormData].isOptional() ? value && value.length > 0 : true;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Get Started with Salut Enterprise</DialogTitle>
          <DialogDescription>
            Step {step} of {Object.keys(STEPS).length - 1}: {STEPS[step as keyof typeof STEPS]}
          </DialogDescription>
        </DialogHeader>

        {step === 4 ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-primary">Thank You for Your Interest!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our team will review your requirements and get back to you within the next hour with a personalized solution tailored to your needs.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Your Industry</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        {INDUSTRIES.map(({ value, label, icon: Icon, description }) => (
                          <div
                            key={value}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              field.value === value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => field.onChange(value)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-md bg-primary/10">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{label}</div>
                                <div className="text-sm text-muted-foreground">{description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 2 && (
                <FormField
                  control={form.control}
                  name="currentSoftware"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What software solutions are you currently using and what are your main requirements?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Currently using Excel for inventory, looking for an automated solution with real-time tracking..."
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
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cui"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company CUI (Optional)</FormLabel>
                        <FormDescription>
                          Enter your CUI to automatically fill company details
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="Enter CUI" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => lookupCompany(field.value)}
                            disabled={isLoading || !field.value}
                            className="min-w-[120px] bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30"
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Search className="mr-2 h-4 w-4" />
                                Lookup Info
                              </>
                            )}
                          </Button>
                        </div>
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
                        {form.formState.isSubmitted && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@company.com" {...field} />
                        </FormControl>
                        {form.formState.isSubmitted && <FormMessage />}
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
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step < 4 && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep((s) => Math.max(s - 1, 1))}
                      disabled={step === 1 || isLoading}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={() => {
                          if (validateCurrentStep()) {
                            setStep((s) => Math.min(s + 1, 3));
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
                  </>
                )}
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}