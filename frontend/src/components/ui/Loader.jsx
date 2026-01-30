export default function Loader({ label = "Cargando..." }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
