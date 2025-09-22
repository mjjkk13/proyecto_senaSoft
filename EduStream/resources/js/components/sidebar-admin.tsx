import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { dashboard } from "@/routes";
import { LayoutDashboard, User, Users, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const { url } = usePage();
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { name: "Dashboard", href: dashboard.url(), icon: <LayoutDashboard size={18} /> },
    { name: "Perfil", href: "/profile", icon: <User size={18} /> },
    { name: "Usuarios", href: "/usuarios", icon: <Users size={18} /> },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-base-200 min-h-screen shadow-lg p-4 transition-all duration-300`}
    >
      {/* Header con toggle */}
      <div className="flex items-center justify-between mb-6 px-2">
        {isOpen && <div className="text-2xl font-bold">EduStream</div>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-base-300 transition"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navegación */}
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              url.startsWith(link.href)
                ? "bg-primary text-white"
                : "hover:bg-base-300"
            }`}
          >
            {link.icon}
            {isOpen && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
