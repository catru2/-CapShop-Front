import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9A3.5 3.5 0 0 1 16.5 20h-9A3.5 3.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M6.5 8.2 12 12l5.5-3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 10V8.2A4.5 4.5 0 0 1 12 3.7a4.5 4.5 0 0 1 4.5 4.5V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v5A3.5 3.5 0 0 1 16.5 21h-9A3.5 3.5 0 0 1 4 17.5v-5A2.5 2.5 0 0 1 6.5 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function IconEye({ open, ...props }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5c2.2 0 4.1.9 5.6 2.1M21.5 12s-3.5 6.5-9.5 6.5c-2.2 0-4.1-.9-5.6-2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.2a3.2 3.2 0 0 0 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAlert(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 9v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 17.5h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10.2 4.6c.8-1.4 2.8-1.4 3.6 0l8.1 14c.8 1.4-.2 3.1-1.8 3.1H3.9c-1.6 0-2.6-1.7-1.8-3.1l8.1-14Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900"
      aria-hidden="true"
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@capshop.com");
  const [password, setPassword] = useState("Admin123*");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0); // para “micro-shake” del error

  const year = useMemo(() => new Date().getFullYear(), []);

  // 🧠 Si hay error, resaltamos inputs
  const hasError = Boolean(error);

  function clearError() {
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginApi(email, password);
      login(data);

      if (data?.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/forbidden");
      }
    } catch (err) {
      const msg =
        err?.status === 401
          ? "Credenciales inválidas. Revisa email y contraseña."
          : err.message || "Error al iniciar sesión";

      setError(msg);
      setShakeKey((k) => k + 1); // dispara micro-shake
    } finally {
      setLoading(false);
    }
  }

  // clases para input con error
  const inputBase =
    "w-full rounded-xl bg-slate-950/45 border px-3 py-3 text-sm outline-none transition";
  const inputOk =
    "border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10";
  const inputBad =
    "border-red-500/40 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/15";

  const iconOk = "text-slate-400";
  const iconBad = "text-red-300";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-60" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-7 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.85)]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="group grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/30 text-xl transition hover:bg-white/10 hover:border-white/20">
                <span className="transition group-hover:scale-[1.06]">🧢</span>
              </div>

              <div className="leading-tight">
                <h1 className="text-2xl font-extrabold tracking-tight">
                  CapShop Admin
                </h1>
                <p className="text-slate-300 text-sm mt-1">
                  Acceso exclusivo para administradores.
                </p>
              </div>
            </div>

            
          </div>

          {/* Error */}
          {error && (
            <div
              key={shakeKey}
              className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200 flex items-start gap-2
                         animate-[shake_.28s_ease-in-out_1]"
            >
              <IconAlert className="h-5 w-5 text-red-200 shrink-0 mt-[2px]" />
              <div>{error}</div>

              {/* keyframes inline con tailwind arbitrary */}
              <style>{`
                @keyframes shake {
                  0% { transform: translateX(0); }
                  25% { transform: translateX(-4px); }
                  50% { transform: translateX(4px); }
                  75% { transform: translateX(-3px); }
                  100% { transform: translateX(0); }
                }
              `}</style>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email */}
            <label className="block">
              <span className="text-sm text-slate-300">Email</span>

              <div className="mt-1 relative">
                <span
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                    hasError ? iconBad : iconOk
                  }`}
                >
                  <IconMail className="h-5 w-5" />
                </span>

                <input
                  className={`${inputBase} ${hasError ? inputBad : inputOk} pl-10 pr-3`}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError();
                  }}
                  onFocus={clearError}
                  placeholder="admin@capshop.com"
                  autoComplete="email"
                  aria-invalid={hasError ? "true" : "false"}
                />
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <span className="text-sm text-slate-300">Password</span>

              <div className="mt-1 relative">
                <span
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                    hasError ? iconBad : iconOk
                  }`}
                >
                  <IconLock className="h-5 w-5" />
                </span>

                <input
                  className={`${inputBase} ${hasError ? inputBad : inputOk} pl-10 pr-12`}
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError();
                  }}
                  onFocus={clearError}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={hasError ? "true" : "false"}
                />

                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-lg
                             border border-white/10 bg-white/5 hover:bg-white/10 transition ${
                               hasError ? "text-red-200" : "text-slate-200"
                             }`}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <IconEye open={showPass} className="h-5 w-5" />
                </button>
              </div>
            </label>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full overflow-hidden rounded-xl bg-white text-slate-950 font-semibold py-3 transition
                         hover:opacity-95 disabled:opacity-60 ${
                           hasError ? "ring-2 ring-red-500/10" : ""
                         }`}
            >
              {/* shine effect */}
              <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition">
                <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/60 to-transparent
                                 translate-x-0 hover:translate-x-[220%] transition duration-700" />
              </span>

              <span className="relative inline-flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Spinner />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </span>
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/25 p-4 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-200">Credenciales demo</div>
              <span className="text-slate-400">solo evaluación</span>
            </div>
            <div className="mt-2 grid gap-1">
              <div>
                <span className="text-slate-400">Email:</span>{" "}
                <span className="text-slate-200">admin@capshop.com</span>
              </div>
              <div>
                <span className="text-slate-400">Password:</span>{" "}
                <span className="text-slate-200">Admin123*</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center justify-between gap-3 text-sm">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         text-slate-200 hover:bg-white/10 transition"
            >
              ← Volver a landing
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2
                         text-slate-200 hover:bg-white/10 transition"
            >
              Ver catálogo →
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          © {year} CapShop • Panel administrativo
        </p>
      </div>
    </div>
  );
}
