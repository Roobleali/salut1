import { LearnAnimation } from "@/components/LearnAnimation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background overflow-hidden min-h-screen">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 pt-32 lg:pt-40 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl lg:text-6xl font-bold tracking-tight mb-8"
            >
              <span className="block mb-4">
                {t("home.hero.title")}{" "}
                <span className="relative">
                  {t("home.hero.transform")}
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q50,9 100,5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-primary"
                    />
                  </svg>
                </span>
              </span>
              <span className="block mt-2 text-primary">
                {t("home.hero.subtitle")}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {t("home.hero.unlock_growth")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Link href="/welcome">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("common.get_started")}
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("home.hero.learn_more")}
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="container max-w-4xl mx-auto px-4 mt-12"
            >
              <LearnAnimation />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
