import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-transparent pt-32 pb-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl -z-10"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight relative">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent relative inline-block">
                Enterprise Software Solutions
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/70"></span>
              </span>
              <span className="block mt-2 bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">
                for Digital Transformation
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/90 to-primary/60"></span>
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 relative inline-block max-w-xl">
              Transform your business with our comprehensive suite of integrated enterprise solutions. From implementation to customization and support, we deliver tailored software that drives growth and efficiency across industries.
              <svg className="absolute -bottom-2 left-0 w-full hidden sm:block" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M 0,2 Q 50,4 100,2" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary/40" />
              </svg>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Get Started
              </Button>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto hover:bg-primary/5 transition-colors duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl -z-10"></div>
            <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl shadow-2xl p-2 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                alt="Enterprise Software"
                className="rounded-xl shadow-inner relative z-10"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-transparent opacity-30 blur-2xl -z-20"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.1)_1px,transparent_1px)] bg-[size:24px_24px] opacity-5"></div>
    </div>
  );
}
