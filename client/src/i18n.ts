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
          buttons: {
            contact_sales: 'Contact Sales',
            schedule_demo: 'Schedule Demo'
          },
          industries: {
            manufacturing: {
              title: 'Advanced Manufacturing Management',
              description: 'Comprehensive manufacturing solutions tailored for industries'
            },
            realestate: {
              title: 'Advanced Real Estate Management',
              description: 'Complete property management solution with comprehensive features'
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
            resources: 'Resurse'
          },
          buttons: {
            contact_sales: 'Contactează Vânzări',
            schedule_demo: 'Programează Demo'
          },
          industries: {
            manufacturing: {
              title: 'Management Avansat în Producție',
              description: 'Soluții complete de producție adaptate industriilor'
            },
            realestate: {
              title: 'Management Imobiliar Avansat',
              description: 'Soluție completă de administrare imobiliară cu funcționalități extinse'
            }
          },
          language: {
            select: 'Selectează Limba',
            english: 'Engleză',
            romanian: 'Română'
          }
        }
      }
    }
  });

export default i18n;
