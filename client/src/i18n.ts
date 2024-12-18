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
      enterprise: {
        solutions: {
          title: "Enterprise Solutions",
          description: "Complete enterprise management solutions",
          modules: {
            title: "Available Modules",
            description: "Comprehensive suite of business modules"
          }
        }
      },
      industries: {
        services: {
          description: 'Project management and service tracking for consulting firms'
        },
        construction: {
          description: 'Project cost estimation, material tracking and regulatory compliance'
        },
        hospitality: {
          description: 'Reservation systems and guest experience management solutions'
        },
        healthcare: {
          description: 'Patient management and medical inventory tracking systems'
        },
        education: {
          description: 'Student information and educational resource management'
        },
        manufacturing: {
          title: 'Advanced Manufacturing Solutions',
          subtitle: 'Comprehensive manufacturing solutions tailored for industries',
          description: 'Complete manufacturing management with MRP, planning and quality control',
          badge: 'Manufacturing Solutions',
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
        pos: 'Sistem de Vânzare',
        field_service: 'Servicii de Teren',
        marketing: 'Automatizare Marketing'
      },
      enterprise: {
        solutions: {
          title: "Soluții Enterprise",
          description: "Soluții complete de management enterprise",
          modules: {
            title: "Module Disponibile",
            description: "Suită completă de module pentru afaceri"
          }
        }
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
        services: {
          description: 'Management de proiecte și urmărirea serviciilor pentru firme de consultanță'
        },
        construction: {
          description: 'Estimarea costurilor proiectelor, urmărirea materialelor și conformitate cu reglementările'
        },
        hospitality: {
          description: 'Sisteme de rezervări și management al experienței clienților'
        },
        healthcare: {
          description: 'Managementul pacienților și urmărirea inventarului medical'
        },
        education: {
          description: 'Gestiunea informațiilor despre studenți și resurse educaționale'
        },
        manufacturing: {
          title: 'Soluții Avansate pentru Producție',
          subtitle: 'Soluții complete de producție adaptate industriilor din România',
          description: 'Management complet al producției cu MRP, planificare și control al calității',
          badge: 'Soluții pentru Producție',
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
