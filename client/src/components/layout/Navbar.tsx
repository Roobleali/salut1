import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "wouter";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { currentLang, switchLanguage, t } = useTranslation();

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
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION_ITEMS.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{t(`nav.${item.title.toLowerCase()}`)}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 w-[400px]">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link href={subItem.href}>
                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
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
          </div>

          {/* Mobile Navigation Dropdown */}
          <div
            className={cn(
              "lg:hidden absolute top-16 right-0 w-64 bg-white shadow-lg rounded-lg mt-2 overflow-hidden transition-all duration-200 ease-in-out origin-top-right",
              isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            {NAVIGATION_ITEMS.map((section) => (
              <div key={section.title} className="py-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500">
                  {t(`nav.${section.title.toLowerCase()}`)}
                </div>
                {section.items.map((item) => (
                  <Link key={item.title} href={item.href}>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </a>
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-gray-200 mt-2">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  switchLanguage(currentLang === 'en' ? 'ro' : 'en');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Languages className="h-4 w-4" />
                {currentLang === 'en' ? 'Switch to Romanian' : 'Comută la Engleză'}
              </button>
            </div>
          </div>

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
    </header>
  );
}