import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-(--border-color) bg-(--card-bg) p-5 shadow-[var(--soft-shadow)]",
        className,
      )}
    >
      {title ? <h3 className="mb-4 text-sm font-semibold text-(--muted-text)">{title}</h3> : null}
      {children}
    </section>
  );
}
