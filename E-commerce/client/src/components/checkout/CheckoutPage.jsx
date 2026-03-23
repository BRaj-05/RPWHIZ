import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   CHECKOUT PAGE
   -------------------------------------------------------
   Frontend-only checkout layout for now.
-------------------------------------------------------- */
export default function CheckoutPage() {
  const { cart } = useContext(StoreContext);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
            Shipping details
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className="rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none" placeholder="First name" />
            <input className="rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none" placeholder="Last name" />
            <input className="sm:col-span-2 rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none" placeholder="Email" />
            <input className="sm:col-span-2 rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none" placeholder="Address" />
            <input className="rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none" placeholder="City" />
            <input className="rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none" placeholder="Pincode" />
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-black p-5 text-white">
            <p className="text-sm text-white/70">Payment</p>
            <p className="mt-2 text-sm text-white/60">
              This is a frontend checkout page. Connect Razorpay/Stripe later.
            </p>
          </div>

          <button className="mt-6 w-full rounded-full bg-[var(--button-bg)] py-4 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white">
            Place Order →
          </button>
        </div>

        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-[var(--muted)]">No items in cart.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--line)] p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-[var(--muted)]">Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 space-y-3 border-t border-[var(--line)] pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}