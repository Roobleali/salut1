import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaFlag, FaFlagUsa } from "react-icons/fa";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onValueChange={(value) => {
        i18n.changeLanguage(value);
      }}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            {i18n.language === 'en' ? (
              <>
                <FaFlagUsa className="h-4 w-4" />
                <span>English</span>
              </>
            ) : (
              <>
                <FaFlag className="h-4 w-4 text-blue-600" />
                <span>Română</span>
              </>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <FaFlagUsa className="h-4 w-4" />
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="ro">
          <div className="flex items-center gap-2">
            <FaFlag className="h-4 w-4 text-blue-600" />
            <span>Română</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
