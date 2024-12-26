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
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';

const formSchema = z.object({
    industry: z.string(),
    company: z.string(),
    cui: z.string(),
    address: z.string().optional(),
    county: z.string().optional(),
    phone: z.string().optional(),
    adminName: z.string().min(1, "Admin name is required"),
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
    adminPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
}).refine((data) => data.adminPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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

type StepType = "SELECT_INDUSTRY" | "COMPANY_DETAILS" | "ADMIN_SETUP" | "COMPLETED";

const STEPS: Record<StepType, string> = {
    SELECT_INDUSTRY: "Select Your Industry",
    COMPANY_DETAILS: "Company Details",
    ADMIN_SETUP: "Admin Account Setup",
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
            emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
        } catch (error) {
            console.error("Failed to initialize EmailJS:", error);
            toast({
                variant: "destructive",
                title: "Service Error",
                description: "Failed to initialize email service. Please try again later.",
            });
        }
    }, []);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            industry: "",
            company: "",
            cui: "",
            address: "",
            county: "",
            phone: "",
            adminName: "",
            email: "",
            confirmEmail: "",
            adminPassword: "",
            confirmPassword: "",
        },
    });

    const lookupCompany = async (cui: string) => {
        if (!cui) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please enter a CUI number",
            });
            return;
        }

        setIsLookingUp(true);
        try {
            const sanitizedCui = cui.toString().trim().replace(/[^0-9]/g, "");
            const response = await fetch(`/api/anaf-lookup?cui=${sanitizedCui}`);

            if (!response.ok) {
                throw new Error("Failed to lookup company details");
            }

            const data = await response.json();

            if (data?.found) {
                form.setValue("company", data.denumire);
                form.setValue("address", data.adresa || "");
                form.setValue("county", data.judet || "");
                form.setValue("phone", data.telefon || "");
                toast({
                    title: "Success",
                    description: "Company details found and filled automatically.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Company Not Found",
                    description: "Could not find company details for the provided CUI.",
                });
            }
        } catch (error) {
            console.error("Company lookup error:", error);
            toast({
                variant: "destructive",
                title: "Lookup Error",
                description: "Failed to lookup company details. Please try again or enter manually.",
            });
        } finally {
            setIsLookingUp(false);
        }
    };

    const sendEmail = async (data: FormData) => {
        try {
            const result = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    to_name: "Salut Enterprise Team",
                    company: data.company,
                    industry: INDUSTRIES.find(ind => ind.value === data.industry)?.label || data.industry,
                    email: data.email,
                    phone: data.phone || "N/A",
                    address: data.address || "N/A",
                    county: data.county || "N/A",
                    cui: data.cui || "N/A",
                    admin_name: data.adminName
                },
            );

            if (result.status === 200) {
                // Email sent successfully
            }
        } catch (error) {
            console.error("EmailJS error:", error);
            // Don't throw here as this is a non-critical error
            toast({
                variant: "warning",
                title: "Notification Warning",
                description: "Could not send email notification, but your company was created successfully.",
            });
        }
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            console.log("Submitting company data:", {
                ...data,
                email: "***",
                adminPassword: "***"
            });

            // Create company in Odoo
            const odooResponse = await fetch('/api/odoo/create-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.company,
                    email: data.email,
                    phone: data.phone || undefined,
                    street: data.address || undefined,
                    city: data.county || undefined,
                    adminName: data.adminName,
                    adminLogin: data.email,
                    adminPassword: data.adminPassword,
                })
            });

            const responseData = await odooResponse.json();

            if (!odooResponse.ok) {
                throw new Error(responseData.message || 'Failed to create company in Odoo');
            }

            // Send email notification
            await sendEmail(data);

            toast({
                title: "Success",
                description: "Your company has been created successfully. Redirecting to your dashboard...",
            });

            setStep("COMPLETED");

            // Redirect to Odoo login page after a short delay
            setTimeout(() => {
                const odooUrl = process.env.ODOO_URL || import.meta.env.VITE_ODOO_URL;
                if (!odooUrl) {
                    console.error("Odoo URL not configured");
                    toast({
                        variant: "destructive",
                        title: "Configuration Error",
                        description: "Could not redirect to dashboard. Please contact support.",
                    });
                    return;
                }
                const loginUrl = `${odooUrl}/web/login`;
                const params = new URLSearchParams({
                    login: data.email,
                    redirect: '/web'
                });
                window.location.href = `${loginUrl}?${params.toString()}`;
            }, 2000);

        } catch (error: any) {
            console.error("Submission error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to process your request. Please try again later.",
            });

            // Reset form state if needed
            if (error.message?.includes("company name already exists")) {
                form.setError("company", {
                    type: "manual",
                    message: "This company name is already taken. Please choose a different name.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const validateCurrentStep = () => {
        if (step === "COMPLETED") return true;

        const currentFields = {
            SELECT_INDUSTRY: ["industry"],
            COMPANY_DETAILS: ["company", "cui"],
            ADMIN_SETUP: ["adminName", "email", "confirmEmail", "adminPassword", "confirmPassword"],
        }[step];

        return currentFields.every((field) => {
            const value = form.getValues(field as keyof FormData);
            return value && value.length > 0;
        });
    };

    const progress = (() => {
        const stepValues: StepType[] = [
            "SELECT_INDUSTRY",
            "COMPANY_DETAILS",
            "ADMIN_SETUP",
            "COMPLETED",
        ];
        const currentIndex = stepValues.indexOf(step);
        return (currentIndex / (stepValues.length - 1)) * 100;
    })();

    const goToNextStep = () => {
        if (validateCurrentStep()) {
            const stepOrder: StepType[] = [
                "SELECT_INDUSTRY",
                "COMPANY_DETAILS",
                "ADMIN_SETUP",
                "COMPLETED",
            ];
            const currentIndex = stepOrder.indexOf(step);
            if (currentIndex < stepOrder.length - 1) {
                setStep(stepOrder[currentIndex + 1]);
            }
        }
    };

    const goToPreviousStep = () => {
        const stepOrder: StepType[] = [
            "SELECT_INDUSTRY",
            "COMPANY_DETAILS",
            "ADMIN_SETUP",
            "COMPLETED",
        ];
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex > 0) {
            setStep(stepOrder[currentIndex - 1]);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="space-y-2">
                        <DialogTitle className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#9747FF] via-[#8A43E6] to-[#6E35B9] bg-clip-text text-transparent pb-1">
                            Get Started with Salut Enterprise
                        </DialogTitle>
                        {step !== "COMPLETED" && (
                            <>
                                <DialogDescription className="text-sm md:text-base font-medium text-foreground/80">
                                    {STEPS[step]}
                                </DialogDescription>
                                <div className="space-y-2">
                                    <Progress value={progress} className="h-2" />
                                    <p className="text-xs md:text-sm text-muted-foreground">
                                        Step {Object.keys(STEPS).indexOf(step) + 1} of{" "}
                                        {Object.keys(STEPS).length}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </DialogHeader>

                {step === "COMPLETED" ? (
                    <div className="py-6 md:py-8 text-center space-y-4">
                        <div className="flex justify-center">
                            <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-primary">
                            Thank You for Choosing Salut Enterprise!
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                            Your company has been created successfully. You will be redirected to your dashboard momentarily...
                        </p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            {step === "SELECT_INDUSTRY" && (
                                <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Your Industry</FormLabel>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                                {INDUSTRIES.map(
                                                    ({ value, label, icon: Icon, description }) => (
                                                        <div
                                                            key={value}
                                                            className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${field.value === value
                                                                ? "border-primary bg-primary/5"
                                                                : "border-border hover:border-primary/50"
                                                                }`}
                                                            onClick={() => field.onChange(value)}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 rounded-md bg-primary/10">
                                                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm md:text-base font-medium">{label}</div>
                                                                    <div className="text-xs md:text-sm text-muted-foreground">
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

                            {step === "COMPANY_DETAILS" && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="cui"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CUI Number</FormLabel>
                                                <div className="flex gap-2">
                                                    <FormControl>
                                                        <div className="relative flex-1">
                                                            <Building2 className="absolute left-3 top-2.5 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                                                            <Input
                                                                placeholder="Enter CUI"
                                                                className="pl-10 text-sm md:text-base"
                                                                {...field}
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => lookupCompany(field.value)}
                                                        disabled={isLookingUp || !field.value}
                                                        className="min-w-[100px] md:min-w-[120px] bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/30"
                                                    >
                                                        {isLookingUp ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Search className="mr-2 h-4 w-4" />
                                                                <span className="hidden sm:inline">Lookup</span> Info
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
                                                    <Input
                                                        placeholder="Company Name"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Company Address"
                                                            className="text-sm md:text-base"
                                                            {...field}
                                                        />
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
                                                        <Input
                                                            placeholder="County"
                                                            className="text-sm md:text-base"
                                                            {...field}
                                                        />
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
                                                    <Input
                                                        placeholder="Phone Number"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {step === "ADMIN_SETUP" && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="adminName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Admin Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Full Name"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
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
                                                    <Input
                                                        type="email"
                                                        placeholder="your.email@company.com"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Confirm your email"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="adminPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Minimum 6 characters"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm your password"
                                                        className="text-sm md:text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <div className="flex justify-between pt-4">
                                {step !== ("COMPLETED" as StepType) && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={goToPreviousStep}
                                            disabled={step === "SELECT_INDUSTRY" || isLoading}
                                            className="text-sm md:text-base"
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>

                                        {step !== "ADMIN_SETUP" ? (
                                            <Button
                                                type="button"
                                                onClick={goToNextStep}
                                                disabled={isLoading}
                                                className="text-sm md:text-base"
                                            >
                                                Next <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="text-sm md:text-base"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    "Create Company"
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