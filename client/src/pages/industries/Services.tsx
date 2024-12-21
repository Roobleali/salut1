import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FEATURES = [
  {
    title: "Professional Services Management",
    description: "End-to-end service delivery management",
    features: [
      "Project Planning",
      "Resource Allocation",
      "Time Tracking",
      "Client Management",
      "Service Analytics"
    ]
  },
  {
    title: "Client Collaboration",
    description: "Enhanced client communication tools",
    features: [
      "Client Portal",
      "Document Sharing",
      "Progress Tracking",
      "Feedback Management"
    ]
  },
  {
    title: "Service Delivery",
    description: "Streamlined service execution",
    features: [
      "Task Management",
      "Quality Control",
      "Service Templates",
      "Workflow Automation"
    ]
  },
  {
    title: "Financial Management",
    description: "Comprehensive financial tools",
    features: [
      "Time & Billing",
      "Expense Tracking",
      "Invoice Generation",
      "Payment Processing"
    ]
  },
  {
    title: "Analytics & Reporting",
    description: "Data-driven insights",
    features: [
      "Performance Metrics",
      "Client Analytics",
      "Revenue Reports",
      "Service KPIs"
    ]
  },
  {
    title: "Team Collaboration",
    description: "Enhanced team productivity",
    features: [
      "Team Chat",
      "Task Assignment",
      "Resource Scheduling",
      "Knowledge Base"
    ]
  }
];

export function Services() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left">
            <Badge className="mb-4">Professional Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              Transform Your Service Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empower your professional services firm with comprehensive tools designed for efficient service delivery, client management, and business growth.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative lg:mt-0 mt-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            <img
              src="/Brown Modern Visit Our Website Video Instagram Post.png"
              alt="Professional Services Platform"
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((subFeature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-gray-700">{subFeature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
