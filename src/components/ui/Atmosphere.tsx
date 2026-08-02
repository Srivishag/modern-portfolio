function seeded(i: number, salt: number) {
  const x = Math.sin(i * 999 + salt * 137.5) * 43758.5453
  return x - Math.floor(x)
}

const PARTICLES = Array.from({ length: 42 }, (_, i) => ({
  left: seeded(i, 1) * 100,
  top: seeded(i, 2) * 100,
  size: 1 + seeded(i, 3) * 2.2,
  duration: 9 + seeded(i, 4) * 16,
  delay: -seeded(i, 5) * 20,
  opacity: 0.2 + seeded(i, 6) * 0.45,
  dx: (seeded(i, 7) - 0.5) * 40,
  dy: -20 - seeded(i, 8) * 30,
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
