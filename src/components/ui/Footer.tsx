import { footer } from "@/data/content"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center text-xs text-[var(--color-muted)] font-mono">
      <p>
        © {footer.year} <span className="text-white">{footer.name}</span>. All rights reserved.
      </p>
      <p className="mt-1">{footer.builtWith}</p>
    </footer>
  )
}
