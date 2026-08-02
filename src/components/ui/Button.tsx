import type { ComponentPropsWithoutRef } from "react"

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "ghost"
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#030712] hover:shadow-[0_0_30px_-4px_var(--color-primary)] hover:scale-[1.03]"
      : "border border-[var(--color-border-glow)] text-white hover:border-[var(--color-primary)]/60 hover:bg-white/5"

  return (
    <a className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </a>
  )
}
