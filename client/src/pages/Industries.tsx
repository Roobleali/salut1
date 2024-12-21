import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { ServiceFeature } from "@/components/sections/ServiceFeature";

const FEATURES = [
  {
    title: "Project Management",
    desire: "Achieve seamless project execution across industries",
    outcome: "Utilize comprehensive project tools including Gantt charts, Kanban boards, and milestone tracking to ensure projects are completed efficiently",
  },
  {
    title: "Customer Relationship Management (CRM)",
    desire: "Build and maintain strong client relationships",
    outcome: "Transform customer interactions with advanced lead tracking, detailed interaction history, and automated follow-ups",
  },
  {
    title: "Service Operations",
    desire: "Streamline your service delivery process",
    outcome: "Efficiently manage service agreements and operations with automated workflows and real-time tracking",
  },
  {
    title: "Industry-Specific Solutions",
    desire: "Get tailored solutions for your sector",
    outcome: "Access specialized tools and features designed specifically for your industry's unique requirements",
  },
  {
    title: "Integrated Analytics",
    desire: "Make data-driven business decisions",
    outcome: "Leverage comprehensive analytics and reporting tools for strategic planning and performance optimization",
  },
  {
    title: "Digital Transformation",
    desire: "Modernize your business operations",
    outcome: "Implement cutting-edge digital solutions that drive efficiency and growth in your industry",
  },
  {
    title: "Automation & Workflow",
    desire: "Reduce manual tasks and streamline processes",
    outcome: "Automate routine operations and create efficient workflows tailored to your industry needs",
  },
  {
    title: "Scalable Infrastructure",
    desire: "Grow your business with confidence",
    outcome: "Build on a robust, scalable platform that evolves with your business needs and industry demands",
  },
];

const BENEFITS = [
  "Industry-Specific Solutions: Get specialized tools and features designed for your sector's unique requirements",
  "Comprehensive Integration: Unify all your business operations in a single, powerful platform tailored to your industry",
  "Adaptive Technology: Stay ahead with solutions that evolve alongside your industry's changing needs",
  "Enhanced Efficiency: Streamline operations with automated workflows and industry-best practices",
  "Data-Driven Growth: Make informed decisions with industry-specific analytics and insights",
  "Scalable Architecture: Grow confidently with a platform that adapts to your expanding business needs",
];

export function Industries() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">Industry Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                Transform Your Industry with Salut Enterprise
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Unlock your potential with our comprehensive suite of features designed to drive efficiency, growth, and exceptional customer experiences across various industries.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Grid */}
      <section className="py-16 bg-gradient-to-tr from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Industry Solutions</h2>
            <p className="text-gray-600">
              Tailored solutions that drive innovation and growth across various industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Manufacturing", "Real Estate", "Healthcare", "Retail", "Education", "Hospitality"].map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <Link href={`/industries/${industry.toLowerCase()}`}>
                  <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <h3 className="text-lg font-semibold mb-3">{industry}</h3>
                    <p className="text-gray-600">Comprehensive solutions tailored for the {industry.toLowerCase()} sector.</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Industry-Leading Features</h2>
            <p className="text-gray-600">
              Our comprehensive suite of features is designed to not just meet your desires but to turn them into tangible outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <ServiceFeature
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Salut Enterprise?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Industry?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the transformative power of Salut Enterprise today.
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
