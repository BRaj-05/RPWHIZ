import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Marquee from "./components/ui/Marquee";
import ProductGrid from "./components/product/ProductGrid";
import ProductDetails from "./components/product/ProductDetails";
import CartDrawer from "./components/cart/CartDrawer";
import AuthModal from "./components/auth/AuthModal";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import WishlistPage from "./components/wishlist/WishlistPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import Footer from "./components/layout/Footer";

/* -------------------------------------------------------
   APP ROOT
   -------------------------------------------------------
   Global overlays and page routes live here.
-------------------------------------------------------- */
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar
        openCart={() => setIsCartOpen(true)}
        openAuth={() => setIsAuthOpen(true)}
      />

      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

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

      <Footer />

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