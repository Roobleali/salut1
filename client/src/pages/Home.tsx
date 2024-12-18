import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      
      <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">
              <span className="curved-underline gradient-heading">
                Franchising HoReCa All-in-One
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose the future of business management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Traditional Software Card */}
            <div className="p-8 rounded-xl bg-white/80 backdrop-blur shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Traditional Software</h3>
              <div className="space-y-4">
                {[
                  "Do Nothing: Relying on outdated systems that hinder growth.",
                  "Limited Customization: One-size-fits-all solutions that don't cater to your unique needs.",
                  "Time-Consuming Processes: Manual tasks that waste valuable hours.",
                  "High Costs: Expensive licenses and hidden fees.",
                  "Stagnant Growth: Lack of innovative features to propel your business forward.",
                  "Lack of Support: Minimal access to expert guidance and mentorship.",
                  "Risk of Obsolescence: Falling behind competitors embracing modern technologies.",
                  "Complex Interfaces: Difficult to navigate, requiring extensive training.",
                  "Rigid Pricing: Inflexible pricing models that can strain your budget.",
                  "Outdated Technology: Technology that doesn't keep pace with industry advancements."
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI-Powered Solutions Card */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur shadow-xl">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Impress the Future with AI
              </h3>
              <div className="space-y-4">
                {[
                  "Increase Profits: Optimize operations to maximize your revenue potential.",
                  "Save Time: Streamline processes with automation, freeing up your schedule for strategic growth.",
                  "Eliminate Manual Tasks: Let AI handle routine activities, reducing errors and enhancing efficiency.",
                  "Cut Costs: Lower operational expenses with cost-effective solutions and transparent pricing.",
                  "Boost Productivity: Advanced tools designed to enhance your team's performance and output.",
                  "Enhance Customization: Tailor features to meet your franchise's specific needs and goals.",
                  "Seamless Integration: Easily incorporate our software with your existing systems for smooth transitions.",
                  "Scalable Solutions: Grow your business without worrying about software limitations.",
                  "Real-Time Analytics: Make informed decisions with up-to-the-minute data insights.",
                  "No Experience Needed: Designed for all skill levels with user-friendly interfaces."
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
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
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                {t('home.hero.why_choose')} <span className="curved-underline gradient-heading">SalutTech</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('home.hero.company_exp')}
                {' '}
                {t('home.hero.platform_evolves')}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {t('home.features.scalable.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('home.features.scalable.description')}
                </p>
              </div>
              <div className="p-8 rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {t('home.features.integration.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('home.features.integration.description')}
                </p>
              </div>
              <div className="p-8 rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {t('home.features.support.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('home.features.support.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
