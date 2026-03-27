import { useState } from "react";

export default function EditProductModal({ product, onSave, onClose }) {
  const [name, setName] = useState(product.name);

  const handleSave = () => {
    onSave({ ...product, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-[#020617] p-6 rounded-2xl w-[400px] border border-white/10">

        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSave}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}