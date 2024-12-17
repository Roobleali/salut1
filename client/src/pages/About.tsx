import { TeamSpotlight } from "@/components/sections/TeamSpotlight";
import { TEAM_MEMBERS } from "@/lib/constants";

export function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About SalutTech</h1>
          
          <img
            src="https://images.unsplash.com/photo-1495521939206-a217db9df264"
            alt="SalutTech Office"
            className="rounded-lg mb-8"
          />
          
          <div className="prose max-w-none">
            <p>
              SalutTech is a leading provider of enterprise software solutions, specializing in comprehensive business management systems that help organizations streamline their operations and achieve their full potential.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We are committed to delivering innovative, scalable, and integrated software solutions that empower businesses to thrive in an increasingly digital world. Our focus is on providing enterprise-grade technology that is both powerful and user-friendly.
            </p>
            
            <h2>Our Expertise</h2>
            <p>
              With years of experience in enterprise software development, our team brings deep industry knowledge and technical expertise to every project. We specialize in:
            </p>
            <ul>
              <li>HORECA Management Systems</li>
              <li>Manufacturing Solutions</li>
              <li>Point of Sale Systems</li>
              <li>Real Estate Management Software</li>
            </ul>
            
            <h2>Our Values</h2>
            <ul>
              <li><strong>Innovation:</strong> Constantly evolving our solutions to meet changing business needs</li>
              <li><strong>Quality:</strong> Maintaining the highest standards in software development</li>
              <li><strong>Customer Success:</strong> Dedicated to helping our clients achieve their goals</li>
              <li><strong>Integrity:</strong> Operating with transparency and ethical business practices</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Leadership Team</h2>
          <TeamSpotlight members={TEAM_MEMBERS} />
        </div>
      </div>
    </div>
  );
}
