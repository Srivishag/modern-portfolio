"use client"

import { modes } from "@/data/modes"
import { useModeController } from "@/hooks/useModeController"
import { HologramPanel } from "./HologramPanel"
import { Hero } from "@/sections/Hero/Hero"
import { About } from "@/sections/About/About"
import { Skills } from "@/sections/Skills/Skills"
import { Experience } from "@/sections/Experience/Experience"
import { Projects } from "@/sections/Projects/Projects"
import { AICore } from "@/sections/AICore/AICore"
import { Contact } from "@/sections/Contact/Contact"

const CONTENT: Record<string, React.ComponentType<{ active: boolean }>> = {
  hero: Hero,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  "ai-core": AICore,
  contact: Contact,
}

/**
 * Each mode gets an invisible full-height scroll anchor (drives scroll
 * length + IntersectionObserver targeting), and a fixed hologram panel that
 * shows only the currently active mode's content — as if the device is
 * projecting whichever mode the dial has rotated to.
 */
export function ModeStage() {
  const { activeModeId } = useModeController()

  return (
    <>
      {modes.map((mode) => (
        <section
          key={mode.id}
          id={mode.id}
          data-mode={mode.id}
          // Mobile: exactly one viewport per section so CSS scroll-snap pages
          // them like reels. Desktop: the tuned per-section scroll length.
          className="h-[100dvh] lg:h-[var(--mode-h)]"
          style={{ "--mode-h": `${mode.scrollVh}vh` } as React.CSSProperties}
        >
          <span className="sr-only">{mode.label}</span>
        </section>
      ))}

      <div className="fixed inset-0 z-20 pl-0 lg:pl-[46vw]">
        {/* Spacing lives on the panel wrapper, not here: the panels are
            absolutely positioned, so they'd ignore this element's padding. */}
        <div className="relative h-full">
          {modes.map((mode) => {
            const Content = CONTENT[mode.id]
            const active = mode.id === activeModeId
            return (
              <HologramPanel key={mode.id} active={active}>
                <Content active={active} />
              </HologramPanel>
            )
          })}
        </div>
      </div>
    </>
  )
}
