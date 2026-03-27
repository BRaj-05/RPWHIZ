import { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext();

/* -------------------------------------------------------
   LOCAL STORAGE HELPERS
-------------------------------------------------------- */
const getStoredUsers = () => {
  const raw = localStorage.getItem("shopora-users");
  return raw ? JSON.parse(raw) : [];
};

const getStoredUser = () => {
  const raw = localStorage.getItem("shopora-current-user");
  return raw ? JSON.parse(raw) : null;
};

export const StoreProvider = ({ children }) => {

  // ================= CORE STATE =================
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
  const [user, setUser] = useState(() => getStoredUser());
  const [storedUsers, setStoredUsers] = useState(() => getStoredUsers());

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

  /* ---------------- AUTH STORAGE ---------------- */
  useEffect(() => {
    localStorage.setItem("shopora-current-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("shopora-users", JSON.stringify(storedUsers));
  }, [storedUsers]);

  /* ---------------- LOGIN ---------------- */
  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Enter email & password" };
    }

    if (email === "admin@shopora.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      return { success: true };
    }

    const found = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid credentials" };
    }

    setUser({ email, role: "customer" });
    return { success: true };
  };

  /* ---------------- SIGNUP ---------------- */
  const signup = (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Fill all fields" };
    }

    const exists = storedUsers.find((u) => u.email === email);
    if (exists) {
      return { success: false, message: "User already exists" };
    }

    const newUser = { email, password };
    setStoredUsers((prev) => [...prev, newUser]);
    setUser({ email, role: "customer" });

    return { success: true };
  };

  const logout = () => {
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

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
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
        login,
        signup,
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