import { skillGroups } from "@/data/content"
import { SkillModule } from "./SkillModule"
import { Typewriter } from "@/components/ui/Typewriter"

export function Skills({ active }: { active: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        03 · Skills Matrix
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8">
        {active ? <Typewriter key="skills" text="Skills" speed={32} /> : "Skills"}
      </h2>

      <div className="grid gap-6">
        {skillGroups.map((group, gi) => (
          <div key={group.title}>
            <h3 className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">{group.title}</h3>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill, i) => (
                <SkillModule key={skill} label={skill} delay={(gi * group.skills.length + i) * 0.02} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
