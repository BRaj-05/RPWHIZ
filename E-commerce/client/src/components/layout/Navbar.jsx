import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------
   NAVBAR
   -------------------------------------------------------
   What changed here:
   - Category buttons now navigate back to home page
   - Category selection still updates the filtered products
   - Works from wishlist, checkout, admin, or anywhere else
   - Mobile menu uses the same logic
-------------------------------------------------------- */
export default function Navbar({ openCart, openAuth }) {
  const {
    cart,
    wishlist,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    user,
    logout,
    theme,
    toggleTheme,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // All navbar category options
  const categories = [
    { label: "All", value: "all" },
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Accessories", value: "accessories" },
  ];

  /* -------------------------------------------------------
     HANDLE CATEGORY CLICK
     -------------------------------------------------------
     This is the important fix:
     - updates selected category in context
     - sends user to home page
     - closes mobile menu if open
  -------------------------------------------------------- */
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-3">
      <div className="mx-auto max-w-7xl luxury-card rounded-[1.75rem] px-4 sm:px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Brand logo */}
          <Link
            to="/"
            onClick={() => setSelectedCategory("all")}
            className="text-2xl font-semibold tracking-tight luxury-title"
          >
            Shop<span className="text-red-500">ora</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search luxury essentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-5 py-3 pr-10 text-sm outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                ⌕
              </span>
            </div>
          </div>

          {/* Desktop Category Bar */}
          <div className="hidden lg:flex items-center gap-2 rounded-full bg-black/5 p-1 dark:bg-white/5">
            {categories.map((item) => (
              <button
                key={item.value}
                onClick={() => handleCategoryChange(item.value)}
                className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--text)] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] flex items-center justify-center transition hover:scale-105 cursor-pointer"
            >
              ♡
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] text-white flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] flex items-center justify-center transition hover:scale-105 cursor-pointer"
            >
              🛍
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] flex items-center justify-center transition hover:scale-105 cursor-pointer"
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={logout}
                className="hidden sm:inline-flex rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={openAuth}
                className="hidden sm:inline-flex rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="lg:hidden h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] cursor-pointer"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4 lg:hidden"
            >
              {/* Mobile Search */}
              <input
                type="text"
                placeholder="Search luxury essentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 w-full rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-5 py-3 text-sm outline-none"
              />

              {/* Mobile Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleCategoryChange(item.value)}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}