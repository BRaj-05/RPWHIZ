import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-widest text-red-500 uppercase">
            ✦ New Collection 2026
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-light leading-tight tracking-tight">
            Style Your <br />
            <span className="font-semibold text-red-500">
              Story
            </span>
            , Own It.
          </h1>

          <p className="mt-6 text-gray-500 max-w-md text-sm leading-relaxed">
            Curated fashion, electronics, and lifestyle — all in one
            beautifully designed space built for the next generation.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-red-500 transition">
              Shop Now →
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition">
              View Lookbook
            </button>
          </div>
        </motion.div>

        {/* RIGHT GRID */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {["👗", "📱", "👟", "💄"].map((emoji, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-6xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}