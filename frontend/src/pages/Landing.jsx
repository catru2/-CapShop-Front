import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Loader from "../components/ui/Loader";
import ProductCard from "../components/catalog/ProductCard";
import { productsApi } from "../api/products.api";
import { categoriesApi } from "../api/categories.api";

export default function Landing() {
  const [featured, setFeatured] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const [p, c] = await Promise.all([productsApi.list(), categoriesApi.list()]);
        if (!alive) return;

        setFeatured((p || []).slice(0, 6));
        setCats((c || []).slice(0, 6));
      } catch {
        if (!alive) return;
        setFeatured([]);
        setCats([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => (alive = false);
  }, []);

  return (
    <div className="bg-slate-950">
      {/* HERO */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <Container className="relative py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Badge className="mb-4">NUEVA TEMPORADA • STREET & URBAN</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                Gorras premium para un look que se nota.
              </h1>
              <p className="mt-4 text-slate-300">
                CapShop es un catálogo real con panel administrativo. Explora productos,
                filtra por categoría y mira detalles como en una tienda online.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button as={Link} to="/catalog">
                  Comprar ahora
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-extrabold">24h</div>
                  <div className="text-xs text-slate-400">Envío rápido</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-extrabold">100%</div>
                  <div className="text-xs text-slate-400">Pagos seguros</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-extrabold">Top</div>
                  <div className="text-xs text-slate-400">Calidad urbana</div>
                </div>
              </div>
            </div>

            {/* VISUAL */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  className="h-72 w-full object-cover"
                  src="https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1600&q=80"
                  alt="CapShop hero"
                  loading="lazy"
                />
              </div>
          
            </div>
          </div>
        </Container>
      </div>

      {/* COLLECTIONS */}
      <Container className="py-14" id="collections">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Colecciones</h2>
            <p className="text-slate-300 text-sm mt-1">
              Filtra por categoría y encuentra tu estilo.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(cats.length ? cats : [{ id: 1, name: "Snapback" }, { id: 2, name: "Trucker" }, { id: 3, name: "Dad Hat" }]).map(
            (c) => (
              <Link
                key={c.id}
                to={`/catalog?categoryId=${c.id}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-white">{c.name}</div>
                  <div className="text-slate-300 group-hover:text-white">→</div>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Explora modelos y detalles por categoría.
                </p>
              </Link>
            )
          )}
        </div>
      </Container>

      {/* FEATURED PRODUCTS */}
      <Container className="pb-14" id="featured">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Destacados</h2>
            <p className="text-slate-300 text-sm mt-1">
              Gorras a tu estilo.
            </p>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <Loader label="Cargando destacados..." />
          ) : featured.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
              No hay productos para mostrar aún. Crea productos desde el Admin.
            </div>
          )}
        </div>
      </Container>

      {/* BENEFITS */}
      <div className="border-t border-white/10 bg-slate-950" id="benefits">
        <Container className="py-14">
          <h2 className="text-2xl font-extrabold text-white">¿Por qué CapShop?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-bold text-white">Catálogo real</div>
              <p className="mt-2 text-sm text-slate-300">
                Filtros por categoría, detalle de producto y UI tipo tienda.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-bold text-white">Panel Admin</div>
              <p className="mt-2 text-sm text-slate-300">
                CRUD completo con auth y roles para gestionar productos/categorías.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-bold text-white">Backend conectado</div>
              <p className="mt-2 text-sm text-slate-300">
                Consumo de API real con token en headers automáticamente.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xl font-extrabold text-white">
                ¿Listo para ver el catálogo?
              </div>
              <p className="text-slate-300 text-sm mt-1">
                Explora, filtra por categoría y abre el detalle de cualquier producto.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
