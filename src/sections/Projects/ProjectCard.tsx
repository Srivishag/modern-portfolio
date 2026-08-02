"use client"

import { useRef, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { FiGithub } from "react-icons/fi"
import type { Project } from "@/types/content"
import { ProjectVisual } from "./ProjectVisual"

export function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 22 })
  const lift = useSpring(0, { stiffness: 220, damping: 22 })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleEnter() {
    lift.set(-8)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
    lift.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      style={{ rotateX, rotateY, y: lift, transformPerspective: 900 }}
      className="group relative rounded-2xl border border-[var(--color-border-glow)] bg-white/[0.03] p-6 hover:border-[var(--color-primary)]/50 transition-colors"
      data-cursor-hover
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: "0 20px 50px -20px rgba(0,0,0,0.6), 0 0 40px -12px var(--color-primary)" }}
      />
      <div className="relative z-10 flex flex-col gap-3">
        <ProjectVisual variant={project.visual} />
        <h3 className="font-display text-lg font-medium text-white">{project.title}</h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.features.map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/70">
              {f}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--color-secondary)] pt-2 border-t border-white/10">
          {project.stack.join(" · ")}
        </p>
        {(project.github || project.demo) && (
          <div className="flex items-center gap-4 pt-1 text-[var(--color-muted)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label={`${project.title} on GitHub`}
                className="flex items-center gap-1.5 text-xs hover:text-[var(--color-primary)] transition-colors"
              >
                <FiGithub size={14} />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label={`${project.title} live demo`}
                className="flex items-center gap-1.5 text-xs hover:text-[var(--color-primary)] transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
