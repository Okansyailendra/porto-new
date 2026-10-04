import { useEffect, useLayoutEffect, useState } from 'react'

interface ZoneNode {
  id: string
  label: string
  slot: number
}

const ZONES: ZoneNode[] = [
  { id: 'hero', label: 'Kemah (Hero)', slot: 0 },
  { id: 'profil', label: 'Profil', slot: 1 },
  { id: 'keahlian', label: 'Keahlian', slot: 2 },
  { id: 'tech-stack', label: 'Tech Stack', slot: 3 },
  { id: 'project', label: 'Project', slot: 4 },
  { id: 'contributions', label: 'Contributions', slot: 5 },
  { id: 'arcade', label: 'Arcade', slot: 6 },
  { id: 'kontak', label: 'Api Unggun', slot: 7 }
]

export function VerticalMinimap() {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0)

  // Sync on scroll
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY + 250
      let currentIndex = 0

      ZONES.forEach((zone, idx) => {
        const el = document.getElementById(zone.id)
        if (el && el.offsetTop <= scrollY) {
          currentIndex = idx
        }
      })

      setActiveZoneIndex(currentIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Sync after scroll listener is attached (handles mid-page loads)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initial sync: wait for layout to settle before reading offsetTop
  useLayoutEffect(() => {
    let raf: number
    raf = requestAnimationFrame(() => {
      const scrollY = window.scrollY + 250
      let currentIndex = 0

      ZONES.forEach((zone, idx) => {
        const el = document.getElementById(zone.id)
        if (el && el.offsetTop <= scrollY) {
          currentIndex = idx
        }
      })

      setActiveZoneIndex(currentIndex)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  function scrollToZone(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside
      className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
      aria-label="Minimap navigasi zona vertikal"
    >
      <div className="relative p-2 bg-kabut-lembah/85 border border-embun/25 rounded-panel backdrop-blur-md shadow-2xl flex flex-col items-center gap-4">
        {/* Track Line */}
        <div
          className="absolute top-4 bottom-4 left-1/2 w-0.5 -translate-x-1/2 bg-embun/20"
          aria-hidden="true"
        />

        {/* Moving Adventurer Sprite */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
          style={{
            top: `${16 + activeZoneIndex * 28}px`
          }}
          aria-hidden="true"
        >
          <div className="w-5 h-5 flex items-center justify-center animate-bounce -ml-6">
            <svg viewBox="0 0 12 12" className="w-4 h-4" aria-hidden="true">
              <rect x="3" y="1" width="6" height="3" fill="#F4A93B" />
              <rect x="4" y="4" width="4" height="4" fill="#E6E0D0" />
              <rect x="3" y="8" width="6" height="3" fill="#6FA36B" />
            </svg>
          </div>
        </div>

        {/* Checkpoint Dots */}
        {ZONES.map((zone, idx) => {
          const isActive = idx === activeZoneIndex
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => scrollToZone(zone.id)}
              className="group relative z-10 w-4 h-4 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-lentera rounded-full"
              aria-label={`Loncat ke ${zone.label}`}
              aria-current={isActive ? 'location' : undefined}
            >
              {/* Dot */}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-3 h-3 bg-lentera ring-2 ring-lentera/40 ring-offset-1 ring-offset-malam-gunung'
                    : 'bg-embun/40 hover:bg-embun hover:scale-125'
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute right-7 px-2 py-0.5 bg-malam-gunung border border-embun/30 rounded-button font-pixel text-xs text-tulang whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {zone.label}
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
