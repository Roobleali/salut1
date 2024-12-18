import { useState } from "react";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CASE_STUDIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const INDUSTRIES = Array.from(
  new Set(CASE_STUDIES.map((study) => study.industry)),
);

export function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const filteredStudies = selectedIndustry
    ? CASE_STUDIES.filter((study) => study.industry === selectedIndustry)
    : CASE_STUDIES;

  return (
    <div className="min-h-screen pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 lg:mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 lg:mb-6 bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
            Client Success Stories
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 lg:mb-12 px-4 md:px-0">
            Discover how SalutTech has helped businesses transform their operations and achieve remarkable results.
          </p>
          <div className="bg-white rounded-lg px-3 py-4 md:px-6 md:py-5 border-b border-gray-200 w-full max-w-xl md:max-w-2xl mx-auto">
            <h3 className="text-base md:text-lg font-semibold text-black mb-3 md:mb-4 text-center">
              Filter by Industry
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              <Badge
                className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-sm whitespace-nowrap transition-all ${
                  !selectedIndustry
                    ? "bg-primary text-primary-foreground scale-105"
                    : "bg-secondary  text-gray-600  hover:bg-primary/90"
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
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-secondary/80 text-gray-600 hover:bg-primary/70"
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