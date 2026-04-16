"use client";

import { ReactNode, useEffect } from "react";

import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { NotificationPanel } from "@/components/ui/NotificationPanel";
import { useDashboardStore } from "@/store/dashboard-store";
import { NotificationItem } from "@/utils/types";

interface AppShellProps {
  children: ReactNode;
  notifications: NotificationItem[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function AppShell({
  children,
  notifications,
  onRefresh,
  isRefreshing,
}: AppShellProps) {
  const theme = useDashboardStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-foreground">
      <div className="mx-auto flex w-full max-w-[1800px]">
        <Sidebar />
        <MobileSidebar />
        <div className="min-h-screen flex-1">
          <TopNavbar onRefresh={onRefresh} isRefreshing={isRefreshing} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
      <NotificationPanel items={notifications} />
    </div>
  );
}
