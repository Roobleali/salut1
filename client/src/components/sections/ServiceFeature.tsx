import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceFeatureProps {
  title: string;
  desire: string;
  outcome: string;
  delay?: number;
}

export function ServiceFeature({ title, desire, outcome, delay = 0 }: ServiceFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {title}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Desire</div>
              <p className="text-gray-700">{desire}</p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Outcome</div>
              <p className="text-gray-700">{outcome}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
