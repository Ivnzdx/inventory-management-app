export default function SummaryCards({ items }) {
  const totalItems = items.length;
  const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = items.filter(item => item.quantity <= item.minStock).length;

  // Data konfigurasi kartu agar kode lebih rapi
  const cardData = [
    {
      title: "TOTAL UNIQUE ITEMS",
      value: totalItems,
      // Ikon Box Sederhana
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: "text-blue-200"
    },
    {
      title: "TOTAL STOCK VOLUME",
      value: totalStock,
      // Ikon Tumpukan Sederhana
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "text-indigo-200"
    },
    {
      title: "CRITICAL ALERTS (LOW STOCK)",
      value: lowStockCount,
      // Ikon Lonceng Peringatan Sederhana
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      color: lowStockCount > 0 ? "text-red-400" : "text-slate-400" // Warna teks dinamis
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div key={index} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition hover:border-slate-700 hover:scale-[1.02]">
          {/* Bagian Ikon */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            {card.icon}
          </div>
          {/* Bagian Teks & Angka */}
          <div>
            <div className="text-xs font-semibold text-slate-500 tracking-wider">{card.title}</div>
            <div className={`text-3xl font-black font-mono mt-1 ${card.color}`}>{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}