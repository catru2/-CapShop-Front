import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import { formatMXN } from "../../utils/money"; // ajusta la ruta si tu ProductCard está en otra carpeta

export default function ProductCard({ p }) {
  return (
    <Link
      to={`/products/${p.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        {/* Gradiente superior para asegurar contraste en imágenes claras */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-black/65 to-transparent" />

        {/* Badge categoría */}
        <div className="absolute right-3 top-3 z-10">
          <Badge className="border-white/15 bg-black/55 text-white backdrop-blur-md shadow shadow-black/30">
            {p.category_name || `Cat #${p.category_id}`}
          </Badge>
        </div>

        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-500">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-white leading-tight line-clamp-2">
              {p.name}
            </div>
            <div className="mt-1 text-xs text-slate-400 line-clamp-2">
              {p.description || "Gorra premium con estilo urbano."}
            </div>
          </div>

          {/* Stock */}
          <div className="shrink-0 text-xs text-slate-400">
            Stock: <span className="text-slate-200">{p.stock}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
         <div className="text-lg font-extrabold text-white">
        {formatMXN(p.price)}
        </div>


          <div className="text-sm font-semibold text-white/90 underline underline-offset-4">
            Ver →
          </div>
        </div>
      </div>
    </Link>
  );
}
