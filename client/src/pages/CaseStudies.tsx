import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { CASE_STUDIES, VIDEO_TESTIMONIALS } from "@/lib/constants";

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

        <div className="space-y-24">
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Video Testimonials</h2>
            <VideoGallery testimonials={VIDEO_TESTIMONIALS} />
          </section>

          <section className="space-y-16 case-studies-section">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Case Studies</h2>
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
