import { ServiceCard } from "@/components/sections/ServiceCard";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-gray-600">
            Explore our comprehensive suite of enterprise solutions designed to transform your business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
