"use client"

import { useModeController } from "@/hooks/useModeController"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/**
 * A bright scan-line that sweeps once across the hologram stage exactly at
 * the moment a mode transition happens — the visual "beat" between the old
 * hologram dissolving and the new one projecting.
 */
export function ScanFlash() {
  const { transitionTick } = useModeController()
  const reducedMotion = useReducedMotion()

  if (reducedMotion || transitionTick === 0) return null

  return (
    <div
      key={transitionTick}
      className="fixed inset-0 z-30 lg:pl-[46vw] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="scan-flash-bar" />
    </div>
  )
}
