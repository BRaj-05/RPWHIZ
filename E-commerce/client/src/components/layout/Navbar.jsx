import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export default function Navbar({ openCart, openAuth }) {
  const {
    cart,
    wishlist,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useContext(StoreContext);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 shadow-sm border-b border-gray-200 px-8 h-16 flex items-center justify-between">

      {/* Logo */}
      <div className="text-xl font-semibold tracking-tight">
        Shop<span className="text-red-500">ora</span>
      </div>

      {/* Search Bar */}
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Category Links */}
      <div className="hidden lg:flex gap-6 text-sm text-gray-500">
        <button onClick={() => setSelectedCategory("all")} className="hover:text-black">
          All
        </button>
        <button onClick={() => setSelectedCategory("clothing")} className="hover:text-black">
          Clothing
        </button>
        <button onClick={() => setSelectedCategory("electronics")} className="hover:text-black">
          Electronics
        </button>
        <button onClick={() => setSelectedCategory("accessories")} className="hover:text-black">
          Accessories
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">

        {/* Wishlist */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
          ♡
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
        onClick={openAuth}
        className="bg-black text-white text-xs px-4 py-2 rounded-full hover:bg-red-500 transition"
        >
        Sign In
        </button>
      </div>
    </nav>
  );
}