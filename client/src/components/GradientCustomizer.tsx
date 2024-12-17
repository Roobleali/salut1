import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { gradientPresets, type GradientTheme } from "@/lib/gradients";
import { useTranslation } from "react-i18next";

export function GradientCustomizer() {
  const { t } = useTranslation();
  const [selectedPreset, setSelectedPreset] = useState<GradientTheme>(gradientPresets[0]);
  const [startColor, setStartColor] = useState("#000000");
  const [endColor, setEndColor] = useState("#000000");
  const [direction, setDirection] = useState<"to-r" | "to-br" | "to-tr" | "to-b">("to-r");

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('gradients.customizer.title')}</h3>
          
          <div className="space-y-2">
            <Label>{t('gradients.customizer.preset')}</Label>
            <Select
              value={selectedPreset.id}
              onValueChange={(value) => {
                const preset = gradientPresets.find(p => p.id === value);
                if (preset) setSelectedPreset(preset);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('gradients.customizer.select_preset')} />
              </SelectTrigger>
              <SelectContent>
                {gradientPresets.map((preset) => (
                  <SelectItem key={preset.id} value={preset.id}>
                    {preset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('gradients.customizer.start_color')}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={startColor}
                  onChange={(e) => setStartColor(e.target.value)}
                  className="w-12 p-1 h-9"
                />
                <Input
                  type="text"
                  value={startColor}
                  onChange={(e) => setStartColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('gradients.customizer.end_color')}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={endColor}
                  onChange={(e) => setEndColor(e.target.value)}
                  className="w-12 p-1 h-9"
                />
                <Input
                  type="text"
                  value={endColor}
                  onChange={(e) => setEndColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('gradients.customizer.direction')}</Label>
            <Select
              value={direction}
              onValueChange={(value) => setDirection(value as typeof direction)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to-r">{t('gradients.directions.right')}</SelectItem>
                <SelectItem value="to-br">{t('gradients.directions.bottom_right')}</SelectItem>
                <SelectItem value="to-tr">{t('gradients.directions.top_right')}</SelectItem>
                <SelectItem value="to-b">{t('gradients.directions.bottom')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <div className={`w-full h-32 rounded-lg ${selectedPreset.backgroundClass}`}>
              <div className="w-full h-full flex items-center justify-center">
                <span className={`text-lg font-semibold ${selectedPreset.textClass}`}>
                  {t('gradients.customizer.preview')}
                </span>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              // Copy gradient classes to clipboard
              navigator.clipboard.writeText(selectedPreset.backgroundClass);
            }}
          >
            {t('gradients.customizer.copy_classes')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
