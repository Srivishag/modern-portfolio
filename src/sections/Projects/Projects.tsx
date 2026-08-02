import { projects } from "@/data/content"
import { ProjectCard } from "./ProjectCard"
import { Typewriter } from "@/components/ui/Typewriter"

export function Projects({ active }: { active: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        05 · Project Archive
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8">
        {active ? <Typewriter key="projects" text="Featured Projects" speed={28} /> : "Featured Projects"}
      </h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 0.08} />
        ))}
      </div>
    </div>
  )
}
