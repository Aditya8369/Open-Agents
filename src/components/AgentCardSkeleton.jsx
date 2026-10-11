/**
 * AgentCardSkeleton — placeholder shown while the agent registry is loading.
 * Mirrors AgentCard's dimensions for both variants so neither view shifts on
 * hydration.
 */
export default function AgentCardSkeleton({ variant = 'grid' }) {
  const bar = 'bg-zinc-200 dark:bg-surface-input'

  if (variant === 'index') {
    return (
      <div
        className="flex items-center gap-3 border-b border-zinc-200 px-1 py-3 dark:border-border"
        aria-hidden="true"
      >
        <div className={`h-2.5 w-7 shrink-0 ${bar}`} />
        <div className={`h-3.5 w-3.5 shrink-0 ${bar}`} />
        <div className={`h-3 w-48 shrink-0 ${bar}`} />
        <div className={`hidden h-2.5 flex-1 sm:block ${bar}`} />
        <div className={`ml-auto hidden h-5 w-24 shrink-0 lg:block ${bar}`} />
      </div>
    )
  }

  return (
    <div
      className="animate-pulse border border-zinc-200 bg-white p-4 dark:border-border dark:bg-surface-card"
      aria-hidden="true"
    >
      <div className="flex items-start gap-3">
        <div className={`h-7 w-7 shrink-0 ${bar}`} />
        <div className="min-w-0 flex-1">
          <div className={`h-3.5 w-3/4 ${bar}`} />
          <div className={`mt-1.5 h-2.5 w-16 ${bar}`} />
        </div>
      </div>

      <div className={`mt-3 h-2.5 w-full ${bar}`} />
      <div className={`mt-1.5 h-2.5 w-5/6 ${bar}`} />

      <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-2.5 dark:border-border">
        <div className={`h-2.5 w-20 ${bar}`} />
        <div className={`h-2.5 w-8 ${bar}`} />
      </div>
    </div>
  )
}
