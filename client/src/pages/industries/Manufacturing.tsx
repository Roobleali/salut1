import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
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
    description: "Live updates on every stage of the manufacturing process.",
    benefit: "Enhanced transparency and operational efficiency"
  },
  {
    title: "Automated Work Orders",
    description: "Smart scheduling and prioritization of production tasks.",
    benefit: "Improved workflow and reduced downtime"
  },
  {
    title: "Inventory Management",
    description: "Automated stock replenishment and barcode scanning.",
    benefit: "Minimized errors and optimal stock levels"
  },
  {
    title: "Bill of Materials (BoM)",
    description: "Complex product configurations with multi-level BoMs.",
    benefit: "Streamlined inventory and reduced waste"
  },
  {
    title: "Quality Control Tools",
    description: "Dedicated quality checks throughout production.",
    benefit: "Consistent product quality assurance"
  }
];

const ADVANTAGES = [
  {
    title: "Comprehensive Integration",
    description: "Seamlessly connect manufacturing, inventory, sales, and accounting in a single platform for real-time insights and streamlined operations."
  },
  {
    title: "Customization & Flexibility",
    description: "Modular design allows businesses to tailor the software to their specific needs, supporting unique operational requirements and industry standards."
  },
  {
    title: "Cost-Effective Solution",
    description: "Accessible pricing model designed for businesses of all sizes, offering enterprise-grade features without the traditional high costs."
  },
  {
    title: "Regulatory Compliance",
    description: "Built-in compliance features and automated reporting tools to meet industry standards and regulatory requirements."
  }
];

const OPERATIONAL_BENEFITS = [
  {
    title: "Enhanced Visibility",
    description: "Real-time data access for informed decision-making on inventory, production stages, and order status."
  },
  {
    title: "Cost Optimization",
    description: "Smart resource allocation and integrated quality management to minimize waste and improve utilization."
  },
  {
    title: "Increased Productivity",
    description: "Automated workflows and intelligent scheduling driving significant efficiency gains across operations."
  }
];

export function Manufacturing() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="relative pt-32 pb-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Badge variant="outline" className="mb-6">Enterprise Manufacturing</Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
              Intelligent Manufacturing Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Transform your production operations with our AI-powered platform designed for modern manufacturing excellence.
            </p>
            <div className="flex gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg px-8">
                  Schedule Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Advantages Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto mb-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Platform Advantages
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
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold mb-4">{advantage.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto mb-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Enterprise Manufacturing Features
            </h2>
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px] font-bold text-lg">Feature</TableHead>
                        <TableHead className="font-bold text-lg">Description</TableHead>
                        <TableHead className="w-[250px] font-bold text-lg">Benefits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FEATURES.map((feature) => (
                        <TableRow key={feature.title} className="hover:bg-muted/50">
                          <TableCell className="font-semibold text-primary">
                            {feature.title}
                          </TableCell>
                          <TableCell>{feature.description}</TableCell>
                          <TableCell className="text-gray-600">{feature.benefit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Operational Benefits Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Operational Impact
            </h2>
            <div className="grid gap-8">
              {OPERATIONAL_BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-6 p-6 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <Check className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
