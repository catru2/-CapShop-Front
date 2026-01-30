import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsApi } from "../api/products.api";
import { formatMXN } from "../utils/money";

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
        const data = await productsApi.getById(id);
        if (alive) setItem(data);
      } catch (e) {
        if (alive) setError(e.message || "Error cargando producto");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => (alive = false);
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top actions */}
      <div className="px-4 sm:px-6 pt-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-3">

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 transition"
          >
            Volver a landing
          </Link>
        </div>
      </div>

      {/* Card */}
      <div className="px-4 sm:px-6 pb-10">
        <div className="mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
          {loading ? (
            <p className="text-slate-300">Cargando...</p>
          ) : error ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
              {error}
            </div>
          ) : !item ? (
            <p className="text-slate-300">No se encontró el producto.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              {/* Image */}
              <div className="lg:sticky lg:top-24">
                {item.image_url ? (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-64 sm:h-80 lg:h-[420px] w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="grid h-64 sm:h-80 lg:h-[420px] place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {item.name}
                </h1>

                {/* Badges */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm text-slate-200">
                  <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1">
                    ID: {item.id}
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1">
                    {item.category_name ? `Categoría: ${item.category_name}` : `Categoría: ${item.category_id}`}
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1">
                    Stock: {item.stock}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-5">
                  <div className="text-sm text-slate-300">Precio</div>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1">
                    {formatMXN(item.price)}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <div className="text-sm font-semibold text-white">Descripción</div>
                  <p className="mt-2 text-slate-300 leading-relaxed">
                    {item.description || "Sin descripción."}
                  </p>
                </div>

                {/* CTA (opcional, se ve pro aunque no compres) */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-slate-950 font-semibold px-4 py-3 hover:opacity-90 transition"
                  >
                    Seguir viendo catálogo
                  </Link>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
