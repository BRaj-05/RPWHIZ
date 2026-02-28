import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } =
    useContext(StoreContext);

  const isLiked = wishlist.find(
    (item) => item._id === product._id
  );

  const discount = product.compareAtPrice
    ? Math.round(
        (1 - product.price / product.compareAtPrice) * 100
      )
    : 0;

  const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));

  return (
    <Link to={`/product/${product._id}`}>
    <div className="group">
      {/* Image Card */}
      <div className="relative aspect-[3/4] rounded-2xl bg-[#f4f1ec] flex items-center justify-center text-6xl overflow-hidden">

        {product.emoji}

        {/* Hover Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition duration-300">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-black text-white text-xs font-semibold py-2 rounded-full hover:bg-red-500 transition"
          >
            + Add to Cart
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:scale-110 transition ${
              isLiked ? "text-red-500" : ""
            }`}
          >
            {isLiked ? "♥" : "♡"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="font-semibold text-sm">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {product.brand}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold">
            ₹{product.price}
          </span>

          {product.compareAtPrice && (
            <>
              <span className="text-gray-400 line-through text-sm">
                ₹{product.compareAtPrice}
              </span>
              <span className="text-red-500 text-xs font-semibold">
                -{discount}%
              </span>
            </>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-1">
          <span className="text-yellow-500">{stars}</span>{" "}
          {product.rating} ({product.reviews})
        </div>
      </div>
    </div>
    </Link>
  );
}