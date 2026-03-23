import { Link } from "react-router-dom";

/* -------------------------------------------------------
   LUXURY FOOTER
-------------------------------------------------------- */
export default function Footer() {
  return (
    <footer className="mt-14 border-t border-[var(--line)] px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">
            Shop<span className="text-red-500">ora</span>
          </h3>
          <p className="mt-3 max-w-sm text-sm text-[var(--muted)]">
            A premium fashion-first ecommerce experience built for modern browsing.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Shop</h4>
          <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <Link to="/">All Products</Link><br />
            <Link to="/wishlist">Wishlist</Link><br />
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Support</h4>
          <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <p>Shipping & Returns</p>
            <p>Track Order</p>
            <p>Contact Support</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Newsletter</h4>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Get launch updates, new collections, and premium offers.
          </p>
          <div className="mt-4 flex gap-2">
            <input
              placeholder="Email address"
              className="w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none"
            />
            <button className="rounded-full bg-[var(--button-bg)] px-5 py-3 text-sm font-semibold text-[var(--button-text)]">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}