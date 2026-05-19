const variants = {
  default:
    'bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50',
  destructive:
    'border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600 dark:text-red-400',
}

export function Alert({ className = '', variant = 'default', ...props }) {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800 ${variants[variant] ?? variants.default} ${className}`}
      {...props}
    />
  )
}

export function AlertTitle({ className = '', ...props }) {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    />
  )
}

export function AlertDescription({ className = '', ...props }) {
  return (
    <div
      className={`text-sm text-zinc-600 dark:text-zinc-400 [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  )
}
