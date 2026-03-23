import { motion } from "framer-motion";

/* -------------------------------------------------------
   HERO SECTION
   -------------------------------------------------------
   Theme-aware hero:
   - no hardcoded light-only colors
   - no Tailwind dark: utilities
   - uses CSS variables only
-------------------------------------------------------- */
export default function Hero() {
  const highlights = [
    {
      emoji: "👗",
      title: "Luxury Dresses",
      caption: "Evening-ready silhouettes",
      badge: "Featured",
    },
    {
      emoji: "📱",
      title: "Smart Essentials",
      caption: "Clean tech accessories",
      badge: "New",
    },
    {
      emoji: "👜",
      title: "Statement Bags",
      caption: "Polished daily carry",
      badge: "New",
    },
    {
      emoji: "💄",
      title: "Beauty Icons",
      caption: "Elegant finishing touches",
      badge: "New",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_50px_rgba(16,16,16,0.08)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-2">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 xl:px-16 text-[var(--text)]"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/15 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              New Season 2026
            </span>

            <h1 className="mt-6 max-w-xl text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-[-0.06em] text-[var(--text)]">
              Fashion that feels{" "}
              <span className="font-semibold text-red-500">curated</span>,
              <br />
              not crowded.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--muted)]">
              Shopora brings together modern fashion, premium accessories, and
              contemporary tech in a refined shopping experience built for users
              who value style and simplicity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-[var(--button-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white">
                Explore Collection →
              </button>

              <button className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--text)] hover:text-[var(--bg)]">
                View Lookbook
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
                <p className="text-xl font-semibold text-[var(--text)]">250+</p>
                <p className="text-xs text-[var(--muted)] mt-1">Curated products</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
                <p className="text-xl font-semibold text-[var(--text)]">7-day</p>
                <p className="text-xs text-[var(--muted)] mt-1">Easy returns</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] p-4">
                <p className="text-xl font-semibold text-[var(--text)]">24/7</p>
                <p className="text-xs text-[var(--muted)] mt-1">Premium support</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 p-6 sm:p-8 lg:p-10 bg-[var(--surface-soft)]"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group aspect-square rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(16,16,16,0.06)]"
              >
                <div className="flex justify-end">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-500">
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-1 items-center justify-center text-7xl">
                  {item.emoji}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}