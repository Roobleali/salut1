import { Button } from "@/components/ui/button";
import { LearnAnimation } from "@/components/LearnAnimation";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-32 pb-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0 animate-fade-in">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 pt-12 lg:pt-16 relative">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <div className="space-y-8 animate-fade-in text-center">
            <div className="space-y-10">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight animate-slide-in mb-8">
                <span className="block mb-4">
                  Cloud Based ERP for
                  <span className="relative ml-2">
                    SME's
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
                  !
                </span>
                <span className="block mt-2 text-primary">
                  Xal u hel dhibaatooyinka si waxtar leh
                </span>
              </h1>
              <div className="flex justify-center gap-4 animate-fade-in">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate("/services")}
                >
                 Learn more
                </Button>
              </div>
              <div className="container max-w-4xl mx-auto px-4">
                <LearnAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
