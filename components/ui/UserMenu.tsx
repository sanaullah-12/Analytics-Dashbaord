"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-(--border-color) bg-(--card-bg) px-3 py-2 text-sm font-medium"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--accent) text-xs font-bold text-white">
          SN
        </span>
        Sanaullah
        <ChevronDown size={15} className="text-(--muted-text)" />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-(--border-color) bg-(--card-bg) p-2 shadow-xl">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-(--surface)">
            <User size={15} />
            Profile
          </button>
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-(--surface)"
          >
            <Settings size={15} />
            Settings
          </Link>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
