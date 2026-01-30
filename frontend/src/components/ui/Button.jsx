export default function Button({
  as = "button",
  className = "",
  variant = "primary",
  ...props
}) {
  const Comp = as;

  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-white text-slate-950 hover:opacity-90",
    outline:
      "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
    ghost: "text-slate-200 hover:bg-white/10",
    danger:
      "border border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20",
  };

  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
