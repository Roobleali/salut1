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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4">Professional Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
            Transform Your Service Business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empower your professional services firm with comprehensive tools designed for efficient service delivery, client management, and business growth.
          </p>
          <div className="flex gap-4 justify-center mb-12">
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
