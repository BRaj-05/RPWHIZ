import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export default function AuthModal({ isOpen, setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(StoreContext);

  const handleSubmit = () => {
    if (!email || !password) return;

    login(email);        // 🔥 connect to context
    setIsOpen(false);    // close modal
    setEmail("");
    setPassword("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-2xl w-[350px] shadow-2xl">
              <h2 className="text-xl font-semibold mb-6">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 px-4 py-2 border rounded"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded"
              />

              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-2 rounded hover:bg-red-500 transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>

              <p className="text-sm mt-4 text-center">
                {isLogin
                  ? "No account?"
                  : "Already registered?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-500"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}