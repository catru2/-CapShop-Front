import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/ui/Container";
import { useEffect } from "react";

export default function AdminLayout() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  // Protección básica
  useEffect(() => {
    if (!token) navigate("/login");
    else if (!isAdmin) navigate("/forbidden");
  }, [token, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      {/* Glow global */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-60" />
        <div className="absolute -bottom-48 -right-40 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl opacity-60" />
      </div>

      {/* Topbar global */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <Container className="py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-lg">
                🧢
              </div>
              <div className="leading-tight">
                <div className="text-lg font-extrabold text-white">CapShop Admin</div>
                <div className="text-xs text-slate-400">
                  {user?.email ? `${user.email} (${user.role})` : "Panel de administración"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/catalog"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition"
              >
                Ver catálogo
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 hover:opacity-95 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Contenido de cada pantalla admin */}
      <main className="relative">
        <Container className="py-8">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
