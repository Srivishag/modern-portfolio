"use client"

const LAYERS = [3, 4, 4, 3]
const WIDTH = 360
const HEIGHT = 220

function layerNodes(count: number, layerIndex: number) {
  const x = (WIDTH / (LAYERS.length - 1)) * layerIndex
  return Array.from({ length: count }, (_, i) => {
    const y = HEIGHT / (count + 1) * (i + 1)
    return { x, y }
  })
}

export function NeuralNetwork() {
  const layers = LAYERS.map((count, i) => layerNodes(count, i))
  const colors = ["#00f5c3", "#00d9ff", "#8b5cf6"]

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label="Neural network diagram">
      {/* connections */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((a, ai) =>
          layers[li + 1].map((b, bi) => (
            <line
              key={`${li}-${ai}-${bi}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#nn-grad)"
              strokeWidth={0.6}
              strokeOpacity={0.35}
              className="nn-line"
              style={{ animationDelay: `${(ai + bi + li) * 0.15}s` }}
            />
          )),
        ),
      )}

      <defs>
        <linearGradient id="nn-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00f5c3" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* nodes */}
      {layers.map((layer, li) =>
        layer.map((n, ni) => (
          <circle
            key={`${li}-${ni}`}
            cx={n.x}
            cy={n.y}
            r={5}
            fill={colors[li % colors.length]}
            className="nn-node"
            style={{ animationDelay: `${(li * 3 + ni) * 0.18}s` }}
          />
        )),
      )}
    </svg>
  )
}
