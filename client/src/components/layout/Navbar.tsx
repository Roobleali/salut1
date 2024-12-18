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
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Users, ShoppingCart, Package, Boxes, Factory, Calculator, ClipboardList, UserPlus, Globe, ShoppingBag, Truck, Megaphone, Building2, Briefcase, Hammer, UtensilsCrossed, Stethoscope, GraduationCap, Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaFlag, FaFlagUsa } from "react-icons/fa"; // Added import for flag icons

type IconMapping = {
  [key: string]: JSX.Element;
};

type IconSections = {
  Industries: IconMapping;
  Modules: IconMapping;
  Resources?: IconMapping;
};

const icons: IconSections = {
  Industries: {
    "Manufacturing": <Factory className="w-4 h-4" aria-hidden="true" />,
    "Real Estate": <Building2 className="w-4 h-4" aria-hidden="true" />,
    "Retail & E-commerce": <ShoppingBag className="w-4 h-4" aria-hidden="true" />,
    "Professional Services": <Briefcase className="w-4 h-4" aria-hidden="true" />,
    "Construction": <Hammer className="w-4 h-4" aria-hidden="true" />,
    "Hospitality": <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />,
    "Healthcare": <Stethoscope className="w-4 h-4" aria-hidden="true" />,
    "Education": <GraduationCap className="w-4 h-4" aria-hidden="true" />
  },
  Modules: {
    "CRM": <Users className="w-4 h-4" aria-hidden="true" />,
    "Sales": <ShoppingCart className="w-4 h-4" aria-hidden="true" />,
    "Purchase": <Package className="w-4 h-4" aria-hidden="true" />,
    "Inventory": <Boxes className="w-4 h-4" aria-hidden="true" />,
    "Manufacturing": <Factory className="w-4 h-4" aria-hidden="true" />,
    "Accounting": <Calculator className="w-4 h-4" aria-hidden="true" />,
    "Project Management": <ClipboardList className="w-4 h-4" aria-hidden="true" />,
    "HR & Recruitment": <UserPlus className="w-4 h-4" aria-hidden="true" />,
    "Website & E-commerce": <Globe className="w-4 h-4" aria-hidden="true" />,
    "Point of Sale": <ShoppingBag className="w-4 h-4" aria-hidden="true" />,
    "Field Service": <Truck className="w-4 h-4" aria-hidden="true" />,
    "Marketing Automation": <Megaphone className="w-4 h-4" aria-hidden="true" />
  }
};

const getIcon = (title: string, section: string): JSX.Element | null => {
  return icons[section as keyof IconSections]?.[title] || null;
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t } = useTranslation();

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
                  <NavigationMenuItem key={item.title} className={`nav-${item.title.toLowerCase()}`}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className={cn(
                        "grid gap-3 p-6",
                        item.title === "Industries" || item.title === "Modules" ? "w-[600px] grid-cols-2" : 
                        "w-[400px]"
                      )}>
                      {item.items.map((subItem) => (
                        <li key={subItem.title} className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link href={subItem.href}>
                              <a className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200",
                                "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5",
                                "focus:bg-gradient-to-r focus:from-primary/20 focus:to-primary/10"
                              )}>
                                <div className="flex items-center gap-2 text-sm font-medium leading-none mb-2">
                                  {getIcon(subItem.title, item.title)}
                                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                    {subItem.title}
                                  </span>
                                </div>
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

          {/* Mobile Navigation */}
          <div className={cn(
            "lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-50 transform transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}>
            <div className="container h-full mx-auto px-4 py-6 overflow-y-auto">
              <div className="space-y-6">
                {NAVIGATION_ITEMS.map((section) => (
                  <div key={section.title} className="pb-6 border-b border-border/50">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">{section.title}</h3>
                    <ul className="grid gap-3">
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <Link href={item.href}>
                            <a 
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors" 
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {getIcon(item.title, section.title)}
                              <div>
                                <span className="font-medium">{item.title}</span>
                                <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                              </div>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="sticky bottom-0 pt-6 mt-6 border-t border-border/50">
                <div className="flex flex-col gap-3">
                  {/* Language Selector for Mobile - temporarily hidden */}
                  {/* <div className="mb-4">
                    <LanguageSelector />
                  </div> */}
                  
                  <Link href="/contact">
                    <a onClick={() => setIsMobileMenuOpen(false)}>
                      <Button size="lg" className="w-full">
                        {t('contact.sales')}
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language selector temporarily hidden */}
            {/* <LanguageSelector /> */}
            <Link href="/contact">
              <a className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                {t('contact.sales')}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}