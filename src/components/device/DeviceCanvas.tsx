"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useLowPowerDevice } from "@/hooks/useLowPowerDevice"

const DeviceScene = dynamic(() => import("@/three/DeviceScene").then((m) => m.DeviceScene), {
  ssr: false,
  loading: () => <DevicePlaceholder />,
})

/** Shown immediately while the 3D bundle loads, so there's never a blank gap. */
function DevicePlaceholder() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="w-40 h-40 rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(0,245,195,0.35), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  )
}

/**
 * Fixed, always-visible host for the 3D wearable device. Sits left-center on
 * desktop per the layout spec; the canvas itself never scrolls.
 */
export function DeviceCanvas() {
  const reducedMotion = useReducedMotion()
  const lowPower = useLowPowerDevice()
  const pointer = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointer.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)))
      pointer.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
    }
    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-y-0 left-0 z-10 hidden lg:flex items-center justify-center w-[46vw] max-w-[640px] pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-full h-full max-h-[640px]">
        <DeviceScene pointer={pointer} reducedMotion={reducedMotion} lowPower={lowPower} />
      </div>
    </div>
  )
}
