import { type NavigationItem } from "@/types";

import { 
  Factory, 
  Building2, 
  ShoppingBag, 
  Briefcase, 
  HardHat, 
  UtensilsCrossed, 
  Stethoscope,
  GraduationCap 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  items: {
    title: string;
    href: string;
    description: string;
    icon?: LucideIcon;
  }[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: "Industries",
    items: [
      {
        title: "Manufacturing",
        href: "/industries/manufacturing",
        description: "End-to-end manufacturing management with MRP, production planning and quality control",
        icon: Factory,
      },
      {
        title: "Real Estate",
        href: "/industries/real-estate",
        description: "Complete property management solution for leasing, maintenance, and tenant portals",
        icon: Building2,
      },
      {
        title: "Retail & E-commerce",
        href: "/industries/retail",
        description: "Integrated POS, inventory and e-commerce solutions for modern retail",
        icon: ShoppingBag,
      },
      {
        title: "Professional Services",
        href: "/industries/services",
        description: "Project management and service tracking for consulting firms",
        icon: Briefcase,
      },
      {
        title: "Construction",
        href: "/industries/construction",
        description: "Project cost estimation, material tracking and regulatory compliance",
        icon: HardHat,
      },
      {
        title: "Hospitality",
        href: "/industries/hospitality",
        description: "Reservation systems and guest experience management solutions",
        icon: UtensilsCrossed,
      },
      {
        title: "Healthcare",
        href: "/industries/healthcare",
        description: "Patient management and medical inventory tracking systems",
        icon: Stethoscope,
      },
      {
        title: "Education",
        href: "/industries/education",
        description: "Student information and educational resource management",
        icon: GraduationCap,
      }
    ]
  },
  {
    title: "Modules",
    items: [
      {
        title: "CRM",
        href: "/enterprise/crm",
        description: "Complete customer relationship management system",
      },
      {
        title: "Sales",
        href: "/enterprise/sales",
        description: "Sales pipeline and forecasting tools",
      },
      {
        title: "Purchase",
        href: "/enterprise/purchase",
        description: "Procurement and vendor management",
      },
      {
        title: "Inventory",
        href: "/enterprise/inventory",
        description: "Real-time inventory tracking system",
      },
      {
        title: "Manufacturing",
        href: "/enterprise/manufacturing",
        description: "End-to-end manufacturing management",
      },
      {
        title: "Accounting",
        href: "/enterprise/accounting",
        description: "Financial management and reporting",
      },
      {
        title: "Project Management",
        href: "/enterprise/project-management",
        description: "Project planning and resource allocation",
      },
      {
        title: "HR & Recruitment",
        href: "/enterprise/hr",
        description: "Complete HR management system",
      },
      {
        title: "Website & E-commerce",
        href: "/enterprise/ecommerce",
        description: "Online store and website builder",
      },
      {
        title: "Point of Sale",
        href: "/enterprise/pos",
        description: "Modern POS system for retail",
      },
      {
        title: "Field Service",
        href: "/enterprise/field-service",
        description: "Mobile workforce management",
      },
      {
        title: "Marketing Automation",
        href: "/enterprise/marketing",
        description: "Automated marketing campaigns",
      }
    ]
  },
  {
    title: "Resources",
    items: [
      {
        title: "About Us",
        href: "/about",
        description: "Learn more about our company and mission",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        description: "Success stories from our clients",
      }
    ]
  }
];

export const COMPANY_MILESTONES = [
  {
    id: "founding",
    year: "2023",
    month: "November",
    title: "Company Founded",
    description: "SalutTech was founded with our first manufacturing industry client.",
    category: "launch" as const,
  },
  {
    id: "expansion",
    year: "2024",
    month: "January",
    title: "Market Expansion",
    description: "Successfully helped 16 companies in the real-estate industry and partnered with local resellers.",
    category: "growth" as const,
  },
  {
    id: "team-growth",
    year: "2024",
    month: "March",
    title: "Team Growth",
    description: "Expanded our team with talented sales professionals and developers to build a greater future together.",
    category: "team" as const,
  }
];

