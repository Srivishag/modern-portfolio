"use client"

import { Suspense, lazy } from "react"
import { Canvas } from "@react-three/fiber"
import { Device } from "./Device"

const Effects = lazy(() => import("./Effects").then((m) => ({ default: m.Effects })))

export function DeviceScene({
  pointer,
  reducedMotion,
  lowPower = false,
}: {
  pointer: React.RefObject<{ x: number; y: number }>
  reducedMotion: boolean
  lowPower?: boolean
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

      {!reducedMotion && !lowPower && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
    </Canvas>
  )
}
