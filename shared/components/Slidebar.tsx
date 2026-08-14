"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  Home,
  Truck,
  ClipboardList,
  Users,
  Package,
  Settings,
  LogOut,
  Search,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
};

const links: NavItem[] = [
  { label: "Dashboard",     href: "/dashboard",           icon: Home,          roles: ["SUPER_ADMIN", "OPERATOR"] },
  { label: "Flota",         href: "/dashboard/fleet",     icon: Truck,         roles: ["SUPER_ADMIN", "OPERATOR"] },
  { label: "Pedidos",       href: "/dashboard/orders",    icon: ClipboardList, roles: ["SUPER_ADMIN", "OPERATOR"] },
  { label: "Clientes",      href: "/dashboard/customers", icon: Users,         roles: ["SUPER_ADMIN", "OPERATOR"] },
  { label: "Inventario",    href: "/dashboard/inventory", icon: Package,       roles: ["SUPER_ADMIN"] },
  { label: "Configuración", href: "/dashboard/settings",  icon: Settings,      roles: ["SUPER_ADMIN"] },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const labelVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.18 } },
  exit: { opacity: 0, x: -8, transition: { duration: 0.12 } },
};

function isLinkActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname() ?? "";
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const visibleLinks = links.filter(link => link.roles.includes(role));

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      style={{ backgroundColor: "#0B1220", borderColor: "#1F2937" }}
      className="relative flex h-screen flex-col border-r"
    >
      <motion.button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        whileHover={{ scale: 1.15, backgroundColor: "#1E293B" }}
        whileTap={{ scale: 0.9 }}
        style={{ backgroundColor: "#111827", borderColor: "#1F2937", color: "#CBD5E1" }}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border"
      >
        <motion.span
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </motion.span>
      </motion.button>

      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        {/* Header / brand */}
        <div
          style={{ borderColor: "#1F2937" }}
          className="flex items-center gap-3 px-4 py-5 border-b"
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ backgroundColor: "#2563EB", color: "#FFFFFF" }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
          >
            AF
          </motion.div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                variants={labelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="min-w-0"
              >
                <p style={{ color: "#F8FAFC" }} className="truncate text-sm font-semibold">
                  ERP Aura Freight
                </p>
                <p style={{ color: "#94A3B8" }} className="truncate text-xs">
                  {role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="px-4 pt-4">
          <motion.div
            whileHover={{ borderColor: "#3B82F6" }}
            style={{ backgroundColor: "#111827", borderColor: "#111827" }}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors"
          >
            <Search style={{ color: "#94A3B8" }} className="h-4 w-4 shrink-0" />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.input
                  key="search-input"
                  variants={labelVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  type="text"
                  placeholder="Buscar..."
                  style={{ color: "#F8FAFC" }}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
        >
          {visibleLinks.map(({ label, href, icon: Icon }) => {
            const isActive = isLinkActive(pathname, href);
            return (
              <motion.div key={href} variants={itemVariants}>
                <Link
                  href={href}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ color: isActive ? "#FFFFFF" : "#CBD5E1" }}
                  className="group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      style={{ backgroundColor: "#2563EB" }}
                      className="absolute inset-0 rounded-lg"
                    />
                  )}
                  {!isActive && hovered === label && (
                    <motion.span
                      layoutId="hover-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{ backgroundColor: "#1E293B" }}
                      className="absolute inset-0 rounded-lg"
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      style={{ backgroundColor: "#3B82F6" }}
                      className="absolute left-0 top-1/2 z-10 h-5 w-1 -translate-y-1/2 rounded-r"
                    />
                  )}
                  <motion.span
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative z-10 flex shrink-0"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.span>
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        variants={labelVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="relative z-10 truncate"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {collapsed && hovered === label && (
                      <motion.span
                        initial={{ opacity: 0, x: -6, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -6, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        style={{ backgroundColor: "#111827", color: "#F8FAFC", borderColor: "#1F2937" }}
                        className="absolute left-full ml-3 z-20 whitespace-nowrap rounded-md border px-2.5 py-1.5 text-xs shadow-lg"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Logout */}
        <div style={{ borderColor: "#1F2937" }} className="border-t px-3 py-4">
          <motion.button
            onClick={() => signOut({ callbackUrl: "/login" })}
            whileHover={{ backgroundColor: "#1E293B", color: "#FFFFFF", x: 2 }}
            whileTap={{ scale: 0.97 }}
            style={{ color: "#CBD5E1" }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
          >
            <motion.span whileHover={{ x: -3 }} className="flex shrink-0">
              <LogOut className="h-5 w-5" />
            </motion.span>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  variants={labelVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  Cerrar sesión
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}