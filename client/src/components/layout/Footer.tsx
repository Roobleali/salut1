import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">SalutTech</h3>
            <p className="text-gray-600 text-sm">
              Enterprise software solutions for modern businesses
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/services#horeca"><a className="text-gray-600 hover:text-primary">HORECA</a></Link></li>
              <li><Link href="/services#manufacturing"><a className="text-gray-600 hover:text-primary">Manufacturing</a></Link></li>
              <li><Link href="/services#pos"><a className="text-gray-600 hover:text-primary">Point of Sale</a></Link></li>
              <li><Link href="/services#real-estate"><a className="text-gray-600 hover:text-primary">Real Estate</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about"><a className="text-gray-600 hover:text-primary">About Us</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-600 hover:text-primary">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>info@saluttech.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} SalutTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
