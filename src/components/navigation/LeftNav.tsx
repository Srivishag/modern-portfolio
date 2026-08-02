"use client"

import { Fingerprint, UserRound, Cpu, Briefcase, FolderGit2, BrainCircuit, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { modes, type Mode } from "@/data/modes"
import { useModeController } from "@/hooks/useModeController"
import { scrollToMode } from "@/hooks/useSectionNav"

const ICONS: Record<Mode["icon"], React.ComponentType<{ size?: number; className?: string }>> = {
  identity: Fingerprint,
  about: UserRound,
  skills: Cpu,
  experience: Briefcase,
  projects: FolderGit2,
  ai: BrainCircuit,
  contact: Mail,
}

export function LeftNav() {
  const { activeModeId } = useModeController()

  return (
    <nav
      className="fixed z-40 flex items-center
        bottom-0 left-0 right-0 justify-center px-2 py-2
        border-t border-[var(--color-border-glow)] bg-[#030712]/85 backdrop-blur-md
        lg:bottom-auto lg:right-auto lg:left-6 lg:top-1/2 lg:-translate-y-1/2
        lg:flex-col lg:border-0 lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-row gap-1 sm:gap-3 lg:flex-col">
        <div className="absolute hidden lg:block left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
        {modes.map((mode) => {
          const Icon = ICONS[mode.icon]
          const active = mode.id === activeModeId
          return (
            <a
              key={mode.id}
              href={`#${mode.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToMode(mode.id)
              }}
              data-cursor-hover
              aria-current={active ? "true" : undefined}
              aria-label={mode.label}
              className="group relative flex items-center justify-center w-11 h-11 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
            >
              {active && (
                <motion.span
                  layoutId="nav-active-glow"
                  className="absolute inset-0 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/40"
                  style={{ boxShadow: "0 0 20px -4px var(--color-primary)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <Icon
                size={18}
                className={`relative z-10 transition-colors ${
                  active ? "text-[var(--color-primary)]" : "text-[var(--color-muted)] group-hover:text-white"
                }`}
              />
              <span className="pointer-events-none absolute left-full ml-3 hidden lg:block whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-[11px] uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100 font-mono">
                {mode.code} · {mode.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
