import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />

        <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl mb-4">
                <span className="curved-underline gradient-heading">
                  {t("home.hero.transform")}
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t("home.hero.unlock_growth")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES?.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-tr from-primary/5 via-background to-primary/10 py-24 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6">
                  {t("home.hero.why_choose")}{" "}
                  <span className="curved-underline gradient-heading">
                    {t("common.company_name")}
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {t("home.hero.company_exp")} {t("home.hero.platform_evolves")}
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    ),
                    title: "home.features.scalable.title",
                    description: "home.features.scalable.description"
                  },
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    ),
                    title: "home.features.integration.title",
                    description: "home.features.integration.description"
                  },
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    ),
                    title: "home.features.support.title",
                    description: "home.features.support.description"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-8 rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <svg
                        className="w-7 h-7 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {feature.icon}
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {t(feature.title)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(feature.description)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
