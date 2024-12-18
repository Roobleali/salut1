import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FEATURES = [
  {
    title: "Property Management",
    description: "Complete portfolio management and administration",
    features: [
      "Property Units Tracking",
      "Tenant Management",
      "Occupancy Reports",
      "Contracts & Documents",
      "Project Management"
    ]
  },
  {
    title: "Project Tracking",
    description: "Comprehensive property administration",
    features: [
      "Project Monitoring",
      "Unit Records",
      "Customization Options",
      "Contract Management"
    ]
  },
  {
    title: "Sales & Rentals",
    description: "Sales and rental administration",
    features: [
      "Contract Generation",
      "Renewal Tracking",
      "Document Management",
      "Maintenance"
    ]
  },
  {
    title: "Property Maintenance",
    description: "Building maintenance management",
    features: [
      "Ticket System",
      "Vendor Management",
      "Scheduled Maintenance",
      "Utilities"
    ]
  },
  {
    title: "Utilities & Billing",
    description: "Utility cost management",
    features: [
      "Meter Reading",
      "Automated Billing",
      "Custom Rates",
      "Financial Reports"
    ]
  },
  {
    title: "CRM & Clients",
    description: "Customer relationship management",
    features: [
      "Client Profiles",
      "Interaction History",
      "Tasks & Follow-ups",
      "Automated Communication"
    ]
  },
];

const ROMANIA_SPECIFIC = [
  {
    en: "e-Factura compliance and integration",
    ro: "Conformitate și integrare e-Factura"
  },
  {
    en: "Romanian fiscal code management",
    ro: "Gestiunea codului fiscal românesc"
  },
  {
    en: "BNR exchange rate integration",
    ro: "Integrare curs valutar BNR"
  },
  {
    en: "Automated Romanian contract generation",
    ro: "Generare automată contracte conform legislației române"
  },
  {
    en: "GDPR compliance tools",
    ro: "Instrumente conformitate GDPR"
  },
  {
    en: "Romanian real estate market analytics",
    ro: "Analiză piață imobiliară românească"
  }
];

export function RealEstate() {
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Real Estate Solutions</Badge>
          <h1 className="text-4xl font-bold mb-6">
            Advanced Real Estate Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive real estate solutions tailored for the Romanian market, with full compliance and local market integration.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
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

        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Romanian Market Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ROMANIA_SPECIFIC.map((feature) => (
              <div key={feature.en} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <span className="block">{feature.en}</span>
                  <span className="block text-sm text-gray-600">{feature.ro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
