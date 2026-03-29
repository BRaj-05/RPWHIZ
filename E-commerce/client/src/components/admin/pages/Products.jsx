import AdminLayout from "../layout/AdminLayout";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
} from "../../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // 🔥 FETCH FROM BACKEND
  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ADD / EDIT
 const handleSubmit = async () => {
  try {
    const payload = {
      name: form.name,
      price: Number(form.price),   // ✅ FIX
      stock: Number(form.stock),   // ✅ FIX
    };

    console.log("Sending:", payload); // DEBUG

    if (editing) {
      await editProduct(editing._id, payload);
    } else {
      await addProduct(payload);
    }

    alert("Product Saved ✅");

    setModal(false);
    setEditing(null);
    setForm({ name: "", price: "", stock: "" });

    loadProducts();

  } catch (err) {
    console.error("SAVE ERROR:", err.response?.data || err.message);
    alert("Failed to save ❌");
  }
};

  // DELETE
  const handleDelete = async (id) => {
    await removeProduct(id);
    loadProducts();
  };

  // EDIT
  const handleEdit = (p) => {
    setEditing(p);
    setForm(p);
    setModal(true);
  };

   return (
  <>
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Products</h1>

      <button
        onClick={() => setModal(true)}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        + Add Product
      </button>
    </div>

    {/* TABLE */}
    <div className="mt-6 bg-white/5 p-5 rounded-xl">
      {products.length === 0 ? (
        <p className="text-gray-500">No products yet</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-400">
                ₹{p.price} • Stock: {p.stock}
              </p>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => handleEdit(p)}
                className="text-blue-400"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* MODAL */}
    {modal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-[#020617] p-6 rounded-xl w-[350px]">
          <h2 className="mb-4 text-lg font-semibold">
            {editing ? "Edit Product" : "Add Product"}
          </h2>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full mb-3 px-3 py-2 bg-white/5 rounded"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="w-full mb-3 px-3 py-2 bg-white/5 rounded"
          />

          <input
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            className="w-full mb-4 px-3 py-2 bg-white/5 rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    )}
  </>
);
}