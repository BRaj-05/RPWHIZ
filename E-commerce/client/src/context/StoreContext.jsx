import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState("default");  
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // CART LOGIC
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
      setCart([
        ...cart,
        { ...product, quantity: 1 },
      ]);
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

  // WISHLIST
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
        sortOption,
        setSortOption,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};