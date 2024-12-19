import { m } from "framer-motion";

export function Timeline() {
  return (
    <div className="relative max-w-3xl mx-auto px-4">
      <svg
        className="w-full h-40 md:h-48"
        viewBox="0 0 800 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <m.path
          d="M0 50 H800"
          stroke="#E5E7EB"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <m.circle
          cx="200"
          cy="50"
          r="10"
          fill="#7C3AED"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />

        <m.circle
          cx="600"
          cy="50"
          r="10"
          fill="#34A853"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        />
      </svg>

      <m.div
        className="absolute top-12 left-[calc(25%-100px)] text-base md:text-lg text-gray-600 w-48 text-center font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Aqoon la'aan
      </m.div>

      <m.div
        className="absolute top-12 right-[calc(25%-100px)] text-base md:text-lg text-gray-600 w-48 text-center font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        Waa iftiin la'aan
      </m.div>
    </div>
  );
}
