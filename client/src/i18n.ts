import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      menu: {
        industries: 'Industries',
        modules: 'Modules',
        resources: 'Resources',
        solutions: 'Our Solutions',
        about: 'About Us',
        // Industry items
        manufacturing: 'Manufacturing',
        manufacturing_desc: 'End-to-end manufacturing solutions with MRP and quality control',
        real_estate: 'Real Estate',
        real_estate_desc: 'Complete property management and real estate solutions',
        retail: 'Retail & E-commerce',
        retail_desc: 'Unified retail management across online and physical stores',
        services: 'Professional Services',
        services_desc: 'Project management and service delivery solutions',
        construction: 'Construction',
        construction_desc: 'Construction project and resource management tools',
        hospitality: 'Hospitality',
        hospitality_desc: 'Hotel and restaurant management solutions',
        healthcare: 'Healthcare',
        healthcare_desc: 'Healthcare facility and patient management systems',
        education: 'Education',
        education_desc: 'Educational institution management platform',
        // Module items
        crm: 'CRM',
        crm_desc: 'Complete customer relationship management system',
        sales: 'Sales',
        sales_desc: 'Sales pipeline and forecasting tools',
        purchase: 'Purchase',
        purchase_desc: 'Procurement and vendor management',
        inventory: 'Inventory',
        inventory_desc: 'Real-time inventory tracking system',
        manufacturing_module: 'Manufacturing',
        manufacturing_module_desc: 'End-to-end manufacturing management',
        accounting: 'Accounting',
        accounting_desc: 'Financial management and reporting',
        project_management: 'Project Management',
        project_management_desc: 'Project planning and resource allocation',
        hr: 'HR & Recruitment',
        hr_desc: 'Complete HR management system',
        ecommerce: 'Website & E-commerce',
        ecommerce_desc: 'Online store and website builder',
        pos: 'Point of Sale',
        pos_desc: 'Modern POS system for retail',
        field_service: 'Field Service',
        field_service_desc: 'Mobile workforce management',
        marketing: 'Marketing Automation',
        marketing_desc: 'Automated marketing campaigns',
        // Resource items
        about_us: 'About Us',
        about_us_desc: 'Learn more about our company and mission',
        case_studies: 'Case Studies',
        case_studies_desc: 'Success stories from our clients',
        social_responsibility: 'Social Responsibility',
        social_responsibility_desc: 'Our commitment to sustainable and ethical practices'
      },
      social_responsibility: {
        title: 'Social Responsibility',
        subtitle: 'Building a Better Future Together',
        environmental: {
          title: 'Environmental Impact',
          description: 'Our commitment to sustainable practices and reducing environmental footprint',
          features: [
            'Green Technology Solutions',
            'Sustainable Development',
            'Environmental Conservation',
            'Energy Efficiency'
          ]
        },
        community: {
          title: 'Community Engagement',
          description: 'Supporting and empowering local communities through technology',
          features: [
            'Educational Programs',
            'Local Business Support',
            'Digital Inclusion',
            'Community Development'
          ]
        },
        ethics: {
          title: 'Business Ethics',
          description: 'Maintaining high standards of ethical business practices',
          features: [
            'Transparent Operations',
            'Fair Business Practices',
            'Data Privacy',
            'Ethical AI Development'
          ]
        }
      },
      nav: {
        industries: 'Industries',
        modules: 'Modules',
        resources: 'Resources',
        solutions: 'Our Solutions',
        about: 'About Us',
        manufacturing: 'Manufacturing',
        real_estate: 'Real Estate',
        retail: 'Retail & E-commerce',
        services: 'Professional Services',
        construction: 'Construction',
        hospitality: 'Hospitality',
        healthcare: 'Healthcare',
        education: 'Education',
        social_responsibility: 'Social Responsibility' // Added social responsibility to navigation
      },
      menu: {
        industries: 'Industries',
        manufacturing: 'Manufacturing',
        manufacturing_desc: 'End-to-end manufacturing solutions with MRP and quality control',
        real_estate: 'Real Estate',
        real_estate_desc: 'Complete property management and real estate solutions',
        retail: 'Retail & E-commerce',
        retail_desc: 'Unified retail management across online and physical stores',
        services: 'Professional Services',
        services_desc: 'Project management and service delivery solutions',
        construction: 'Construction',
        construction_desc: 'Construction project and resource management tools',
        hospitality: 'Hospitality',
        hospitality_desc: 'Hotel and restaurant management solutions',
        healthcare: 'Healthcare',
        healthcare_desc: 'Healthcare facility and patient management systems',
        education: 'Education',
        education_desc: 'Educational institution management platform',
        social_responsibility: 'Social Responsibility',
        social_responsibility_desc: 'Our commitment to sustainable and ethical practices',
        crm: 'CRM',
        sales: 'Sales',
        purchase: 'Purchase',
        inventory: 'Inventory',
        accounting: 'Accounting',
        project_management: 'Project Management',
        hr: 'HR & Recruitment',
        ecommerce: 'Website & E-commerce',
        pos: 'Point of Sale',
        field_service: 'Field Service',
        marketing: 'Marketing Automation'
      },
      common: {
        company_name: 'SalutTech',
        learn_more: 'Learn More',
        features: 'Features',
        why_choose: 'Why Choose',
        market_features: 'Market Features',
        schedule_demo: 'Schedule Demo',
        contact_sales: 'Contact Sales',
        read_more: 'Read More',
        get_started: 'Get Started',
        contact_us: 'Contact Us',
        our_features: 'Our Features',
        benefits: 'Benefits',
        testimonials: 'Testimonials',
        case_studies: 'Case Studies',
        about_us: 'About Us'
      },
      home: {
        hero: {
          title: 'Enterprise Solutions for Modern Business',
          subtitle: 'Comprehensive software solutions tailored for your industry',
          transform: 'Transform Your Enterprise',
          unlock_growth: 'Unlock unprecedented growth with our suite of cutting-edge enterprise solutions.',
          why_choose: 'Why Leading Companies Choose',
          company_exp: 'Experience the perfect fusion of enterprise-grade reliability and modern innovation.',
          platform_evolves: 'Our platform evolves with your ambitions, providing the foundation for sustainable growth and digital excellence.'
        },
        features: {
          title: 'Why Choose Our Platform',
          subtitle: 'Designed for modern enterprises',
          scalable: {
            title: 'Infinite Scalability',
            description: 'Future-proof architecture that grows with your ambitions. Scale from startup to enterprise with zero growing pains.'
          },
          integration: {
            title: 'Perfect Integration',
            description: 'Seamlessly connect your entire digital ecosystem. Unified operations across all platforms and systems.'
          },
          support: {
            title: '24/7 Elite Support',
            description: 'Expert assistance at your fingertips. Our dedicated team ensures your success around the clock.'
          }
        }
      },
      services: {
        title: 'Our Services',
        subtitle: 'Explore our comprehensive suite of enterprise solutions',
        manufacturing: {
          title: 'Manufacturing Software',
          description: 'Enterprise-grade manufacturing solution with advanced production planning and real-time monitoring capabilities',
          features: {
            planning: 'Advanced Production Planning',
            quality: 'Quality Control & Assurance',
            supply: 'Supply Chain Optimization',
            cost: 'Cost & Resource Tracking',
            maintenance: 'Maintenance Management',
            compliance: 'Compliance & Documentation'
          }
        }
      }
    }
  },
  ro: {
    translation: {
      menu: {
        industries: 'Industrii',
        modules: 'Module',
        resources: 'Resurse',
        solutions: 'Soluțiile Noastre',
        about: 'Despre Noi',
        // Industry items
        manufacturing: 'Producție',
        manufacturing_desc: 'Soluții complete de producție cu MRP și control al calității',
        real_estate: 'Imobiliare',
        real_estate_desc: 'Soluții complete pentru managementul proprietăților și imobiliare',
        retail: 'Retail și E-commerce',
        retail_desc: 'Management unificat pentru magazine online și fizice',
        services: 'Servicii Profesionale',
        services_desc: 'Soluții pentru managementul proiectelor și livrarea serviciilor',
        construction: 'Construcții',
        construction_desc: 'Instrumente pentru managementul proiectelor și resurselor în construcții',
        hospitality: 'Ospitalitate',
        hospitality_desc: 'Soluții pentru managementul hotelurilor și restaurantelor',
        healthcare: 'Sănătate',
        healthcare_desc: 'Sisteme de management pentru facilități medicale și pacienți',
        education: 'Educație',
        education_desc: 'Platformă de management pentru instituții educaționale',
        // Module items
        crm: 'CRM',
        crm_desc: 'Sistem complet de management al relațiilor cu clienții',
        sales: 'Vânzări',
        sales_desc: 'Instrumente de prognoză și pipeline de vânzări',
        purchase: 'Achiziții',
        purchase_desc: 'Management furnizori și aprovizionare',
        inventory: 'Inventar',
        inventory_desc: 'Sistem de urmărire inventar în timp real',
        manufacturing_module: 'Producție',
        manufacturing_module_desc: 'Management complet al producției',
        accounting: 'Contabilitate',
        accounting_desc: 'Management financiar și raportare',
        project_management: 'Management Proiecte',
        project_management_desc: 'Planificare proiecte și alocare resurse',
        hr: 'HR și Recrutare',
        hr_desc: 'Sistem complet de management HR',
        ecommerce: 'Website și E-commerce',
        ecommerce_desc: 'Constructor de magazine online și website-uri',
        pos: 'Punct de Vânzare',
        pos_desc: 'Sistem modern POS pentru retail',
        field_service: 'Servicii de Teren',
        field_service_desc: 'Management forță de muncă mobilă',
        marketing: 'Automatizare Marketing',
        marketing_desc: 'Campanii de marketing automatizate',
        // Resource items
        about_us: 'Despre Noi',
        about_us_desc: 'Află mai multe despre compania și misiunea noastră',
        case_studies: 'Studii de Caz',
        case_studies_desc: 'Povești de succes ale clienților noștri',
        social_responsibility: 'Responsabilitate Socială',
        social_responsibility_desc: 'Angajamentul nostru pentru practici sustenabile și etice'
      },
      social_responsibility: {
        title: 'Responsabilitate Socială',
        subtitle: 'Construim Împreună un Viitor Mai Bun',
        environmental: {
          title: 'Impact asupra Mediului',
          description: 'Angajamentul nostru față de practici sustenabile și reducerea amprentei de mediu',
          features: [
            'Soluții Tehnologice Verzi',
            'Dezvoltare Durabilă',
            'Conservarea Mediului',
            'Eficiență Energetică'
          ]
        },
        community: {
          title: 'Implicare în Comunitate',
          description: 'Sprijinirea și împuternicirea comunităților locale prin tehnologie',
          features: [
            'Programe Educaționale',
            'Suport pentru Afaceri Locale',
            'Incluziune Digitală',
            'Dezvoltarea Comunității'
          ]
        },
        ethics: {
          title: 'Etică în Afaceri',
          description: 'Menținerea unor standarde înalte de practici etice în afaceri',
          features: [
            'Operațiuni Transparente',
            'Practici Comerciale Echitabile',
            'Confidențialitatea Datelor',
            'Dezvoltare Etică a AI'
          ]
        }
      },
      nav: {
        industries: 'Industrii',
        modules: 'Module',
        resources: 'Resurse',
        solutions: 'Soluțiile Noastre',
        about: 'Despre Noi',
        manufacturing: 'Producție',
        real_estate: 'Imobiliare',
        retail: 'Retail și E-commerce',
        services: 'Servicii Profesionale',
        construction: 'Construcții',
        hospitality: 'Ospitalitate',
        healthcare: 'Sănătate',
        education: 'Educație',
        social_responsibility: 'Responsabilitate Socială' // Added social responsibility to navigation
      },
      menu: {
        industries: 'Industrii',
        manufacturing: 'Producție',
        manufacturing_desc: 'Soluții complete de producție cu MRP și control al calității',
        real_estate: 'Imobiliare',
        real_estate_desc: 'Soluții complete pentru managementul proprietăților și imobiliare',
        retail: 'Retail și E-commerce',
        retail_desc: 'Management unificat pentru magazine online și fizice',
        services: 'Servicii Profesionale',
        services_desc: 'Soluții pentru managementul proiectelor și livrarea serviciilor',
        construction: 'Construcții',
        construction_desc: 'Instrumente pentru managementul proiectelor și resurselor în construcții',
        hospitality: 'Ospitalitate',
        hospitality_desc: 'Soluții pentru managementul hotelurilor și restaurantelor',
        healthcare: 'Sănătate',
        healthcare_desc: 'Sisteme de management pentru facilități medicale și pacienți',
        education: 'Educație',
        education_desc: 'Platformă de management pentru instituții educaționale',
        crm: 'CRM',
        sales: 'Vânzări',
        purchase: 'Achiziții',
        inventory: 'Inventar',
        accounting: 'Contabilitate',
        project_management: 'Management Proiecte',
        hr: 'HR și Recrutare',
        ecommerce: 'Website și E-commerce',
        pos: 'Punct de Vânzare',
        field_service: 'Servicii de Teren',
        marketing: 'Automatizare Marketing'
      },
      home: {
        hero: {
          title: 'Soluții Enterprise pentru Afaceri Moderne',
          subtitle: 'Soluții software complete adaptate pentru industria ta',
          transform: 'Transformă-ți Întreprinderea',
          unlock_growth: 'Deblochează o creștere fără precedent cu suita noastră de soluții enterprise de ultimă generație.',
          why_choose: 'De Ce Companiile Lider Aleg',
          company_exp: 'Experimentează fuziunea perfectă dintre fiabilitatea la nivel enterprise și inovația modernă.',
          platform_evolves: 'Platforma noastră evoluează odată cu ambițiile tale, oferind fundația pentru o creștere sustenabilă și excelență digitală.'
        },
        features: {
          title: 'De Ce Să Alegi Platforma Noastră',
          subtitle: 'Concepută pentru întreprinderile moderne',
          scalable: {
            title: 'Scalabilitate Infinită',
            description: 'Arhitectură pregătită pentru viitor care crește odată cu ambițiile tale. Scalează de la startup la enterprise fără probleme.'
          },
          integration: {
            title: 'Integrare Perfectă',
            description: 'Conectează-ți perfect întregul ecosistem digital. Operațiuni unificate pe toate platformele și sistemele.'
          },
          support: {
            title: 'Suport Elite 24/7',
            description: 'Asistență expertă la îndemâna ta. Echipa noastră dedicată îți asigură succesul non-stop.'
          }
        }
      },
      services: {
        title: 'Serviciile Noastre',
        subtitle: 'Explorează suita noastră completă de soluții enterprise',
        manufacturing: {
          title: 'Software pentru Producție',
          description: 'Soluție de producție la nivel enterprise cu planificare avansată și monitorizare în timp real',
          features: {
            planning: 'Planificare Avansată a Producției',
            quality: 'Control și Asigurarea Calității',
            supply: 'Optimizarea Lanțului de Aprovizionare',
            cost: 'Urmărirea Costurilor și Resurselor',
            maintenance: 'Management Mentenanță',
            compliance: 'Conformitate și Documentație'
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;