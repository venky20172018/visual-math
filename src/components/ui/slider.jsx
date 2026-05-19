export function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  ...props
}) {
  const arr = value ?? defaultValue ?? [min]
  const current = Array.isArray(arr) ? arr[0] : arr
  return (
    <input
      type="range"
      value={current}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onValueChange?.([Number(e.target.value)])}
      className={`h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-indigo-500 dark:bg-zinc-800 ${className}`}
      {...props}
    />
  )
}
