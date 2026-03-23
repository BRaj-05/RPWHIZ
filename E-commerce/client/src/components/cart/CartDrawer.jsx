import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------
   CART DRAWER
-------------------------------------------------------- */
export default function CartDrawer({ isOpen, setIsOpen, onCheckout }) {
  const { cart, removeFromCart, updateQuantity } = useContext(StoreContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const goToCheckout = () => {
    setIsOpen(false);
    onCheckout?.();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-[var(--bg)] shadow-[0_0_60px_rgba(0,0,0,0.18)] sm:w-[440px]"
          >
            <div className="border-b border-[var(--line)] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
                    Shopping Bag
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Your Cart ({cart.length})
                  </h2>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-[var(--line)] bg-[var(--surface-strong)] p-8 text-sm text-[var(--muted)]">
                  Your cart is empty.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />

                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-[var(--muted)]">{item.brand}</p>
                          <p className="mt-2 text-sm font-semibold">₹{item.price}</p>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              className="h-8 w-8 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]"
                            >
                              -
                            </button>
                            <span className="min-w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="h-8 w-8 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-sm text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[var(--line)] p-6">
                <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                  onClick={goToCheckout}
                  className="w-full rounded-full bg-[var(--button-bg)] py-4 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white"
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}