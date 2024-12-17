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
    lng: 'en', // default language
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          nav: {
            industries: 'Industries',
            modules: 'Modules',
            resources: 'Resources'
          },
          contact: {
            sales: 'Contact Sales'
          },
          button: {
            demo: 'Schedule Demo',
            learn_more: 'Learn More',
            contact_sales: 'Contact Sales'
          },
          industries: {
            manufacturing: {
              title: 'Advanced Manufacturing Management',
              description: 'Comprehensive manufacturing solutions tailored for Romanian industries',
              features: {
                planning: 'Production Planning',
                quality: 'Quality Control',
                supply: 'Supply Chain',
                cost: 'Cost Management',
                compliance: 'Compliance',
                documents: 'E-Document Integration'
              }
            },
            realestate: {
              title: 'Advanced Real Estate Management',
              description: 'Complete property management solution with comprehensive features',
              features: {
                property: 'Property Management',
                tenant: 'Tenant Management',
                maintenance: 'Maintenance Tracking',
                utilities: 'Utilities Management',
                financial: 'Financial Management',
                documents: 'Document Management'
              }
            },
            healthcare: {
              title: 'Advanced Healthcare Management',
              description: 'Comprehensive healthcare solutions for medical institutions',
              features: {
                patient: 'Patient Management',
                inventory: 'Medical Inventory',
                billing: 'Billing & Insurance'
              }
            }
          },
          language: {
            select: 'Select Language',
            english: 'English',
            romanian: 'Romanian'
          },
          common: {
            schedule_demo: 'Schedule Demo',
            contact_sales: 'Contact Sales',
            features: 'Features',
            market_features: 'Market Features'
          }
        }
      },
      ro: {
        translation: {
          nav: {
            industries: 'Industrii',
            modules: 'Module',
            resources: 'Resurse'
          },
          contact: {
            sales: 'Contactează Vânzări'
          },
          button: {
            demo: 'Programează Demo',
            learn_more: 'Află Mai Multe',
            contact_sales: 'Contactează Vânzări'
          },
          industries: {
            manufacturing: {
              title: 'Management Avansat în Producție',
              description: 'Soluții complete de producție adaptate industriilor din România',
              features: {
                planning: 'Planificarea Producției',
                quality: 'Controlul Calității',
                supply: 'Lanț de Aprovizionare',
                cost: 'Managementul Costurilor',
                compliance: 'Conformitate',
                documents: 'Integrare E-Documente'
              }
            },
            realestate: {
              title: 'Management Imobiliar Avansat',
              description: 'Soluție completă de administrare imobiliară cu funcționalități extinse',
              features: {
                property: 'Administrare Proprietăți',
                tenant: 'Gestiunea Chiriașilor',
                maintenance: 'Urmărirea Mentenanței',
                utilities: 'Gestiunea Utilităților',
                financial: 'Management Financiar',
                documents: 'Gestiunea Documentelor'
              }
            },
            healthcare: {
              title: 'Management Avansat în Sănătate',
              description: 'Soluții complete pentru instituții medicale',
              features: {
                patient: 'Gestiunea Pacienților',
                inventory: 'Inventar Medical',
                billing: 'Facturare și Asigurări'
              }
            }
          },
          language: {
            select: 'Selectează Limba',
            english: 'Engleză',
            romanian: 'Română'
          },
          common: {
            schedule_demo: 'Programează Demo',
            contact_sales: 'Contactează Vânzări',
            features: 'Funcționalități',
            market_features: 'Funcționalități pentru Piața Locală'
          }
        }
      }
    }
  });

export default i18n;
