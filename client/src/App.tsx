import { Switch, Route } from "wouter";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { Services } from "@/pages/Services";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { CaseStudies } from "@/pages/CaseStudies";
import { EnterpriseApps } from "@/pages/enterprise/EnterpriseApps";
import { CRM } from "@/pages/enterprise/CRM";
import { Sales } from "@/pages/enterprise/Sales";
import { Purchase } from "@/pages/enterprise/Purchase";
import { Manufacturing } from "@/pages/industries/Manufacturing";
import { RealEstate } from "@/pages/industries/RealEstate";

import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { Glossary } from "@/pages/Glossary";
import { GradientCustomizerPage } from "@/pages/GradientCustomizer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  industry: z.enum([
    "ecommerce",
    "retail",
    "manufacturing",
    "real-estate",
    "healthcare",
    "hospitality",
    "other"
  ]),
  otherIndustry: z.string().optional(),
  goal: z.enum([
    "increase_efficiency",
    "reduce_costs",
    "improve_customer_service",
    "expand_business",
    "modernize_systems",
    "other"
  ]),
  otherGoal: z.string().optional(),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
});

export function OnboardingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const INDUSTRIES = [
    { value: "ecommerce", label: "E-commerce" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "real-estate", label: "Real Estate" },
    { value: "healthcare", label: "Healthcare" },
    { value: "hospitality", label: "Hospitality" },
    { value: "other", label: "Other" },
  ];

  const GOALS = [
    { value: "increase_efficiency", label: "Increase Operational Efficiency" },
    { value: "reduce_costs", label: "Reduce Operational Costs" },
    { value: "improve_customer_service", label: "Improve Customer Service" },
    { value: "expand_business", label: "Expand Business Operations" },
    { value: "modernize_systems", label: "Modernize Legacy Systems" },
    { value: "other", label: "Other" },
  ];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Create the email body with the form data
      const emailBody = `
        New Inquiry from SalutTech Website
        
        Industry: ${data.industry === 'other' ? data.otherIndustry : data.industry}
        Goal: ${data.goal === 'other' ? data.otherGoal : data.goal}
        Company: ${data.companyName}
        Email: ${data.email}
      `;

      // Use a form submission service like formspree.io
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          message: emailBody
        })
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "We've received your inquiry. Our team will contact you shortly.",
        });
        onOpenChange(false);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tell us about your business</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What industry are you in?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {INDUSTRIES.map((industry) => (
                        <FormItem key={industry.value}>
                          <FormControl>
                            <RadioGroupItem
                              value={industry.value}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
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

            {form.watch("industry") === "other" && (
              <FormField
                control={form.control}
                name="otherIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify your industry</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {GOALS.map((goal) => (
                        <FormItem key={goal.value}>
                          <FormControl>
                            <RadioGroupItem
                              value={goal.value}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
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

            {form.watch("goal") === "other" && (
              <FormField
                control={form.control}
                name="otherGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify your goal</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <OnboardingTour />
      <main className="flex-1">
        <Switch>
          <Route path="/">
            <Home onGetStarted={() => setShowOnboarding(true)} />
          </Route>
          <Route path="/services" component={Services} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          {/* Enterprise Routes */}
          <Route path="/enterprise" component={EnterpriseApps} />
          <Route path="/enterprise/crm" component={CRM} />
          <Route path="/enterprise/sales" component={Sales} />
          <Route path="/enterprise/purchase" component={Purchase} />
          
          {/* Industry Routes */}
          <Route path="/industries/manufacturing" component={Manufacturing} />
          <Route path="/industries/real-estate" component={RealEstate} />
          
          
          {/* Glossary Route */}
          <Route path="/glossary" component={Glossary} />
          
          {/* Gradient Customizer Route */}
          <Route path="/gradients" component={GradientCustomizerPage} />
        </Switch>
      </main>
      <Footer />
      <OnboardingDialog open={showOnboarding} onOpenChange={setShowOnboarding} />
    </div>
  );
}

export default App;
