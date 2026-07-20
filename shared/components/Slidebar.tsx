"use client";

import Link from "next/link";
import {
  Home,
  Truck,
  ClipboardList,
  Users,
  Package,
  Settings,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Flota",
    href: "/dashboard/fleet",
    icon: Truck,
  },
  {
    label: "Pedidos",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    label: "Clientes",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Inventario",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    label: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Slidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#0B1220] border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="px-8 py-8 border-b border-slate-800">
        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            AF
          </div>

          <div>
            <h1 className="text-white font-bold text-lg">
              Aura Freight
            </h1>

            <p className="text-slate-400 text-sm">
              Logistics ERP
            </p>
          </div>

        </div>
      </div>

      {/* Navegación */}

      <nav className="flex-1 px-4 py-8">

        <ul className="space-y-2">

          {links.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="
                flex
                items-center
                gap-4
                rounded-xl
                px-4
                py-3
                text-slate-300
                transition-all
                duration-200
                hover:bg-[#16213E]
                hover:text-white
              "
              >
                <Icon size={21} />

                <span className="font-medium">
                  {label}
                </span>
              </Link>
            </li>
          ))}

        </ul>

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <div className="rounded-xl bg-[#16213E] p-4">

          <p className="text-white font-medium">
            Aura Freight
          </p>

          <p className="text-sm text-slate-400">
            ERP de logística
          </p>

        </div>

      </div>

    </aside>
  );
}