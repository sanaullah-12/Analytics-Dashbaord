"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChartNoAxesCombined, Cog, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useDashboardStore } from "@/store/dashboard-store";

const navItems = [
  { href: "/", label: "Dashboard", icon: ChartNoAxesCombined },
  { href: "/settings", label: "Settings", icon: Cog },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const mobileSidebarOpen = useDashboardStore((state) => state.mobileSidebarOpen);
  const closeMobileSidebar = useDashboardStore((state) => state.closeMobileSidebar);

  useEffect(() => {
    closeMobileSidebar();
  }, [pathname, closeMobileSidebar]);

  return (
    <AnimatePresence>
      {mobileSidebarOpen ? (
        <>
          <motion.button
            aria-label="Close mobile sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileSidebar}
            className="fixed inset-0 z-40 bg-black/45 lg:hidden"
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 24, stiffness: 230 }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-(--border-color) bg-(--surface) p-5 shadow-2xl lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent) text-white shadow-lg">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Analytics Dashboard Pro</p>
                  <p className="text-xs text-(--muted-text)">E-commerce Intelligence</p>
                </div>
              </div>
              <button
                onClick={closeMobileSidebar}
                className="rounded-lg border border-(--border-color) bg-(--card-bg) p-2"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-(--accent) text-white shadow-lg"
                        : "text-(--muted-text) hover:bg-(--card-bg) hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
