import { useState } from "react";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CASE_STUDIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const INDUSTRIES = Array.from(
  new Set(CASE_STUDIES.map((study) => study.industry))
);

export function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const filteredStudies = selectedIndustry
    ? CASE_STUDIES.filter((study) => study.industry === selectedIndustry)
    : CASE_STUDIES;

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Client Success Stories
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12">
            Discover how SalutTech has helped businesses transform their operations and achieve remarkable results.
          </p>
          <div className="bg-white rounded-lg px-4 py-5 sm:p-6 border-b border-gray-200 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-black mb-4 text-center">Filter by Industry</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <Badge
                className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-sm whitespace-nowrap transition-all ${
                  !selectedIndustry 
                    ? 'bg-primary text-primary-foreground scale-105' 
                    : 'bg-secondary hover:bg-primary/90'
                }`}
                onClick={() => setSelectedIndustry(null)}
              >
                All Industries
              </Badge>
              {INDUSTRIES.map((industry) => (
                <Badge
                  key={industry}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    selectedIndustry === industry 
                      ? 'bg-primary text-primary-foreground scale-105' 
                      : 'bg-secondary/80 hover:bg-primary/70'
                  }`}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mt-8 sm:mt-12">
          {filteredStudies.map((study) => (
            <CaseStudyCard key={study.id} {...study} />
          ))}
        </div>
      </div>
    </div>
  );
}
