import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------
   NAVBAR
   -------------------------------------------------------
   Premium top navigation:
   - search
   - categories
   - wishlist
   - cart
   - auth
   - theme toggle
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { label: "All", value: "all" },
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Accessories", value: "accessories" },
  ];

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-3">
      <div className="mx-auto max-w-7xl luxury-card rounded-[1.75rem] px-4 sm:px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <Link to="/" className="text-2xl font-semibold tracking-tight luxury-title">
            Shop<span className="text-red-500">ora</span>
          </Link>

          {/* Search */}
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

          {/* Category bar */}
          <div className="hidden lg:flex items-center gap-2 rounded-full bg-black/5 p-1 dark:bg-white/5">
            {categories.map((item) => (
              <button
                key={item.value}
                onClick={() => setSelectedCategory(item.value)}
                className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--text)]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/wishlist"
              className="relative h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] flex items-center justify-center transition hover:scale-105"
            >
              ♡
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] text-white flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] flex items-center justify-center transition hover:scale-105"
            >
              🛍
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-red-500 px-1 text-[10px] text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] flex items-center justify-center transition hover:scale-105"
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {user ? (
              <button
                onClick={logout}
                className="hidden sm:inline-flex rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={openAuth}
                className="hidden sm:inline-flex rounded-full bg-[var(--button-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="lg:hidden h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4 lg:hidden"
            >
              <input
                type="text"
                placeholder="Search luxury essentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 w-full rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-5 py-3 text-sm outline-none"
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setSelectedCategory(item.value);
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)]"
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