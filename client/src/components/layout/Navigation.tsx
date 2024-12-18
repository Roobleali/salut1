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
  GraduationCap,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
  GraduationCap,
};

export function Navigation() {
  const { t } = useTranslation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger className={cn("flex items-center gap-2")}>
              {item.icon &&
                ICONS[item.icon as keyof typeof ICONS] &&
                React.createElement(ICONS[item.icon as keyof typeof ICONS], {
                  className: "h-4 w-4",
                })}
              <span>{t(`navigation.${item.title.toLowerCase()}`)}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-4 p-4 w-[600px]">
                {item.items?.map((subItem) => (
                  <Link key={subItem.title} href={subItem.href}>
                    <NavigationMenuLink asChild>
                      <a className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-start gap-3">
                          {subItem.icon && ICONS[subItem.icon as keyof typeof ICONS] && (
                            React.createElement(ICONS[subItem.icon as keyof typeof ICONS], {
                              className: "h-5 w-5 flex-shrink-0 text-primary"
                            })
                          )}
                          <div>
                            <div className="text-sm font-medium">
                              {t(`menu.${subItem.title.toLowerCase()}`)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t(`menu.${subItem.title.toLowerCase()}_desc`)}
                            </p>
                          </div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}