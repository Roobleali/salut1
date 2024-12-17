import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          nav: {
            industries: 'Industries',
            modules: 'Modules',
            resources: 'Resources',
            solutions: 'Our Solutions',
            about: 'About Us'
          },
          common: {
            company_name: 'SalutTech',
            learn_more: 'Learn More',
            features: 'Features',
            why_choose: 'Why Choose',
            market_features: 'Market Features',
            schedule_demo: 'Schedule Demo',
            contact_sales: 'Contact Sales'
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
          industries: {
            solutions_title: 'Industry Solutions',
            solutions_subtitle: 'Discover our comprehensive suite of enterprise solutions designed to help your business thrive in the digital age.',
            manufacturing: {
              badge: 'Manufacturing Solutions',
              title: 'Advanced Manufacturing Management',
              subtitle: 'Comprehensive manufacturing solutions tailored for Romanian industries',
              description: 'Management complet al producției cu MRP, planificare și control al calității',
              features: {
                planning: 'Production Planning',
                planning_desc: 'Advanced MRP system with real-time production scheduling',
                quality: 'Quality Control',
                quality_desc: 'Comprehensive quality management and testing protocols',
                supply: 'Supply Chain',
                supply_desc: 'End-to-end supply chain visibility and optimization',
                cost: 'Cost Management',
                cost_desc: 'Detailed cost tracking and financial analytics',
                compliance: 'Compliance',
                compliance_desc: 'Automated compliance with industry standards',
                documents: 'E-Document Integration',
                documents_desc: 'Seamless integration with Romanian e-Factura system'
              },
              romania_specific: {
                title: 'Romanian Market Features',
                features: {
                  efactura: 'E-Factura compliance and integration',
                  fiscal: 'Romanian fiscal code management',
                  supply_chain: 'Local supply chain optimization',
                  eu_export: 'EU export documentation',
                  labor: 'Romanian labor law compliance',
                  inventory: 'Regional inventory management'
                }
              }
            },
            realestate: {
              title: 'Advanced Real Estate Management',
              subtitle: 'Complete property management solution with comprehensive features',
              description: 'Complete property management solution with comprehensive features for leasing, maintenance, tenant portals, and full compliance with Romanian real estate regulations',
              features: {
                property: 'Property Management',
                property_desc: 'Complete management of your property portfolio with detailed tracking and reporting',
                tenant: 'Tenant Management',
                tenant_desc: 'Comprehensive tenant relationship management and communication system',
                maintenance: 'Maintenance Tracking',
                maintenance_desc: 'Automated maintenance request system with supplier management',
                utilities: 'Utilities Management',
                utilities_desc: 'Automated utility billing and consumption tracking',
                financial: 'Financial Management',
                financial_desc: 'Complete financial management with Romanian e-Factura integration',
                documents: 'Document Management',
                documents_desc: 'Automated document generation and processing compliant with Romanian legislation'
              },
              romania_specific: {
                title: 'Romanian Market Features',
                features: [
                  'e-Factura compliance and integration',
                  'Romanian fiscal code management',
                  'BNR exchange rate integration',
                  'Automated Romanian contract generation',
                  'GDPR compliance tools',
                  'Romanian real estate market analytics'
                ]
              }
            },
            healthcare: {
              title: 'Advanced Healthcare Management',
              subtitle: 'Comprehensive healthcare solutions for medical institutions',
              description: 'Comprehensive healthcare solutions tailored for Romanian medical institutions',
              features: {
                patient: 'Patient Management',
                patient_desc: 'Comprehensive patient records and appointment scheduling system',
                inventory: 'Medical Inventory',
                inventory_desc: 'Advanced tracking of medical supplies and equipment',
                billing: 'Billing & Insurance',
                billing_desc: 'Integrated healthcare billing and insurance claim management',
                telemedicine: 'Telemedicine',
                telemedicine_desc: 'Secure video consultations and remote patient monitoring',
                compliance: 'Compliance',
                compliance_desc: 'Built-in compliance with Romanian and EU healthcare regulations',
                analytics: 'Analytics',
                analytics_desc: 'Healthcare analytics and reporting for improved patient care'
              },
              romania_specific: {
                title: 'Romanian Healthcare Features',
                features: [
                  'Romanian healthcare regulations compliance',
                  'Integration with CNAS',
                  'Prescription management system',
                  'Medical documentation in Romanian',
                  'Local healthcare provider network integration',
                  'Romanian medical coding standards'
                ]
              }
            }
          },
          home: {
            hero: {
              title: 'Enterprise Solutions for Modern Business',
              subtitle: 'Comprehensive software solutions tailored for your industry'
            },
            features: {
              scalable: {
                title: 'Scalable Solutions',
                description: 'Enterprise architecture that seamlessly adapts to your growing business requirements'
              },
              integration: {
                title: 'Seamless Integration',
                description: 'Perfect connectivity between all modules and third-party systems for unified operations'
              },
              support: {
                title: '24/7 Expert Support',
                description: 'Dedicated team of specialists providing round-the-clock assistance for your business'
              }
            }
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
            about: 'Despre Noi'
          },
          common: {
            company_name: 'SalutTech',
            learn_more: 'Află Mai Multe',
            features: 'Funcționalități',
            why_choose: 'De Ce Să Alegi',
            market_features: 'Caracteristici de Piață',
            schedule_demo: 'Programează Demo',
            contact_sales: 'Contactează Vânzări'
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
          industries: {
            solutions_title: 'Soluții pe Industrii',
            solutions_subtitle: 'Descoperă suita noastră completă de soluții enterprise concepute să ajute afacerea ta să prospere în era digitală.',
            manufacturing: {
              badge: 'Soluții pentru Producție',
              title: 'Management Avansat în Producție',
              subtitle: 'Soluții complete de producție adaptate industriilor din România',
              description: 'Management complet al producției cu MRP, planificare și control al calității',
              features: {
                planning: 'Planificarea Producției',
                planning_desc: 'Sistem MRP avansat cu programare în timp real',
                quality: 'Controlul Calității',
                quality_desc: 'Management comprehensiv al calității și protocoale de testare',
                supply: 'Lanț de Aprovizionare',
                supply_desc: 'Vizibilitate și optimizare end-to-end a lanțului de aprovizionare',
                cost: 'Managementul Costurilor',
                cost_desc: 'Urmărirea detaliată a costurilor și analiză financiară',
                compliance: 'Conformitate',
                compliance_desc: 'Conformitate automatizată cu standardele industriei',
                documents: 'Integrare E-Documente',
                documents_desc: 'Integrare perfectă cu sistemul e-Factura românesc'
              },
              romania_specific: {
                title: 'Funcționalități pentru Piața Românească',
                features: {
                  efactura: 'Conformitate și integrare e-Factura',
                  fiscal: 'Gestionarea codului fiscal românesc',
                  supply_chain: 'Optimizare lanț de aprovizionare local',
                  eu_export: 'Documentație export UE',
                  labor: 'Conformitate cu legislația muncii',
                  inventory: 'Management inventar regional'
                }
              }
            },
            realestate: {
              title: 'Management Imobiliar Avansat',
              subtitle: 'Soluție completă de administrare imobiliară',
              description: 'Soluție completă de administrare imobiliară cu funcționalități pentru închiriere, întreținere și portaluri pentru chiriași',
              features: {
                property: 'Administrare Proprietăți',
                property_desc: 'Administrare completă a portofoliului cu urmărire detaliată și raportare',
                tenant: 'Gestiunea Chiriașilor',
                tenant_desc: 'Sistem complet de gestionare a relațiilor cu chiriașii și comunicare',
                maintenance: 'Urmărirea Mentenanței',
                maintenance_desc: 'Sistem automatizat de solicitări de întreținere cu gestionarea furnizorilor',
                utilities: 'Gestiunea Utilităților',
                utilities_desc: 'Facturare automată a utilităților și urmărirea consumului',
                financial: 'Management Financiar',
                financial_desc: 'Gestiune financiară completă cu integrare e-Factura',
                documents: 'Gestiunea Documentelor',
                documents_desc: 'Generare și procesare automată documente conform legislației'
              },
              romania_specific: {
                title: 'Funcționalități pentru Piața Românească',
                features: [
                  'Conformitate și integrare e-Factura',
                  'Gestiunea codului fiscal românesc',
                  'Integrare curs valutar BNR',
                  'Generare automată contracte conform legislației române',
                  'Instrumente conformitate GDPR',
                  'Analiză piață imobiliară românească'
                ]
              }
            },
            healthcare: {
              title: 'Management Avansat în Sănătate',
              subtitle: 'Soluții complete pentru instituții medicale',
              description: 'Soluții complete adaptate pentru instituțiile medicale din România',
              features: {
                patient: 'Gestiunea Pacienților',
                patient_desc: 'Sistem complet de evidență pacienți și programări',
                inventory: 'Inventar Medical',
                inventory_desc: 'Urmărire avansată a stocurilor și echipamentelor medicale',
                billing: 'Facturare și Asigurări',
                billing_desc: 'Sistem integrat de facturare și gestionare asigurări de sănătate',
                telemedicine: 'Telemedicină',
                telemedicine_desc: 'Consultații video securizate și monitorizare pacienți la distanță',
                compliance: 'Conformitate',
                compliance_desc: 'Conformitate incorporată cu reglementările românești și UE în sănătate',
                analytics: 'Analiză',
                analytics_desc: 'Analiză și raportare pentru îmbunătățirea îngrijirii pacienților'
              },
              romania_specific: {
                title: 'Funcționalități pentru Sistemul Medical Românesc',
                features: [
                  'Conformitate cu reglementările medicale românești',
                  'Integrare cu CNAS',
                  'Sistem de gestiune rețete',
                  'Documentație medicală în limba română',
                  'Integrare cu rețeaua furnizorilor locali de servicii medicale',
                  'Standarde românești de codificare medicală'
                ]
              }
            }
          },
          home: {
            hero: {
              title: 'Soluții Enterprise pentru Afaceri Moderne',
              subtitle: 'Soluții software complete adaptate pentru industria ta'
            },
            features: {
              scalable: {
                title: 'Soluții Scalabile',
                description: 'Arhitectură enterprise care se adaptează perfect la cerințele în creștere ale afacerii tale'
              },
              integration: {
                title: 'Integrare Perfectă',
                description: 'Conectivitate perfectă între toate modulele și sistemele terțe pentru operațiuni unificate'
              },
              support: {
                title: 'Suport Expert 24/7',
                description: 'Echipă dedicată de specialiști care oferă asistență non-stop pentru afacerea ta'
              }
            }
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
    }
  });

export default i18n;