"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/animations/gsapSetup"
import { useReducedMotion } from "./useReducedMotion"

/** Live instance, so programmatic navigation can animate through Lenis. */
let lenisInstance: Lenis | null = null
export function getLenis() {
  return lenisInstance
}

/**
 * Wires Lenis smooth-scroll into GSAP's ticker so ScrollTrigger stays in sync
 * with Lenis's eased scroll position instead of the raw (jumpy) native one.
 *
 * Skipped on touch/coarse-pointer devices: there we hand scrolling back to the
 * browser so native CSS scroll-snap ("reels" paging) works untouched.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    ensureGsapRegistered()
    if (reducedMotion) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      allowNestedScroll: true,
    })

    lenisInstance = lenis
    lenis.on("scroll", ScrollTrigger.update)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [reducedMotion])

  return <>{children}</>
}
