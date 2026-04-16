"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/Card";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { RevenueOrdersPoint } from "@/utils/types";

interface RevenueOrdersBarChartProps {
  data: RevenueOrdersPoint[];
  loading: boolean;
}

export function RevenueOrdersBarChart({ data, loading }: RevenueOrdersBarChartProps) {
  return (
    <Card title="Revenue vs Orders">
      {loading ? (
        <LoadingSkeleton className="h-72 w-full" />
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
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
              <Bar dataKey="revenue" fill="var(--accent)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="orders" fill="var(--accent-soft)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
