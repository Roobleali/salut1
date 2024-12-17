export interface NavigationItem {
  title: string;
  items: {
    title: string;
    href: string;
    description: string;
  }[];
}
