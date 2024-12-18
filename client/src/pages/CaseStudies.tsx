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
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Client Success Stories</h1>
          <p className="text-gray-600 mb-8">
            Discover how SalutTech has helped businesses transform their operations and achieve remarkable results.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge
              className={`cursor-pointer ${!selectedIndustry ? 'bg-primary' : 'bg-secondary hover:bg-primary/80'}`}
              onClick={() => setSelectedIndustry(null)}
            >
              All Industries
            </Badge>
            {INDUSTRIES.map((industry) => (
              <Badge
                key={industry}
                className={`cursor-pointer ${
                  selectedIndustry === industry ? 'bg-primary' : 'bg-secondary hover:bg-primary/80'
                }`}
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {filteredStudies.map((study) => (
            <CaseStudyCard key={study.id} {...study} />
          ))}
        </div>
      </div>
    </div>
  );
}
