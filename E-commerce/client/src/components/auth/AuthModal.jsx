import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

export default function AuthModal({ isOpen, setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithGoogle } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    const result = isLogin
      ? await login(email.trim(), password)
      : await signup(email.trim(), password);
    setLoading(false);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setEmail("");
    setPassword("");
    setMessage("");
    setIsOpen(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await loginWithGoogle();
    setLoading(false);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

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
                disabled={loading}
                className="w-full rounded-full bg-[var(--button-bg)] py-3.5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-red-500 hover:text-white cursor-pointer disabled:opacity-60"
              >
                {loading ? "Please wait…" : isLogin ? "Login" : "Register"}
              </button>

              <div className="my-4 flex items-center gap-3">
                <span className="flex-1 border-t border-[var(--line)]" />
                <span className="text-xs text-[var(--muted)]">or</span>
                <span className="flex-1 border-t border-[var(--line)]" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] py-3 text-sm font-medium transition hover:bg-[var(--surface)] cursor-pointer disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
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
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}