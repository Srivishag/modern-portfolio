import { aiCore } from "@/data/content"
import { NeuralNetwork } from "./NeuralNetwork"
import { Typewriter } from "@/components/ui/Typewriter"

export function AICore({ active }: { active: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        06 · Automation Layer
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
        {active ? <Typewriter key={aiCore.heading} text={aiCore.heading} speed={32} /> : aiCore.heading}
      </h2>
      <p className="max-w-2xl text-[var(--color-muted)] leading-relaxed mb-6">{aiCore.description}</p>

      {/* The diagram is the 6th tile, so 5 capabilities + 1 visual fill a
          balanced 3x2 grid — no orphaned card and no vertical overflow. */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li className="hidden sm:flex items-center justify-center rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/[0.04] p-4">
          <NeuralNetwork />
        </li>
        {aiCore.capabilities.map((cap) => (
          <li
            key={cap.title}
            className="rounded-xl border border-[var(--color-accent)]/25 bg-white/[0.03] px-4 py-3 transition-colors hover:border-[var(--color-accent)]/60"
          >
            <p className="font-display text-sm font-medium text-white">{cap.title}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-muted)]">{cap.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
