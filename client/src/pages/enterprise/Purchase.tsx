import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FEATURES = [
  {
    title: "Supplier Management",
    description: "Centralize supplier information, performance metrics, and communication history.",
  },
  {
    title: "Purchase Orders",
    description: "Create and manage digital purchase orders with automated approval workflows.",
  },
  {
    title: "Procurement Analytics",
    description: "Track spending patterns and identify cost-saving opportunities with detailed analytics.",
  },
  {
    title: "Contract Management",
    description: "Manage supplier contracts, terms, and renewal schedules in one place.",
  },
  {
    title: "RFQ Processing",
    description: "Streamline request for quotation process with automated supplier comparisons.",
  },
  {
    title: "Inventory Integration",
    description: "Seamlessly connect purchase orders with inventory management system.",
  },
];

const BENEFITS = [
  "Reduce procurement costs by 25%",
  "Streamline supplier relationships",
  "Improve purchase order accuracy",
  "Enhance spend visibility",
  "Automate approval workflows",
  "Ensure compliance and control",
];

const CASE_STUDY = {
  title: "Global Manufacturer Optimizes Procurement Process",
  metrics: [
    { label: "Cost Savings", value: "32%" },
    { label: "Processing Time", value: "-65%" },
    { label: "Supplier Compliance", value: "98%" },
  ],
  quote: {
    text: "The procurement system has transformed our purchasing operations. We've significantly reduced costs and improved relationships with our suppliers.",
    author: "David Chen",
    position: "Head of Procurement, Global Manufacturing Corp",
  },
};

export function Purchase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-tr from-background via-background/95 to-primary/5 pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Enterprise Procurement</Badge>
          <h1 className="text-4xl font-bold mb-6">
            Streamline Your Procurement Process
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your purchasing operations with our comprehensive procurement management solution. Automate workflows, manage suppliers, and gain powerful insights into your spending.
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Study Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Success Story</h2>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">
                {CASE_STUDY.title}
              </h3>
              
              <div className="grid sm:grid-cols-3 gap-8 mb-8">
                {CASE_STUDY.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 mb-4">
                {CASE_STUDY.quote.text}
              </blockquote>
              <div className="text-right">
                <div className="font-semibold">{CASE_STUDY.quote.author}</div>
                <div className="text-sm text-gray-600">
                  {CASE_STUDY.quote.position}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
