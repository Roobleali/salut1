import { m } from "framer-motion";

export function LearnAnimation() {
  return (
    <div className="relative mt-8 mb-4">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 50A29.5 29.5 0 0 1 50 20.5M50 79.5A29.5 29.5 0 0 1 79.5 50' stroke='%23000' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: "50px 50px",
        }}
      />
      <m.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <m.div
            className="relative max-w-3xl mx-auto backdrop-blur-sm p-8 rounded-2xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
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
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
