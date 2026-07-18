export default function InventoryTable({ items, onDelete, onEdit }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-xs font-bold text-slate-400 tracking-wider">
              <th className="p-4">PRODUCT / SKU</th>
              <th className="p-4">STOCK STATUS</th>
              <th className="p-4 text-right">QUANTITY</th>
              <th className="p-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {items.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500">No warehouse data available.</td>
              </tr>
            ) : (
              items.map((item) => {
                const isLowStock = item.quantity <= item.minStock;
                return (
                  <tr key={item.id} className="hover:bg-slate-850/30 transition">
                    <td className="p-4">
                      <div className="font-semibold text-slate-200">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.sku}</div>
                    </td>
                    <td className="p-4">
                      {isLowStock ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-900/50">LOW STOCK</span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900/50">STABLE</span>
                      )}
                    </td>
                    <td className="p-4 text-right font-mono font-semibold text-slate-300">{item.quantity}</td>
                    <td className="p-4 text-center space-x-3">
                      <button onClick={() => onEdit(item)} className="text-blue-400 hover:text-blue-300 text-xs cursor-pointer">Edit</button>
                      <button onClick={() => onDelete(item.id)} className="text-slate-600 hover:text-red-400 text-xs cursor-pointer">Delete</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}