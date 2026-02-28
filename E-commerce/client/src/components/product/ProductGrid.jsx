import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { products } from "../../data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const {
    selectedCategory,
    searchQuery,
    sortOption,
    setSortOption,
  } = useContext(StoreContext);

  let filteredProducts = products.filter(
    (product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }
  );

  if (sortOption === "low-high") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOption === "high-low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortOption === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div className="px-8 py-10">
      <div className="flex justify-end mb-6">
        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value)
          }
          className="border px-4 py-2 rounded"
        >
          <option value="default">
            Default
          </option>
          <option value="low-high">
            Price: Low → High
          </option>
          <option value="high-low">
            Price: High → Low
          </option>
          <option value="rating">
            Top Rated
          </option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}