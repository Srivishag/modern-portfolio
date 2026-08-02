"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { experience } from "@/data/content"
import { Typewriter } from "@/components/ui/Typewriter"

export function Experience({ active }: { active: boolean }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        04 · Mission Log
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-10">
        {active ? <Typewriter key="experience" text="Experience" speed={32} /> : "Experience"}
      </h2>

      <div className="relative pl-8 max-w-2xl">
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)]/40 to-transparent" />

        {experience.map((job, i) => {
          const open = openIndex === i
          return (
            <div key={job.role} className="relative mb-8 last:mb-0">
              <span
                className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-primary)] bg-[#030712]"
                style={{ boxShadow: open ? "0 0 12px var(--color-primary)" : undefined }}
              />
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="w-full text-left group"
                data-cursor-hover
                aria-expanded={open}
                aria-controls={`experience-panel-${i}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-medium text-white">{job.role}</h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      {job.company} · <span className="text-[var(--color-secondary)]">{job.duration}</span>
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[var(--color-muted)] transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`experience-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">{job.summary}</p>
                    <ul className="mt-3 grid gap-1.5">
                      {job.responsibilities.map((r, ri) => (
                        <li key={ri} className="text-sm text-white/80 flex gap-2">
                          <span className="text-[var(--color-primary)] mt-0.5">▹</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
