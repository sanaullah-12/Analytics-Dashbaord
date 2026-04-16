"use client";

import { motion } from "framer-motion";
import { Activity, Percent, ShoppingCart, Wallet } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { formatCurrency, formatNumber, formatPercent } from "@/utils/formatters";
import { KPIData } from "@/utils/types";

interface KpiCardsProps {
  data: KPIData | null;
  loading: boolean;
}

export function KpiCards({ data, loading }: KpiCardsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: data ? formatCurrency(data.totalRevenue) : "-",
      icon: Wallet,
      tone: "text-emerald-500",
    },
    {
      label: "Total Orders",
      value: data ? formatNumber(data.totalOrders) : "-",
      icon: ShoppingCart,
      tone: "text-sky-500",
    },
    {
      label: "Conversion Rate",
      value: data ? formatPercent(data.conversionRate) : "-",
      icon: Percent,
      tone: "text-amber-500",
    },
    {
      label: "Active Users",
      value: data ? formatNumber(data.activeUsers) : "-",
      icon: Activity,
      tone: "text-cyan-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-(--muted-text)">{card.label}</p>
                  {loading ? (
                    <LoadingSkeleton className="mt-2 h-8 w-28" />
                  ) : (
                    <p className="mt-2 text-2xl font-bold">{card.value}</p>
                  )}
                </div>
                <span className={`rounded-xl bg-(--surface) p-2 ${card.tone}`}>
                  <Icon size={20} />
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
