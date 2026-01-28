import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel Admin</h1>
        <Link to="/catalog" className="text-sm underline text-slate-300">
          Ir a Catálogo
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-slate-300">
          Aquí irá el CRUD de productos y categorías.
        </p>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold">
            + Nuevo producto
          </button>
          <button className="px-4 py-2 rounded-lg border border-white/20">
            Ver categorías
          </button>
        </div>
      </div>
    </div>
  );
}
