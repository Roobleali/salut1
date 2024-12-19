import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FEATURES = [
  {
    title: "Real-Time Production Monitoring",
    description: "Provides live updates on every stage of the manufacturing process.",
    benefit: "Enhances transparency and operational efficiency."
  },
  {
    title: "Automated Work Orders",
    description: "Automates scheduling and prioritization of production tasks.",
    benefit: "Improves workflow and reduces downtime."
  },
  {
    title: "Inventory Management Optimization",
    description: "Includes automated stock replenishment and barcode scanning capabilities.",
    benefit: "Minimizes errors and ensures optimal stock levels."
  },
  {
    title: "Bill of Materials (BoM) Management",
    description: "Supports complex product configurations with multi-level BoMs.",
    benefit: "Streamlines inventory management and reduces waste."
  },
  {
    title: "Quality Control Tools",
    description: "Features dedicated modules for conducting quality checks throughout the manufacturing lifecycle.",
    benefit: "Maintains product quality consistently."
  }
];

const ADVANTAGES = [
  {
    title: "Comprehensive Integration",
    description: "Salut Enterprise integrates multiple business functions—such as manufacturing, inventory management, sales, and accounting—into a single platform. This integration facilitates seamless communication between departments and provides real-time insights into operations."
  },
  {
    title: "Customization and Flexibility",
    description: "The modular design of Salut Enterprise allows manufacturers to tailor the software to their specific needs. This adaptability is crucial for Romanian companies that may have distinct operational requirements or industry standards."
  },
  {
    title: "Cost-Effectiveness",
    description: "Salut Enterprise's pricing model is designed to be accessible for small and medium-sized enterprises in Romania, offering a robust ERP solution without the high costs associated with many traditional systems."
  },
  {
    title: "Local Compliance and Financial Management",
    description: "Salut Enterprise ensures compliance with Romanian regulations, including local accounting standards and tax laws. This feature simplifies financial management and reporting for businesses operating in the region."
  }
];

const OPERATIONAL_BENEFITS = [
  {
    title: "Enhanced Visibility and Control",
    description: "Real-time data access allows for informed decision-making regarding inventory levels, production stages, and order statuses."
  },
  {
    title: "Reduction in Production Costs",
    description: "By optimizing resource allocation and integrating quality management processes, Salut Enterprise helps minimize waste and improve utilization rates."
  },
  {
    title: "Improved Productivity",
    description: "Automation of work orders and scheduling can lead to significant productivity gains, enabling manufacturers to operate more efficiently."
  }
];

export function Manufacturing() {
  const { t } = useTranslation();
  
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
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">{t('industries.manufacturing.badge')}</Badge>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Enterprise Manufacturing Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advanced AI-powered manufacturing management platform designed to revolutionize production operations through intelligent digital experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
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

        {/* Key Advantages Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Advantages for Manufacturing in Romania
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {ADVANTAGES.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Table Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features of Salut Enterprise Manufacturing Module
          </h2>
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Benefits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FEATURES.map((feature) => (
                    <TableRow key={feature.title}>
                      <TableCell className="font-medium">{feature.title}</TableCell>
                      <TableCell>{feature.description}</TableCell>
                      <TableCell>{feature.benefit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Operational Benefits Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Operational Benefits
          </h2>
          <div className="grid gap-6">
            {OPERATIONAL_BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
