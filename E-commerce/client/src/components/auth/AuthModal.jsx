import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   AUTH MODAL
-------------------------------------------------------- */
export default function AuthModal({ isOpen, setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(StoreContext);

  const handleSubmit = () => {
    if (!email || !password) return;

    login(email);
    setIsOpen(false);
    setEmail("");
    setPassword("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-[var(--surface-strong)] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
              <div className="bg-gradient-to-r from-black to-zinc-900 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-red-400">
                  Welcome to Shopora
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  {isLogin ? "Sign in to continue" : "Create your account"}
                </h2>
              </div>

              <div className="p-6">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-5 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full rounded-full bg-[var(--button-bg)] py-3.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white"
                >
                  {isLogin ? "Login" : "Register"}
                </button>

                <p className="mt-5 text-center text-sm text-[var(--muted)]">
                  {isLogin ? "No account yet?" : "Already registered?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-semibold text-red-500"
                  >
                    {isLogin ? "Create one" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}