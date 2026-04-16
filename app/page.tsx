"use client";

import { motion } from "framer-motion";

import { KpiCards } from "@/components/dashboard/KpiCards";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { RevenueOrdersBarChart } from "@/components/dashboard/charts/RevenueOrdersBarChart";
import { SalesLineChart } from "@/components/dashboard/charts/SalesLineChart";
import { TrafficPieChart } from "@/components/dashboard/charts/TrafficPieChart";
import { AppShell } from "@/components/layout/AppShell";
import { ErrorState } from "@/components/ui/ErrorState";
import { useRealtimeAnalytics } from "@/hooks/useRealtimeAnalytics";

export default function Home() {
  const {
    analytics,
    orders,
    notifications,
    isLoading,
    isRefreshing,
    error,
    refresh,
  } = useRealtimeAnalytics();

  if (error && !analytics) {
    return (
      <AppShell notifications={notifications} onRefresh={refresh} isRefreshing={isRefreshing}>
        <ErrorState message={error} onRetry={() => void refresh()} />
      </AppShell>
    );
  }

  return (
    <AppShell notifications={notifications} onRefresh={refresh} isRefreshing={isRefreshing}>
      <div className="space-y-4">
        {error ? <ErrorState message={error} onRetry={() => void refresh()} /> : null}

        <KpiCards data={analytics?.kpis ?? null} loading={isLoading} />

        <motion.div
          className="grid gap-4 xl:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <div className="xl:col-span-2">
            <SalesLineChart data={analytics?.salesOverview ?? []} loading={isLoading} />
          </div>
          <TrafficPieChart data={analytics?.trafficSources ?? []} loading={isLoading} />
        </motion.div>

        <div className="grid gap-4">
          <RevenueOrdersBarChart data={analytics?.revenueVsOrders ?? []} loading={isLoading} />
          <OrdersTable orders={orders} loading={isLoading} />
        </div>
      </div>
    </AppShell>
  );
}
