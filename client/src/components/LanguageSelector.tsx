import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiFlag } from "react-icons/fi";
import { US } from 'country-flag-icons/react/3x2';

export function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onValueChange={(value) => {
        i18n.changeLanguage(value);
      }}
    >
      <SelectTrigger className="w-[140px] bg-transparent border-none hover:bg-accent/50">
        <SelectValue>
          <div className="flex items-center gap-2">
            {i18n.language === 'en' ? (
              <>
                <US className="h-4 w-4" />
                <span>{t('language.english')}</span>
              </>
            ) : (
              <>
                <FiFlag className="h-4 w-4 text-blue-600" />
                <span>{t('language.romanian')}</span>
              </>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <US className="h-4 w-4" />
            <span>{t('language.english')}</span>
          </div>
        </SelectItem>
        <SelectItem value="ro">
          <div className="flex items-center gap-2">
            <FiFlag className="h-4 w-4 text-blue-600" />
            <span>{t('language.romanian')}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}