"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const BOOT_LINES = [
  "connecting to srivishag.eu.org",
  "fetching build artifacts",
  "initializing render pipeline",
  "compiling shaders",
  "establishing ai link",
  "rendering interface",
]

const MIN_VISIBLE_MS = 900
const MAX_WAIT_MS = 6000

/**
 * Full-screen boot sequence shown until the 3D device has actually rendered
 * its first frame (via `ready`) — not just until its JS chunk has loaded.
 * A hard timeout guards against WebGL failing silently on some device, so
 * this can never hang forever and block the site.
 */
export function LoadingScreen({ ready }: { ready: boolean }) {
  const reducedMotion = useReducedMotion()
  const [dismissed, setDismissed] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const mountedAt = useRef<number | null>(null)
  if (mountedAt.current === null) mountedAt.current = Date.now()

  // Advance the boot log on a fixed cadence, independent of real readiness —
  // it's a boot animation, not a literal progress bar.
  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      setLineIndex((i) => Math.min(BOOT_LINES.length - 1, i + 1))
    }, 380)
    return () => clearInterval(id)
  }, [reducedMotion])

  useEffect(() => {
    const hardTimeout = setTimeout(() => setExiting(true), MAX_WAIT_MS)
    return () => clearTimeout(hardTimeout)
  }, [])

  useEffect(() => {
    if (!ready) return
    const elapsed = Date.now() - (mountedAt.current ?? Date.now())
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
    const t = setTimeout(() => setExiting(true), reducedMotion ? 0 : remaining)
    return () => clearTimeout(t)
  }, [ready, reducedMotion])

  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(() => setDismissed(true), reducedMotion ? 0 : 500)
    return () => clearTimeout(t)
  }, [exiting, reducedMotion])

  if (dismissed) return null

  const percent = Math.round(((lineIndex + 1) / BOOT_LINES.length) * 100)

  return (
    <div
      role="status"
      aria-live="polite"
      inert={exiting || undefined}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[var(--color-bg)] transition-opacity duration-500"
      style={{ opacity: exiting ? 0 : 1 }}
    >
      <span className="sr-only">Loading portfolio…</span>

      <div aria-hidden="true" className="atmo-grid" />

      <div aria-hidden="true" className="relative w-[min(360px,80vw)]">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="relative h-14 w-14">
            <div
              className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]/25"
              style={{ borderTopColor: "var(--color-primary)", animation: reducedMotion ? "none" : "loading-spin 1.1s linear infinite" }}
            />
            <div
              className="absolute inset-[6px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,245,195,0.5), transparent 70%)",
                animation: reducedMotion ? "none" : "loading-pulse 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-white">
            SRIVISHAG<span className="text-[var(--color-primary)]">.EU.ORG</span>
          </p>
        </div>

        <div className="hud-panel rounded-xl px-5 py-4">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
            <span>System Boot</span>
            <span className="text-[var(--color-primary)]">{percent}%</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-4 grid gap-1 font-mono text-[11px] text-[var(--color-primary)]/80">
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
              <div key={line} className={i < lineIndex ? "opacity-40" : ""}>
                &gt; {line}
                {i === lineIndex && <span className="ml-0.5 animate-pulse">▍</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-spin { to { transform: rotate(360deg); } }
        @keyframes loading-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
      `}</style>
    </div>
  )
}
