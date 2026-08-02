import { about } from "@/data/content"
import { Counter } from "@/components/ui/Counter"
import { Typewriter } from "@/components/ui/Typewriter"

export function About({ active }: { active: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        02 · Profile Mode
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
        {active ? <Typewriter key={about.heading} text={about.heading} speed={32} /> : about.heading}
      </h2>

      <div className="grid gap-4 max-w-2xl mb-8">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="text-[var(--color-muted)] leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mb-8 text-sm">
        <div>
          <span className="text-[var(--color-muted)]">Education</span>
          <p className="text-white">{about.education}</p>
        </div>
        <div>
          <span className="text-[var(--color-muted)]">Current Position</span>
          <p className="text-white">{about.currentPosition}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-lg">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl md:text-4xl font-bold text-glow">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-[var(--color-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
