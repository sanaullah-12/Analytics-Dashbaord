"use client";

import { MoonStar, SunMedium } from "lucide-react";

import { useDashboardStore } from "@/store/dashboard-store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useDashboardStore();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-color) bg-(--card-bg) text-foreground transition hover:scale-[1.03]"
    >
      {theme === "light" ? <MoonStar size={17} /> : <SunMedium size={17} />}
    </button>
  );
}
