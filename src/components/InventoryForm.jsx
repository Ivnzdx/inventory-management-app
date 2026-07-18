import { useState, useEffect } from 'react';

export default function InventoryForm({ onAddItem, onUpdateItem, editingItem, clearEdit }) {
  const [formData, setFormData] = useState({ name: '', sku: '', quantity: '', minStock: '' });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        sku: editingItem.sku,
        quantity: editingItem.quantity.toString(),
        minStock: editingItem.minStock.toString(),
      });
    } else {
      setFormData({ name: '', sku: '', quantity: '', minStock: '' });
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      name: formData.name,
      sku: formData.sku,
      quantity: parseInt(formData.quantity) || 0,
      minStock: parseInt(formData.minStock) || 0,
    };

    if (editingItem) {
      onUpdateItem({ ...itemData, id: editingItem.id });
    } else {
      onAddItem(itemData);
    }
    setFormData({ name: '', sku: '', quantity: '', minStock: '' });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
      <h2 className="text-lg font-bold text-slate-200 mb-4">
        {editingItem ? '⚙️ Edit Product' : '📦 Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">PRODUCT NAME</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-700"
            placeholder="e.g. Kahf Face Wash"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">SKU / CODE</label>
          <input
            type="text"
            required
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-700"
            placeholder="e.g. KHF-0971"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">STOCK QTY</label>
            <input
              type="number"
              required
              min="0"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-700"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">MIN STOCK LEVEL</label>
            <input
              type="number"
              required
              min="0"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-700"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl transition shadow-lg shadow-blue-950/20 active:scale-[0.98]"
          >
            {editingItem ? 'Save Changes' : 'Add to Inventory'}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={clearEdit}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold px-4 rounded-xl transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}