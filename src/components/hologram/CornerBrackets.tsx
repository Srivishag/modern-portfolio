/**
 * Corner accents that trace the panel's own curve. The radius here must match
 * the panel's (`rounded-2xl`), otherwise the straight bracket edges cut across
 * the rounded corner and pile up into a bright blob.
 */
export function CornerBrackets({ color = "var(--color-primary)" }: { color?: string }) {
  const base = "absolute w-4 h-4 sm:w-5 sm:h-5 border-current"
  return (
    <span className="absolute inset-0 z-[3] pointer-events-none" style={{ color }}>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl`} />
    </span>
  )
}
