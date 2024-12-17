export type SupportedLanguages = 'en' | 'ro';

export interface Translation {
  key: string;
  en: string;
  ro: string;
}

const translations = new Map<string, Translation>();

export function addTranslation(key: string, en: string, ro: string) {
  translations.set(key, { key, en, ro });
}

export function getTranslation(key: string, lang: SupportedLanguages): string {
  const translation = translations.get(key);
  if (!translation) {
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }
  return translation[lang];
}

// Navigation
addTranslation('nav.industries', 'Industries', 'Industrii');
addTranslation('nav.modules', 'Modules', 'Module');
addTranslation('nav.resources', 'Resources', 'Resurse');

// Common Actions
addTranslation('contact.sales', 'Contact Sales', 'Contactați Vânzările');
addTranslation('button.demo', 'Request Demo', 'Solicită Demo');
addTranslation('button.learn_more', 'Learn More', 'Află Mai Multe');
addTranslation('button.schedule_demo', 'Schedule Demo', 'Programează Demo');
addTranslation('button.contact_sales', 'Contact Sales', 'Contactează Vânzări');

// Manufacturing Page
addTranslation('manufacturing.title', 'Advanced Manufacturing Management', 'Management Avansat în Producție');
addTranslation('manufacturing.subtitle', 'Comprehensive manufacturing solutions tailored for Romanian industries', 'Soluții complete de producție adaptate industriilor din România');
addTranslation('manufacturing.features.planning', 'Production Planning', 'Planificarea Producției');
addTranslation('manufacturing.features.quality', 'Quality Control', 'Controlul Calității');
addTranslation('manufacturing.features.supply', 'Supply Chain', 'Lanț de Aprovizionare');

// Real Estate Page
addTranslation('realestate.title', 'Advanced Real Estate Management', 'Management Imobiliar Avansat');
addTranslation('realestate.subtitle', 'Complete property management solution with comprehensive features', 'Soluție completă de administrare imobiliară cu funcționalități extinse');
addTranslation('realestate.features.property', 'Property Management', 'Administrare Proprietăți');
addTranslation('realestate.features.tenant', 'Tenant Management', 'Gestiunea Chiriașilor');
addTranslation('realestate.features.maintenance', 'Maintenance Tracking', 'Urmărirea Mentenanței');

// Healthcare Page
addTranslation('healthcare.title', 'Advanced Healthcare Management', 'Management Avansat în Sănătate');
addTranslation('healthcare.subtitle', 'Comprehensive healthcare solutions for medical institutions', 'Soluții complete pentru instituții medicale');
addTranslation('healthcare.features.patient', 'Patient Management', 'Gestiunea Pacienților');
addTranslation('healthcare.features.inventory', 'Medical Inventory', 'Inventar Medical');
addTranslation('healthcare.features.billing', 'Billing & Insurance', 'Facturare & Asigurări');

// Language Selector
addTranslation('language.switch_to_ro', 'Switch to Romanian', 'Comută la Română');
addTranslation('language.switch_to_en', 'Switch to English', 'Comută la Engleză');
