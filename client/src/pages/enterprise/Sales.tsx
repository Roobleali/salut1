import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const FEATURES = [
  {
    title: "Pipeline Management",
    description: "Track and manage your sales pipeline with visual kanban boards and forecasting tools.",
  },
  {
    title: "Quote Generation",
    description: "Create professional quotes and proposals with customizable templates.",
  },
  {
    title: "Revenue Analytics",
    description: "Advanced reporting and analytics for revenue forecasting and performance tracking.",
  },
  {
    title: "Commission Management",
    description: "Automated sales commission calculations and performance incentives.",
  },
  {
    title: "Territory Planning",
    description: "Define and manage sales territories for optimal coverage and performance.",
  },
  {
    title: "Contract Management",
    description: "Streamline contract creation, negotiation, and renewal processes.",
  },
];

const BENEFITS = [
  "Increase sales conversion rates by 40%",
  "Reduce sales cycle length",
  "Improve forecast accuracy",
  "Automate commission calculations",
  "Enhance team collaboration",
  "Real-time performance tracking",
];

const CASE_STUDY = {
  title: "Manufacturing Giant Revolutionizes Sales Process",
  metrics: [
    { label: "Revenue Growth", value: "85%" },
    { label: "Sales Cycle", value: "-45%" },
    { label: "Team Efficiency", value: "+60%" },
  ],
  quote: {
    text: "The sales management system has transformed how we handle our global sales operations. The automation and insights have been game-changing for our team.",
    author: "Michael Chen",
    position: "VP of Sales, GlobalTech Manufacturing",
  },
};

export function Sales() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-bl from-background via-background/95 to-primary/5 pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Enterprise Sales</Badge>
          <h1 className="text-4xl font-bold mb-6">
            Accelerate Your Sales Performance
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empower your sales team with advanced tools for pipeline management, forecasting, and territory planning. Drive revenue growth with data-driven insights and automation.
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
