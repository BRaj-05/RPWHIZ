import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

/* -------------------------------------------------------
   GLOBAL APP STATE
   -------------------------------------------------------
   This stores:
   - cart
   - wishlist
   - filters
   - user auth
   - theme
   Theme is saved in localStorage so it persists.
-------------------------------------------------------- */
export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [user, setUser] = useState(null);

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

  // Fake login for now.
  const login = (email) => {
    if (email === "admin@shopora.com") {
      setUser({ email, role: "admin" });
    } else {
      setUser({ email, role: "customer" });
    }
  };

  const logout = () => {
    setUser(null);
  };

  // -----------------------------------------------------
  // CART ACTIONS
  // -----------------------------------------------------
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // -----------------------------------------------------
  // WISHLIST ACTIONS
  // -----------------------------------------------------
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item._id === product._id);

      if (exists) {
        return prevWishlist.filter((item) => item._id !== product._id);
      }

      return [...prevWishlist, product];
    });
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        selectedCategory,
        searchQuery,
        sortOption,
        user,
        theme,
        login,
        logout,
        toggleTheme,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        setSelectedCategory,
        setSearchQuery,
        setSortOption,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};