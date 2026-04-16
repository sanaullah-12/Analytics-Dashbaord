"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card } from "@/components/ui/Card";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { TrafficSource } from "@/utils/types";

interface TrafficPieChartProps {
  data: TrafficSource[];
  loading: boolean;
}

const COLORS = ["#0f766e", "#0ea5e9", "#f59e0b", "#ef4444", "#22c55e"];

export function TrafficPieChart({ data, loading }: TrafficPieChartProps) {
  return (
    <Card title="Traffic Sources">
      {loading ? (
        <LoadingSkeleton className="h-72 w-full" />
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
