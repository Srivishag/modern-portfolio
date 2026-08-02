"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { modes, type ModeId } from "@/data/modes"

type ProgressRef = { value: number }

type ModeContextValue = {
  /** 0..1 continuous scroll fraction across the whole page — drives the device's continuous rotation. */
  progressRef: React.RefObject<ProgressRef>
  activeModeId: ModeId
  activeIndex: number
  /** Increments every time the active mode changes — a signal for one-shot transition FX (core pulse, particle burst, scan flash) to key off, independent of continuous scroll-driven animation. */
  transitionTick: number
}

const ModeContext = createContext<ModeContextValue | null>(null)

export function ModeControllerProvider({ children }: { children: ReactNode }) {
  const progressRef = useRef<ProgressRef>({ value: 0 })
  const [activeModeId, setActiveModeId] = useState<ModeId>("hero")
  const [transitionTick, setTransitionTick] = useState(0)
  const activeModeRef = useRef<ModeId>("hero")

  useEffect(() => {
    let ticking = false
    /** Cached [top, bottom] of each mode's scroll anchor, so the scroll handler never forces layout. */
    let bounds: { id: ModeId; top: number; bottom: number }[] = []

    function measure() {
      bounds = modes
        .map((m) => {
          const el = document.querySelector<HTMLElement>(`[data-mode="${m.id}"]`)
          if (!el) return null
          const top = el.offsetTop
          return { id: m.id, top, bottom: top + el.offsetHeight }
        })
        .filter((b): b is { id: ModeId; top: number; bottom: number } => b !== null)
    }

    function update() {
      ticking = false

      const max = document.documentElement.scrollHeight - window.innerHeight
      const scrollY = window.scrollY
      progressRef.current.value = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0

      if (bounds.length === 0) return

      // Active mode = whichever anchor contains the viewport's centre line.
      // This is monotonic in scrollY, so it can never oscillate between two
      // sections the way an intersection-ratio comparison can.
      const probe = scrollY + window.innerHeight / 2
      let next = bounds[0].id
      for (const b of bounds) {
        if (probe >= b.top) next = b.id
        else break
      }

      if (next !== activeModeRef.current) {
        activeModeRef.current = next
        setActiveModeId(next)
        setTransitionTick((t) => t + 1)
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    function onResize() {
      measure()
      update()
    }

    measure()
    update()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const activeIndex = modes.find((m) => m.id === activeModeId)?.index ?? 0

  return (
    <ModeContext.Provider value={{ progressRef, activeModeId, activeIndex, transitionTick }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useModeController() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error("useModeController must be used within ModeControllerProvider")
  return ctx
}
