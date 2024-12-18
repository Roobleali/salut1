import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import {
  Factory,
  Building2,
  Store,
  Briefcase,
  Hammer,
  UtensilsCrossed,
  Heart,
  GraduationCap
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ICONS = {
  Factory,
  Building2,
  Store,
  Briefcase,
  Hammer,
  UtensilsCrossed,
  Heart,
  GraduationCap
};

export function Navigation() {
  const { t } = useTranslation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger className={cn("flex items-center gap-2")}>
              {item.icon && ICONS[item.icon as keyof typeof ICONS] && (
                React.createElement(ICONS[item.icon as keyof typeof ICONS], {
                  className: "h-4 w-4"
                })
              )}
              <span>{t(`navigation.${item.title.toLowerCase()}`)}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                {item.items?.map((subItem) => (
                  <li key={subItem.title} className="row-span-3">
                    <Link href={subItem.href}>
                      <NavigationMenuLink asChild>
                        <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-start gap-3">
                            {subItem.icon && ICONS[subItem.icon as keyof typeof ICONS] && (
                              React.createElement(ICONS[subItem.icon as keyof typeof ICONS], {
                                className: "h-5 w-5 flex-shrink-0 text-primary"
                              })
                            )}
                            <div>
                              <div className="text-sm font-medium">
                                {t(`navigation.${subItem.title.toLowerCase()}`)}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {t(subItem.description)}
                              </p>
                            </div>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
