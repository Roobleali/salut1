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
        manufacturing: 'Manufacturing',
        real_estate: 'Real Estate',
        healthcare: 'Healthcare',
        retail: 'Retail & E-commerce',
        services: 'Professional Services',
        construction: 'Construction',
        hospitality: 'Hospitality',
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
      contact: {
        sales: 'Contact Sales',
        title: 'Contact Us',
        subtitle: 'Get in touch with our team',
        form: {
          name: 'Your Name',
          email: 'Email Address',
          message: 'Message',
          submit: 'Send Message'
        }
      },
      industries: {
        manufacturing: {
          title: 'Enterprise Manufacturing Suite',
          subtitle: 'Advanced manufacturing solutions tailored for modern industries',
          description: 'Complete manufacturing management system with integrated MRP, real-time planning, and quality control',
          badge: 'Manufacturing Excellence',
          features: {
            title: 'Key Features',
            planning: {
              title: 'Production Planning',
              description: 'Advanced MRP system with real-time production scheduling'
            },
            quality: {
              title: 'Quality Control',
              description: 'Comprehensive quality management and testing protocols'
            },
            supply: {
              title: 'Supply Chain',
              description: 'End-to-end supply chain visibility and optimization'
            },
            cost: {
              title: 'Cost Management',
              description: 'Detailed cost tracking and financial analytics'
            },
            compliance: {
              title: 'Compliance',
              description: 'Automated compliance with industry standards'
            },
            documents: {
              title: 'E-Document Integration',
              description: 'Seamless integration with Romanian e-Factura system'
            }
          },
          market_features: {
            title: 'Romanian Market Features',
            efactura: 'E-Factura compliance and integration',
            fiscal: 'Romanian fiscal code management',
            supply_chain: 'Local supply chain optimization',
            eu_export: 'EU export documentation',
            labor: 'Romanian labor law compliance',
            inventory: 'Regional inventory management'
          }
        }
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
      button: {
        demo: 'Schedule Demo',
        learn_more: 'Learn More',
        contact_sales: 'Contact Sales',
        get_started: 'Get Started',
        submit: 'Submit',
        send: 'Send',
        view_more: 'View More',
        try_now: 'Try Now'
      },
      language: {
        select: 'Select Language',
        english: 'English',
        romanian: 'Romanian'
      },
      gradients: {
        customizer: {
          title: 'Gradient Customizer',
          page_title: 'Gradient Customization Toolkit',
          page_description: 'Create beautiful, customized gradients for your enterprise application',
          preset: 'Preset',
          select_preset: 'Select a preset',
          start_color: 'Start Color',
          end_color: 'End Color',
          direction: 'Direction',
          preview: 'Gradient Preview',
          copy_classes: 'Copy Gradient Classes'
        },
        directions: {
          right: 'Right',
          bottom_right: 'Bottom Right',
          top_right: 'Top Right',
          bottom: 'Bottom'
        }
      },
      glossary: {
        title: 'Industry Terminology Glossary',
        description: 'Comprehensive guide to industry-specific terms and definitions',
        search_placeholder: 'Search terms...',
        all_industries: 'All Industries',
        example: 'Example',
        no_results: 'No terms found'
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
        healthcare: 'Sănătate',
        retail: 'Retail și E-commerce',
        services: 'Servicii Profesionale',
        construction: 'Construcții',
        hospitality: 'Ospitalitate',
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
      contact: {
        sales: 'Contactează Vânzări',
        title: 'Contactează-ne',
        subtitle: 'Intră în legătură cu echipa noastră',
        form: {
          name: 'Numele Tău',
          email: 'Adresa de Email',
          message: 'Mesaj',
          submit: 'Trimite Mesaj'
        }
      },
      industries: {
        manufacturing: {
          title: 'Suită Enterprise pentru Producție',
          subtitle: 'Soluții avansate de producție adaptate industriilor moderne',
          description: 'Sistem complet de management al producției cu MRP integrat, planificare în timp real și control al calității',
          badge: 'Excelență în Producție',
          features: {
            title: 'Funcționalități Principale',
            planning: {
              title: 'Planificarea Producției',
              description: 'Sistem MRP avansat cu programare în timp real'
            },
            quality: {
              title: 'Controlul Calității',
              description: 'Management comprehensiv al calității și protocoale de testare'
            },
            supply: {
              title: 'Lanț de Aprovizionare',
              description: 'Vizibilitate și optimizare end-to-end a lanțului de aprovizionare'
            },
            cost: {
              title: 'Managementul Costurilor',
              description: 'Urmărirea detaliată a costurilor și analiză financiară'
            },
            compliance: {
              title: 'Conformitate',
              description: 'Conformitate automatizată cu standardele industriei'
            },
            documents: {
              title: 'Integrare E-Documente',
              description: 'Integrare perfectă cu sistemul e-Factura românesc'
            }
          },
          market_features: {
            title: 'Funcționalități pentru Piața Românească',
            efactura: 'Conformitate și integrare e-Factura',
            fiscal: 'Gestionarea codului fiscal românesc',
            supply_chain: 'Optimizare lanț de aprovizionare local',
            eu_export: 'Documentație export UE',
            labor: 'Conformitate cu legislația muncii',
            inventory: 'Management inventar regional'
          }
        }
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
      button: {
        demo: 'Programează Demo',
        learn_more: 'Află Mai Multe',
        contact_sales: 'Contactează Vânzări',
        get_started: 'Începe Acum',
        submit: 'Trimite',
        send: 'Trimite',
        view_more: 'Vezi Mai Mult',
        try_now: 'Încearcă Acum'
      },
      language: {
        select: 'Selectează Limba',
        english: 'Engleză',
        romanian: 'Română'
      },
      gradients: {
        customizer: {
          title: 'Personalizare Gradient',
          page_title: 'Instrument de Personalizare Gradient',
          page_description: 'Creează gradiente frumoase și personalizate pentru aplicația ta enterprise',
          preset: 'Presetare',
          select_preset: 'Selectează o presetare',
          start_color: 'Culoare de Start',
          end_color: 'Culoare de Final',
          direction: 'Direcție',
          preview: 'Previzualizare Gradient',
          copy_classes: 'Copiază Clasele Gradient'
        },
        directions: {
          right: 'Dreapta',
          bottom_right: 'Dreapta Jos',
          top_right: 'Dreapta Sus',
          bottom: 'Jos'
        }
      },
      glossary: {
        title: 'Glosar de Terminologie Industrială',
        description: 'Ghid complet al termenilor și definițiilor specifice industriei',
        search_placeholder: 'Caută termeni...',
        all_industries: 'Toate Industriile',
        example: 'Exemplu',
        no_results: 'Nu s-au găsit termeni'
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