import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  function go(to) {
    navigate(to);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <Container className="py-4 md:py-5">
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 md:h-12 md:w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-lg">
              🧢
            </div>
            <div className="leading-tight">
              <div className="text-lg md:text-xl font-extrabold text-white">
                CapShop
              </div>
              <div className="text-xs md:text-sm text-slate-400">
                Gorras que hablan por ti
              </div>
            </div>
          </Link>

          {/* Actions (SIEMPRE visibles, sin menú) */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {!token ? (
              <Button
                variant="outline"
                onClick={() => go("/login")}
                className="px-3 py-2 text-xs sm:text-sm sm:px-4 sm:py-2.5"
              >
                Admin Login
              </Button>
            ) : (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => go("/admin")}
                    className="px-3 py-2 text-xs sm:text-sm sm:px-4 sm:py-2.5"
                  >
                    Panel
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    go("/");
                  }}
                  className="px-3 py-2 text-xs sm:text-sm sm:px-4 sm:py-2.5"
                >
                  Logout
                </Button>
              </>
            )}

            <Button
              as={Link}
              to="/catalog"
              className="px-3 py-2 text-xs sm:text-sm sm:px-4 sm:py-2.5"
            >
              Ver catálogo
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
