import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import API from "../services/api";
import { useRef } from "react"; // add at top

export const StoreContext = createContext();

function getAuthError(code) {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/email-already-in-use":
      return "Email already registered";
    case "auth/weak-password":
      return "Password must be at least 6 characters";
    case "auth/invalid-email":
      return "Invalid email address";
    default:
      return "Authentication failed. Please try again.";
  }
}

export const StoreProvider = ({ children }) => {

  // ================= CORE STATE =================
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ADMIN FEATURES
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // ================= FILTERS =================
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // ================= AUTH =================
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ================= THEME =================
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("shopora-theme") || "light";
  });

  /* ---------------- THEME ---------------- */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("shopora-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /* ---------------- FIREBASE AUTH LISTENER ---------------- */
// let isSynced = false;

const isSyncedRef = useRef(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

    if (!firebaseUser) {
      setUser(null);
      setAuthLoading(false);
      isSyncedRef.current = false;
      return;
    }

    // ✅ ONLY CALL BACKEND ONCE
    if (!isSyncedRef.current) {
      isSyncedRef.current = true;

      try {
        const { data } = await API.post("/auth/login");

        setUser(data.data.user); // ✅ ONLY ONE setUser
      } catch (err) {
        console.log("Backend sync failed");
      }
    }

    setAuthLoading(false);
  });

  return unsubscribe;
}, []);
  /* ---------------- LOGIN ---------------- */
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      return { success: false, message: getAuthError(err.code) };
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const signup = async (email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, {
        displayName: email.split("@")[0],
      });
      return { success: true };
    } catch (err) {
      return { success: false, message: getAuthError(err.code) };
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  /* ---------------- CART ---------------- */
  const addToCart = (product) => {
  setCart((prev) => {
    const exist = prev.find((i) => i._id === product._id);

    if (exist) {
      return prev.map((i) =>
        i._id === product._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });

  // 🔥 AUTO OPEN CART DRAWER
  setIsCartOpen(true);
};

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id
          ? { ...i, quantity: Math.max(1, i.quantity + amount) }
          : i
      )
    );
  };

  /* ---------------- WISHLIST ---------------- */
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exist = prev.find((i) => i._id === product._id);

      if (exist) {
        return prev.filter((i) => i._id !== product._id);
      }

      return [...prev, product];
    });
  };

  /* ---------------- ORDERS ---------------- */
  const placeOrder = (orderData) => {
    const newOrder = {
      _id: "ORD-" + Date.now(),
      items: cart,
      status: "Pending",
      grandTotal: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      createdAt: new Date(),
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  const openCartDrawer = () => setIsCartOpen(true);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        openCartDrawer,
        products,
        setProducts,
        orders,
        setOrders,
        users,
        setUsers,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        user,
        authLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        theme,
        toggleTheme,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);