import clsx from "clsx";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-xl bg-[linear-gradient(120deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02),rgba(0,0,0,0.06))] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08),rgba(255,255,255,0.16))]",
        className,
      )}
    />
  );
}
