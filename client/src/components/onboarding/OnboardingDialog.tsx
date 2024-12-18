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

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      // TODO: Replace with your actual email sending endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          to: "info@saluttech.ro",
          subject: `New Implementation Request - ${data.company}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Request sent successfully!",
        description: "We'll be in touch with you shortly to discuss your needs.",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending request",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
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
