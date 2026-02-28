import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(StoreContext);

  const product = products.find(
    (p) => p._id === id
  );

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product not found
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(
        (1 - product.price / product.compareAtPrice) * 100
      )
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-16">

      {/* LEFT SIDE */}
      <div className="bg-gray-100 rounded-3xl flex items-center justify-center text-8xl">
        {product.emoji}
      </div>

      {/* RIGHT SIDE */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 mb-4"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-semibold mb-3">
          {product.name}
        </h1>

        <p className="text-gray-500 mb-4">
          {product.brand}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold">
            ₹{product.price}
          </span>

          {product.compareAtPrice && (
            <>
              <span className="text-gray-400 line-through">
                ₹{product.compareAtPrice}
              </span>
              <span className="text-red-500 text-sm">
                -{discount}%
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-6">
          ⭐ {product.rating} ({product.reviews} reviews)
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-red-500 transition"
        >
          Add to Cart →
        </button>
      </div>
    </div>
  );
}