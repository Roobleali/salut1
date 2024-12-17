import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

interface TeamSpotlightProps {
  members: TeamMember[];
}

export function TeamSpotlight({ members }: TeamSpotlightProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {members.map((member) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden h-full">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-white/80">{member.role}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-gray-600">{member.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <TooltipProvider key={skill}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="secondary">{skill}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Expert in {skill}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
