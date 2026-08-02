"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { gsap } from "@/animations/gsapSetup"
import { useModeController } from "@/hooks/useModeController"

const PRIMARY = "#00f5c3"
const SECONDARY = "#00d9ff"
const ACCENT = "#8b5cf6"

/** Deterministic LED placement around the outer casing (not Math.random on every render). */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 91.7 + salt * 12.9) * 43758.5453
  return x - Math.floor(x)
}

const LED_COUNT = 10
const leds = Array.from({ length: LED_COUNT }, (_, i) => {
  const angle = (i / LED_COUNT) * Math.PI * 2
  return {
    angle,
    blinkOffset: seeded(i, 3) * Math.PI * 2,
    color: i % 3 === 0 ? PRIMARY : i % 3 === 1 ? SECONDARY : ACCENT,
  }
})

export function Device({
  pointer,
  reducedMotion,
}: {
  pointer: React.RefObject<{ x: number; y: number }>
  reducedMotion: boolean
}) {
  const { progressRef, transitionTick } = useModeController()

  const floatGroup = useRef<THREE.Group>(null)
  const tiltGroup = useRef<THREE.Group>(null)
  const outerRing = useRef<THREE.Group>(null)
  const innerRing = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const coreLight = useRef<THREE.PointLight>(null)
  const ledRefs = useRef<(THREE.Mesh | null)[]>([])

  const idle = useRef(0)
  const burst = useRef({ value: 0 })
  const isFirstTick = useRef(true)

  const ledMaterialColors = useMemo(() => leds.map((l) => new THREE.Color(l.color)), [])

  // One-shot energy burst on every mode transition — layered on top of the
  // continuous breathing pulse, not a replacement for it.
  useEffect(() => {
    if (isFirstTick.current) {
      isFirstTick.current = false
      return
    }
    if (reducedMotion) return
    gsap.fromTo(
      burst.current,
      { value: 0 },
      { value: 1, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionTick])

  useFrame((state, delta) => {
    if (!reducedMotion) idle.current += delta

    const scrollDeg = progressRef.current.value * 360

    // Outer ring: clockwise, driven mostly by scroll.
    if (outerRing.current) {
      outerRing.current.rotation.z = THREE.MathUtils.degToRad(-scrollDeg) - idle.current * 0.15
    }
    // Inner ring: counter-rotates, slightly faster.
    if (innerRing.current) {
      innerRing.current.rotation.z = THREE.MathUtils.degToRad(scrollDeg * 1.4) + idle.current * 0.22
    }

    // Idle float (breathing) + subtle hover tilt toward pointer.
    if (floatGroup.current && !reducedMotion) {
      floatGroup.current.position.y = Math.sin(idle.current * 0.6) * 0.09
      floatGroup.current.rotation.y = Math.sin(idle.current * 0.3) * 0.05
    }

    if (tiltGroup.current) {
      const targetX = (pointer.current?.y ?? 0) * 0.18
      const targetY = (pointer.current?.x ?? 0) * 0.22
      tiltGroup.current.rotation.x = THREE.MathUtils.damp(tiltGroup.current.rotation.x, targetX, 4, delta)
      tiltGroup.current.rotation.y = THREE.MathUtils.damp(tiltGroup.current.rotation.y, targetY, 4, delta)
    }

    // Energy core: continuous breathing pulse plus a one-shot transition burst.
    const pulse = 0.6 + Math.sin(idle.current * 1.6) * 0.4
    const burstValue = burst.current.value
    if (core.current) {
      const mat = core.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.4 + pulse * 1.2 + burstValue * 3.5
      core.current.scale.setScalar(1 + burstValue * 0.6)
    }
    if (coreLight.current) {
      coreLight.current.intensity = 2.4 + pulse * 1.6 + burstValue * 4
    }

    // LEDs blink independently.
    ledRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const mat = mesh.material as THREE.MeshStandardMaterial
      const blink = 0.3 + Math.max(0, Math.sin(idle.current * 2.2 + leds[i].blinkOffset)) * 0.9
      mat.emissiveIntensity = blink
    })
  })

  return (
    <group ref={floatGroup}>
      <group ref={tiltGroup}>
        {/* Faceted alloy body — deep indigo with a teal sheen so it reads as a
            crafted object rather than a black silhouette. */}
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#2a3350"
            metalness={0.55}
            roughness={0.42}
            flatShading
            emissive="#0d4a55"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Glowing wireframe shell tracing the facet edges */}
        <mesh scale={1.012}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial color={SECONDARY} wireframe transparent opacity={0.28} toneMapped={false} />
        </mesh>

        {/* Carbon-fiber inset band */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.05, 12, 64]} />
          <meshStandardMaterial color="#1a2033" metalness={0.7} roughness={0.45} />
        </mesh>

        {/* Outer rotating ring */}
        <group ref={outerRing}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.55, 0.035, 16, 96]} />
            <meshStandardMaterial
              color={PRIMARY}
              emissive={PRIMARY}
              emissiveIntensity={1.2}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
          {/* LEDs on the outer ring */}
          {leds.map((led, i) => (
            <mesh
              key={i}
              ref={(el) => {
                ledRefs.current[i] = el
              }}
              position={[Math.cos(led.angle) * 1.55, Math.sin(led.angle) * 1.55, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color={ledMaterialColors[i]}
                emissive={ledMaterialColors[i]}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>

        {/* Inner counter-rotating ring */}
        <group ref={innerRing}>
          <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
            <torusGeometry args={[1.3, 0.025, 12, 80]} />
            <meshStandardMaterial
              color={SECONDARY}
              emissive={SECONDARY}
              emissiveIntensity={1}
              metalness={0.5}
              roughness={0.25}
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh rotation={[Math.PI / 1.8, -0.4, 0]}>
            <torusGeometry args={[1.42, 0.012, 8, 80]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.8} transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Energy core + soft halo shell */}
        <mesh ref={core}>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshStandardMaterial color={PRIMARY} emissive={PRIMARY} emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
        <mesh scale={1.55}>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshBasicMaterial color={PRIMARY} transparent opacity={0.09} toneMapped={false} />
        </mesh>
        <pointLight ref={coreLight} color={PRIMARY} intensity={2.8} distance={4} />
      </group>
    </group>
  )
}
