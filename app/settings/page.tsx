"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { useRealtimeAnalytics } from "@/hooks/useRealtimeAnalytics";
import { useDashboardStore } from "@/store/dashboard-store";

export default function SettingsPage() {
  const { notifications, refresh, isRefreshing } = useRealtimeAnalytics();
  const role = useDashboardStore((state) => state.role);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <AppShell notifications={notifications} onRefresh={refresh} isRefreshing={isRefreshing}>
      <motion.div
        className="grid gap-4 lg:grid-cols-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card title="Workspace Preferences">
          <div className="space-y-4 text-sm">
            <label className="flex items-center justify-between rounded-lg border border-(--border-color) p-3">
              <span>Email alerts</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(event) => setEmailAlerts(event.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-(--border-color) p-3">
              <span>Weekly digest report</span>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(event) => setWeeklyDigest(event.target.checked)}
              />
            </label>
          </div>
        </Card>

        <Card title="Role Access">
          <p className="text-sm text-(--muted-text)">
            Current role: <span className="font-semibold uppercase text-foreground">{role}</span>
          </p>
          <p className="mt-3 text-sm text-(--muted-text)">
            {role === "admin"
              ? "Admins can export order data, review high-priority alerts, and access full performance controls."
              : "Viewers can inspect analytics and order activity with read-only access."}
          </p>
        </Card>
      </motion.div>
    </AppShell>
  );
}
