import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { glossaryTerms } from "@/lib/glossaryData";

export function Glossary() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | null>(null);

  // Get unique industries from glossary terms
  const industries = React.useMemo(() => {
    const industrySet = new Set<string>();
    glossaryTerms.forEach(term => {
      term.industries.forEach(industry => industrySet.add(industry));
    });
    return Array.from(industrySet);
  }, []);

  // Filter terms based on search query and selected industry
  const filteredTerms = React.useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.translations[i18n.language as 'en' | 'ro'].term
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesIndustry = !selectedIndustry || term.industries.includes(selectedIndustry);
      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry, i18n.language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-32 pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('glossary.title', 'Industry Terminology Glossary')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('glossary.description', 'Comprehensive guide to industry-specific terms and definitions')}
          </p>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder={t('glossary.search_placeholder', 'Search terms...')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedIndustry === null ? "secondary" : "outline"}
                onClick={() => setSelectedIndustry(null)}
              >
                {t('glossary.all_industries', 'All Industries')}
              </Button>
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "secondary" : "outline"}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {t(`industries.${industry}.title`, industry)}
                </Button>
              ))}
            </div>
          </div>

          {/* Glossary Terms */}
          <div className="space-y-6">
            {filteredTerms.map((term) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl font-semibold">
                        {term.translations[i18n.language as 'en' | 'ro'].term}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {term.industries.map((industry) => (
                          <Badge key={industry} variant="secondary">
                            {t(`industries.${industry}.title`, industry)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {term.translations[i18n.language as 'en' | 'ro'].definition}
                    </p>
                    {term.translations[i18n.language as 'en' | 'ro'].example && (
                      <div className="text-sm text-gray-500">
                        <strong>{t('glossary.example', 'Example')}:</strong>{' '}
                        {term.translations[i18n.language as 'en' | 'ro'].example}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
