"use client";

import { Bell, Menu, RefreshCw } from "lucide-react";

import { DateRangeFilter } from "@/components/ui/DateRangeFilter";
import { RoleSwitch } from "@/components/ui/RoleSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UserMenu } from "@/components/ui/UserMenu";
import { useDashboardStore } from "@/store/dashboard-store";

interface TopNavbarProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function TopNavbar({ onRefresh, isRefreshing }: TopNavbarProps) {
  const { toggleNotifications, toggleMobileSidebar } = useDashboardStore();

  return (
    <header className="sticky top-0 z-30 border-b border-(--border-color) bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-color) bg-(--card-bg) lg:hidden"
            aria-label="Open mobile sidebar"
          >
            <Menu size={18} />
          </button>

          <div>
          <h1 className="text-lg font-bold">Performance Overview</h1>
          <p className="text-xs text-(--muted-text)">Monitor revenue, orders, conversion, and traffic in real time.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden md:block">
            <DateRangeFilter />
          </div>
          <div className="hidden sm:block">
            <RoleSwitch />
          </div>
          <button
            onClick={onRefresh}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-color) bg-(--card-bg)"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </button>
          <button
            onClick={toggleNotifications}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border-color) bg-(--card-bg)"
          >
            <Bell size={16} />
          </button>
          <ThemeToggle />
          <div className="hidden sm:block">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
