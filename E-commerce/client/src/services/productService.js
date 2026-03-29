import API from "./api";

// GET
export const fetchProducts = () => API.get("/products");

// POST
export const addProduct = (data) =>
  API.post("/products", data);

// PUT
export const editProduct = (id, data) =>
  API.put(`/products/${id}`, data);

// DELETE
export const removeProduct = (id) =>
  API.delete(`/products/${id}`);