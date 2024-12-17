import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FEATURES = [
  {
    title: "Contact Management",
    description: "Centralize your customer data with comprehensive contact profiles and interaction history.",
  },
  {
    title: "Lead Tracking",
    description: "Track and nurture leads through your sales pipeline with automated workflows.",
  },
  {
    title: "Opportunity Management",
    description: "Manage and forecast sales opportunities with detailed analytics and reporting.",
  },
  {
    title: "Email Integration",
    description: "Seamlessly integrate with email clients for automated communication tracking.",
  },
  {
    title: "Analytics & Reporting",
    description: "Generate detailed reports and insights on sales performance and customer behavior.",
  },
  {
    title: "Mobile Access",
    description: "Access your CRM data on-the-go with our mobile-responsive interface.",
  },
];

const BENEFITS = [
  "Increase sales efficiency by up to 30%",
  "Improve customer retention rates",
  "Enhance team collaboration",
  "Make data-driven decisions",
  "Automate repetitive tasks",
  "360° view of customer interactions",
];

const CASE_STUDY = {
  title: "Global Retail Chain Transforms Customer Relations",
  metrics: [
    { label: "Increase in Sales", value: "45%" },
    { label: "Customer Retention", value: "92%" },
    { label: "Response Time", value: "-60%" },
  ],
  quote: {
    text: "The CRM system has revolutionized how we interact with customers. We've seen remarkable improvements in customer satisfaction and sales performance.",
    author: "Sarah Johnson",
    position: "Head of Sales, RetailCo",
  },
};

export function CRM() {
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
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Enterprise CRM</Badge>
          <h1 className="text-4xl font-bold mb-6">
            Transform Your Customer Relationships
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our enterprise CRM solution helps you build stronger customer relationships, streamline sales processes, and drive growth with powerful insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                Request Demo <ArrowRight className="ml-2 h-4 w-4" />
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
