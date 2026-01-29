import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsApi } from "../api/products.api"; // <- importante: coincide con tu export

export default function ProductDetail() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await productsApi.getById(id); // GET /products/:id
        if (alive) setItem(data);
      } catch (e) {
        if (alive) setError(e.message || "Error cargando producto");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex items-center justify-between">
        <Link to="/catalog" className="text-sm underline text-slate-300">
          ← Volver al catálogo
        </Link>
        <Link to="/" className="text-sm underline text-slate-300">
          Home
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
        {loading ? (
          <p className="text-slate-300">Cargando...</p>
        ) : error ? (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-200">
            {error}
          </div>
        ) : !item ? (
          <p className="text-slate-300">No se encontró el producto.</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{item.name}</h1>

            <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                ID: {item.id}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Categoría: {item.category_name || item.category_id}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Stock: {item.stock}
              </span>
            </div>

            <p className="mt-4 text-3xl font-extrabold">
              ${Number(item.price).toFixed(2)}
            </p>

            <p className="mt-4 text-slate-300">
              {item.description || "Sin descripción."}
            </p>

            {/* Imagen opcional si tienes URL */}
            {item.image_url ? (
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-72 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="mt-6 grid h-48 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400">
                Sin imagen
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
