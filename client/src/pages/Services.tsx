import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { ServiceFeature } from "@/components/sections/ServiceFeature";

const FEATURES = [
  {
    title: "Project Management",
    desire: "Achieve seamless project execution",
    outcome: "Utilize Gantt charts and Kanban views for clear task visualization and progress tracking, ensuring projects are completed on time and within budget",
  },
  {
    title: "Customer Relationship Management (CRM)",
    desire: "Build lasting relationships with clients",
    outcome: "Capture and nurture leads effectively, enhancing conversion rates and maintaining detailed interaction records to elevate service delivery",
  },
  {
    title: "Billing and Invoicing",
    desire: "Simplify financial processes",
    outcome: "Automate invoicing directly from projects, ensuring timely payments and reducing administrative burdens with recurring billing options",
  },
  {
    title: "Integrated Communication Tools",
    desire: "Foster collaboration among teams",
    outcome: "Enable real-time communication through integrated messaging and dashboards, ensuring everyone is aligned and informed",
  },
  {
    title: "Service Agreements Management",
    desire: "Streamline service operations",
    outcome: "Efficiently manage service agreements, simplifying tracking and renewal processes for enhanced operational flow",
  },
  {
    title: "Mobile Accessibility",
    desire: "Manage your business on-the-go",
    outcome: "Access all features from mobile devices, empowering you to oversee operations anytime, anywhere",
  },
  {
    title: "Customizable Workflows",
    desire: "Tailor processes to fit your needs",
    outcome: "Automate repetitive tasks with customizable workflows that enhance efficiency across departments",
  },
  {
    title: "Reporting and Analytics",
    desire: "Make informed decisions based on data",
    outcome: "Leverage built-in analytics tools to monitor performance metrics, enabling strategic decision-making for sustained growth",
  },
];

const BENEFITS = [
  "All-in-One Solution: Integrate multiple business functions into a single platform, eliminating the hassle of managing disparate systems",
  "Modular Design: Select only the applications you need, creating a tailored solution that aligns with your specific business goals without unnecessary costs",
  "Scalability: As your business grows, easily scale your operations with our cloud-based solution that adapts to increasing demands",
  "Enhanced Customer Experience: Improve client interactions through effective CRM tools and self-service portals that foster loyalty and satisfaction",
  "Improved Financial Management: Simplify billing processes with integrated features that ensure timely payments and accurate financial reporting",
];

export function Services() {
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
              <Badge className="mb-4">Enterprise Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                Transform Your Business with Salut Enterprise
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                At Salut Enterprise, we understand that service companies are driven by the desire for efficiency, growth, and exceptional customer experiences.
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
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
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
