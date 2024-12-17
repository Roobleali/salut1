import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FEATURES = [
  {
    title: "Patient Management",
    description: "Comprehensive patient records and appointment scheduling system.",
  },
  {
    title: "Medical Inventory",
    description: "Advanced tracking of medical supplies and equipment.",
  },
  {
    title: "Billing & Insurance",
    description: "Integrated healthcare billing and insurance claim management.",
  },
  {
    title: "Telemedicine",
    description: "Secure video consultations and remote patient monitoring.",
  },
  {
    title: "Compliance",
    description: "Built-in compliance with Romanian and EU healthcare regulations.",
  },
  {
    title: "Analytics",
    description: "Healthcare analytics and reporting for improved patient care.",
  },
];

const ROMANIA_SPECIFIC = [
  "Romanian healthcare regulations compliance",
  "Integration with CNAS (Casa Națională de Asigurări de Sănătate)",
  "Prescription management system",
  "Medical documentation in Romanian",
  "Local healthcare provider network integration",
  "Romanian medical coding standards"
];

export function Healthcare() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Healthcare Solutions</Badge>
          <h1 className="text-4xl font-bold mb-6">
            Advanced Healthcare Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive healthcare solutions tailored for Romanian medical institutions, with full compliance and local healthcare system integration.
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
            <Card key={feature.title}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Romanian Healthcare Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ROMANIA_SPECIFIC.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
