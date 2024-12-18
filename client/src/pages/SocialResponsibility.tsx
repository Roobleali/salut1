import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Shield } from "lucide-react";

export function SocialResponsibility() {
  const { t } = useTranslation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "environmental",
      icon: Leaf,
      color: "text-green-500"
    },
    {
      id: "community",
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: "ethics",
      icon: Shield,
      color: "text-purple-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">{t('social_responsibility.title')}</Badge>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('social_responsibility.subtitle')}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gray-100 ${section.color}`}>
                      {React.createElement(section.icon, { className: "w-6 h-6" })}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {t(`social_responsibility.${section.id}.title`)}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {t(`social_responsibility.${section.id}.description`)}
                  </p>
                  <ul className="space-y-3">
                    {t(`social_responsibility.${section.id}.features`, { returnObjects: true }).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${section.color}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
