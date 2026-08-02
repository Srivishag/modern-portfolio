export type ModeId = "hero" | "about" | "skills" | "experience" | "projects" | "ai-core" | "contact"

export type Mode = {
  id: ModeId
  index: number
  code: string
  label: string
  icon: "identity" | "about" | "skills" | "experience" | "projects" | "ai" | "contact"
  /** Scroll-anchor length (vh) — content-heavy sections get more room to read before the mode advances. */
  scrollVh: number
}

export const modes: Mode[] = [
  { id: "hero", index: 0, code: "01", label: "Identity", icon: "identity", scrollVh: 70 },
  { id: "about", index: 1, code: "02", label: "About", icon: "about", scrollVh: 85 },
  { id: "skills", index: 2, code: "03", label: "Skills", icon: "skills", scrollVh: 130 },
  { id: "experience", index: 3, code: "04", label: "Experience", icon: "experience", scrollVh: 95 },
  { id: "projects", index: 4, code: "05", label: "Projects", icon: "projects", scrollVh: 120 },
  { id: "ai-core", index: 5, code: "06", label: "AI Automation", icon: "ai", scrollVh: 105 },
  { id: "contact", index: 6, code: "07", label: "Contact", icon: "contact", scrollVh: 75 },
]
