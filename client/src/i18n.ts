import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const resources = {
  en: {
    translation: {
      nav: {
        industries: 'Industries',
        modules: 'Modules',
        resources: 'Resources',
        solutions: 'Our Solutions',
        about: 'About Us',
        industry_list: {
          manufacturing: 'Manufacturing',
          real_estate: 'Real Estate',
          retail: 'Retail & E-commerce',
          services: 'Professional Services',
          hospitality: 'Hospitality',
          education: 'Education'
        },
        descriptions: {
          manufacturing: 'End-to-end manufacturing management with MRP, production planning and quality control',
          real_estate: 'Complete property management solution for leasing, maintenance, and tenant portals',
          retail: 'Integrated POS, inventory and e-commerce solutions for modern retail',
          services: 'Project management and service tracking for consulting firms',
          hospitality: 'Reservation systems and guest experience management solutions',
          education: 'Student information and educational resource management'
        }
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
      industries: {
        manufacturing: {
          title: 'Enterprise Manufacturing Suite',
          subtitle: 'Advanced manufacturing solutions tailored for modern industries',
          description: 'Complete manufacturing management system with integrated MRP, real-time planning, and quality control',
          badge: 'Manufacturing Excellence',
          features: {
            planning: {
              title: 'Production Planning',
              description: 'Advanced MRP system with real-time production scheduling'
            },
            quality: {
              title: 'Quality Control',
              description: 'Comprehensive quality management and testing protocols'
            }
          },
          romania_specific: {
            title: 'Romanian Market Features',
            features: {
              efactura: 'E-Factura Compliance and Integration',
              fiscal: 'Romanian Fiscal Code Management',
              supply_chain: 'Local Supply Chain Optimization'
            }
          }
        },
        education: {
          title: 'Education Management System',
          subtitle: 'Manage student information, resources, and curriculum effectively',
          description: 'Our education management system helps streamline administrative tasks, improve communication, and enhance the learning experience'
        }
      },
      language: {
        select: 'Select Language',
        english: 'English',
        romanian: 'Romanian'
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
        industry_list: {
          manufacturing: 'Producție',
          real_estate: 'Imobiliare',
          retail: 'Retail și E-commerce',
          services: 'Servicii Profesionale',
          hospitality: 'Ospitalitate',
          education: 'Educație'
        },
        descriptions: {
          manufacturing: 'Management complet al producției cu MRP, planificare și control al calității',
          real_estate: 'Soluție completă de administrare imobiliară pentru închiriere, întreținere și portaluri pentru chiriași',
          retail: 'Soluții integrate POS, inventar și e-commerce pentru retail modern',
          services: 'Management de proiect și urmărirea serviciilor pentru firme de consultanță',
          hospitality: 'Sisteme de rezervări și management al experienței oaspeților',
          education: 'Managementul informațiilor studenților și al resurselor educaționale'
        }
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
        pos: 'Point of Sale',
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
      industries: {
        manufacturing: {
          title: 'Suită Enterprise pentru Producție',
          subtitle: 'Soluții avansate de producție adaptate industriilor moderne',
          description: 'Sistem complet de management al producției cu MRP integrat, planificare în timp real și control al calității',
          badge: 'Excelență în Producție',
          features: {
            planning: {
              title: 'Planificarea Producției',
              description: 'Sistem MRP avansat cu programare în timp real'
            },
            quality: {
              title: 'Controlul Calității',
              description: 'Management comprehensiv al calității și protocoale de testare'
            }
          },
          romania_specific: {
            title: 'Funcționalități pentru Piața Românească',
            features: {
              efactura: 'Conformitate și Integrare e-Factura',
              fiscal: 'Gestionarea Codului Fiscal Românesc',
              supply_chain: 'Optimizare Lanț de Aprovizionare Local'
            }
          }
        },
        education: {
          title: 'Sistem de Management Educațional',
          subtitle: 'Gestionează informațiile studenților, resursele și programa eficient',
          description: 'Sistemul nostru de management educațional ajută la optimizarea sarcinilor administrative, îmbunătățirea comunicării și la îmbunătățirea experienței de învățare'
        }
      },
      language: {
        select: 'Selectează Limba',
        english: 'Engleză',
        romanian: 'Română'
      }
    }
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;