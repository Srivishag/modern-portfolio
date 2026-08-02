export type CTA = { label: string; href: string }

export type SkillGroup = { title: string; skills: string[] }

export type ExperienceEntry = {
  role: string
  company: string
  duration: string
  summary: string
  responsibilities: string[]
}

export type Project = {
  title: string
  description: string
  features: string[]
  stack: string[]
  /** Which inline-SVG cover artwork to draw for this project. */
  visual: "kitchen" | "health" | "automation" | "testing"
  github?: string
  demo?: string
}

export type AICapability = { title: string; body: string }

export type NavLink = { id: string; label: string }
