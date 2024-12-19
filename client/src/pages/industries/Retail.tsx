import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

const FEATURES = [
  {
    title: "Omnichannel Retail",
    description: "Seamlessly integrate online and offline sales channels with unified inventory and customer data.",
  },
  {
    title: "E-commerce Platform",
    description: "Built-in online store with mobile-first design, SEO optimization, and secure payment processing.",
  },
  {
    title: "Inventory Management",
    description: "Real-time inventory tracking across all locations with automated reordering and stock predictions.",
  },
  {
    title: "POS System",
    description: "Modern point-of-sale system with offline capabilities, mobile payments, and customer loyalty features.",
  },
  {
    title: "Marketing Tools",
    description: "Integrated marketing automation for email campaigns, social media, and personalized promotions.",
  },
  {
    title: "Analytics Dashboard",
    description: "Advanced analytics and reporting for sales, inventory, customer behavior, and business performance.",
  },
];

const BENEFITS = [
  "Increase sales by 35% with omnichannel integration",
  "Reduce inventory costs by 25%",
  "Improve customer retention rate",
  "Automate marketing campaigns",
  "Real-time business insights",
  "Scale your business effortlessly"
];

export function Retail() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Retail & E-commerce Solutions | SalutTech</title>
        <meta name="description" content="Transform your retail business with SalutTech's comprehensive e-commerce and point-of-sale solutions. Seamlessly integrate online and offline sales channels." />
        <meta name="keywords" content="retail software, e-commerce platform, POS system, inventory management, omnichannel retail, retail analytics" />
        <meta property="og:title" content="Retail & E-commerce Solutions | SalutTech" />
        <meta property="og:description" content="Transform your retail business with SalutTech's comprehensive e-commerce and point-of-sale solutions." />
        <link rel="canonical" href="https://saluttech.ro/industries/retail" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 pt-32 pb-24"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">Retail & E-commerce</Badge>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Transform Your Retail Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Unlock growth with our comprehensive retail and e-commerce solution. Seamlessly manage both online and offline sales channels while delivering exceptional customer experiences.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
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
        </div>
      </motion.div>
    </>
  );
}
