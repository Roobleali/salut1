import { motion } from "framer-motion";
import { GradientCustomizer } from "@/components/GradientCustomizer";
import { useTranslation } from "react-i18next";

export function GradientCustomizerPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('gradients.customizer.page_title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            {t('gradients.customizer.page_description')}
          </p>

          <GradientCustomizer />
        </div>
      </div>
    </motion.div>
  );
}
