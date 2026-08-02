"use client"

import { ChevronDown } from "lucide-react"
import { modes } from "@/data/modes"
import { useModeController } from "@/hooks/useModeController"
import { scrollToMode } from "@/hooks/useSectionNav"

/**
 * Discoverability affordance, not a replacement for scrolling: it only appears
 * on the first section, where nothing else signals that the page continues.
 * Clicking advances one section; the keyboard hint surfaces shortcuts that
 * would otherwise be invisible.
 */
export function ScrollCue() {
  const { activeModeId } = useModeController()
  if (activeModeId !== modes[0].id) return null

  return (
    <div
      className="fixed z-40 bottom-24 left-1/2 -translate-x-1/2 lg:bottom-8 lg:left-[73vw]
        flex flex-col items-center gap-2 pointer-events-none"
    >
      <button
        type="button"
        onClick={() => scrollToMode(modes[1].id)}
        data-cursor-hover
        aria-label={`Scroll to ${modes[1].label}`}
        className="pointer-events-auto flex flex-col items-center gap-1 rounded-full px-3 py-2
          text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={18} className="scroll-cue-bob" />
      </button>

      <p className="hidden lg:block font-mono text-[10px] text-[var(--color-muted)]/50">
        or press <kbd className="text-[var(--color-primary)]/70">↑</kbd>{" "}
        <kbd className="text-[var(--color-primary)]/70">↓</kbd> ·{" "}
        <kbd className="text-[var(--color-primary)]/70">1</kbd>–
        <kbd className="text-[var(--color-primary)]/70">7</kbd>
      </p>
    </div>
  )
}
