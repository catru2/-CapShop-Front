import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { token, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* TOP BAR */}
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-slate-300">
          <p>🚚 Envío gratis en compras mayores a $999 • Cambios fáciles 7 días</p>
          <p className="hidden sm:block">Soporte: soporte@capshop.com</p>
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-950 font-black">
              C
            </div>
            <div className="leading-tight">
              <div className="font-bold tracking-tight">CapShop</div>
              <div className="text-xs text-slate-400">Gorras premium</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#colecciones" className="hover:text-white">Colecciones</a>
            <a href="#best" className="hover:text-white">Best sellers</a>
            <a href="#beneficios" className="hover:text-white">Beneficios</a>
            <a href="#reviews" className="hover:text-white">Reseñas</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/catalog"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              Ver catálogo
            </Link>

            {!token ? (
              <Link
                to="/login"
                className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950 hover:opacity-90"
              >
                Admin
              </Link>
            ) : (
              <>
                <Link
                  to={user?.role === "admin" ? "/admin" : "/catalog"}
                  className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950 hover:opacity-90"
                >
                  {user?.role === "admin" ? "Panel" : "Mi cuenta"}
                </Link>
                <button
                  onClick={logout}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              🔥 Nueva colección 2026
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200">
                Drop limitado
              </span>
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
              Gorras que se ven
              <span className="block text-slate-300">tan bien como se sienten.</span>
            </h1>

            <p className="mt-4 text-slate-300 leading-relaxed">
              Estilo urbano, fit perfecto y materiales premium. Encuentra tu gorra ideal:
              snapback, trucker o dad hat. 
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
              >
                Comprar ahora →
              </Link>

              <a
                href="#best"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Ver best sellers
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <Stat value="Premium" label="Materiales" />
              <Stat value="Fit" label="Ajuste cómodo" />
              <Stat value="7 días" label="Cambios" />
            </div>
          </div>

          {/* HERO PRODUCT CARD */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Destacado</p>
                <span className="text-xs text-slate-400">CapShop Edition</span>
              </div>

              {/* Fake product image */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5">
                <div className="grid h-64 place-items-center">
                  <div className="text-center">
                    <div className="mx-auto mb-2 h-14 w-14 rounded-2xl bg-white/10 grid place-items-center">
                      🧢
                    </div>
                    <p className="text-sm text-slate-300">Imagen promo (placeholder)</p>
                    <p className="text-xs text-slate-400">
                      Luego puedes reemplazar con una foto real en assets
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">Snapback “Night Wave”</p>
                  <p className="text-sm text-slate-300">Bordado premium • Ajustable</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold">$499</p>
                  <p className="text-xs text-slate-400">MXN</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to="/catalog"
                  className="flex-1 rounded-xl bg-white px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:opacity-90"
                >
                  Ir al catálogo
                </Link>
                <a
                  href="#colecciones"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  Ver colecciones
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLECCIONES */}
      <section id="colecciones" className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Colecciones</h2>
            <p className="mt-2 text-slate-300">
              Elige tu estilo: urbano, clásico o deportivo.
            </p>
          </div>
          <Link to="/catalog" className="text-sm text-slate-300 hover:text-white underline">
            Ver todo →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <CollectionCard
            title="Snapback"
            desc="Estructura firme, look urbano."
            tag="Más vendidas"
          />
          <CollectionCard
            title="Trucker"
            desc="Frescas, malla trasera, vibe street."
            tag="Verano"
          />
          <CollectionCard
            title="Dad Hat"
            desc="Fit relajado, minimal y comfy."
            tag="Casual"
          />
        </div>
      </section>

      {/* BEST SELLERS */}
      <section id="best" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold">Best sellers</h2>
        <p className="mt-2 text-slate-300">
          Los modelos más pedidos esta semana.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ProductCard name="Midnight Black" price="$449" badge="Top" />
          <ProductCard name="Ocean Blue" price="$469" badge="Nuevo" />
          <ProductCard name="Sand Classic" price="$399" badge="Oferta" />
        </div>

        <div className="mt-6">
          <Link
            to="/catalog"
            className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">¿Por qué CapShop?</h2>
          <p className="mt-2 text-slate-300">
            Detalles que se sienten en cada uso.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Feature title="Bordado premium" desc="Diseños nítidos y resistentes al uso diario." />
            <Feature title="Ajuste cómodo" desc="Bandas internas suaves y fits bien equilibrados." />
            <Feature title="Calidad real" desc="Materiales duraderos y terminados limpios." />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold">Reseñas</h2>
        <p className="mt-2 text-slate-300">
          Opiniones de clientes reales (demo).
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Review
            name="Carlos M."
            text="El fit está perfecto y el bordado se ve de lujo. Llegó rápido."
          />
          <Review
            name="Ana P."
            text="Me encantó la trucker, combina con todo. Se siente premium."
          />
          <Review
            name="Luis R."
            text="La snapback se ve bien pro, no pierde forma. Recomendadísima."
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Listo para encontrar tu próxima gorra</h3>
            <p className="mt-2 text-slate-300">
              Explora el catálogo y filtra por categoría.
            </p>
          </div>
          <div className="mt-4 flex gap-3 md:mt-0">
            <Link
              to="/catalog"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:opacity-90"
            >
              Ir al catálogo →
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            CapShop • Gorras premium • {new Date().getFullYear()}
          </p>
          <div className="flex gap-3 text-sm">
            <Link to="/catalog" className="text-slate-300 hover:text-white">Catálogo</Link>
            <a href="#colecciones" className="text-slate-300 hover:text-white">Colecciones</a>
            <a href="#reviews" className="text-slate-300 hover:text-white">Reseñas</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
      <div className="text-xl font-extrabold">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function CollectionCard({ title, desc, tag }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{title}</p>
        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-300">
          {tag}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
        <div className="grid h-40 place-items-center text-slate-400">
          🧢 Imagen de {title}
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300 underline group-hover:text-white">
        Explorar →
      </p>
    </div>
  );
}

function ProductCard({ name, price, badge }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{name}</p>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {badge}
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
        <div className="grid h-44 place-items-center text-slate-400">
          🧢 Foto del producto
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-300">Precio</p>
          <p className="text-xl font-extrabold">{price}</p>
        </div>
        <Link
          to="/catalog"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90"
        >
          Ver
        </Link>
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}

function Review({ name, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-slate-400">★★★★★</p>
      <p className="mt-2 text-sm text-slate-200 leading-relaxed">“{text}”</p>
      <p className="mt-4 text-sm font-semibold">{name}</p>
      <p className="text-xs text-slate-400">Cliente verificado (demo)</p>
    </div>
  );
}
