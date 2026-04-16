"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, X } from "lucide-react";

import { useDashboardStore } from "@/store/dashboard-store";
import { formatRelativeTime } from "@/utils/formatters";
import { NotificationItem } from "@/utils/types";

interface NotificationPanelProps {
  items: NotificationItem[];
}

export function NotificationPanel({ items }: NotificationPanelProps) {
  const { notificationsOpen, closeNotifications } = useDashboardStore();

  return (
    <AnimatePresence>
      {notificationsOpen ? (
        <>
          <motion.button
            aria-label="Close notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNotifications}
            className="fixed inset-0 z-40 bg-black/35"
          />
          <motion.aside
            initial={{ x: 340 }}
            animate={{ x: 0 }}
            exit={{ x: 340 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-(--border-color) bg-(--surface) p-4 shadow-2xl"
          >
            <header className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={18} />
                <h3 className="text-base font-semibold">Notifications</h3>
              </div>
              <button
                onClick={closeNotifications}
                className="rounded-lg border border-(--border-color) p-2"
              >
                <X size={15} />
              </button>
            </header>

            <div className="space-y-3">
              {items.length ? (
                items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-(--border-color) bg-(--card-bg) p-3"
                  >
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-(--muted-text)">{item.description}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-(--muted-text)">
                      {item.priority} - {formatRelativeTime(item.createdAt)}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-(--muted-text)">No notifications found.</p>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
