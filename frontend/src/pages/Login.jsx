import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@capshop.com"); // opcional: default
  const [password, setPassword] = useState("Admin123*"); // opcional: default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const data = await loginApi(email, password); // { token, user }
    login(data);

    if (data?.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/forbidden"); // o "/catalog"
    }
  } catch (err) {
    // si tu http.js pone err.status, esto detecta 401
    if (err?.status === 401) {
      setError("Credenciales inválidas. Revisa email y contraseña.");
    } else {
      setError(err.message || "Error al iniciar sesión");
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">CapShop Admin</h1>
          <p className="text-slate-300 text-sm mt-1">
            Inicia sesión. Solo administradores pueden acceder al panel.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              className="mt-1 w-full rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@capshop.com"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              className="mt-1 w-full rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-2 outline-none focus:border-slate-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white text-slate-950 font-semibold py-2 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
          <Link to="/" className="hover:underline">
            ← Volver a landing
          </Link>
          <Link to="/catalog" className="hover:underline">
            Ver catálogo →
          </Link>
        </div>
      </div>
    </div>
  );
}