export const SERVICES = [
  {
    id: "horeca",
    title: "HORECA Solutions",
    description: "Complete management solutions for hotels, restaurants, and catering businesses with integrated modules for seamless operations",
    image: "https://images.unsplash.com/photo-1556742504-16b083241fab",
    features: [
      "Integrated Reservation System",
      "Real-time Kitchen Display System",
      "Smart Inventory Management",
      "Staff Scheduling & Management",
      "Customer Relationship Management",
      "Financial Analytics & Reporting"
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing Software",
    description: "Enterprise-grade manufacturing solution with advanced production planning and real-time monitoring capabilities",
    image: "https://images.unsplash.com/photo-1580983230712-f7d0f878bcc4",
    features: [
      "Advanced Production Planning",
      "Quality Control & Assurance",
      "Supply Chain Optimization",
      "Cost & Resource Tracking",
      "Maintenance Management",
      "Compliance & Documentation"
    ]
  },
  {
    id: "pos",
    title: "Point of Sale",
    description: "Comprehensive POS system with advanced features for retail and hospitality businesses, seamlessly integrated with back-office operations",
    image: "https://images.unsplash.com/photo-1556742504-16b083241fab",
    features: [
      "Real-time Sales Analytics",
      "Multi-store Inventory Control",
      "Customer Loyalty Program",
      "Advanced Payment Integration",
      "Mobile POS Capabilities",
      "Offline Mode Support"
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate Management",
    description: "Complete property management solution with powerful tools for real estate professionals and property managers",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    features: [
      "Advanced Property Listings",
      "Tenant & Lease Management",
      "Maintenance Request System",
      "Financial & Portfolio Analysis",
      "Document Management",
      "Property Inspection Tools"
    ]
  }
];

export const VIDEO_TESTIMONIALS = [
  {
    id: "gourmet-coffee-testimonial",
    title: "From Legacy Systems to Modern Enterprise Solution",
    clientName: "Sherif Abdala",
    position: "CEO",
    company: "Gourmet Coffee",
    videoUrl: "https://res.cloudinary.com/do3dahfvh/video/upload/f_auto:video,q_auto/m59amoxkynlzn8jy7ows",
    thumbnail: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747105/ttt1fmtpdnxfv3gagevm.png"
  },
  {
    id: "manufacturing-testimonial",
    title: "Smart Factory Success Story",
    clientName: "Sarah Johnson",
    position: "Plant Manager",
    company: "TechManufacturing Inc.",
    videoUrl: "https://example.com/testimonials/techmanufacturing.mp4",
    thumbnail: "https://images.unsplash.com/photo-1565785755661-61aa53ca37c7"
  },
  {
    id: "retail-testimonial",
    title: "Multi-store Retail Transformation",
    clientName: "Michael Chen",
    position: "Retail Director",
    company: "StyleMart",
    videoUrl: "https://example.com/testimonials/stylemart.mp4",
    thumbnail: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62"
  }
];

export const CASE_STUDIES = [
  {
    id: "gourmet-coffee",
    title: "Gourmet Coffee's Digital Transformation Journey",
    industry: "Manufacturing & HORECA",
    challenge: "Struggling with fragmented systems including Winmentor and SagaSoft, facing issues with tracking, manufacturing control, and reporting capabilities",
    solution: "Implemented comprehensive enterprise solution with integrated manufacturing and business management capabilities",
    results: [
      "Streamlined production tracking and control",
      "Unified system replacing multiple legacy software",
      "Enhanced reporting and analytics capabilities",
      "Improved inventory management efficiency",
      "Real-time production monitoring"
    ],
    testimonial: {
      quote: "The transition from our legacy systems to SalutTech's solution has revolutionized how we manage our coffee production and distribution operations. The integrated platform has given us the control and visibility we needed.",
      author: "Sherif Abdala",
      position: "CEO",
      company: "Gourmet Coffee"
    },
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747105/ttt1fmtpdnxfv3gagevm.png",
    videoUrl: "https://res.cloudinary.com/do3dahfvh/video/upload/f_auto:video,q_auto/m59amoxkynlzn8jy7ows"
  },
  {
    id: "property-management",
    title: "Real Estate Agency Revolutionizes Property Management",
    industry: "Real Estate",
    challenge: "Manual utility tracking and payment collections led to errors and inefficiencies. Multiple disconnected systems caused delays in payment processing and poor tenant communication.",
    solution: "Implemented an integrated property management solution with automated utility tracking, payment processing, and tenant communication features",
    results: [
      "40% reduction in manual tracking time",
      "30% decrease in late payments",
      "Improved tenant satisfaction through portal access",
      "Enhanced utility consumption monitoring",
      "Streamlined payment collection process"
    ],
    testimonial: {
      quote: "The property management software has transformed our operations. We've significantly improved efficiency and tenant satisfaction while reducing manual work.",
      author: "Maria Popescu",
      position: "Property Manager",
      company: "Real Estate Agency"
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    videoUrl: "https://example.com/testimonials/property-management.mp4"
  },
  {
    id: "manufacturing-automation",
    title: "Smart Factory Implementation",
    industry: "Manufacturing",
    challenge: "Manual production tracking leading to inefficiencies",
    solution: "Deployed end-to-end manufacturing automation system",
    results: [
      "40% improvement in production efficiency",
      "Real-time inventory tracking",
      "Reduced production errors by 60%"
    ],
    testimonial: {
      quote: "The manufacturing software from SalutTech has revolutionized our production process. We've seen tremendous improvements in efficiency and quality control.",
      author: "Sarah Johnson",
      position: "Plant Manager",
      company: "TechManufacturing Inc."
    },
    image: "https://images.unsplash.com/photo-1565785755661-61aa53ca37c7"
  },
  {
    id: "retail-pos",
    title: "Multi-store Retail Solution",
    industry: "Point of Sale",
    challenge: "Disconnected POS systems across multiple locations",
    solution: "Unified POS system with central management",
    results: [
      "50% faster checkout times",
      "Integrated inventory across all stores",
      "15% increase in sales through better analytics"
    ],
    testimonial: {
      quote: "The POS system has made managing our retail chain so much easier. The real-time analytics have been invaluable for our business decisions.",
      author: "Michael Chen",
      position: "Retail Director",
      company: "StyleMart"
    },
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62"
  }
];

export const TEAM_MEMBERS = [
  {
    id: "ceo",
    name: "Shakuur Ally",
    role: "CEO & Founder",
    bio: "Extensive experience across multiple software industries, bringing innovative solutions to enterprise challenges.",
    expertise: ["Strategic Planning", "Digital Transformation", "Enterprise Solutions"],
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1697357976/lx7l2p8rpywnz5jfn5oa.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/rooblecali/"
    }
  },
  {
    id: "sales-director",
    name: "Sherif Abdala",
    role: "Sales Director",
    bio: "Leading our sales initiatives and client relationships to drive growth and success.",
    expertise: ["Sales Strategy", "Client Relations", "Business Development"],
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747105/ttt1fmtpdnxfv3gagevm.png",
    social: {
      linkedin: "https://www.linkedin.com/in/sherif-abdala-03640932/"
    }
  }
];

// Removed duplicate COMPANY_MILESTONES declaration