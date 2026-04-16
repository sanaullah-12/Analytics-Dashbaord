"use client";

import { ArrowDownWideNarrow, ArrowUpWideNarrow, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { CSVExportButton } from "@/components/dashboard/CSVExportButton";
import { Card } from "@/components/ui/Card";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { useDashboardStore } from "@/store/dashboard-store";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Order } from "@/utils/types";

type SortField = "createdAt" | "amount" | "customer";
type SortDirection = "asc" | "desc";

interface OrdersTableProps {
  orders: Order[];
  loading: boolean;
}

const PAGE_SIZE = 8;

export function OrdersTable({ orders, loading }: OrdersTableProps) {
  const role = useDashboardStore((state) => state.role);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return orders
      .filter((order) =>
        [order.id, order.customer, order.email]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .filter((order) => (status === "all" ? true : order.status === status))
      .sort((a, b) => {
        const modifier = sortDirection === "asc" ? 1 : -1;

        if (sortField === "amount") {
          return (a.amount - b.amount) * modifier;
        }

        if (sortField === "customer") {
          return a.customer.localeCompare(b.customer) * modifier;
        }

        return (+new Date(a.createdAt) - +new Date(b.createdAt)) * modifier;
      });
  }, [orders, query, status, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection("desc");
  }

  return (
    <Card title="Recent Orders" className="overflow-hidden">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-(--muted-text)" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search orders"
              className="rounded-lg border border-(--border-color) bg-(--surface) py-2 pl-7 pr-2 text-xs"
            />
          </div>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-(--border-color) bg-(--surface) px-2 py-2 text-xs"
          >
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <CSVExportButton orders={filtered} disabled={!filtered.length || role !== "admin"} />
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingSkeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-(--surface) text-xs uppercase tracking-wide text-(--muted-text)">
                <tr>
                  <th className="px-3 py-2">Order ID</th>
                  <th className="px-3 py-2">
                    <button className="inline-flex items-center gap-1" onClick={() => changeSort("customer")}>
                      Customer
                      {sortDirection === "asc" ? <ArrowUpWideNarrow size={12} /> : <ArrowDownWideNarrow size={12} />}
                    </button>
                  </th>
                  <th className="px-3 py-2">Source</th>
                  <th className="px-3 py-2">
                    <button className="inline-flex items-center gap-1" onClick={() => changeSort("amount")}>
                      Amount
                      {sortDirection === "asc" ? <ArrowUpWideNarrow size={12} /> : <ArrowDownWideNarrow size={12} />}
                    </button>
                  </th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">
                    <button className="inline-flex items-center gap-1" onClick={() => changeSort("createdAt")}>
                      Date
                      {sortDirection === "asc" ? <ArrowUpWideNarrow size={12} /> : <ArrowDownWideNarrow size={12} />}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((order) => (
                  <tr key={order.id} className="border-b border-(--border-color) last:border-none">
                    <td className="px-3 py-2 text-xs font-semibold">{order.id}</td>
                    <td className="px-3 py-2">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-(--muted-text)">{order.email}</p>
                    </td>
                    <td className="px-3 py-2">{order.source}</td>
                    <td className="px-3 py-2 font-semibold">{formatCurrency(order.amount)}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-(--surface) px-2 py-1 text-xs">{order.status}</span>
                    </td>
                    <td className="px-3 py-2">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-(--muted-text)">
            <p>
              Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-lg border border-(--border-color) px-3 py-1.5 disabled:opacity-40"
              >
                Prev
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="rounded-lg border border-(--border-color) px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
