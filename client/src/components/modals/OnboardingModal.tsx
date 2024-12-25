import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Search,
  Factory,
  Building,
  Store,
  GraduationCap,
  Briefcase,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';

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
  {
    value: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    description: "Production and assembly operations",
  },
  {
    value: "real_estate",
    label: "Real Estate",
    icon: Building,
    description: "Property management and sales",
  },
  {
    value: "retail",
    label: "Retail",
    icon: Store,
    description: "Retail and commerce",
  },
  {
    value: "education",
    label: "Education",
    icon: GraduationCap,
    description: "Educational institutions",
  },
  {
    value: "services",
    label: "Services",
    icon: Briefcase,
    description: "Professional services",
  },
  {
    value: "hospitality",
    label: "Hospitality",
    icon: UtensilsCrossed,
    description: "Hotels and restaurants",
  },
];

type StepType =
  | "SELECT_INDUSTRY"
  | "CURRENT_SOFTWARE"
  | "COMPANY_DETAILS"
  | "COMPLETED";
const STEPS: Record<StepType, string> = {
  SELECT_INDUSTRY: "Select Your Industry",
  CURRENT_SOFTWARE: "Current Software & Needs",
  COMPANY_DETAILS: "Company Details",
  COMPLETED: "Request Submitted",
};

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [step, setStep] = useState<StepType>("SELECT_INDUSTRY");
  const [isLoading, setIsLoading] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      emailjs.init("Zf4lxizbewKMs2_SJ");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
      toast({
        title: "Error",
        description:
          "Failed to initialize email service. Please try again later.",
        variant: "destructive",
      });
    }
  }, []);

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
  });

  const handleApiError = (error: any) => {
    console.error("API Error:", error);
    const errorMessage = error.message || "An unexpected error occurred";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const lookupCompany = async (cui: string | undefined) => {
    if (!cui) {
      toast({
        title: "Error",
        description: "Please enter a CUI number",
        variant: "destructive",
      });
      return;
    }

    setIsLookingUp(true);
    try {
      const sanitizedCui = cui
        .toString()
        .trim()
        .replace(/[^0-9]/g, "");

      // Use a CORS proxy service or your own proxy
      const corsProxy = "https://cors-anywhere.herokuapp.com/";
      const apiUrl = `https://api.openapi.ro/api/companies/${sanitizedCui}`;

      const response = await fetch(corsProxy + apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-key": import.meta.env.VITE_OPENAPI_RO_KEY || "",
          Origin: window.location.origin,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Invalid API key or authorization error");
        }
        if (response.status === 404) {
          throw new Error("Company not found");
        }
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data || !data.denumire) {
        throw new Error("Company data not available");
      }

      form.setValue("company", data.denumire);
      form.setValue("address", data.adresa || "");
      form.setValue("county", data.judet || "");
      form.setValue("phone", data.telefon || "");

      toast({
        title: "Success",
        description: "Company information has been automatically filled.",
      });
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLookingUp(false);
    }
  };

  const sendEmail = async (data: FormData) => {
    const templateParams = {
      company: data.company,
      industry: data.industry,
      cui: data.cui || "Not provided",
      email: data.email,
      address: data.address || "Not provided",
      county: data.county || "Not provided",
      phone: data.phone || "Not provided",
      currentSoftware: data.currentSoftware || "Not specified"
    };

    try {
      const result = await emailjs.send(
        "service_lnippfb",
        "template_ck1avc9",
        templateParams,
      );

      if (result.status !== 200) {
        throw new Error("Failed to send email");
      }

      return true;
    } catch (error) {
      console.error("EmailJS error:", error);
      throw new Error("Failed to send email. Please try again later.");
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await sendEmail(data);
      toast({
        title: "Success",
        description:
          "Your request has been submitted successfully. We'll be in touch shortly.",
      });
      setStep("COMPLETED");
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateCurrentStep = () => {
    const currentFields = {
      SELECT_INDUSTRY: ["industry"],
      CURRENT_SOFTWARE: ["currentSoftware"],
      COMPANY_DETAILS: ["company", "email"],
      COMPLETED: [],
    }[step];

    return currentFields.every((field) => {
      const value = form.getValues(field as keyof FormData);
      return value && value.length > 0;
    });
  };

  const progress = (() => {
    const stepValues: StepType[] = [
      "SELECT_INDUSTRY",
      "CURRENT_SOFTWARE",
      "COMPANY_DETAILS",
      "COMPLETED",
    ];
    const currentIndex = stepValues.indexOf(step);
    return (currentIndex / (stepValues.length - 2)) * 100;
  })();

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      const stepOrder: StepType[] = [
        "SELECT_INDUSTRY",
        "CURRENT_SOFTWARE",
        "COMPANY_DETAILS",
        "COMPLETED",
      ];
      const currentIndex = stepOrder.indexOf(step);
      if (currentIndex < stepOrder.length - 1) {
        setStep(stepOrder[currentIndex + 1]);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const goToPreviousStep = () => {
    const stepOrder: StepType[] = [
      "SELECT_INDUSTRY",
      "CURRENT_SOFTWARE",
      "COMPANY_DETAILS",
      "COMPLETED",
    ];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="space-y-2">
            <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#9747FF] via-[#8A43E6] to-[#6E35B9] bg-clip-text text-transparent pb-1">
              Get Started with Salut Enterprise
            </DialogTitle>
            {step !== "COMPLETED" && (
              <>
                <DialogDescription className="text-base font-medium text-foreground/80">
                  {STEPS[step]}
                </DialogDescription>
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Step {Object.keys(STEPS).indexOf(step) + 1} of{" "}
                    {Object.keys(STEPS).length - 1}
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogHeader>

        {step === "COMPLETED" ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-primary">
              Thank You for Your Interest!
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our team will review your requirements and get back to you within
              the next hour with a personalized solution tailored to your needs.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === "SELECT_INDUSTRY" && (
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Your Industry</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        {INDUSTRIES.map(
                          ({ value, label, icon: Icon, description }) => (
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
                                  <div className="text-sm text-muted-foreground">
                                    {description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === "CURRENT_SOFTWARE" && (
                <FormField
                  control={form.control}
                  name="currentSoftware"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What software solutions are you currently using and what
                        are your main requirements?
                      </FormLabel>
                      <FormDescription>
                        Tell us about your current software setup and what
                        improvements you're looking for.
                      </FormDescription>
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

              {step === "COMPANY_DETAILS" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cui"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company CUI</FormLabel>
                        <FormDescription>
                          Enter your CUI to automatically fill company details
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter CUI"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => lookupCompany(field.value)}
                            disabled={isLookingUp || !field.value}
                            className="min-w-[120px] bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30"
                          >
                            {isLookingUp ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Search className="mr-2 h-4 w-4" />
                                Lookup Info
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

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@company.com"
                            {...field}
                          />
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

              <div className="flex justify-between pt-4">
                {step !== "COMPLETED" && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      disabled={step === "SELECT_INDUSTRY" || isLoading}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    {step !== "COMPANY_DETAILS" ? (
                      <Button
                        type="button"
                        onClick={goToNextStep}
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