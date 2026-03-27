import AdminLayout from "../layout/AdminLayout";
import { useStore } from "../../../context/StoreContext";
import { useState } from "react";

export default function Products() {
  const { products, setProducts } = useStore();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const [editing, setEditing] = useState(null);

  // ADD PRODUCT
  const handleAdd = () => {
    if (!form.name) return;

    setProducts([
      ...products,
      {
        _id: Date.now(),
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      },
    ]);

    setForm({ name: "", price: "", stock: "", category: "" });
  };

  // DELETE PRODUCT
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  // UPDATE PRODUCT
  const handleUpdate = () => {
    setProducts(
      products.map((p) =>
        p._id === editing._id ? editing : p
      )
    );
    setEditing(null);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Products</h1>

      {/* ADD FORM */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="bg-white/5 px-3 py-2 rounded"
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="bg-white/5 px-3 py-2 rounded"
        />
        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
          className="bg-white/5 px-3 py-2 rounded"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="bg-white/5 px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-red-500 px-4 py-2 rounded mt-3"
      >
        Add Product
      </button>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/5 p-4 rounded-xl border border-white/10"
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>
            <p className="text-xs text-gray-400">{p.category}</p>

            {p.stock < 5 && (
              <span className="text-red-400 text-xs">
                Low Stock
              </span>
            )}

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setEditing(p)}
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
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-[#020617] p-6 rounded-xl w-[400px]">

            <h2>Edit Product</h2>

            <input
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="w-full mt-3 bg-white/5 px-3 py-2 rounded"
            />

            <input
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: e.target.value })
              }
              className="w-full mt-3 bg-white/5 px-3 py-2 rounded"
            />

            <div className="flex gap-3 mt-4">
              <button onClick={() => setEditing(null)}>
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}