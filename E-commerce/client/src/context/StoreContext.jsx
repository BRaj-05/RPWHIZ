import { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext();

/* -------------------------------------------------------
   GLOBAL APP STATE (UPGRADED)
-------------------------------------------------------- */
export const StoreProvider = ({ children }) => {
  
  // ================= CORE STATE =================
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // 🔥 NEW (ADMIN REQUIRED)
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // ================= FILTERS =================
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // ================= AUTH =================
  const [user, setUser] = useState(null);

  // ================= THEME =================
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("shopora-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("shopora-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ================= AUTH =================
  const login = (email) => {
    if (email === "admin@shopora.com") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
    } else {
      const normalUser = { email, role: "customer" };
      setUser(normalUser);
      localStorage.setItem("user", JSON.stringify(normalUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔥 LOAD USER FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ================= CART =================
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

  // ================= WISHLIST =================
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exist = prev.find((i) => i._id === product._id);

      if (exist) {
        return prev.filter((i) => i._id !== product._id);
      }

      return [...prev, product];
    });
  };

  // ================= ORDERS =================
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

  // ================= PROVIDER =================
  return (
    <StoreContext.Provider
      value={{
        // cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,

        // wishlist
        wishlist,
        toggleWishlist,

        // products (admin)
        products,
        setProducts,

        // orders (admin)
        orders,
        setOrders,
        placeOrder,

        // users
        users,
        setUsers,

        // filters
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,

        // auth
        user,
        login,
        logout,

        // theme
        theme,
        toggleTheme,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// ✅ THIS FIXES YOUR ERROR
// export const useStore = () => useContext(StoreContext);
// import { useContext } from "react";

export const useStore = () => useContext(StoreContext);