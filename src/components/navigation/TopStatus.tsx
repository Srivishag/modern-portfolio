"use client"

import { useEffect, useRef, useState } from "react"
import { BatteryFull, SignalHigh, Wifi } from "lucide-react"

function useFps() {
  const [fps, setFps] = useState(60)
  const frames = useRef(0)
  const last = useRef(0)

  useEffect(() => {
    let raf: number
    function tick(t: number) {
      frames.current += 1
      if (!last.current) last.current = t
      const delta = t - last.current
      if (delta >= 500) {
        setFps(Math.round((frames.current * 1000) / delta))
        frames.current = 0
        last.current = t
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return fps
}

export function TopStatus() {
  const fps = useFps()

  return (
    <div
      aria-hidden="true"
      className="fixed top-4 md:top-6 right-4 md:right-6 z-40 flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]"
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
        System Online
      </span>
      <span className="hidden sm:inline">FPS {fps}</span>
      <span className="hidden md:flex items-center gap-1.5">
        <Wifi size={13} className="text-[var(--color-secondary)]" />
        AI Link Active
      </span>
      <span className="flex items-center gap-1">
        <SignalHigh size={14} />
      </span>
      <span className="flex items-center gap-1">
        <BatteryFull size={16} />
      </span>
    </div>
  )
}
