"use client";

import { ChartNoAxesCombined, Cog, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: ChartNoAxesCombined },
  { href: "/settings", label: "Settings", icon: Cog },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-(--border-color) bg-(--surface) p-5 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent) text-white shadow-lg">
          <ShieldCheck size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold">Analytics Dashboard Pro</p>
          <p className="text-xs text-(--muted-text)">E-commerce Intelligence</p>
        </div>
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
    </aside>
  );
}
