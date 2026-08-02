/**
 * Per-project cover artwork, drawn as inline SVG rather than shipped as image
 * files — keeps the bundle free of binary assets, scales at any DPI, and picks
 * up the theme's CSS custom properties. Each variant illustrates what the
 * project actually does.
 */
export type VisualVariant = "kitchen" | "health" | "automation" | "testing"

const P = "var(--color-primary)"
const S = "var(--color-secondary)"
const A = "var(--color-accent)"

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 112"
      preserveAspectRatio="xMidYMid slice"
      className="h-28 w-full rounded-lg border border-white/5"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1520" />
          <stop offset="100%" stopColor="#0d1226" />
        </linearGradient>
      </defs>
      <rect width="320" height="112" fill="url(#pv-bg)" />
      {children}
    </svg>
  )
}

/** Order pipeline: storefront → kitchen → dispatch. */
function Kitchen() {
  const stages = [46, 118, 190, 262]
  return (
    <Frame>
      <line x1="46" y1="56" x2="262" y2="56" stroke={P} strokeOpacity="0.25" strokeWidth="1.5" />
      {stages.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="56" r="15" fill="none" stroke={i === 1 ? P : S} strokeOpacity="0.7" strokeWidth="1.5" />
          <circle cx={x} cy="56" r="5" fill={i === 1 ? P : S} fillOpacity={i === 1 ? 0.9 : 0.45} />
        </g>
      ))}
      {[82, 154, 226].map((x) => (
        <path key={x} d={`M${x - 6} 51 L${x + 4} 56 L${x - 6} 61`} fill="none" stroke={P} strokeOpacity="0.55" strokeWidth="1.5" />
      ))}
      <rect x="30" y="22" width="260" height="1" fill={S} fillOpacity="0.12" />
      <rect x="30" y="90" width="260" height="1" fill={S} fillOpacity="0.12" />
    </Frame>
  )
}

/** ECG trace over a vitals grid. */
function Health() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={22 + i * 17} x2="320" y2={22 + i * 17} stroke={S} strokeOpacity="0.08" strokeWidth="1" />
      ))}
      <path
        d="M8 62 H70 l10 -26 l12 50 l11 -34 l9 10 H180 l10 -20 l12 38 l10 -26 h78"
        fill="none"
        stroke={P}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="104" cy="52" r="3.5" fill={P} />
      <circle cx="212" cy="58" r="3.5" fill={A} />
    </Frame>
  )
}

/** Layered agent/neural graph. */
function Automation() {
  const cols = [58, 132, 206, 274]
  const rows = [34, 56, 78]
  return (
    <Frame>
      {cols.slice(0, -1).map((x, ci) =>
        rows.map((y1) =>
          rows.map((y2) => (
            <line
              key={`${ci}-${y1}-${y2}`}
              x1={x}
              y1={y1}
              x2={cols[ci + 1]}
              y2={y2}
              stroke={ci % 2 ? A : S}
              strokeOpacity="0.16"
              strokeWidth="1"
            />
          )),
        ),
      )}
      {cols.map((x, ci) =>
        rows.map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={ci % 2 ? A : P} fillOpacity={0.85} />
        )),
      )}
    </Frame>
  )
}

/** Test matrix with a failure being traced to its root cause. */
function Testing() {
  const cells = Array.from({ length: 24 }, (_, i) => i)
  const failed = new Set([9, 17])
  return (
    <Frame>
      {cells.map((i) => {
        const x = 30 + (i % 8) * 32
        const y = 30 + Math.floor(i / 8) * 22
        const bad = failed.has(i)
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="22"
            height="14"
            rx="3"
            fill={bad ? A : P}
            fillOpacity={bad ? 0.85 : 0.22}
            stroke={bad ? A : P}
            strokeOpacity={bad ? 0.9 : 0.3}
            strokeWidth="1"
          />
        )
      })}
      <path d="M52 66 C 92 92, 150 92, 190 70" fill="none" stroke={S} strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="190" cy="70" r="4" fill={S} />
    </Frame>
  )
}

const VARIANTS: Record<VisualVariant, () => React.ReactElement> = {
  kitchen: Kitchen,
  health: Health,
  automation: Automation,
  testing: Testing,
}

export function ProjectVisual({ variant }: { variant: VisualVariant }) {
  const Art = VARIANTS[variant] ?? Automation
  return <Art />
}
