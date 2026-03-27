import { useState, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Marquee from "./components/ui/Marquee";
import ProductGrid from "./components/product/ProductGrid";
import ProductDetails from "./components/product/ProductDetails";
import CartDrawer from "./components/cart/CartDrawer";
import WishlistPage from "./components/wishlist/WishlistPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import Footer from "./components/layout/Footer";
import AuthModal from "./components/auth/AuthModal";

import { StoreContext } from "./context/StoreContext";

// ADMIN
import AdminRoutes from "./components/admin/AdminRoutes";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLogin from "./components/admin/pages/AdminLogin";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const location = useLocation();

  // detect admin route
  const isAdmin = location.pathname.startsWith("/control-center-7845");

  // category logic (from context)
  const { selectedCategory } = useContext(StoreContext);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* Navbar only for customer */}
      {!isAdmin && (
        <Navbar
          openCart={() => setIsCartOpen(true)}
          openAuth={() => setIsAuthOpen(true)}
        />
      )}

      <Routes>

        {/* ADMIN LOGIN */}
        <Route
          path="/control-center-7845/login"
          element={<AdminLogin />}
        />

        {/* ADMIN PANEL */}
        <Route
          path="/control-center-7845/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* CUSTOMER ROUTES */}
        <Route
          path="/wishlist"
          element={<WishlistPage openAuth={() => setIsAuthOpen(true)} />}
        />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/"
          element={
            <>
              {/* Hero / Category Banner */}
              {selectedCategory === "all" ? (
                <>
                  <Hero />
                  <Marquee />
                </>
              ) : (
                <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                  <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
                      {selectedCategory}
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.05em]">
                      {selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)} collection
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
                      Explore curated products from this category.
                    </p>
                  </div>
                </section>
              )}

              <ProductGrid />
            </>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>

      {/* Footer only for customer */}
      {!isAdmin && <Footer />}

      {/* GLOBAL COMPONENTS */}
      <AuthModal isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />

      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        onCheckout={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;

// admin login
// email: admin@shopora.com
// password: admin123