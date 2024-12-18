import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  title: string; // Translation key
  description: string; // Translation key
  image: string;
  features: string[]; // Array of translation keys
  id: string;
}

export function ServiceCard({ title, description, image, features, id }: ServiceCardProps) {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300" id={id}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={t(title)}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <CardHeader>
          <CardTitle className="text-primary">{t(title)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">{t(description)}</p>
          <ul className="space-y-2">
            {features.map((feature) => (
              <motion.li 
                key={feature}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">{t(feature)}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
