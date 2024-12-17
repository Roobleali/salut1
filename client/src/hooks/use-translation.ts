import { useState, useCallback } from 'react';
import { getTranslation, type SupportedLanguages } from '@/lib/translation';

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguages>('en');

  const t = useCallback((key: string): string => {
    return getTranslation(key, currentLang);
  }, [currentLang]);

  const switchLanguage = useCallback((lang: SupportedLanguages) => {
    setCurrentLang(lang);
    document.documentElement.lang = lang;
  }, []);

  return {
    currentLang,
    switchLanguage,
    t
  };
}
