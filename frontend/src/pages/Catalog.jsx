import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Loader from "../components/ui/Loader";
import ProductCard from "../components/catalog/ProductCard";
import { productsApi } from "../api/products.api";
import { categoriesApi } from "../api/categories.api";

// --- Debounce hook (simple y estable) ---
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // URL params (fuente de verdad para consultar API)
  const categoryId = searchParams.get("categoryId") || "";
  const q = searchParams.get("q") || "";

  // --- Input controlado local (para debounce sin spamear la API) ---
  const [searchText, setSearchText] = useState(q);
  const debouncedSearch = useDebouncedValue(searchText, 400);

  // Si cambia la URL por back/forward o por click de links, sincroniza el input
  useEffect(() => {
    setSearchText(q);
  }, [q]);

  // Cuando el debounce “se estabiliza”, actualiza el query param q
  useEffect(() => {
    const nextQ = (debouncedSearch || "").trim();

    // Evita loops: solo escribe a URL si realmente cambió
    if (nextQ === q) return;

    const next = new URLSearchParams(searchParams);
    if (!nextQ) next.delete("q");
    else next.set("q", nextQ);

    setSearchParams(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const categoryOptions = useMemo(
    () => [{ id: "", name: "Todas" }, ...cats.map((c) => ({ id: String(c.id), name: c.name }))],
    [cats]
  );

  const activeCategoryName = useMemo(() => {
    if (!categoryId) return "";
    const found = cats.find((c) => String(c.id) === String(categoryId));
    return found?.name || `Categoría #${categoryId}`;
  }, [cats, categoryId]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setErr("");
      setLoading(true);
      try {
        const [catsData, prodsData] = await Promise.all([
          categoriesApi.list(),
          productsApi.list({ categoryId: categoryId || undefined, q: q || undefined }),
        ]);
        if (!alive) return;
        setCats(catsData || []);
        setProducts(prodsData || []);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Error cargando catálogo");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => (alive = false);
  }, [categoryId, q]);

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  }

  function clearAllFilters() {
    setSearchText("");
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    next.delete("categoryId");
    setSearchParams(next);
  }

  const hasFilters = Boolean(q || categoryId);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Container className="py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Catálogo</h1>
            <p className="text-slate-300 text-sm">Filtra por categoría o busca por nombre.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar gorras…"
              className="w-full sm:w-72 rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
            />

            <select
              className="rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/20"
              value={categoryId}
              onChange={(e) => setParam("categoryId", e.target.value)}
            >
              {categoryOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* ✅ Contador de resultados */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-300">
            {loading ? (
              <span className="text-slate-400">Cargando resultados…</span>
            ) : (
              <>
                <span className="font-semibold text-white">{products.length}</span>{" "}
                <span>{products.length === 1 ? "producto" : "productos"}</span>
                {hasFilters && (
                  <span className="text-slate-400">
                    {" "}
                    {categoryId ? `• ${activeCategoryName}` : ""} {q ? `• “${q}”` : ""}
                  </span>
                )}
              </>
            )}
          </div>

          {hasFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 hover:bg-white/10 w-fit"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* ✅ Chips de filtros activos */}
        {hasFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Filtros:</span>

            {q && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                <span className="text-slate-300">Búsqueda:</span>
                <span className="text-white font-semibold">“{q}”</span>
                <button
                  onClick={() => {
                    setSearchText("");
                    setParam("q", "");
                  }}
                  className="ml-1 rounded-full border border-white/10 bg-slate-950/40 px-2 py-0.5 text-slate-200 hover:bg-white/10"
                  title="Quitar búsqueda"
                >
                  ✕
                </button>
              </span>
            )}

            {categoryId && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                <span className="text-slate-300">Categoría:</span>
                <span className="text-white font-semibold">{activeCategoryName}</span>
                <button
                  onClick={() => setParam("categoryId", "")}
                  className="ml-1 rounded-full border border-white/10 bg-slate-950/40 px-2 py-0.5 text-slate-200 hover:bg-white/10"
                  title="Quitar categoría"
                >
                  ✕
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="ml-auto text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 hover:bg-white/10"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {err && (
          <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {err}
          </div>
        )}

        <div className="mt-6">
          {loading ? (
            <Loader label="Cargando productos..." />
          ) : products.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            // ✅ Empty state más bonito
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-2xl">🧢</div>
                  <h3 className="mt-2 text-xl font-extrabold text-white">
                    No encontramos productos con esos filtros
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Prueba cambiando la búsqueda o selecciona otra categoría.
                  </p>

                  {hasFilters && (
                    <div className="mt-3 text-xs text-slate-400">
                      Tip: limpia filtros para volver a ver todo el catálogo.
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="rounded-xl bg-white text-slate-950 px-4 py-2 text-sm font-semibold hover:opacity-90"
                  >
                    Ver todo
                  </button>
                  <button
                    onClick={() => setSearchText("")}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
