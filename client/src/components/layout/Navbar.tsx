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
import { Users, ShoppingCart, Package, Boxes, Factory, Calculator, ClipboardList, UserPlus, Globe, ShoppingBag, Truck, Megaphone, Building2, Briefcase, Hammer, UtensilsCrossed, Stethoscope, GraduationCap, Menu, X } from "lucide-react";
import React from "react";

const getIcon = (title: string, section: string) => {
  if (section === "Industries") {
    const industryIcons = {
      "Manufacturing": <Factory className="w-4 h-4" />,
      "Real Estate": <Building2 className="w-4 h-4" />,
      "Retail & E-commerce": <ShoppingBag className="w-4 h-4" />,
      "Professional Services": <Briefcase className="w-4 h-4" />,
      "Construction": <Hammer className="w-4 h-4" />,
      "Hospitality": <UtensilsCrossed className="w-4 h-4" />,
      "Healthcare": <Stethoscope className="w-4 h-4" />,
      "Education": <GraduationCap className="w-4 h-4" />
    };
    return industryIcons[title as keyof typeof industryIcons] || null;
  } else if (section === "Enterprise") {
    const enterpriseIcons = {
      "CRM": <Users className="w-4 h-4" />,
      "Sales": <ShoppingCart className="w-4 h-4" />,
      "Purchase": <Package className="w-4 h-4" />,
      "Inventory": <Boxes className="w-4 h-4" />,
      "Manufacturing": <Factory className="w-4 h-4" />,
      "Accounting": <Calculator className="w-4 h-4" />,
      "Project Management": <ClipboardList className="w-4 h-4" />,
      "HR & Recruitment": <UserPlus className="w-4 h-4" />,
      "Website & E-commerce": <Globe className="w-4 h-4" />,
      "Point of Sale": <ShoppingBag className="w-4 h-4" />,
      "Field Service": <Truck className="w-4 h-4" />,
      "Marketing Automation": <Megaphone className="w-4 h-4" />
    };
    return enterpriseIcons[title as keyof typeof enterpriseIcons] || null;
  }
  return null;
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
            "lg:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur border-b shadow-lg transition-transform duration-200 ease-in-out transform",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}>
            <div className="container mx-auto px-4 py-4">
              {NAVIGATION_ITEMS.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{section.title}</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link href={item.href}>
                          <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
                            {getIcon(item.title, section.title)}
                            <span>{item.title}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-4">
                <Link href="/contact">
                  <a className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10"
                     onClick={() => setIsMobileMenuOpen(false)}>
                    Contact Sales
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Contact Button */}
          <Link href="/contact">
            <a className="hidden lg:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Contact Sales
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}