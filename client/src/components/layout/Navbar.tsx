import { useState } from "react";
import { Link } from "wouter";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { Menu, X, Languages, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { currentLang, switchLanguage, t } = useTranslation();

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="font-bold text-2xl text-primary">SalutTech</a>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAVIGATION_ITEMS.map((section) => (
              <div key={section.title} className="relative group">
                <button className="py-2 text-gray-700 hover:text-primary">
                  {t(`nav.${section.title.toLowerCase()}`)}
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block">
                  <div className="py-2 mt-2 bg-white rounded-lg shadow-lg">
                    {section.items.map((item) => (
                      <Link key={item.title} href={item.href}>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {item.title}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop Language and Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => switchLanguage(currentLang === 'en' ? 'ro' : 'en')}
              className="w-10 h-10"
            >
              <Languages className="h-5 w-5" />
              <span className="sr-only">Switch Language</span>
            </Button>
            <Link href="/contact">
              <Button>{t('contact.sales')}</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 transform",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto">
          <nav className="py-4">
            {NAVIGATION_ITEMS.map((section) => (
              <div key={section.title} className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700"
                >
                  <span>{t(`nav.${section.title.toLowerCase()}`)}</span>
                  <ChevronRight 
                    className={cn(
                      "h-5 w-5 transition-transform",
                      expandedSection === section.title ? "rotate-90" : ""
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    expandedSection === section.title ? "max-h-96" : "max-h-0"
                  )}
                >
                  {section.items.map((item) => (
                    <Link 
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <a className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-50">
                        {item.title}
                        <p className="mt-1 text-xs text-gray-400">{item.description}</p>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Language Switcher */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white">
          <button
            className="flex items-center gap-3 w-full px-4 py-4 text-gray-700 hover:bg-gray-50"
            onClick={() => {
              switchLanguage(currentLang === 'en' ? 'ro' : 'en');
              setIsMobileMenuOpen(false);
            }}
          >
            <Languages className="h-5 w-5" />
            {currentLang === 'en' ? 'Switch to Romanian' : 'Comută la Engleză'}
          </button>
        </div>
      </div>
    </header>
  );
}
