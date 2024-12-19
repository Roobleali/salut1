import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight relative">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent relative">
                Enterprise Software Solutions for Digital Transformation
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/70"></span>
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 relative inline-block">
              Transform your business with our comprehensive suite of integrated enterprise solutions. From implementation to customization and support, we deliver tailored software that drives growth and efficiency across industries.
              <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M 0,2 Q 50,4 100,2" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary/40" />
              </svg>
            </p>
            <div className="mt-8 flex gap-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              >
                Get Started
              </Button>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
              alt="Enterprise Software"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
