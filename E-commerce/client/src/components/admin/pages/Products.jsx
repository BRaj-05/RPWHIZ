import { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 15", price: 80000, stock: 10 },
    { id: 2, name: "Nike Shoes", price: 5000, stock: 25 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // ADD / UPDATE
  const handleSubmit = () => {
    if (!form.name || !form.price) return;

    if (editing) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...form } : p
        )
      );
    } else {
      setProducts([
        ...products,
        { id: Date.now(), ...form },
      ]);
    }

    setForm({ name: "", price: "", stock: "" });
    setEditing(null);
    setShowModal(false);
  };

  // DELETE
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // EDIT
  const handleEdit = (product) => {
    setEditing(product);
    setForm(product);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">

          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">

                <td className="p-3">{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-[#020617] p-6 rounded-xl w-[350px] border border-white/10">

            <h2 className="text-lg mb-4">
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

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}