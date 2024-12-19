import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { LanguageSelector } from "@/components/LanguageSelector";
import type { NavigationItem } from "@/types";

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: "Enterprise",
    items: [
      {
        title: "CRM",
        href: "/enterprise/crm",
        description: "Customer relationship management system",
      },
      {
        title: "Sales",
        href: "/enterprise/sales",
        description: "Sales management and forecasting",
      },
      {
        title: "Purchase",
        href: "/enterprise/purchase",
        description: "Procurement and vendor management",
      },
    ],
  },
  {
    title: "Industries",
    items: [
      {
        title: "Manufacturing",
        href: "/industries/manufacturing",
        description: "End-to-end manufacturing solutions",
      },
      {
        title: "Real Estate",
        href: "/industries/real-estate",
        description: "Property management systems",
      },
      
    ],
  },
];

function getIcon(title: string, section: string) {
  return (
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
      <svg
        className="w-5 h-5 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={
            section === "Enterprise"
              ? "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              : "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          }
        />
      </svg>
    </div>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-[100] border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative z-50">
          {/* Logo */}
          <Link href="/">
            <a className="font-bold text-2xl text-primary relative z-[101]">SalutTech</a>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-primary relative z-[101]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION_ITEMS.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link href={item.href}>
                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                  <div className="text-sm font-medium leading-none">
                                    {item.title}
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </a>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/services">
              <a className="text-sm font-medium hover:text-primary">Services</a>
            </Link>
            <Link href="/case-studies">
              <a className="text-sm font-medium hover:text-primary">Case Studies</a>
            </Link>
            <Link href="/about">
              <a className="text-sm font-medium hover:text-primary">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm font-medium hover:text-primary">Contact</a>
            </Link>

            <LanguageSelector />
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed bg-white inset-0 top-16 z-40 overflow-y-auto overscroll-contain transition-transform duration-300 ease-in-out shadow-xl",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ height: 'calc(100vh - 4rem)' }}
      >
        <div className="container mx-auto px-4 py-6 space-y-6">
          {NAVIGATION_ITEMS.map((section) => (
            <div key={section.title} className="pb-6 border-b">
              <h3 className="text-base font-semibold text-primary mb-4">
                {section.title}
              </h3>
              <ul className="grid gap-3">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href}>
                      <a
                        className="block p-3 rounded-lg hover:bg-primary/5 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          {getIcon(item.title, section.title)}
                          <div>
                            <span className="font-medium text-gray-900">{item.title}</span>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm p-4 border-t space-y-4">
            <LanguageSelector />
            <Link href="/contact">
              <a>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                  Contact Us
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}