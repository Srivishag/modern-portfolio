"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Typewriter({
  text,
  speed = 28,
  startDelay = 0,
  className = "",
  onDone,
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  onDone?: () => void
}) {
  const reducedMotion = useReducedMotion()
  const [shown, setShown] = useState(reducedMotion ? text : "")

  useEffect(() => {
    if (reducedMotion) {
      setShown(text)
      onDone?.()
      return
    }

    setShown("")
    let i = 0
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          onDone?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reducedMotion])

  return (
    <span className={className}>
      {shown}
      {!reducedMotion && (
        <span className="inline-block w-[0.5ch] animate-pulse text-[var(--color-primary)]">▍</span>
      )}
    </span>
  )
}
