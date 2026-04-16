import { Order } from "@/utils/types";

export function exportOrdersToCsv(orders: Order[]) {
  const headers = [
    "Order ID",
    "Customer",
    "Email",
    "Amount",
    "Status",
    "Source",
    "Created At",
  ];

  const rows = orders.map((order) => [
    order.id,
    order.customer,
    order.email,
    order.amount.toFixed(2),
    order.status,
    order.source,
    order.createdAt,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `\"${String(cell).replace(/\"/g, "\"\"")}\"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `orders-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
