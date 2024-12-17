export const NAVIGATION_ITEMS = [
  {
    title: "Services",
    items: [
      { title: "HORECA Solutions", href: "/services#horeca" },
      { title: "Manufacturing", href: "/services#manufacturing" },
      { title: "Point of Sale", href: "/services#pos" },
      { title: "Real Estate", href: "/services#real-estate" }
    ]
  },
  {
    title: "Company",
    items: [
      { title: "Case Studies", href: "/case-studies" },
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" }
    ]
  }
];

export const SERVICES = [
  {
    id: "horeca",
    title: "HORECA Solutions",
    description: "Complete management solutions for hotels, restaurants, and catering businesses",
    image: "https://images.unsplash.com/photo-1556742504-16b083241fab",
    features: ["Inventory Management", "Table Reservations", "Kitchen Display System", "Staff Management"]
  },
  {
    id: "manufacturing",
    title: "Manufacturing Software",
    description: "Streamline your production processes with our comprehensive manufacturing solution",
    image: "https://images.unsplash.com/photo-1580983230712-f7d0f878bcc4",
    features: ["Production Planning", "Quality Control", "Supply Chain Management", "Cost Tracking"]
  },
  {
    id: "pos",
    title: "Point of Sale",
    description: "Modern POS system for retail and hospitality businesses",
    image: "https://images.unsplash.com/photo-1556742504-16b083241fab",
    features: ["Sales Analytics", "Inventory Control", "Customer Management", "Payment Integration"]
  },
  {
    id: "real-estate",
    title: "Real Estate Management",
    description: "End-to-end solution for property management and real estate operations",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    features: ["Property Listings", "Tenant Management", "Maintenance Tracking", "Financial Reports"]
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