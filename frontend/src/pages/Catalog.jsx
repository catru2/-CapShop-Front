import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Catálogo</h1>
        <Link to="/admin" className="text-sm underline text-slate-300">
          Ir a Admin
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-300">Cargando productos...</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <p className="font-semibold">{p.name}</p>
              <p className="mt-1 text-slate-300">{p.category_name}</p>
              <p className="mt-2 text-slate-200 font-semibold">${p.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
