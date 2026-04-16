"use client";

import { Download } from "lucide-react";

import { exportOrdersToCsv } from "@/utils/csv";
import { Order } from "@/utils/types";

interface CSVExportButtonProps {
  orders: Order[];
  disabled?: boolean;
}

export function CSVExportButton({ orders, disabled }: CSVExportButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => exportOrdersToCsv(orders)}
      className="inline-flex items-center gap-2 rounded-lg border border-(--border-color) bg-(--card-bg) px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={14} />
      Export CSV
    </button>
  );
}
