import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { products } from "../../data/products";
import ProductCard from "./ProductCard";

/* -------------------------------------------------------
   PRODUCT GRID
-------------------------------------------------------- */
export default function ProductGrid() {
  const { selectedCategory, searchQuery, sortOption, setSortOption } =
    useContext(StoreContext);

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (sortOption === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
              Curated Selection
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.04em]">
              Discover the collection
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
              Handpicked pieces across fashion, accessories, and essentials —
              styled to feel clean, modern, and premium.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-[var(--muted)]">Sort by</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm outline-none"
            >
              <option value="default">Featured</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-[var(--line)] bg-[var(--surface-strong)] p-12 text-center text-[var(--muted)]">
            No products found for this search or category.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}