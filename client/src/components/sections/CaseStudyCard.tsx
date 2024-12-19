import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Quote } from "lucide-react";
import { CaseStudyFeedback } from "./CaseStudyFeedback";

interface CaseStudyProps {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  videoUrl?: string | undefined;
}

export function CaseStudyCard({
  id,
  title,
  industry,
  challenge,
  solution,
  results,
  testimonial,
  videoUrl,
}: CaseStudyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className="aspect-video relative bg-black">
          {videoUrl && videoUrl.length > 0 ? (
            <video
              src={videoUrl}
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
              <div className="text-primary/30 text-lg font-medium">No video preview available</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 left-4 z-10">{industry}</Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className="font-semibold mb-2">Challenge</h3>
              <p className="text-gray-600">{challenge}</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className="font-semibold mb-2">Solution</h3>
              <p className="text-gray-600">{solution}</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h3 className="font-semibold mb-2">Results</h3>
              <ul className="space-y-2">
                {results.map((result, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 text-gray-600"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>{result}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <div className="border-t pt-6">
            <blockquote className="relative">
              <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
              <p className="text-gray-600 italic pl-8 mb-4">
                {testimonial.quote}
              </p>
              <footer className="mt-4 pl-8">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.position}, {testimonial.company}
                </p>
              </footer>
            </blockquote>

            <div className="mt-6 flex justify-end">
              <CaseStudyFeedback caseStudyId={id} title={title} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
