"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/Card";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SalesPoint } from "@/utils/types";

interface SalesLineChartProps {
  data: SalesPoint[];
  loading: boolean;
}

export function SalesLineChart({ data, loading }: SalesLineChartProps) {
  return (
    <Card title="Sales Overview">
      {loading ? (
        <LoadingSkeleton className="h-72 w-full" />
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-text)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-text)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                itemStyle={{ color: "var(--foreground)" }}
              />
              <Line type="monotone" dataKey="sales" stroke="var(--accent)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
