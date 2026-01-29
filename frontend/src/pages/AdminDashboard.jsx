import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { categoriesApi } from "../api/categories.api";
import { productsApi } from "../api/products.api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const [cats, setCats] = useState([]);
  const [prods, setProds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // Forms
  const [catForm, setCatForm] = useState({ id: null, name: "" });

  const [prodForm, setProdForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
  });

  const categoryOptions = useMemo(() => cats.map((c) => ({ id: c.id, name: c.name })), [cats]);

  async function loadAll() {
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      const [catsData, prodsData] = await Promise.all([
        categoriesApi.list(),
        productsApi.list(),
      ]);
      setCats(catsData || []);
      setProds(prodsData || []);
    } catch (e) {
      setErr(e.message || "Error cargando datos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  // ------- Categories handlers -------
  async function submitCategory(e) {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      if (!catForm.name.trim()) throw new Error("Nombre de categoría requerido");

      if (catForm.id) {
        await categoriesApi.update(catForm.id, { name: catForm.name.trim() });
        setMsg("Categoría actualizada ");
      } else {
        await categoriesApi.create({ name: catForm.name.trim() });
        setMsg("Categoría creada ");
      }

      setCatForm({ id: null, name: "" });
      await loadAll();
    } catch (e) {
      setErr(e.message);
    }
  }

  function editCategory(c) {
    setCatForm({ id: c.id, name: c.name });
  }

  async function deleteCategory(id) {
    setErr("");
    setMsg("");
    if (!confirm("¿Eliminar categoría? (Si tiene productos ligados, debe fallar)")) return;

    try {
      await categoriesApi.remove(id);
      setMsg("Categoría eliminada ✅");
      await loadAll();
    } catch (e) {
      setErr(e.message);
    }
  }

  // ------- Products handlers -------
  async function submitProduct(e) {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      const payload = {
        name: prodForm.name.trim(),
        description: prodForm.description || null,
        price: Number(prodForm.price),
        stock: Number(prodForm.stock),
        image_url: prodForm.image_url || null,
        category_id: Number(prodForm.category_id),
      };

      if (!payload.name) throw new Error("Nombre de producto requerido");
      if (!payload.category_id) throw new Error("Selecciona una categoría");
      if (Number.isNaN(payload.price)) throw new Error("Precio inválido");
      if (Number.isNaN(payload.stock)) throw new Error("Stock inválido");

      if (prodForm.id) {
        await productsApi.update(prodForm.id, payload);
        setMsg("Producto actualizado ");
      } else {
        await productsApi.create(payload);
        setMsg("Producto creado ");
      }

      setProdForm({
        id: null,
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        category_id: "",
      });

      await loadAll();
    } catch (e) {
      setErr(e.message);
    }
  }

  function editProduct(p) {
    setProdForm({
      id: p.id,
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      image_url: p.image_url || "",
      category_id: p.category_id ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduct(id) {
    setErr("");
    setMsg("");
    if (!confirm("¿Eliminar producto?")) return;

    try {
      await productsApi.remove(id);
      setMsg("Producto eliminado ");
      await loadAll();
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-300 text-sm">
            Sesión: <span className="text-slate-100">{user?.email}</span> ({user?.role})
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/catalog"
            className="rounded-lg border border-slate-800 px-3 py-2 text-sm hover:bg-slate-900"
          >
            Ver catálogo
          </Link>

          <button
            onClick={logout}
            className="rounded-lg bg-white text-slate-950 px-3 py-2 text-sm font-semibold hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </header>

      {(err || msg) && (
        <div className="mt-4 space-y-2">
          {err && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
              {err}
            </div>
          )}
          {msg && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">
              {msg}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-slate-300">Cargando...</div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* CATEGORIES */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold mb-4">Categorías</h2>

            <form onSubmit={submitCategory} className="flex gap-2 mb-4">
              <input
                className="flex-1 rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="Nombre de categoría"
                value={catForm.name}
                onChange={(e) => setCatForm((s) => ({ ...s, name: e.target.value }))}
              />
              <button className="rounded-lg bg-white text-slate-950 px-4 font-semibold hover:opacity-90">
                {catForm.id ? "Actualizar" : "Crear"}
              </button>
              {catForm.id && (
                <button
                  type="button"
                  onClick={() => setCatForm({ id: null, name: "" })}
                  className="rounded-lg border border-slate-800 px-3 hover:bg-slate-900"
                >
                  Cancelar
                </button>
              )}
            </form>

            <div className="space-y-2">
              {cats.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/30 p-3"
                >
                  <div className="text-sm">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-slate-400">id: {c.id}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editCategory(c)}
                      className="rounded-lg border border-slate-800 px-3 py-1 text-sm hover:bg-slate-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="rounded-lg border border-red-500/40 px-3 py-1 text-sm hover:bg-red-500/10 text-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {!cats.length && <div className="text-slate-400 text-sm">Sin categorías.</div>}
            </div>
          </section>

          {/* PRODUCTS */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold mb-4">Productos</h2>

            <form onSubmit={submitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="Nombre"
                value={prodForm.name}
                onChange={(e) => setProdForm((s) => ({ ...s, name: e.target.value }))}
              />
              <select
                className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                value={prodForm.category_id}
                onChange={(e) => setProdForm((s) => ({ ...s, category_id: e.target.value }))}
              >
                <option value="">-- Categoría --</option>
                {categoryOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (#{c.id})
                  </option>
                ))}
              </select>

              <input
                className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="Precio"
                value={prodForm.price}
                onChange={(e) => setProdForm((s) => ({ ...s, price: e.target.value }))}
              />
              <input
                className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="Stock"
                value={prodForm.stock}
                onChange={(e) => setProdForm((s) => ({ ...s, stock: e.target.value }))}
              />

              <input
                className="md:col-span-2 rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="URL de imagen (opcional)"
                value={prodForm.image_url}
                onChange={(e) => setProdForm((s) => ({ ...s, image_url: e.target.value }))}
              />

              <textarea
                className="md:col-span-2 rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
                placeholder="Descripción (opcional)"
                rows={2}
                value={prodForm.description}
                onChange={(e) => setProdForm((s) => ({ ...s, description: e.target.value }))}
              />

              <div className="md:col-span-2 flex gap-2">
                <button className="rounded-lg bg-white text-slate-950 px-4 py-2 font-semibold hover:opacity-90">
                  {prodForm.id ? "Actualizar" : "Crear"}
                </button>
                {prodForm.id && (
                  <button
                    type="button"
                    onClick={() =>
                      setProdForm({
                        id: null,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        image_url: "",
                        category_id: "",
                      })
                    }
                    className="rounded-lg border border-slate-800 px-3 py-2 hover:bg-slate-900"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="space-y-2">
              {prods.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/30 p-3"
                >
                  <div className="flex items-start gap-3 text-sm">
  {p.image_url ? (
    <img
      src={p.image_url}
      alt={p.name}
      className="h-12 w-12 rounded-lg object-cover border border-slate-800"
      loading="lazy"
    />
  ) : (
    <div className="h-12 w-12 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-center text-[10px] text-slate-400">
      sin img
    </div>
  )}

  <div>
    <div className="font-semibold">
      {p.name} <span className="text-slate-400">(# {p.id})</span>
    </div>
    <div className="text-slate-300">
      ${p.price} • stock: {p.stock}
    </div>
    <div className="text-slate-400">
      categoría: {p.category_name || p.category_id}
    </div>
  </div>
</div>


                  <div className="flex gap-2">
                    <button
                      onClick={() => editProduct(p)}
                      className="rounded-lg border border-slate-800 px-3 py-1 text-sm hover:bg-slate-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="rounded-lg border border-red-500/40 px-3 py-1 text-sm hover:bg-red-500/10 text-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {!prods.length && <div className="text-slate-400 text-sm">Sin productos.</div>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
