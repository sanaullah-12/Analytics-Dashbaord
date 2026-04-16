interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex h-[45vh] flex-col items-center justify-center gap-4 rounded-2xl border border-red-300/50 bg-red-50/60 p-6 text-center dark:border-red-500/40 dark:bg-red-900/10">
      <p className="max-w-lg text-sm text-red-700 dark:text-red-200">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
