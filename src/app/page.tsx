import { ModeControllerProvider } from "@/hooks/useModeController"
import { KeyboardNav } from "@/hooks/useSectionNav"
import { Atmosphere } from "@/components/ui/Atmosphere"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { ParticleBurst } from "@/components/ui/ParticleBurst"
import { DeviceCanvas } from "@/components/device/DeviceCanvas"
import { LeftNav } from "@/components/navigation/LeftNav"
import { TopStatus } from "@/components/navigation/TopStatus"
import { ScrollCue } from "@/components/navigation/ScrollCue"
import { SystemLog } from "@/components/terminal/SystemLog"
import { ScanFlash } from "@/components/hologram/ScanFlash"
import { ModeStage } from "@/components/hologram/ModeStage"
import { Footer } from "@/components/ui/Footer"

export default function Home() {
  return (
    <ModeControllerProvider>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[200] -translate-y-20 focus:translate-y-0 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-[#030712] font-semibold transition-transform"
      >
        Skip to content
      </a>

      <KeyboardNav />
      <Atmosphere />
      <CustomCursor />
      <ParticleBurst />
      <ScanFlash />
      <DeviceCanvas />
      <TopStatus />
      <LeftNav />
      <ScrollCue />
      <SystemLog />

      <main id="main-content" className="relative">
        <ModeStage />
      </main>

      {/* data-snap-end keeps the footer reachable under mandatory scroll-snap */}
      <div data-snap-end className="relative z-10">
        <Footer />
      </div>
    </ModeControllerProvider>
  )
}
