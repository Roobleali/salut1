import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ENTERPRISE_APPS = [
  {
    id: "crm",
    title: "CRM",
    description: "Complete customer relationship management with advanced lead tracking and opportunity management.",
    href: "/enterprise/crm",
  },
  {
    id: "sales",
    title: "Sales",
    description: "Streamline your sales process with powerful forecasting and pipeline management tools.",
    href: "/enterprise/sales",
  },
  {
    id: "purchase",
    title: "Purchase",
    description: "Optimize procurement processes and supplier relationship management.",
    href: "/enterprise/purchase",
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Real-time inventory tracking and warehouse management system.",
    href: "/enterprise/inventory",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "End-to-end manufacturing resource planning and production management.",
    href: "/enterprise/manufacturing",
  },
  {
    id: "accounting",
    title: "Accounting",
    description: "Comprehensive financial management and reporting system.",
    href: "/enterprise/accounting",
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Agile project planning and resource allocation tools.",
    href: "/enterprise/project-management",
  },
  {
    id: "hr",
    title: "HR & Recruitment",
    description: "Complete human resource management and talent acquisition system.",
    href: "/enterprise/hr",
  },
  {
    id: "ecommerce",
    title: "Website & E-commerce",
    description: "Build and manage your online presence with integrated e-commerce capabilities.",
    href: "/enterprise/ecommerce",
  },
  {
    id: "pos",
    title: "Point of Sale",
    description: "Modern point of sale system with offline capabilities and multi-store support.",
    href: "/enterprise/pos",
  },
  {
    id: "field-service",
    title: "Field Service Management",
    description: "Mobile workforce management and service scheduling platform.",
    href: "/enterprise/field-service",
  },
  {
    id: "marketing",
    title: "Marketing Automation",
    description: "Automated marketing campaigns and customer engagement tools.",
    href: "/enterprise/marketing",
  },
];

export function EnterpriseApps() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Enterprise Applications</h1>
          <p className="text-gray-600">
            Discover our comprehensive suite of enterprise applications designed to transform your business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ENTERPRISE_APPS.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={app.href}>
                <a className="block h-full">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary">
                        {app.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{app.description}</p>
                      <div className="flex items-center text-primary">
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}