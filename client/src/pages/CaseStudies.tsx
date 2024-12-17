import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CASE_STUDIES } from "@/lib/constants";

export function CaseStudies() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Client Success Stories</h1>
          <p className="text-gray-600">
            Discover how SalutTech has helped businesses transform their operations and achieve remarkable results.
          </p>
        </div>

        <div className="space-y-16 case-studies-section">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.id} {...study} />
          ))}
        </div>
      </div>
    </div>
  );
}
