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

// Initialize with some common translations
addTranslation('nav.industries', 'Industries', 'Industrii');
addTranslation('nav.modules', 'Modules', 'Module');
addTranslation('nav.resources', 'Resources', 'Resurse');
addTranslation('contact.sales', 'Contact Sales', 'Contactați Vânzările');
addTranslation('button.demo', 'Request Demo', 'Solicită Demo');
addTranslation('button.learn_more', 'Learn More', 'Află Mai Multe');
