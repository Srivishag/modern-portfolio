"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return

    const ringPos = { x: 0, y: 0 }
    const dotPos = { x: 0, y: 0 }
    let raf: number

    function onMove(e: PointerEvent) {
      dotPos.x = e.clientX
      dotPos.y = e.clientY
      setVisible(true)
      const target = e.target as HTMLElement
      setHovering(!!target.closest("a, button, [data-cursor-hover]"))
    }

    function tick() {
      ringPos.x += (dotPos.x - ringPos.x) * 0.18
      ringPos.y += (dotPos.y - ringPos.y) * 0.18
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerleave", () => setVisible(false))
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="absolute rounded-full border -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-200"
        style={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          borderColor: hovering ? "var(--color-secondary)" : "var(--color-primary)",
          boxShadow: `0 0 16px ${hovering ? "var(--color-secondary)" : "var(--color-primary)"}`,
        }}
      />
    </div>
  )
}
