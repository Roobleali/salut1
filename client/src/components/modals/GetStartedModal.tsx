import React from "react";
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

const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  otherIndustry: z.string().optional(),
  goal: z.string().min(1, "Please select your main goal"),
  otherGoal: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().min(1, "Please enter your company name"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const INDUSTRIES = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "real-estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const GOALS = [
  { value: "automation", label: "Automate Business Processes" },
  { value: "growth", label: "Scale Business Operations" },
  { value: "efficiency", label: "Improve Operational Efficiency" },
  { value: "costs", label: "Reduce Operational Costs" },
  { value: "experience", label: "Enhance Customer Experience" },
  { value: "other", label: "Other" },
];

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GetStartedModal({ open, onOpenChange }: GetStartedModalProps) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      otherIndustry: "",
      goal: "",
      otherGoal: "",
      email: "",
      companyName: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
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
        description: "We've received your information and will contact you soon.",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectedIndustry = form.watch("industry");
  const selectedGoal = form.watch("goal");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get Started with SalutTech</DialogTitle>
          <DialogDescription>
            Tell us about your business and how we can help you succeed.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
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
                    <FormLabel>Specify Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your industry" {...field} />
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
                <FormItem>
                  <FormLabel>Main Goal</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your main goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GOALS.map((goal) => (
                        <SelectItem key={goal.value} value={goal.value}>
                          {goal.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <FormLabel>Specify Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your main goal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
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
                    <Input placeholder="Enter your email address" {...field} />
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
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your needs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
