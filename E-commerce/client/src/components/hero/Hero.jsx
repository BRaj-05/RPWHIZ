import { motion } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { products } from "../../data/products";

/* -------------------------------------------------------
   HERO SECTION
   -------------------------------------------------------
   This version keeps the same design, but now:
   - hero cards reflect the active selectedCategory
   - clicking a card updates the navbar state
   - selected card gets a subtle highlighted look
-------------------------------------------------------- */
export default function Hero() {
  const { selectedCategory, setSelectedCategory } = useContext(StoreContext);

  const clothingImage =
    products.find((p) => p.category === "clothing")?.image || products[0]?.image;

  const electronicsImage =
    products.find((p) => p.category === "electronics")?.image ||
    products[0]?.image;

  const accessoriesImage =
    products.find((p) => p.category === "accessories")?.image ||
    products[0]?.image;

  const allImage = products[0]?.image;

  const scrollToCollection = () => {
    const target = document.getElementById("discover-collection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setTimeout(scrollToCollection, 0);
  };

  const cards = [
    {
      category: "clothing",
      badge: "New",
      image: clothingImage,
      title: "Luxury Dresses",
      caption: "Evening-ready silhouettes",
    },
    {
      category: "electronics",
      badge: "Trending",
      image: electronicsImage,
      title: "Smart Essentials",
      caption: "Clean tech accessories",
    },
    {
      category: "accessories",
      badge: "New",
      image: accessoriesImage,
      title: "Statement Bags",
      caption: "Polished daily carry",
    },
    {
      category: "all",
      badge: "Shop",
      image: allImage,
      title: "Explore Everything",
      caption: "Curated across all categories",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] luxury-card">
        <div className="grid lg:grid-cols-2 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 xl:px-16"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/15 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              New Season 2026
            </span>

            <h1 className="mt-6 max-w-xl text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-[-0.06em]">
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
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setTimeout(scrollToCollection, 0);
                }}
                className="rounded-full bg-[var(--button-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white cursor-pointer"
              >
                Explore Collection →
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 p-6 sm:p-8 lg:p-10 bg-[var(--surface-soft)]"
          >
            {cards.map((item, index) => {
              const isActive = selectedCategory === item.category;

              return (
                <motion.button
                  key={index}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(item.category)}
                  className={`group aspect-square rounded-[1.75rem] border p-5 flex flex-col justify-between overflow-hidden text-left shadow-[0_20px_50px_rgba(16,16,16,0.06)] cursor-pointer transition ${
                    isActive
                      ? "border-red-500/40 ring-2 ring-red-500/20"
                      : "border-[var(--line)] bg-[var(--surface-strong)]"
                  }`}
                >
                  <div className="flex justify-end">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-500">
                      {item.badge}
                    </span>
                  </div>

                  <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.25rem]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {item.caption}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}