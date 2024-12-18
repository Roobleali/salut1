import { TeamSpotlight } from "@/components/sections/TeamSpotlight";
import { Timeline } from "@/components/sections/Timeline";
import { TEAM_MEMBERS, COMPANY_MILESTONES } from "@/lib/constants";

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                About SalutTech
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                SalutTech is a leading provider of enterprise software solutions, specializing in comprehensive business management systems that help organizations streamline their operations and achieve their full potential.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1495521939206-a217db9df264"
                alt="SalutTech Office"
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-tr from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are committed to delivering innovative, scalable, and integrated software solutions that empower businesses to thrive in an increasingly digital world. Our focus is on providing enterprise-grade technology that is both powerful and user-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold mb-3">HORECA Management Systems</h3>
              <p className="text-gray-600">Complete solutions for hotels, restaurants, and catering businesses</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold mb-3">Manufacturing Solutions</h3>
              <p className="text-gray-600">End-to-end manufacturing management and optimization</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold mb-3">Point of Sale Systems</h3>
              <p className="text-gray-600">Modern POS solutions for retail and hospitality</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold mb-3">Real Estate Management</h3>
              <p className="text-gray-600">Comprehensive property management solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Constantly evolving our solutions to meet changing business needs</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Maintaining the highest standards in software development</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer Success</h3>
              <p className="text-gray-600">Dedicated to helping our clients achieve their goals</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">Operating with transparency and ethical business practices</p>
            </div>
          </div>
        </div>
      </section>

        <div className="max-w-7xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="mt-12">
            <Timeline milestones={COMPANY_MILESTONES} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Leadership Team</h2>
          <TeamSpotlight members={TEAM_MEMBERS} />
        </div>
    </div>
  );
}
