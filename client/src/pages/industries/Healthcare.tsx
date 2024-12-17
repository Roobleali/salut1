import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export function Healthcare() {
  const { t } = useTranslation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const FEATURES = [
    {
      title: t('industries.healthcare.features.patient.title'),
      description: t('industries.healthcare.features.patient.description'),
    },
    {
      title: t('industries.healthcare.features.inventory.title'),
      description: t('industries.healthcare.features.inventory.description'),
    },
    {
      title: t('industries.healthcare.features.billing.title'),
      description: t('industries.healthcare.features.billing.description'),
    },
    {
      title: t('industries.healthcare.features.telemedicine.title'),
      description: t('industries.healthcare.features.telemedicine.description'),
    },
    {
      title: t('industries.healthcare.features.compliance.title'),
      description: t('industries.healthcare.features.compliance.description'),
    },
    {
      title: t('industries.healthcare.features.analytics.title'),
      description: t('industries.healthcare.features.analytics.description'),
    },
  ];

  const ROMANIA_SPECIFIC = [
    t('industries.healthcare.romania_specific.features.regulations'),
    t('industries.healthcare.romania_specific.features.cnas'),
    t('industries.healthcare.romania_specific.features.prescription'),
    t('industries.healthcare.romania_specific.features.documentation'),
    t('industries.healthcare.romania_specific.features.network'),
    t('industries.healthcare.romania_specific.features.coding')
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
          <Badge className="mb-4">{t('industries.healthcare.badge')}</Badge>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('industries.healthcare.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('industries.healthcare.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
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
            {t('industries.healthcare.romania_specific.title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ROMANIA_SPECIFIC.map((feature) => (
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
