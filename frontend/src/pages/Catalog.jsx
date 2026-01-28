import { Link } from "react-router-dom";

export default function Catalog() {
  // Dummy data (luego lo reemplazas por API)
  const products = [
    { id: 1, name: "Gorra Negra", price: 299 },
    { id: 2, name: "Gorra Azul", price: 349 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catálogo</h1>
        <Link to="/admin" className="text-sm underline text-slate-300">
          Ir a Admin
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <p className="font-semibold">{p.name}</p>
            <p className="mt-2 text-slate-300">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
