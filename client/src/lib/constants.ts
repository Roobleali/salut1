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
    title: "Gourmet Coffee's Journey to Modern Enterprise Solutions",
    industry: "Manufacturing & HORECA",
    challenge: "As Romania's pioneering coffee producer since 1996, Gourmet Coffee faced challenges with fragmented systems (Winmentor and SagaSoft), limiting their ability to efficiently manage production tracking, quality control, and market differentiation. They needed a solution that could handle their diverse operations while maintaining their commitment to premium quality.",
    solution: "Implemented a comprehensive enterprise solution that unified their production management, quality control, and distribution operations. The system was tailored to support their unique coffee blend customization process and streamline their private labeling capabilities.",
    results: [
      "Streamlined production tracking and quality control",
      "Enhanced coffee blend customization capabilities",
      "Improved inventory and distribution management",
      "Efficient private label management system",
      "Real-time production monitoring and analytics",
      "Seamless integration of all business operations"
    ],
    testimonial: {
      quote: "The transition from our legacy systems to SalutTech's solution has revolutionized how we manage our coffee production and distribution operations. As Romania's first company specialized in private labeling of coffee, we needed a system that could handle our unique requirements, and this solution has exceeded our expectations.",
      author: "Sherif Abdala",
      position: "CEO",
      company: "Gourmet Coffee"
    },
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747105/ttt1fmtpdnxfv3gagevm.png"
  },
  {
    id: "dolcenera-coffee",
    title: "Dolcenera Coffee Shops Digital Revolution",
    industry: "Manufacturing & HORECA",
    challenge: "Prior to the software implementation, Dolcenera coffee shops faced challenges with inefficient inventory management, slow service times, and difficulties in tracking customer preferences, impacting their ability to maintain competitive advantage in the market.",
    solution: "Implemented comprehensive software solution with POS system, inventory management, CRM tools, and analytics dashboard to streamline operations and enhance customer experience",
    results: [
      "30% reduction in order processing times",
      "40% increase in customer satisfaction",
      "25% reduction in inventory waste",
      "Enhanced customer data analytics",
      "Improved staff efficiency through training",
      "Real-time monitoring of operations"
    ],
    testimonial: {
      quote: "The software has revolutionized how we interact with customers. We've seen remarkable improvements in customer satisfaction and operational efficiency across all our locations.",
      author: "Operations Director",
      position: "Director of Operations",
      company: "Dolcenera Coffee Shops"
    },
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  },
  {
    id: "brec-real-estate",
    title: "Brec Business & Real Estate Consulting Digital Transformation",
    industry: "Real Estate",
    challenge: "As a growing real estate consulting firm in Bucharest, Brec faced challenges in managing increasing volumes of data and client interactions. They needed a unified platform to streamline their operations and improve client management.",
    solution: "Integrated a customized real estate software solution with comprehensive CRM, property management tools, and mobile accessibility for agents",
    results: [
      "40% reduction in property listing management time",
      "30% improvement in client satisfaction",
      "Enhanced data management efficiency",
      "Automated property listing updates",
      "Improved team collaboration",
      "Real-time market analytics access"
    ],
    testimonial: {
      quote: "The integrated software solution has revolutionized our real estate operations. The centralized platform has dramatically improved our efficiency and enabled us to better serve our growing client base in Bucharest.",
      author: "Grigore Anica",
      position: "CEO",
      company: "Brec Business & Real Estate Consulting SRL"
    },
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747070/jpoxov3qweqyokkfeyco.png"
  },
  
  {
    id: "codavinci-property",
    title: "Codavinci SRL Property Management Transformation",
    industry: "Real Estate",
    challenge: "The agency struggled with fragmented systems for utility tracking and payment collections, leading to inefficiencies, delayed payments, and communication issues with tenants.",
    solution: "Implemented a comprehensive property management software solution focused on automated utility tracking, payment collection, and tenant communication.",
    results: [
      "40% reduction in manual tracking time",
      "30% decrease in late payments",
      "Enhanced tenant satisfaction with portal access",
      "Real-time utility consumption monitoring",
      "Streamlined payment collection process",
      "Improved financial reporting accuracy"
    ],
    testimonial: {
      quote: "The property management software has revolutionized how we handle utility tracking and tenant communications. The automation features have significantly improved our operational efficiency and tenant satisfaction levels.",
      author: "Costel Ciobanu",
      position: "CEO",
      company: "Codavinci SRL"
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
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