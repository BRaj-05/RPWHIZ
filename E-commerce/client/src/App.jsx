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

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar
      openCart={() => setIsCartOpen(true)}
      openAuth={() => setIsAuthOpen(true)}
    />

      <Routes>
        <Route
        path="/admin"
        element={<AdminDashboard />}
      />
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
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>

      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
      />

      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />
    </div>
  );
}

export default App;