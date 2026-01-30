import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { categoriesApi } from "../api/categories.api";
import { productsApi } from "../api/products.api";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { formatMXN } from "../utils/money";

function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-white/10 bg-white/5 text-slate-200",
    good: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    bad: "border-red-500/30 bg-red-500/10 text-red-200",
    warn: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Card({ title, subtitle, right, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.85)]">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-xs sm:text-sm text-slate-300">{subtitle}</p>}
        </div>
        {right}
      </header>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl bg-slate-950/45 border border-white/10 px-3 py-2 text-sm text-white outline-none transition
      focus:border-white/20 focus:ring-2 focus:ring-white/10 placeholder:text-slate-500 ${className}`}
    />
  );
}

function Select({ className = "", children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl bg-slate-950/45 border border-white/10 px-3 py-2 text-sm text-white outline-none transition
      focus:border-white/20 focus:ring-2 focus:ring-white/10 ${className}`}
    >
      {children}
    </select>
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl bg-slate-950/45 border border-white/10 px-3 py-2 text-sm text-white outline-none transition
      focus:border-white/20 focus:ring-2 focus:ring-white/10 placeholder:text-slate-500 ${className}`}
    />
  );
}

function Btn({ variant = "primary", className = "", ...props }) {
  const styles = {
    primary:
      "bg-white text-slate-950 hover:opacity-95",
    ghost:
      "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    outline:
      "bg-transparent text-white border border-white/10 hover:bg-white/5",
    danger:
      "bg-red-500/10 text-red-200 border border-red-500/30 hover:bg-red-500/15",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition
      disabled:opacity-60 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    />
  );
}

function LoaderLine() {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="h-3 w-40 rounded bg-white/10 animate-pulse" />
      <div className="mt-3 h-2 w-full rounded bg-white/10 animate-pulse" />
      <div className="mt-2 h-2 w-5/6 rounded bg-white/10 animate-pulse" />
    </div>
  );
}

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

  const categoryOptions = useMemo(
    () => cats.map((c) => ({ id: c.id, name: c.name })),
    [cats]
  );

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
        setMsg("Categoría actualizada ✅");
      } else {
        await categoriesApi.create({ name: catForm.name.trim() });
        setMsg("Categoría creada ✅");
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
        setMsg("Producto actualizado ✅");
      } else {
        await productsApi.create(payload);
        setMsg("Producto creado ✅");
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
      setMsg("Producto eliminado ✅");
      await loadAll();
    } catch (e) {
      setErr(e.message);
    }
  }

  const isEditingCat = Boolean(catForm.id);
  const isEditingProd = Boolean(prodForm.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-60" />
        <div className="absolute -bottom-48 -right-40 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl opacity-60" />
      </div>

      <Container className="relative py-8">
        {/* TOP BAR */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4 sm:px-6 sm:py-5 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.85)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/30 text-xl">
                🧢
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Admin Dashboard
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Pill>{user?.role}</Pill>
                  <Pill tone={loading ? "warn" : "good"}>{loading ? "Sincronizando…" : "Listo"}</Pill>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {(err || msg) && (
          <div className="mt-5 space-y-2">
            {err && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {err}
              </div>
            )}
            {msg && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {msg}
              </div>
            )}
          </div>
        )}

        {loading ? (
          <LoaderLine />
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* CATEGORIES */}
            <Card
              title="Categorías"
              subtitle="Crea, edita o elimina colecciones para organizar tu catálogo."
              right={
                <Pill tone={isEditingCat ? "warn" : "neutral"}>
                  {isEditingCat ? "Editando" : "Nuevo"}
                </Pill>
              }
            >
              <form onSubmit={submitCategory} className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Nombre de categoría"
                  value={catForm.name}
                  onChange={(e) => setCatForm((s) => ({ ...s, name: e.target.value }))}
                />

                <Btn type="submit" variant="primary" className="sm:w-auto">
                  {catForm.id ? "Actualizar" : "Crear"}
                </Btn>

                {catForm.id && (
                  <Btn
                    type="button"
                    variant="ghost"
                    onClick={() => setCatForm({ id: null, name: "" })}
                    className="sm:w-auto"
                  >
                    Cancelar
                  </Btn>
                )}
              </form>

              <div className="mt-5 space-y-2">
                {cats.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 hover:bg-white/5 transition"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-white leading-tight truncate">
                        {c.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        id: {c.id}
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Btn variant="outline" onClick={() => editCategory(c)} className="px-3 py-1.5">
                        Editar
                      </Btn>
                      <Btn variant="danger" onClick={() => deleteCategory(c.id)} className="px-3 py-1.5">
                        Eliminar
                      </Btn>
                    </div>
                  </div>
                ))}
                {!cats.length && (
                  <div className="text-slate-400 text-sm">
                    Sin categorías.
                  </div>
                )}
              </div>
            </Card>

            {/* PRODUCTS */}
            <Card
              title="Productos"
              subtitle="Gestiona productos: nombre, precio, stock, imagen y categoría."
              right={
                <Pill tone={isEditingProd ? "warn" : "neutral"}>
                  {isEditingProd ? "Editando" : "Nuevo"}
                </Pill>
              }
            >
              <form onSubmit={submitProduct} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Nombre"
                  value={prodForm.name}
                  onChange={(e) => setProdForm((s) => ({ ...s, name: e.target.value }))}
                />

                <Select
                  value={prodForm.category_id}
                  onChange={(e) => setProdForm((s) => ({ ...s, category_id: e.target.value }))}
                >
                  <option value="">-- Categoría --</option>
                  {categoryOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (#{c.id})
                    </option>
                  ))}
                </Select>

                <Input
                  placeholder="Precio"
                  value={prodForm.price}
                  onChange={(e) => setProdForm((s) => ({ ...s, price: e.target.value }))}
                />

                <Input
                  placeholder="Stock"
                  value={prodForm.stock}
                  onChange={(e) => setProdForm((s) => ({ ...s, stock: e.target.value }))}
                />

                <Input
                  className="md:col-span-2"
                  placeholder="URL de imagen (opcional)"
                  value={prodForm.image_url}
                  onChange={(e) => setProdForm((s) => ({ ...s, image_url: e.target.value }))}
                />

                <Textarea
                  className="md:col-span-2"
                  placeholder="Descripción (opcional)"
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm((s) => ({ ...s, description: e.target.value }))}
                />

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
                  <Btn type="submit" variant="primary" className="w-full sm:w-auto">
                    {prodForm.id ? "Actualizar" : "Crear"}
                  </Btn>

                  {prodForm.id && (
                    <Btn
                      type="button"
                      variant="ghost"
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
                      className="w-full sm:w-auto"
                    >
                      Cancelar
                    </Btn>
                  )}
                </div>
              </form>

              <div className="mt-5 space-y-2">
                {prods.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 hover:bg-white/5 transition"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="h-12 w-12 rounded-xl object-cover border border-white/10 bg-slate-900/40"
                          loading="lazy"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl border border-white/10 bg-slate-900/40 flex items-center justify-center text-[10px] text-slate-400">
                          sin img
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">
                          {p.name} <span className="text-slate-400">(# {p.id})</span>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <Pill tone="neutral">{formatMXN(p.price)}</Pill>
                          <Pill tone={Number(p.stock) > 0 ? "good" : "bad"}>
                            stock: {p.stock}
                          </Pill>
                          <Pill tone="info">
                            {p.category_name || p.category_id}
                          </Pill>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Btn variant="outline" onClick={() => editProduct(p)} className="px-3 py-1.5">
                        Editar
                      </Btn>
                      <Btn variant="danger" onClick={() => deleteProduct(p.id)} className="px-3 py-1.5">
                        Eliminar
                      </Btn>
                    </div>
                  </div>
                ))}

                {!prods.length && (
                  <div className="text-slate-400 text-sm">
                    Sin productos.
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
