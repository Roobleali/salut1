import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface GradientTheme {
  id: string;
  name: string;
  backgroundClass: string;
  textClass: string;
  description: string;
}

export const gradientPresets: GradientTheme[] = [
  {
    id: "professional",
    name: "Professional",
    backgroundClass: "bg-gradient-to-br from-background via-primary/5 to-background",
    textClass: "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
    description: "Clean and professional look with subtle gradients"
  },
  {
    id: "vibrant",
    name: "Vibrant",
    backgroundClass: "bg-gradient-to-tr from-primary/20 via-primary/5 to-primary/10",
    textClass: "bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent",
    description: "Bold and energetic gradients"
  },
  {
    id: "subtle",
    name: "Subtle",
    backgroundClass: "bg-gradient-to-b from-background via-primary/3 to-background",
    textClass: "bg-gradient-to-r from-primary/90 to-primary/80 bg-clip-text text-transparent",
    description: "Minimalistic gradient approach"
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGradientTheme(id: string): GradientTheme {
  return gradientPresets.find(theme => theme.id === id) || gradientPresets[0];
}

export function generateCustomGradient(
  startColor: string,
  endColor: string,
  direction: "to-r" | "to-br" | "to-tr" | "to-b" = "to-r"
): string {
  return `bg-gradient-${direction} from-[${startColor}] to-[${endColor}]`;
}
