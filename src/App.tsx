import { useEffect, useState, useCallback } from 'react'
import { HUD } from './components/hud/HUD'
import { HeroZone } from './components/zones/HeroZone'
import { ProfileZone } from './components/zones/ProfileZone'
import { SkillsZone } from './components/zones/SkillsZone'
import { TechStackZone } from './components/zones/TechStackZone'
import { ProjectZone } from './components/zones/ProjectZone'
import { ContributionsZone } from './components/zones/ContributionsZone'
import { ArcadeZone } from './components/zones/ArcadeZone'
import { ContactZone } from './components/zones/ContactZone'
import { Toast, type ToastMessage } from './components/common/Toast'
import { HiddenBug } from './components/common/HiddenBug'
import { BackgroundFireflies } from './components/common/BackgroundFireflies'
import { VerticalMinimap } from './components/hud/VerticalMinimap'
import { BackToTop } from './components/hud/BackToTop'
import { useKonamiCode } from './hooks/useKonamiCode'

export default function App() {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [squashedBugs, setSquashedBugs] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('porto_squashed_bugs')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  // Toast helper
  const showToast = useCallback((text: string, type: 'info' | 'success' | 'amber' = 'info') => {
    setToast({
      id: String(Date.now()),
      text,
      type
    })
  }, [])

  // Guide toast for first-time visitor (design.md 6.2)
  useEffect(() => {
    try {
      const hasSeenGuide = sessionStorage.getItem('porto_has_seen_guide')
      if (!hasSeenGuide) {
        sessionStorage.setItem('porto_has_seen_guide', 'true')
        const timer = setTimeout(() => {
          showToast('Tekan 1 sampai 6 untuk berpindah zona. Klik di hero untuk menembak.')
        }, 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // Fallback
    }
  }, [showToast])

  // Zone discovery toasts as user explores (design.md 6.4)
  useEffect(() => {
    const discovered = new Set<string>(['hero'])
    const zoneLabels: Record<string, string> = {
      profil: '📜 Catatan Profil Terbuka',
      keahlian: '🎒 Matriks Keahlian & Inventori Terbuka',
      project: '🗺️ Peta Riwayat Ekspedisi Terbuka',
      contributions: '🌫️ Peta Kabut Kontribusi Terbuka',
      arcade: '🎯 Arena Latihan Bug Hunt Terbuka',
      kontak: '🔥 Api Unggun Terakhir Terbuka'
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (zoneLabels[id] && !discovered.has(id)) {
              discovered.add(id)
              showToast(zoneLabels[id], 'info')
            }
          }
        })
      },
      { threshold: 0.35 }
    )

    Object.keys(zoneLabels).forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [showToast])

  // Konami Code Easter Egg (design.md 6.8)
  useKonamiCode(() => {
    const isSenja = document.body.classList.toggle('senja')
    showToast(
      isSenja ? 'Mode senja aktif! Palet pegunungan menghangat.' : 'Mode senja nonaktif.',
      'amber'
    )
  })

  // Handle squashing a hidden bug
  function handleSquashBug(id: number) {
    setSquashedBugs((prev) => {
      const next = new Set(prev)
      next.add(id)
      try {
        localStorage.setItem('porto_squashed_bugs', JSON.stringify(Array.from(next)))
      } catch {
        // Ignore quota/private mode
      }

      if (next.size === 5) {
        showToast('Luar biasa! 5/5 bug tersembunyi ditemukan. Lencana Master Hunter terbuka di Profil!', 'success')
      } else {
        showToast(`Bug ditemukan! (${next.size}/5)`, 'info')
      }

      return next
    })
  }

  function handleHelpClick() {
    showToast('Tekan 1 sampai 6 untuk berpindah zona. Klik di hero untuk menembak bug.')
  }

  return (
    <div className="min-h-[100dvh] bg-malam-gunung text-tulang flex flex-col relative transition-colors duration-500 overflow-x-hidden">
      {/* Living atmospheric background fireflies */}
      <BackgroundFireflies />

      {/* Vertical Minimap (Desktop XL) */}
      <VerticalMinimap />

      {/* Back to Top Warp Button */}
      <BackToTop />

      {/* HUD Bar Atas */}
      <HUD bugCount={squashedBugs.size} onShowHelp={handleHelpClick} />

      {/* Konten Halaman Terpusat Maksimal 1120px */}
      <main
        id="main-content"
        className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 relative z-10"
        tabIndex={-1}
      >
        {/* Zona 0: Hero */}
        <div className="relative">
          <HeroZone />
          {/* Bug tersembunyi 1: Di sudut area perkemahan */}
          <HiddenBug
            id={1}
            positionClasses="top-12 right-6 md:right-16"
            isSquashed={squashedBugs.has(1)}
            onSquash={handleSquashBug}
          />
        </div>

        {/* Zona 1: Profil */}
        <div className="relative">
          <ProfileZone hasMasterHunterBadge={squashedBugs.size >= 5} />
          {/* Bug tersembunyi 2: Di sekitar kartu pass */}
          <HiddenBug
            id={2}
            positionClasses="top-24 left-2 sm:left-4"
            isSquashed={squashedBugs.has(2)}
            onSquash={handleSquashBug}
          />
        </div>

        {/* Zona 2: Keahlian */}
        <div className="relative">
          <SkillsZone />
          {/* Bug tersembunyi 3: Di dekat tab inventori */}
          <HiddenBug
            id={3}
            positionClasses="top-16 right-4 sm:right-12"
            isSquashed={squashedBugs.has(3)}
            onSquash={handleSquashBug}
          />
        </div>

        {/* Zona 3: Tech stack */}
        <TechStackZone />

        {/* Zona 4: Project */}
        <ProjectZone />

        {/* Zona 5: GitHub Contributions */}
        <div className="relative">
          <ContributionsZone />
          {/* Bug tersembunyi 4: Di tepi legenda kontribusi */}
          <HiddenBug
            id={4}
            positionClasses="bottom-14 left-8"
            isSquashed={squashedBugs.has(4)}
            onSquash={handleSquashBug}
          />
        </div>

        {/* Zona 6: Arcade — Bug Hunt */}
        <ArcadeZone />

        {/* Zona 7: Kontak — Api Unggun */}
        <div className="relative mb-16">
          <ContactZone />
          {/* Bug tersembunyi 5: Di dekat api unggun */}
          <HiddenBug
            id={5}
            positionClasses="top-20 right-8 sm:right-24"
            isSquashed={squashedBugs.has(5)}
            onSquash={handleSquashBug}
          />
        </div>
      </main>

      {/* Footer Lengkap */}
      <footer className="py-8 border-t border-embun/20 bg-kabut-lembah/60 text-small text-embun select-none relative z-10">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="font-pixel text-base text-tulang tracking-wider">
              OKAN SYAILENDRA <span className="text-lentera">(KANNZDEV)</span>
            </p>
            <p className="font-body text-xs text-embun">
              Frontend and Game Developer · Portofolio Petualangan 2D
            </p>
          </div>

          <div className="text-center md:text-right space-y-1 font-body text-xs text-tulang/80">
            <p>© 2026 Okan Syailendra · Seluruh Hak Cipta Dilindungi</p>
            <p className="font-pixel text-[11px] text-embun">
              Dibuat dengan React, Tailwind CSS v4, dan Vite · Bebas Tracker
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Game Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
