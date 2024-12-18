import { type NavigationItem } from "@/types";

export const NAVIGATION_ITEMS = [
  {
    title: "Industries",
    icon: "Factory",
    items: [
      {
        title: "Manufacturing",
        icon: "Factory",
        href: "/industries/manufacturing",
        description: "End-to-end manufacturing solutions with MRP and quality control",
      },
      {
        title: "Real Estate",
        icon: "Building2",
        href: "/industries/real-estate",
        description: "Complete property management and real estate solutions",
      },
      {
        title: "Retail & E-commerce",
        icon: "Store",
        href: "/industries/retail",
        description: "Unified retail management across online and physical stores",
      },
      {
        title: "Professional Services",
        icon: "Briefcase",
        href: "/industries/services",
        description: "Project management and service delivery solutions",
      },
      {
        title: "Construction",
        icon: "Hammer",
        href: "/industries/construction",
        description: "Construction project and resource management tools",
      },
      {
        title: "Hospitality",
        icon: "UtensilsCrossed",
        href: "/industries/hospitality",
        description: "Hotel and restaurant management solutions",
      },
      {
        title: "Healthcare",
        icon: "Heart",
        href: "/industries/healthcare",
        description: "Healthcare facility and patient management systems",
      },
      {
        title: "Education",
        icon: "GraduationCap",
        href: "/industries/education",
        description: "Educational institution management platform",
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
      },
      {
        title: "Social Responsibility",
        href: "/social-responsibility",
        description: "Our commitment to sustainable and ethical practices",
        icon: "Heart"
      }
    ]
  }
];

export const COMPANY_MILESTONES = [
  {
    id: "founding",
    year: "2018",
    title: "Company Founded",
    description: "SalutTech was founded with a vision to transform enterprise software solutions.",
    category: "launch" as const,
  },
  {
    id: "first-client",
    year: "2019",
    title: "First Enterprise Client",
    description: "Successfully implemented our solution for a major HORECA chain.",
    category: "achievement" as const,
  },
  {
    id: "team-expansion",
    year: "2020",
    title: "Team Growth",
    description: "Expanded our team to 50+ professionals across development and consulting.",
    category: "team" as const,
  },
  {
    id: "international",
    year: "2021",
    title: "International Expansion",
    description: "Opened offices in three new countries to serve our growing client base.",
    category: "office" as const,
  },
  {
    id: "award",
    year: "2022",
    title: "Industry Recognition",
    description: "Received 'Best Enterprise Solution Provider' award.",
    category: "achievement" as const,
  },
  {
    id: "growth-milestone",
    year: "2023",
    title: "Major Growth Milestone",
    description: "Reached 1000+ enterprise clients across multiple industries.",
    category: "growth" as const,
  }
];

export const SERVICES = [
  {
    id: "manufacturing",
    title: "services.manufacturing.title",
    description: "services.manufacturing.description",
    image: "https://images.unsplash.com/photo-1580983230712-f7d0f878bcc4",
    features: [
      "services.manufacturing.features.planning",
      "services.manufacturing.features.quality",
      "services.manufacturing.features.supply",
      "services.manufacturing.features.cost",
      "services.manufacturing.features.maintenance",
      "services.manufacturing.features.compliance"
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
    id: "horeca-testimonial",
    title: "Revolutionizing Restaurant Management",
    clientName: "John Smith",
    position: "Operations Director",
    company: "FoodChain Co.",
    videoUrl: "https://example.com/testimonials/foodchain.mp4",
    thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9"
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
    id: "restaurant-chain",
    title: "National Restaurant Chain Transformation",
    industry: "HORECA",
    challenge: "Managing 50+ locations with outdated systems",
    solution: "Implemented integrated HORECA management system",
    results: [
      "30% reduction in inventory waste",
      "25% increase in customer satisfaction",
      "Streamlined operations across all locations"
    ],
    testimonial: {
      quote: "SalutTech's solution transformed how we manage our restaurant chain. The system is intuitive and has significantly improved our efficiency.",
      author: "John Smith",
      position: "Operations Director",
      company: "FoodChain Co."
    },
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9"
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
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "20+ years of experience in enterprise software solutions. Previously led digital transformation initiatives at Fortune 500 companies.",
    expertise: ["Strategic Planning", "Digital Transformation", "Enterprise Architecture"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: "cto",
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "Expert in cloud architecture and enterprise software development. Passionate about leveraging technology to solve complex business challenges.",
    expertise: ["Cloud Architecture", "System Design", "Software Development"],
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    social: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "product-lead",
    name: "Emma Rodriguez",
    role: "Head of Product",
    bio: "Specializes in product strategy and user experience. Dedicated to creating intuitive enterprise solutions that users love.",
    expertise: ["Product Strategy", "UX Design", "Agile Management"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  }
];

// Removed duplicate COMPANY_MILESTONES declaration