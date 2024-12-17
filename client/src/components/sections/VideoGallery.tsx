import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoTestimonial {
  id: string;
  title: string;
  clientName: string;
  position: string;
  company: string;
  videoUrl: string;
  thumbnail: string;
}

interface VideoGalleryProps {
  testimonials: VideoTestimonial[];
}

export function VideoGallery({ testimonials }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-colors ${
                activeVideo === testimonial.id
                  ? "border-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setActiveVideo(testimonial.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded overflow-hidden">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.title}
                      className="object-cover w-full h-full"
                    />
                    {activeVideo !== testimonial.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.clientName}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          {activeVideo ? (
            <motion.div
              key={activeVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <video
                src={testimonials.find((t) => t.id === activeVideo)?.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <p className="text-gray-500">Select a testimonial to play</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
