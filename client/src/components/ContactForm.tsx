import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as sgMail from "@sendgrid/mail";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Configure SendGrid with API key
      sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

      const emailTemplate = `
Company Information:
------------------
Name: Salut Enterprise
Type: Cloud-based ERP Platform
Location: Romania
Industry Focus: Romanian Businesses

Contact Form Submission Details:
-----------------------------
Submitted By: ${data.name}
Email Address: ${data.email}

Message Content:
-------------
${data.message}

Submission Timestamp: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
`;

      const msg = {
        to: import.meta.env.VITE_SENDGRID_TO_EMAIL,
        from: {
          email: import.meta.env.VITE_SENDGRID_FROM_EMAIL,
          name: "Salut Enterprise Contact System"
        },
        subject: "New Business Inquiry - Salut Enterprise ERP",
        text: emailTemplate,
      };

      await sgMail.send(msg);

      toast({
        title: t("contact.success_title"),
        description: t("contact.success_message"),
      });
      form.reset();
    } catch (error: any) {
      console.error('Email sending error:', error);
      toast({
        variant: "destructive",
        title: t("contact.error_title"),
        description: t("contact.error_message"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contact.form.name")}</FormLabel>
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
              <FormLabel>{t("contact.form.email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
              <FormLabel>{t("contact.form.message")}</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("contact.form.sending")}
            </div>
          ) : (
            t("contact.form.submit")
          )}
        </Button>
      </form>
    </Form>
  );
}