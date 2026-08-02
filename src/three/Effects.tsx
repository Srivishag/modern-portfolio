"use client"

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"

/** Split into its own lazy chunk so reduced-motion/low-power sessions never pay to parse this. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.7} luminanceThreshold={0.25} luminanceSmoothing={0.3} radius={0.6} />
      <Vignette eskil={false} offset={0.25} darkness={0.7} />
    </EffectComposer>
  )
}
