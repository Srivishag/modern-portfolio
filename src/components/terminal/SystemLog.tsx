"use client"

import { useEffect, useState } from "react"

const LOG_LINES = [
  "Initializing portfolio...",
  "Loading modules...",
  "Authenticating visitor...",
  "Identity verified.",
  "Loading projects...",
  "System ready.",
]

export function SystemLog() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [typed, setTyped] = useState("")

  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0
    let charTimer: ReturnType<typeof setInterval>
    let lineTimer: ReturnType<typeof setTimeout>

    function typeLine() {
      const line = LOG_LINES[lineIndex]
      charIndex = 0
      setTyped("")
      charTimer = setInterval(() => {
        charIndex += 1
        setTyped(line.slice(0, charIndex))
        if (charIndex >= line.length) {
          clearInterval(charTimer)
          setVisibleLines((prev) => [...prev.slice(-3), line])
          setTyped("")
          lineIndex = (lineIndex + 1) % LOG_LINES.length
          lineTimer = setTimeout(typeLine, 700)
        }
      }, 26)
    }

    typeLine()
    return () => {
      clearInterval(charTimer)
      clearTimeout(lineTimer)
    }
  }, [])

  return (
    <div
      className="fixed bottom-6 left-24 z-40 w-[min(320px,60vw)] font-mono text-[11px] leading-relaxed text-[var(--color-primary)]/80 pointer-events-none select-none hidden lg:block"
      aria-hidden="true"
    >
      {visibleLines.map((line, i) => (
        <div key={i} className="opacity-40">
          &gt; {line}
        </div>
      ))}
      {typed && (
        <div>
          &gt; {typed}
          <span className="animate-pulse">▍</span>
        </div>
      )}
    </div>
  )
}
