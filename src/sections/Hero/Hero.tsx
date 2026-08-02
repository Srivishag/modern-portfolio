"use client"

import { Mail, FileDown } from "lucide-react"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { motion } from "framer-motion"
import { hero } from "@/data/content"
import { Button } from "@/components/ui/Button"
import { Typewriter } from "@/components/ui/Typewriter"
import { easings } from "@/animations/easings"

export function Hero({ active }: { active: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        {hero.greeting}
      </p>
      <h1 className="font-display text-[2.1rem] sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-2 break-words">
        {active ? <Typewriter key="hero-name" text={hero.name.toUpperCase()} speed={45} /> : hero.name.toUpperCase()}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: easings.cinematic }}
        className="mt-6 flex flex-col gap-1"
      >
        {hero.roles.map((role) => (
          <span key={role} className="font-mono text-sm md:text-base text-[var(--color-secondary)]">
            {role}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: easings.cinematic }}
        className="mt-6 max-w-xl text-[var(--color-muted)] leading-relaxed"
      >
        {hero.blurb}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: easings.cinematic }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {hero.ctas.map((cta, i) => (
          <Button key={cta.label} href={cta.href} variant={i === 0 ? "primary" : "ghost"} data-cursor-hover>
            {cta.label}
          </Button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="mt-8 flex items-center gap-4 text-[var(--color-muted)]"
      >
        <a href={hero.socials.github} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="hover:text-[var(--color-primary)] transition-colors">
          <FiGithub size={18} />
        </a>
        <a href={hero.socials.linkedin} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="hover:text-[var(--color-primary)] transition-colors">
          <FiLinkedin size={18} />
        </a>
        <a href={hero.socials.email} data-cursor-hover aria-label="Email" className="hover:text-[var(--color-primary)] transition-colors">
          <Mail size={18} />
        </a>
        <a href={hero.socials.resume} data-cursor-hover aria-label="Resume" className="hover:text-[var(--color-primary)] transition-colors">
          <FileDown size={18} />
        </a>
      </motion.div>
    </div>
  )
}
