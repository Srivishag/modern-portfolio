"use client"

import { useEffect } from "react"
import { modes, type ModeId } from "@/data/modes"
import { getLenis } from "./useLenis"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Smooth-scrolls to a mode's anchor, going through Lenis when it's driving. */
export function scrollToMode(id: ModeId) {
  const el = document.querySelector<HTMLElement>(`[data-mode="${id}"]`)
  if (!el) return

  const lenis = getLenis()
  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(el, { duration: 0.9 })
    return
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" })
}

function currentIndex() {
  const probe = window.scrollY + window.innerHeight / 2
  let idx = 0
  modes.forEach((m, i) => {
    const el = document.querySelector<HTMLElement>(`[data-mode="${m.id}"]`)
    if (el && probe >= el.offsetTop) idx = i
  })
  return idx
}

/** True when the element (or an ancestor) can still scroll further in `dir`. */
function hasRoomToScroll(node: EventTarget | null, dir: 1 | -1) {
  let el = node as HTMLElement | null
  while (el && el !== document.body) {
    const style = getComputedStyle(el)
    const scrollable = /(auto|scroll|overlay)/.test(style.overflowY)
    if (scrollable && el.scrollHeight > el.clientHeight) {
      const atEnd = dir === 1 ? Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight : el.scrollTop <= 0
      if (!atEnd) return true
    }
    el = el.parentElement
  }
  return false
}

/**
 * Keyboard navigation between sections — an alternative to scrolling.
 * Arrows/PageUp/PageDown step, Home/End jump to the ends, and 1–7 go direct.
 * Defers to form fields and to any focused region that can still scroll.
 */
export function KeyboardNav() {
  useEffect(() => {
    function go(delta: number) {
      const next = Math.min(modes.length - 1, Math.max(0, currentIndex() + delta))
      scrollToMode(modes[next].id)
    }

    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const t = e.target as HTMLElement | null
      if (t?.closest("input, textarea, select, [contenteditable='true']")) return

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          if (hasRoomToScroll(e.target, 1)) return
          e.preventDefault()
          go(1)
          break
        case "ArrowUp":
        case "PageUp":
          if (hasRoomToScroll(e.target, -1)) return
          e.preventDefault()
          go(-1)
          break
        case "Home":
          e.preventDefault()
          scrollToMode(modes[0].id)
          break
        case "End":
          e.preventDefault()
          scrollToMode(modes[modes.length - 1].id)
          break
        default: {
          if (!/^[1-9]$/.test(e.key)) return
          const idx = Number(e.key) - 1
          if (idx >= modes.length) return
          e.preventDefault()
          scrollToMode(modes[idx].id)
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return null
}
