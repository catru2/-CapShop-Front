import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <Container className="py-10">
        {/* Top */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="md:max-w-md">
            <div className="text-white font-extrabold text-lg">CapShop</div>
            <p className="mt-2 text-sm text-slate-400">
              Catálogo + panel administrativo para gestionar productos y categorías.
              Flujo real de e-commerce.
            </p>
          </div>

          {/* Contact */}
          <div className="text-sm md:text-right">
            <div className="font-semibold text-white">Contacto</div>
            <p className="mt-3 text-slate-300">ventas@capshop.com</p>
            <p className="text-slate-400">Envíos a todo México • Pagos seguros</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} CapShop. Todos los derechos reservados.
          </div>

          {/* Opcional: mini “legal” o tagline */}
          <div className="text-xs text-slate-500">
            Hecho con React + Tailwind • API Node + MySQL
          </div>
        </div>
      </Container>
    </footer>
  );
}
