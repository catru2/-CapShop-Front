import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 grid place-items-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <h1 className="text-xl font-bold text-red-200">403 - No autorizado</h1>
        <p className="mt-2 text-slate-200/80">
          Esta sección es solo para administradores.
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            to="/catalog"
            className="rounded-lg bg-white text-slate-950 px-4 py-2 text-sm font-semibold hover:opacity-90"
          >
            Ir al catálogo
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
