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
import { Users, ShoppingCart, Package, Boxes, Factory, Calculator, ClipboardList, UserPlus, Globe, ShoppingBag, Truck, Megaphone } from "lucide-react";

const getEnterpriseIcon = (title: string) => {
  const icons = {
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
  return icons[title as keyof typeof icons] || null;
};

export function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="font-bold text-2xl text-primary">SalutTech</a>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuItem key={item.title} className={`nav-${item.title.toLowerCase()}`}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className={cn(
                      "grid gap-3 p-6 w-[400px]",
                      item.title === "Enterprise" && "w-[500px] grid-cols-2"
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
                                  {item.title === "Enterprise" && getEnterpriseIcon(subItem.title)}
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

          <Link href="/contact">
            <a className="contact-sales inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Contact Sales
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}