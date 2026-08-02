"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { easings } from "@/animations/easings"
import { CornerBrackets } from "./CornerBrackets"

export function HologramPanel({
  active,
  children,
  className = "",
}: {
  active: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        x: active ? 0 : 18,
        visibility: "visible",
        // Fully remove inactive panels from paint/compositing once faded out.
        // Without this, 7 stacked backdrop-filter panels re-blur every frame.
        // (No scale/blur here — animating either forces the backdrop-filtered
        // layer to re-rasterize every frame, which shows up as wobble.)
        transitionEnd: { visibility: active ? "visible" : "hidden" },
      }}
      transition={
        active
          ? { duration: 0.42, delay: 0.16, ease: easings.cinematic }
          : { duration: 0.22, ease: easings.soft }
      }
      // Padding sits here (not on the parent) so the panel is actually inset:
      // pt clears the top status bar, pb clears the mobile bottom nav.
      className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-10 pt-16 pb-20 sm:pt-20 md:py-24"
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
      inert={!active}
    >
      {/* Outer frame never scrolls, so the brackets/scanline/noise stay pinned
          to the visible edges. Scrolling happens on the inner element only —
          when they shared one node, the decorations sized themselves to the
          full scroll height and drifted through the content. */}
      <div
        key={active ? "on" : "off"}
        className={`hud-panel relative rounded-2xl w-full max-h-full flex flex-col overflow-hidden ${
          active ? "hud-flicker" : ""
        } ${className}`}
      >
        <CornerBrackets />
        <div className="hud-scanline" />
        {/* tabIndex makes the scrollable region reachable by keyboard (WCAG 2.1.1);
            KeyboardNav defers to it while it still has room to scroll. */}
        <div tabIndex={0} className="relative z-[2] min-h-0 overflow-y-auto p-5 sm:p-8 md:p-12">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
