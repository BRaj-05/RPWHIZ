import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   PRODUCT DETAILS
-------------------------------------------------------- */
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(StoreContext);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="px-6 py-20 text-center text-[var(--muted)]">
        Product not found
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-gradient-to-br from-[#f8f4ef] via-white to-[#f2ece6] p-8 sm:p-12 flex items-center justify-center min-h-[520px]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full max-h-[420px] rounded-[2rem] object-cover shadow-[0_20px_60px_rgba(16,16,16,0.10)]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 w-fit text-sm text-[var(--muted)] hover:text-[var(--text)]"
          >
            ← Back
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.05em]">
            {product.name}
          </h1>

          <p className="mt-3 text-[var(--muted)]">{product.brand}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-semibold">₹{product.price}</span>

            {product.compareAtPrice && (
              <>
                <span className="text-[var(--muted)] line-through">
                  ₹{product.compareAtPrice}
                </span>
                <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-500">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-[var(--muted)]">
            <span className="text-yellow-500">⭐</span>
            <span>
              {product.rating} rating ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => addToCart(product)}
              className="rounded-full bg-[var(--button-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white"
            >
              Add to Cart →
            </button>

            <button className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--text)] hover:text-[var(--bg)]">
              Save to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}