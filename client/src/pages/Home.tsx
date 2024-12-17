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
      
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose SalutTech?</h2>
            <p className="text-gray-600 mb-12">
              We provide enterprise-grade solutions with the flexibility and innovation of modern technology. Our solutions are designed to scale with your business.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Scalable</h3>
                <p className="text-sm text-gray-600">Grows with your business needs</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Integrated</h3>
                <p className="text-sm text-gray-600">Seamless connectivity across modules</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Supported</h3>
                <p className="text-sm text-gray-600">24/7 expert assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
