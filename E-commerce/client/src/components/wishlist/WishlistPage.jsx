import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   WISHLIST PAGE
-------------------------------------------------------- */
export default function WishlistPage({ openAuth }) {
  const { wishlist, toggleWishlist, addToCart, user } = useContext(StoreContext);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
            Saved Items
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.05em]">
            Your wishlist
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-[var(--line)] bg-[var(--surface-strong)] p-12 text-center">
            <p className="text-lg font-semibold">Your wishlist is empty.</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Save items you like and come back to them anytime.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-full bg-[var(--button-bg)] px-6 py-3 text-sm font-semibold text-[var(--button-text)]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-sm"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover"
                  />
                </Link>

                <div className="p-5">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.brand}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold">₹{item.price}</span>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="text-sm text-red-500"
                    >
                      Remove
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (!user) {
                        openAuth?.();
                        return;
                      }
                      addToCart(item);
                    }}
                    className="mt-4 w-full rounded-full bg-[var(--button-bg)] py-3 text-sm font-semibold text-[var(--button-text)]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}