import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ isOpen, setIsOpen }) {
  const { cart, removeFromCart, updateQuantity } =
    useContext(StoreContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-[ -20px_0_60px_rgba(0,0,0,0.25) ] p-6 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-6">
              Your Cart ({cart.length})
            </h2>

            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-start border-b pb-3"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, -1)
                          }
                          className="px-2 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, 1)
                          }
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold mb-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-full hover:bg-red-500 transition">
                  Checkout →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}