"use client"

import { useEffect, useState } from "react"

/** Matches software/virtualized GPU renderers (SwiftShader, llvmpipe, Basic Render Driver). */
const SOFTWARE_RENDERER_RE = /swiftshader|llvmpipe|software|basic render/i

function detectLowPower(): boolean {
  const cores = navigator.hardwareConcurrency ?? 8
  if (cores <= 4) return true

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (memory !== undefined && memory <= 4) return true

  try {
    const canvas = document.createElement("canvas")
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null
    if (!gl) return true

    const info = gl.getExtension("WEBGL_debug_renderer_info")
    const renderer = info ? (gl.getParameter(info.UNMASKED_RENDERER_WEBGL) as string) : ""
    if (SOFTWARE_RENDERER_RE.test(renderer)) return true
  } catch {
    return false
  }

  return false
}

/** Heuristic check for low-end/virtualized hardware, used to drop expensive postprocessing. */
export function useLowPowerDevice() {
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    setLowPower(detectLowPower())
  }, [])

  return lowPower
}
