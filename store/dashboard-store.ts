"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DateRangeOption, ThemeMode, UserRole } from "@/utils/types";

interface DashboardState {
  theme: ThemeMode;
  role: UserRole;
  dateRange: DateRangeOption;
  customDays: number;
  notificationsOpen: boolean;
  mobileSidebarOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setRole: (role: UserRole) => void;
  setDateRange: (range: DateRangeOption) => void;
  setCustomDays: (days: number) => void;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      theme: "light",
      role: "admin",
      dateRange: "30d",
      customDays: 14,
      notificationsOpen: false,
      mobileSidebarOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set({
          theme: get().theme === "light" ? "dark" : "light",
        }),
      setRole: (role) => set({ role }),
      setDateRange: (dateRange) => set({ dateRange }),
      setCustomDays: (customDays) => set({ customDays }),
      toggleNotifications: () =>
        set({ notificationsOpen: !get().notificationsOpen }),
      closeNotifications: () => set({ notificationsOpen: false }),
      toggleMobileSidebar: () =>
        set({ mobileSidebarOpen: !get().mobileSidebarOpen }),
      closeMobileSidebar: () => set({ mobileSidebarOpen: false }),
    }),
    {
      name: "analytics-dashboard-pro-store",
      partialize: (state) => ({
        theme: state.theme,
        role: state.role,
        dateRange: state.dateRange,
        customDays: state.customDays,
      }),
    },
  ),
);
