"use client"

import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { contact } from "@/data/content"
import { Typewriter } from "@/components/ui/Typewriter"

export function Contact({ active }: { active: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setTimeout(() => setStatus("sent"), 1200)
  }

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-primary)] mb-4">
        07 · Communication Link
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
        {active ? <Typewriter key={contact.heading} text={contact.heading} speed={32} /> : contact.heading}
      </h2>
      <p className="max-w-xl text-[var(--color-muted)] leading-relaxed mb-8">{contact.body}</p>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md font-mono text-sm">
        <label className="grid gap-1.5">
          <span className="text-[var(--color-muted)] text-xs uppercase tracking-widest">Name</span>
          <input
            required
            type="text"
            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[var(--color-primary)]/60 transition-colors"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[var(--color-muted)] text-xs uppercase tracking-widest">Email</span>
          <input
            required
            type="email"
            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[var(--color-primary)]/60 transition-colors"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[var(--color-muted)] text-xs uppercase tracking-widest">Message</span>
          <textarea
            required
            rows={4}
            className="bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[var(--color-primary)]/60 transition-colors resize-none"
          />
        </label>

        <button
          type="submit"
          disabled={status !== "idle"}
          data-cursor-hover
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#030712] font-semibold px-6 py-3 transition-all hover:shadow-[0_0_30px_-4px_var(--color-primary)] hover:scale-[1.02] disabled:opacity-70"
        >
          <Send size={16} />
          {status === "idle" && "Transmit Message"}
          {status === "sending" && "Transmitting..."}
          {status === "sent" && "Transmission Sent"}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-5 text-[var(--color-muted)]">
        <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-primary)] transition-colors text-sm">
          {contact.email}
        </a>
        <a href={`https://${contact.github}`} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="hover:text-[var(--color-primary)] transition-colors">
          <FiGithub size={18} />
        </a>
        <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="hover:text-[var(--color-primary)] transition-colors">
          <FiLinkedin size={18} />
        </a>
      </div>
    </div>
  )
}
