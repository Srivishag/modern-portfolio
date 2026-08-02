"use client"

import { useRef, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function SkillModule({ label, delay }: { label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 260, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 260, damping: 20 })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay }}
      style={{ rotateX, rotateY, transformPerspective: 500 }}
      className="group relative rounded-xl border border-[var(--color-border-glow)] bg-white/[0.03] px-4 py-2.5 text-sm text-white/90 hover:border-[var(--color-primary)]/60 hover:text-white transition-colors cursor-default"
      data-cursor-hover
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 24px -6px var(--color-primary)" }}
      />
      <span className="relative z-10">{label}</span>
    </motion.div>
  )
}
