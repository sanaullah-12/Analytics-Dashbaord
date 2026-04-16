export type DateRangeOption = "7d" | "30d" | "custom";
export type ThemeMode = "light" | "dark";
export type UserRole = "admin" | "viewer";

export interface KPIData {
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  activeUsers: number;
}

export interface SalesPoint {
  label: string;
  sales: number;
}

export interface RevenueOrdersPoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface TrafficSource {
  name: string;
  value: number;
}

export interface AnalyticsSnapshot {
  kpis: KPIData;
  salesOverview: SalesPoint[];
  revenueVsOrders: RevenueOrdersPoint[];
  trafficSources: TrafficSource[];
  generatedAt: string;
}

export type OrderStatus = "Pending" | "Paid" | "Shipped" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  source: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: "low" | "medium" | "high";
}
