import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// CUSTOMER UI
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

// ADMIN
import AdminRoutes from "./components/admin/AdminRoutes";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLogin from "./components/admin/pages/AdminLogin";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const location = useLocation();

  // ✅ Detect admin routes correctly
  const isAdminRoute = location.pathname.startsWith("/control-center-7845");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* ✅ CUSTOMER NAVBAR ONLY */}
      {!isAdminRoute && (
        <Navbar
          openCart={() => setIsCartOpen(true)}
          openAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* ROUTES */}
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
              <Hero />
              <Marquee />
              <ProductGrid />
            </>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>

      {/* ✅ CUSTOMER FOOTER ONLY */}
      {!isAdminRoute && <Footer />}

      {/* GLOBAL */}
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