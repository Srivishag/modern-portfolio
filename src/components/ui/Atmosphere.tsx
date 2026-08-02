function seeded(i: number, salt: number) {
  const x = Math.sin(i * 999 + salt * 137.5) * 43758.5453
  return x - Math.floor(x)
}

// Rounded to 4 decimals: full float precision (15+ digits) can come out of
// server vs. client CSS serialization with a differing number of digits,
// which React's hydration check flags as a mismatch even though the visual
// result is identical. Short, fixed-precision strings can't drift.
function round(n: number) {
  return Math.round(n * 10000) / 10000
}

const PARTICLES = Array.from({ length: 42 }, (_, i) => ({
  left: round(seeded(i, 1) * 100),
  top: round(seeded(i, 2) * 100),
  size: round(1 + seeded(i, 3) * 2.2),
  duration: round(9 + seeded(i, 4) * 16),
  delay: round(-seeded(i, 5) * 20),
  opacity: round(0.2 + seeded(i, 6) * 0.45),
  dx: round((seeded(i, 7) - 0.5) * 40),
  dy: round(-20 - seeded(i, 8) * 30),
}))

/** Ambient background: moving grid, drifting fog, floating dust particles. */
export function Atmosphere() {
  return (
    <>
      <div className="atmo-grid" />
      <div className="atmo-fog" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="atmo-particle"
            style={
              {
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--p-op": p.opacity,
                "--p-dx": `${p.dx}px`,
                "--p-dy": `${p.dy}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  )
}
