import { useMemo, useState } from 'react'

export default function SineWaveExplorer() {
  const [amplitude, setAmplitude] = useState(80)
  const [frequency, setFrequency] = useState(2)
  const [phase, setPhase] = useState(0)

  const width = 600
  const height = 240
  const midY = height / 2

  const path = useMemo(() => {
    const points = []
    for (let x = 0; x <= width; x += 2) {
      const t = (x / width) * Math.PI * 2 * frequency + (phase * Math.PI) / 180
      const y = midY - Math.sin(t) * amplitude
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(2)}`)
    }
    return points.join(' ')
  }, [amplitude, frequency, phase])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            x1="0"
            y1={midY}
            x2={width}
            y2={midY}
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeDasharray="4 4"
          />
          <path
            d={path}
            fill="none"
            stroke="url(#g)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Slider
          label="Amplitude"
          value={amplitude}
          min={10}
          max={110}
          onChange={setAmplitude}
        />
        <Slider
          label="Frequency"
          value={frequency}
          min={0.5}
          max={8}
          step={0.1}
          onChange={setFrequency}
        />
        <Slider
          label="Phase (°)"
          value={phase}
          min={0}
          max={360}
          onChange={setPhase}
        />
      </div>
    </div>
  )
}

function Slider({ label, value, min, max, step = 1, onChange }) {
  return (
    <label className="block rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        <span className="font-mono text-sm text-zinc-500">
          {Number(value).toFixed(step < 1 ? 1 : 0)}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-indigo-500"
      />
    </label>
  )
}
