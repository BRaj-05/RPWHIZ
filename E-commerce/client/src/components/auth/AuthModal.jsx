import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

/* -------------------------------------------------------
   CENTERED AUTH MODAL
   -------------------------------------------------------
   What this fixes:
   - keeps the same rectangular design
   - clicking outside the popup closes it
   - clicking inside the popup does not close it
   - no reload needed
-------------------------------------------------------- */
export default function AuthModal({ isOpen, setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, signup } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in both email and password.");
      return;
    }

    const result = isLogin
      ? login(email.trim(), password)
      : signup(email.trim(), password);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setEmail("");
    setPassword("");
    setMessage("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* 
            This card stops click propagation, so clicks inside
            the popup do not close it.
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
          >
            <div className="bg-gradient-to-r from-black to-zinc-900 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">
                Welcome to Shopora
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {isLogin ? "Sign in to continue" : "Create your account"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                className="mb-3 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                className="mb-4 w-full rounded-full border border-[var(--line)] bg-transparent px-4 py-3 text-sm outline-none"
              />

              {message && (
                <p className="mb-4 text-sm text-red-500">{message}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-[var(--button-bg)] py-3.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white cursor-pointer"
              >
                {isLogin ? "Login" : "Register"}
              </button>

              <p className="mt-5 text-center text-sm text-[var(--muted)]">
                {isLogin ? "No account yet?" : "Already registered?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                  }}
                  className="font-semibold text-red-500 cursor-pointer"
                >
                  {isLogin ? "Create one" : "Login"}
                </button>
              </p>

              <p className="mt-4 text-center text-xs text-[var(--muted)]">
                Admin demo: admin@shopora.com / admin123
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}