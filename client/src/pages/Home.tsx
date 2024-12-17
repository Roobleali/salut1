import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SERVICES } from "@/lib/constants";

export function Home() {
  return (
    <>
      <Hero />
      
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Solutions</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive suite of enterprise solutions designed to help your business thrive in the digital age.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-b from-background via-primary/10 to-background py-24 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">SalutTech</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver enterprise-grade solutions that combine powerful functionality with modern flexibility. 
                Our platform grows and adapts with your business needs.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-white/80 backdrop-blur border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Scalable Solutions</h3>
                <p className="text-gray-600 leading-relaxed">Enterprise architecture that seamlessly adapts to your growing business requirements</p>
              </div>
              <div className="p-8 rounded-xl bg-white/80 backdrop-blur border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Seamless Integration</h3>
                <p className="text-gray-600 leading-relaxed">Perfect connectivity between all modules and third-party systems for unified operations</p>
              </div>
              <div className="p-8 rounded-xl bg-white/80 backdrop-blur border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">24/7 Expert Support</h3>
                <p className="text-gray-600 leading-relaxed">Dedicated team of specialists providing round-the-clock assistance for your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
