import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  id: string;
}

export function ServiceCard({ title, description, image, features, id }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group cursor-pointer h-full transform transition-all duration-300 hover:shadow-xl" id={id}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <CardHeader>
          <CardTitle className="transition-colors duration-300 group-hover:text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-gray-900">{description}</p>
          <motion.ul 
            className="space-y-2"
            initial="hidden"
            whileHover="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.li 
                key={feature}
                className="flex items-center gap-2 transition-colors duration-300 group-hover:text-gray-900"
                variants={{
                  hidden: { opacity: 0.8, x: -5 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
