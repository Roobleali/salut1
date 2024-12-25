import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const FEATURES = [
  {
    title: "Student Information System",
    description: "Comprehensive student data management with academic records, attendance tracking, and performance analytics.",
  },
  {
    title: "Learning Management",
    description: "Integrated platform for course delivery, assignment management, and student engagement tracking.",
  },
  {
    title: "Administrative Tools",
    description: "Streamline administrative tasks with automated scheduling, resource allocation, and document management.",
  },
  {
    title: "Communication Platform",
    description: "Enhanced collaboration between students, teachers, and parents with integrated messaging and notifications.",
  },
  {
    title: "Assessment Management",
    description: "Digital assessment tools with automated grading, progress tracking, and performance analytics.",
  },
  {
    title: "Resource Management",
    description: "Efficient management of educational resources, facilities, and equipment scheduling.",
  },
];

const BENEFITS = [
  "Improve administrative efficiency by 40%",
  "Enhance student engagement and performance",
  "Streamline communication processes",
  "Real-time progress monitoring",
  "Reduce operational costs",
  "Better resource utilization"
];

export function Education() {
  const { t } = useTranslation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('industries.education.title')} | SalutTech</title>
        <meta name="description" content={t('industries.education.description')} />
        <meta name="keywords" content="education software, student information system, learning management system, school administration, educational technology, academic management" />
        <meta property="og:title" content={`${t('industries.education.title')} | SalutTech`} />
        <meta property="og:description" content={t('industries.education.description')} />
        <link rel="canonical" href="https://saluttech.ro/industries/education" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-32 pb-24"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">{t('industries.education.title')}</Badge>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {t('industries.education.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('industries.education.description')}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                  {t('common.schedule_demo')} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  {t('common.contact_sales')}
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
            <h2 className="text-3xl font-bold text-center mb-12">{t('common.benefits')}</h2>
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