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
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  cui: z.string().min(1, "CUI is required"),
  industry: z.string().min(1, "Please select an industry"),
  currentSoftware: z.string(),
  painPoints: z.string(),
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

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [anafData, setAnafData] = React.useState<any>(null);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      cui: "",
      industry: "",
      currentSoftware: "",
      painPoints: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, anafData }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
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

  const lookupCUI = async (cui: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/anaf-lookup?cui=${cui}`);
      if (!response.ok) {
        throw new Error("Failed to fetch company data");
      }
      const data = await response.json();
      setAnafData(data);
      form.setValue("company", data.denumire || "");
      toast({
        title: "Company Found",
        description: "Company information has been automatically filled.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch company data. Please enter details manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    const currentFields = {
      1: ["name", "email"],
      2: ["cui", "company"],
      3: ["industry"],
      4: ["currentSoftware"],
      5: ["painPoints"],
    }[step as keyof typeof currentFields];

    const isValid = currentFields?.every((field) => {
      const value = form.getValues(field as keyof FormData);
      return value && value.length > 0;
    });

    if (isValid) {
      setStep((s) => Math.min(s + 1, 5));
    } else {
      currentFields?.forEach((field) => {
        form.trigger(field as keyof FormData);
      });
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get Started with Salut Enterprise</DialogTitle>
          <DialogDescription>
            Step {step} of 5: {
              {
                1: "Let's get to know you",
                2: "Company Information",
                3: "Your Industry",
                4: "Current Solutions",
                5: "Requirements",
              }[step]
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
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

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cui"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company CUI</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Enter CUI" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => lookupCUI(field.value)}
                          disabled={isLoading || !field.value}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Lookup"}
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
              </div>
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

            {step === 5 && (
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

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              {step < 5 ? (
                <Button type="button" onClick={nextStep}>
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
                    'Submit'
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
