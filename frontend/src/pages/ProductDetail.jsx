import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <Link to="/catalog" className="text-sm underline text-slate-300">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-bold">Detalle de producto</h1>
        <p className="mt-2 text-slate-300">Producto ID: {id}</p>

        <div className="mt-6">
          <p className="font-semibold">Nombre: (pendiente)</p>
          <p className="text-slate-300">Precio: (pendiente)</p>
          <p className="text-slate-300">Descripción: (pendiente)</p>
        </div>
      </div>
    </div>
  );
}
