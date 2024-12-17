import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export function Manufacturing() {
  const { t } = useTranslation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const FEATURES = [
    {
      title: t('manufacturing.features.planning'),
      description: t('manufacturing.features.planning_desc'),
    },
    {
      title: t('industries.manufacturing.features.quality'),
      description: t('industries.manufacturing.features.quality_desc'),
    },
    {
      title: t('industries.manufacturing.features.supply'),
      description: t('industries.manufacturing.features.supply_desc'),
    },
    {
      title: t('industries.manufacturing.features.cost'),
      description: t('industries.manufacturing.features.cost_desc'),
    },
    {
      title: t('industries.manufacturing.features.compliance'),
      description: t('industries.manufacturing.features.compliance_desc'),
    },
    {
      title: t('industries.manufacturing.features.documents'),
      description: t('industries.manufacturing.features.documents_desc'),
    },
  ];

  const romaniaSpecificFeatures = [
    t('industries.manufacturing.romania_specific.features.efactura'),
    t('industries.manufacturing.romania_specific.features.fiscal'),
    t('industries.manufacturing.romania_specific.features.supply_chain'),
    t('industries.manufacturing.romania_specific.features.eu_export'),
    t('industries.manufacturing.romania_specific.features.labor'),
    t('industries.manufacturing.romania_specific.features.inventory'),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">{t('industries.manufacturing.badge')}</Badge>
          <h1 className="text-4xl font-bold mb-6">
            {t('industries.manufacturing.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('industries.manufacturing.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                {t('button.demo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                {t('button.contact_sales')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('industries.manufacturing.romania_specific.title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {romaniaSpecificFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
