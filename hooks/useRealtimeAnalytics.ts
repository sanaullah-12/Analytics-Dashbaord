"use client";

import { useCallback, useEffect, useState } from "react";

import { useDashboardStore } from "@/store/dashboard-store";
import { AnalyticsSnapshot, NotificationItem, Order } from "@/utils/types";

interface RealtimeState {
  analytics: AnalyticsSnapshot | null;
  orders: Order[];
  notifications: NotificationItem[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useRealtimeAnalytics(): RealtimeState {
  const { role, dateRange, customDays } = useDashboardStore();
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    setIsRefreshing((prev) => (isLoading ? prev : true));

    try {
      const query = `range=${dateRange}&customDays=${customDays}&role=${role}`;
      const [analyticsRes, ordersRes, notificationsRes] = await Promise.all([
        fetch(`/api/analytics?${query}`, { cache: "no-store" }),
        fetch(`/api/orders?${query}`, { cache: "no-store" }),
        fetch(`/api/notifications?${query}`, { cache: "no-store" }),
      ]);

      if (!analyticsRes.ok || !ordersRes.ok || !notificationsRes.ok) {
        throw new Error("Failed to load analytics data.");
      }

      const analyticsJson = (await analyticsRes.json()) as { data: AnalyticsSnapshot };
      const ordersJson = (await ordersRes.json()) as { data: Order[] };
      const notificationsJson = (await notificationsRes.json()) as {
        data: NotificationItem[];
      };

      setAnalytics(analyticsJson.data);
      setOrders(ordersJson.data);
      setNotifications(notificationsJson.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [customDays, dateRange, role, isLoading]);

  useEffect(() => {
    void refresh();

    const interval = setInterval(() => {
      void refresh();
    }, 7000);

    return () => clearInterval(interval);
  }, [refresh]);

  return {
    analytics,
    orders,
    notifications,
    isLoading,
    isRefreshing,
    error,
    refresh,
  };
}
