"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { UserRole } from "@/utils/types";

const options: UserRole[] = ["admin", "viewer"];

export function RoleSwitch() {
  const { role, setRole } = useDashboardStore();

  return (
    <div className="inline-flex rounded-xl border border-(--border-color) bg-(--card-bg) p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setRole(option)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
            role === option
              ? "bg-(--accent) text-white"
              : "text-(--muted-text) hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
