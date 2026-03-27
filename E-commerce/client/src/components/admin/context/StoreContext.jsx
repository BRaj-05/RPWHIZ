import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const AdminStoreProvider = ({ children }) => {
  // PRODUCTS
  const [products, setProducts] = useState([
    {
      _id: 1,
      name: "Nike Shoes",
      price: 2999,
      stock: 3,
      category: "Footwear",
    },
  ]);

  // ORDERS
  const [orders, setOrders] = useState([
    {
      _id: "ORD1",
      user: "user@mail.com",
      grandTotal: 4999,
      status: "Pending",
    },
  ]);

  // USERS
  const [users, setUsers] = useState([
    {
      email: "user@mail.com",
      orders: 2,
      totalSpent: 9000,
    },
  ]);

  // SETTINGS
  const [settings, setSettings] = useState({
    storeName: "Shopora",
    currency: "INR",
  });

  // LOAD SETTINGS
  useEffect(() => {
    const saved = localStorage.getItem("admin_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // UPDATE SETTINGS
  const updateSettings = (data) => {
    setSettings(data);
    localStorage.setItem("admin_settings", JSON.stringify(data));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        orders,
        setOrders,
        users,
        setUsers,
        settings,
        updateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);