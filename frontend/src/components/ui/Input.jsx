export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30 ${className}`}
      {...props}
    />
  );
}
