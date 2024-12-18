import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
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
        education: 'Education'
      },
      menu: {
        crm: 'CRM',
        sales: 'Sales',
        purchase: 'Purchase',
        inventory: 'Inventory',
        manufacturing: 'Manufacturing',
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
        education: 'Educație'
      },
      menu: {
        crm: 'CRM',
        sales: 'Vânzări',
        purchase: 'Achiziții',
        inventory: 'Inventar',
        manufacturing: 'Producție',
        accounting: 'Contabilitate',
        project_management: 'Management Proiecte',
        hr: 'HR și Recrutare',
        ecommerce: 'Website și E-commerce',
        pos: 'Punct de Vânzare',
        field_service: 'Servicii de Teren',
        marketing: 'Automatizare Marketing'
      },
      common: {
        company_name: 'SalutTech',
        learn_more: 'Află Mai Multe',
        features: 'Funcționalități',
        why_choose: 'De Ce Să Alegi',
        market_features: 'Caracteristici de Piață',
        schedule_demo: 'Programează Demo',
        contact_sales: 'Contactează Vânzări',
        read_more: 'Citește Mai Mult',
        get_started: 'Începe Acum',
        contact_us: 'Contactează-ne',
        our_features: 'Funcționalitățile Noastre',
        benefits: 'Beneficii',
        testimonials: 'Testimoniale',
        case_studies: 'Studii de Caz',
        about_us: 'Despre Noi'
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
