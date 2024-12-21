import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, BarChart3, Box, RefreshCw, Scan, Boxes, Truck, History, Layout, Settings } from "lucide-react";
import { Link } from "wouter";

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Real-Time Inventory Tracking",
    description: "Monitor stock levels in real-time, ensuring accurate visibility and preventing stockouts or overstock situations."
  },
  {
    icon: Boxes,
    title: "Multi-Warehouse Management",
    description: "Manage multiple warehouses from a single interface, allowing for efficient stock distribution and centralized control."
  },
  {
    icon: Settings,
    title: "Automated Reordering",
    description: "Configure automated reordering rules that generate purchase orders when stock levels drop below predefined thresholds."
  },
  {
    icon: Scan,
    title: "Barcode Scanning Integration",
    description: "Enhance accuracy in inventory processes with barcode scanning support, making it easier to track products."
  },
  {
    icon: Truck,
    title: "Advanced Routing Options",
    description: "Define product movement routes within your supply chain using customizable push and pull rules."
  },
  {
    icon: BarChart3,
    title: "Inventory Reporting & Analytics",
    description: "Access comprehensive reporting tools to analyze inventory performance and make data-driven decisions."
  },
  {
    icon: History,
    title: "Batch & Serial Number Tracking",
    description: "Track serialized or batch-tracked products, ensuring complete traceability from suppliers to customers."
  },
  {
    icon: Layout,
    title: "Warehouse Organization",
    description: "Customize warehouse layout including racks and bins to optimize storage management and streamline picking."
  }
];

const ADVANTAGES = [
  "Comprehensive Traceability: Full visibility over the entire product journey",
  "Seamless Integration: Smooth integration with other Salut Enterprise modules",
  "User-Friendly Interface: Navigate complex inventory operations easily",
  "Cost Reduction: Optimize stock levels and automate reordering processes",
  "Flexibility: Manage simple single-location or complex multi-warehouse operations"
];

export function Inventory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Salut Enterprise
                <span className="block mt-2 text-4xl md:text-5xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  Inventory Management
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your inventory management with our comprehensive suite of features designed for modern businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#9747FF] hover:bg-[#8A43E6] text-white px-8"
                  >
                    Start Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-tr from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600">
              Our inventory module offers a robust set of features designed to enhance your operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Unique Advantages</h2>
            <div className="grid gap-6">
              {ADVANTAGES.map((advantage, index) => (
                <motion.div
                  key={advantage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <p className="text-gray-700">{advantage}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Inventory?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the power of Salut Enterprise Inventory Management today.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
