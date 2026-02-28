import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const [user, setUser] = useState(null);

  // Fake login
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

  // CART
  const addToCart = (product) => {
    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + amount > 0
                  ? item.quantity + amount
                  : 1,
            }
          : item
      )
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => item._id !== product._id
        )
      );
    } else {
      setWishlist([...wishlist, product]);
    }
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
        login,
        logout,
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