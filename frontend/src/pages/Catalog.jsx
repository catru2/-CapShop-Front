import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productsApi } from "../api/products.api";
import { categoriesApi } from "../api/categories.api";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // leer filtro desde URL (?categoryId=1)
  const categoryId = searchParams.get("categoryId") || "";

  const categoryOptions = useMemo(
    () => [{ id: "", name: "Todas" }, ...cats.map((c) => ({ id: String(c.id), name: c.name }))],
    [cats]
  );

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const [catsData, prodsData] = await Promise.all([
        categoriesApi.list(),
        productsApi.list(categoryId ? { categoryId } : {}),
      ]);
      setCats(catsData || []);
      setProducts(prodsData || []);
    } catch (e) {
      setErr(e.message || "Error cargando catálogo");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // recarga cada que cambie categoryId en la URL
  }, [categoryId]);

  function onChangeCategory(e) {
    const value = e.target.value; // "" o "1" o "2"
    const next = new URLSearchParams(searchParams);

    if (!value) next.delete("categoryId");
    else next.set("categoryId", value);

    setSearchParams(next);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <p className="text-slate-300 text-sm">Filtra por categoría y abre el detalle.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="rounded-lg bg-slate-900 border border-white/10 px-3 py-2 text-sm outline-none"
            value={categoryId}
            onChange={onChangeCategory}
          >
            {categoryOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <Link
            to="/login"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          >
            Admin
          </Link>
        </div>
      </header>

      {err && (
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {err}
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-slate-300">Cargando...</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-slate-300 text-sm">${p.price}</p>
                </div>
                <span className="text-xs rounded-full border border-white/10 px-2 py-1 text-slate-300">
                  {p.category_name || `Cat #${p.category_id}`}
                </span>
              </div>

              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="mt-3 h-40 w-full rounded-xl object-cover border border-white/10"
                />
              )}

              <p className="mt-3 text-sm text-slate-300 line-clamp-2">
                {p.description || "Sin descripción."}
              </p>
            </Link>
          ))}

          {!products.length && (
            <div className="text-slate-400 text-sm">
              No hay productos para esta categoría.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
