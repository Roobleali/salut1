import { Link } from "wouter";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Enterprise Software Solutions for Digital Transformation
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Transform your business with our comprehensive suite of integrated
              enterprise solutions. From implementation to customization and
              support, we deliver tailored software that drives growth and
              efficiency across industries.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/contact">
                <a className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                  Get Started
                </a>
              </Link>
              <Link href="/services">
                <a className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                  Learn More
                </a>
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
