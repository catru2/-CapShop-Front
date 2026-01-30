export default function Badge({ className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 ${className}`}
    >
      {children}
    </span>
  );
}
