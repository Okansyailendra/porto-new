import { lazy, Suspense, useEffect, useRef, useState } from 'react'

// Lazy-load the heavy game canvas only when the Arcade zone enters the viewport
const BugHuntCanvas = lazy(() =>
  import('../games/BugHuntCanvas').then((m) => ({ default: m.BugHuntCanvas }))
)

export function ArcadeZone() {
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const zoneRef = useRef<HTMLElement>(null)

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Lazy-load game when zone becomes visible (IntersectionObserver)
  useEffect(() => {
    if (!zoneRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(zoneRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="arcade"
      ref={zoneRef}
      aria-label="Zona 6 Arcade — Bug Hunt"
      className="py-16 md:py-20 border-t border-embun/15 text-left"
    >
      <div className="space-y-6">
        {/* Header Zona */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <h2 className="font-pixel text-h2 text-tulang leading-tight">
              Arcade
            </h2>
            <p className="font-body text-small text-embun">
              Tembakin bug sebelum 30 detik habis. Ini cara saya menunjukkan skill game dev tanpa buka repositori.
            </p>
          </div>
          <span className="font-pixel text-small px-3 py-1 border border-lentera/40 text-lentera rounded-button bg-lentera/10 self-start">
            Bug Hunt
          </span>
        </div>

        {/* Game Area */}
        {isVisible ? (
          <Suspense
            fallback={
              <div className="w-full aspect-video min-h-[240px] bg-malam-gunung border border-embun/20 rounded-panel flex items-center justify-center">
                <span className="font-pixel text-small text-embun animate-pulse">
                  Memuat arena...
                </span>
              </div>
            }
          >
            <BugHuntCanvas reducedMotion={reducedMotion} />
          </Suspense>
        ) : (
          /* Placeholder saat belum terlihat */
          <div className="w-full aspect-video min-h-[240px] bg-kabut-lembah/60 border border-embun/20 rounded-panel flex flex-col items-center justify-center gap-3 select-none">
            <div className="w-10 h-10 border border-dashed border-lentera/40 flex items-center justify-center rounded-button bg-malam-gunung">
              <span className="font-pixel text-lentera text-lg">🐛</span>
            </div>
            <span className="font-pixel text-base text-tulang">Arena Bug Hunt</span>
            <span className="font-body text-small text-embun text-center max-w-[36ch]">
              Gulir ke bawah agar arena game dimuat. Canvas dan logika game berjalan sepenuhnya di peramban.
            </span>
          </div>
        )}

        {/* Catatan aksesibilitas */}
        {reducedMotion && (
          <p className="font-body text-small text-embun border-l-2 border-embun pl-3">
            Mode reduced motion aktif: partikel dikurangi dan efek getar dinonaktifkan. Game tetap bisa dimainkan penuh.
          </p>
        )}
      </div>
    </section>
  )
}
