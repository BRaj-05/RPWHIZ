import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   PRODUCT CARD
   -------------------------------------------------------
   This version adds:
   - cursor-pointer on all interactive areas
   - better hover feedback
   - preserved add-to-cart / wishlist actions
-------------------------------------------------------- */
export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useContext(StoreContext);

  const isLiked = wishlist.find((item) => item._id === product._id);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));

  const badgeLabel = product.badges?.[0] || "curated";

  return (
    <Link to={`/product/${product._id}`} className="block cursor-pointer">
      <div className="group overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_16px_40px_rgba(16,16,16,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,16,16,0.10)]">
        {/* Visual area */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#f8f4ef] via-[#fdfdfd] to-[#f3eded]">
          {/* Soft premium blob behind the product image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,59,63,0.10),transparent_45%)]" />

          {/* Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {badgeLabel}
            </span>
          </div>

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute right-4 top-4 z-10">
              <span className="rounded-full bg-red-500 px-3 py-1 text-[11px] font-semibold text-white">
                -{discount}%
              </span>
            </div>
          )}

          {/* Product image */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover actions */}
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="flex-1 rounded-full bg-[var(--button-bg)] px-4 py-3 text-xs font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white cursor-pointer select-none"
              >
                + Add to Cart
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                aria-label="Toggle wishlist"
                className={`h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] transition hover:scale-105 cursor-pointer select-none ${
                  isLiked ? "text-red-500" : "text-[var(--muted)]"
                }`}
              >
                {isLiked ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>

        {/* Info area */}
        <div className="p-5">
          <h3 className="text-sm font-semibold leading-6 text-[var(--text)]">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">{product.brand}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-lg font-semibold text-[var(--text)]">
              ₹{product.price}
            </span>

            {product.compareAtPrice && (
              <span className="text-sm text-[var(--muted)] line-through">
                ₹{product.compareAtPrice}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-[var(--muted)]">
              <span className="text-yellow-500">{stars}</span> {product.rating} (
              {product.reviews})
            </p>
            <span className="text-xs font-medium text-red-500">
              Premium pick
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}