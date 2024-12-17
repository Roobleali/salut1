import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Costel Ciobanu",
    company: "Coda Vinci SRL",
    rating: 5,
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747019/yf8u9a5ql7xvyij3bywh.jpg"
  },
  {
    name: "GRIGORE ANICA",
    company: "BREC Business and Real-Estate Consulting",
    rating: 5,
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747070/jpoxov3qweqyokkfeyco.png"
  },
  {
    name: "Sherif Abdala",
    company: "Gourmet Coffee SRL",
    rating: 5,
    image: "https://res.cloudinary.com/do3dahfvh/image/upload/v1731747105/ttt1fmtpdnxfv3gagevm.png"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">
            Trusted by leading businesses across industries
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
