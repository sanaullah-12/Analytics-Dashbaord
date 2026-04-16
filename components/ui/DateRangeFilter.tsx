"use client";

import { useDashboardStore } from "@/store/dashboard-store";

export function DateRangeFilter() {
  const { dateRange, setDateRange, customDays, setCustomDays } = useDashboardStore();

  return (
    <div className="flex items-center gap-2 rounded-xl border border-(--border-color) bg-(--card-bg) p-1">
      <button
        onClick={() => setDateRange("7d")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          dateRange === "7d"
            ? "bg-(--accent) text-white"
            : "text-(--muted-text) hover:text-foreground"
        }`}
      >
        7D
      </button>
      <button
        onClick={() => setDateRange("30d")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          dateRange === "30d"
            ? "bg-(--accent) text-white"
            : "text-(--muted-text) hover:text-foreground"
        }`}
      >
        30D
      </button>
      <button
        onClick={() => setDateRange("custom")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          dateRange === "custom"
            ? "bg-(--accent) text-white"
            : "text-(--muted-text) hover:text-foreground"
        }`}
      >
        Custom
      </button>
      {dateRange === "custom" ? (
        <input
          aria-label="Custom days"
          type="number"
          min={1}
          max={90}
          value={customDays}
          onChange={(event) => setCustomDays(Number(event.target.value))}
          className="w-16 rounded-md border border-(--border-color) bg-(--surface) px-2 py-1 text-xs"
        />
      ) : null}
    </div>
  );
}
