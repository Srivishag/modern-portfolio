"use client"

import { motion } from "framer-motion"
import { useModeController } from "@/hooks/useModeController"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const COUNT = 16

function seeded(i: number, salt: number) {
  const x = Math.sin(i * 77.7 + salt * 13.3) * 43758.5453
  return x - Math.floor(x)
}

const PARTICLES = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2 + seeded(i, 1) * 0.4
  const distance = 60 + seeded(i, 2) * 90
  return {
    angle,
    distance,
    size: 2 + seeded(i, 3) * 3,
    delay: seeded(i, 4) * 0.08,
    color: i % 3 === 0 ? "#00f5c3" : i % 3 === 1 ? "#00d9ff" : "#8b5cf6",
  }
})

/**
 * One-shot particle burst fired from the device whenever the active mode
 * changes — purely decorative, keyed by transitionTick so each transition
 * mounts a fresh set of particles that fly outward and fade.
 */
export function ParticleBurst() {
  const { transitionTick } = useModeController()
  const reducedMotion = useReducedMotion()

  if (reducedMotion || transitionTick === 0) return null

  return (
    <div
      key={transitionTick}
      className="hidden lg:block fixed z-30 pointer-events-none"
      style={{ left: "23vw", top: "50%" }}
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 6px ${p.color}` }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: Math.cos(p.angle) * p.distance, y: Math.sin(p.angle) * p.distance, opacity: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
