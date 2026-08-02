"use client"

import { Suspense, lazy, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Device } from "./Device"

const Effects = lazy(() => import("./Effects").then((m) => ({ default: m.Effects })))

/** Fires once the WebGL context has actually rendered a frame — the real
 * "the device is on screen" signal, as opposed to just the JS chunk loading. */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false)
  useFrame(() => {
    if (fired.current) return
    fired.current = true
    onReady?.()
  })
  return null
}

export function DeviceScene({
  pointer,
  reducedMotion,
  lowPower = false,
  onFirstFrame,
}: {
  pointer: React.RefObject<{ x: number; y: number }>
  reducedMotion: boolean
  lowPower?: boolean
  onFirstFrame?: () => void
}) {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 4]} intensity={1.2} color="#00d9ff" />
      <pointLight position={[-3, -2, 3]} intensity={0.9} color="#8b5cf6" />
      <pointLight position={[0, 0.5, 6]} intensity={0.7} color="#ffffff" />

      <Device pointer={pointer} reducedMotion={reducedMotion} />
      <ReadySignal onReady={onFirstFrame} />

      {!reducedMotion && !lowPower && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
    </Canvas>
  )
}
