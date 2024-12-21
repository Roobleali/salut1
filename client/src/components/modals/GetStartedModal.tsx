import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  industry: z.string().min(1, "Please select your industry"),
  otherIndustry: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  cui: z.string().optional(),
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  requirements: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const INDUSTRIES = [
  { id: "manufacturing", label: "Manufacturing" },
  { id: "real-estate", label: "Real Estate" },
  { id: "retail", label: "Retail & E-commerce" },
  { id: "horeca", label: "HORECA" },
  { id: "healthcare", label: "Healthcare" },
  { id: "education", label: "Education" },
  { id: "services", label: "Professional Services" },
  { id: "other", label: "Other" },
];

const STEPS = {
  1: "Industry Selection",
  2: "Company Details",
  3: "Contact Information",
  4: "Additional Requirements",
} as const;

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GetStartedModal({ open, onOpenChange }: GetStartedModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      otherIndustry: "",
      company: "",
      cui: "",
      contactName: "",
      email: "",
      phone: "",
      requirements: "",
    },
  });

  const selectedIndustry = form.watch("industry");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          subject: `New Business Inquiry - ${data.company} (${data.industry})`,
          message: `
Industry: ${data.industry}
${data.otherIndustry ? `Specific Industry: ${data.otherIndustry}` : ''}
Company: ${data.company}
CUI: ${data.cui || 'Not provided'}
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Requirements:
${data.requirements || 'No specific requirements provided'}
          `.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast({
        title: "Success!",
        description: "Thank you for your interest. Our team will contact you shortly.",
      });

      onOpenChange(false);
      form.reset();
      setStep(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const currentFields = {
      1: ["industry"],
      2: ["company"],
      3: ["contactName", "email"],
      4: ["requirements"],
    }[step as keyof typeof STEPS] || [];

    const isValid = currentFields.every((field) => {
      const value = form.getValues(field as keyof FormData);
      return !formSchema.shape[field as keyof FormData].isOptional() ? value && value.length > 0 : true;
    });

    if (isValid) {
      setStep((s) => Math.min(s + 1, Object.keys(STEPS).length));
    } else {
      currentFields.forEach((field) => {
        form.trigger(field as keyof FormData);
      });
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isLastStep = step === Object.keys(STEPS).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get Started with Salut Enterprise</DialogTitle>
          <DialogDescription>
            Step {step} of {Object.keys(STEPS).length}: {STEPS[step as keyof typeof STEPS]}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Industry Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Your Industry</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry.id} value={industry.id}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <FormLabel>Please Specify Your Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Your specific industry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            {/* Step 2: Company Details */}
            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cui"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CUI (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Company CUI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
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
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Additional Requirements */}
            {step === 4 && (
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your specific needs or requirements..."
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

              {!isLastStep ? (
                <Button type="button" onClick={nextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
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
