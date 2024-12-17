import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Rocket, Users, Building } from "lucide-react";

interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: "achievement" | "growth" | "launch" | "team" | "office";
}

interface TimelineProps {
  milestones: TimelineMilestone[];
}

const categoryIcons = {
  achievement: Trophy,
  growth: Award,
  launch: Rocket,
  team: Users,
  office: Building,
};

const categoryColors = {
  achievement: "bg-yellow-500",
  growth: "bg-green-500",
  launch: "bg-blue-500",
  team: "bg-purple-500",
  office: "bg-orange-500",
};

export function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />

      <div className="space-y-12">
        {milestones.map((milestone, index) => {
          const Icon = categoryIcons[milestone.category];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Timeline content */}
              <div className={`w-1/2 ${isEven ? "pr-8 text-right" : "pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2 justify-start">
                        <Badge variant="outline" className="text-sm">
                          {milestone.year}
                        </Badge>
                        <Badge className={`${categoryColors[milestone.category]} text-white`}>
                          {milestone.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Timeline node */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-12 h-12 rounded-full border-4 border-background flex items-center justify-center ${categoryColors[milestone.category]}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </motion.div>

              {/* Empty space for alternating layout */}
              <div className="w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
