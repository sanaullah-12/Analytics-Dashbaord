import {
  AnalyticsSnapshot,
  DateRangeOption,
  NotificationItem,
  Order,
  OrderStatus,
  UserRole,
} from "@/utils/types";

const SOURCES = ["Organic", "Paid", "Referral", "Social", "Email"];
const CUSTOMERS = [
  "Ali Raza",
  "Ahmed Khan",
  "Hassan Raza",
  "Usman Tariq",
  "Bilal Ahmed",
  "Fatima Noor",
  "Ayesha Siddiqui",
  "Maryam Javed",
  "Zainab Iqbal",
  "Sanaullah",
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDays(range: DateRangeOption, customDays?: number) {
  if (range === "7d") return 7;
  if (range === "30d") return 30;
  return Math.max(Math.min(customDays ?? 14, 90), 1);
}

export function generateAnalytics(range: DateRangeOption, customDays?: number): AnalyticsSnapshot {
  const days = getDays(range, customDays);
  const scale = days / 30;

  const kpis = {
    totalRevenue: randomBetween(180000, 265000) * scale,
    totalOrders: randomBetween(1900, 3100) * scale,
    conversionRate: randomBetween(210, 460) / 100,
    activeUsers: randomBetween(900, 2400),
  };

  const salesOverview = Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return {
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sales: randomBetween(1200, 9800),
    };
  });

  const revenueVsOrders = Array.from({ length: Math.min(days, 12) }, (_, index) => ({
    label: `W${index + 1}`,
    revenue: randomBetween(18000, 45000),
    orders: randomBetween(120, 420),
  }));

  const trafficSources = SOURCES.map((name) => ({
    name,
    value: randomBetween(10, 35),
  }));

  return {
    kpis,
    salesOverview,
    revenueVsOrders,
    trafficSources,
    generatedAt: new Date().toISOString(),
  };
}

function createStatus(): OrderStatus {
  const roll = Math.random();
  if (roll < 0.1) return "Cancelled";
  if (roll < 0.3) return "Pending";
  if (roll < 0.7) return "Paid";
  return "Shipped";
}

export function generateOrders(range: DateRangeOption, customDays?: number): Order[] {
  const days = getDays(range, customDays);
  const count = Math.max(25, Math.floor(days * 2.4));

  return Array.from({ length: count }, (_, index) => {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - randomBetween(0, days));

    return {
      id: `ORD-${(10000 + index).toString()}`,
      customer: CUSTOMERS[randomBetween(0, CUSTOMERS.length - 1)],
      email: `customer${index + 1}@example.com`,
      amount: randomBetween(45, 1290),
      status: createStatus(),
      source: SOURCES[randomBetween(0, SOURCES.length - 1)],
      createdAt: createdAt.toISOString(),
    };
  }).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function generateNotifications(role: UserRole): NotificationItem[] {
  const common: NotificationItem[] = [
    {
      id: "n1",
      title: "Traffic spike detected",
      description: "Organic visits are up 18% compared to yesterday.",
      createdAt: new Date(Date.now() - 14 * 60000).toISOString(),
      priority: "medium",
    },
    {
      id: "n2",
      title: "Checkout latency normalized",
      description: "Payment gateway response time is back below 300ms.",
      createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
      priority: "low",
    },
  ];

  if (role === "viewer") {
    return common;
  }

  return [
    {
      id: "n3",
      title: "Refund threshold reached",
      description: "Refund volume crossed 3% this week. Investigate product IDs.",
      createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
      priority: "high",
    },
    ...common,
  ];
}
