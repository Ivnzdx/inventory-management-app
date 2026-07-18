import { useState, useEffect } from 'react';
import SummaryCards from './components/SummaryCards';
import InventoryForm from './components/InventoryForm';
import InventoryTable from './components/InventoryTable';

export default function App() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('inventory_items')) || [];
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('inventory_items', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER DENGAN WARNA YANG DIPAKSA PUTIH TERANG */}
        <header className="mb-8 block">
          <h1 className="text-4xl font-black tracking-tight text-white !text-slate-50" style={{ color: '#ffffff' }}>
            StockMaster Pro
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1" style={{ color: '#94a3b8' }}>
            Enterprise-grade Local Inventory Management System
          </p>
        </header>

        <SummaryCards items={items} />

        <div className="mt-8 max-w-md">
          <label className="block text-xs font-semibold text-slate-400 mb-1">SEARCH INVENTORY</label>
          <input 
            type="text" 
            placeholder="Type product name or SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-600"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <InventoryForm 
              onAddItem={handleAddItem} 
              onUpdateItem={handleUpdateItem}
              editingItem={editingItem}
              clearEdit={() => setEditingItem(null)}
            />
          </div>
          <div className="lg:col-span-2">
            <InventoryTable 
              items={filteredItems} 
              onDelete={handleDeleteItem} 
              onEdit={setEditingItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}