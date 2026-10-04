import { useEffect, useState } from 'react'

interface HotbarSlot {
  number: number
  label: string
  targetId: string
}

const slots: HotbarSlot[] = [
  { number: 1, label: 'Profil', targetId: 'profil' },
  { number: 2, label: 'Keahlian', targetId: 'keahlian' },
  { number: 3, label: 'Project', targetId: 'project' },
  { number: 4, label: 'Contributions', targetId: 'contributions' },
  { number: 5, label: 'Arcade', targetId: 'arcade' },
  { number: 6, label: 'Kontak', targetId: 'kontak' }
]

export function HotbarNav() {
  const [activeSlot, setActiveSlot] = useState<number>(1)

  // Smooth scroll handler
  function scrollToZone(targetId: string, slotNum: number) {
    setActiveSlot(slotNum)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Keyboard shortcut listener (1-6)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger if user is typing in form/input or during Bug Hunt focus
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.tagName === 'CANVAS'
      ) {
        return
      }

      const keyNum = parseInt(e.key, 10)
      if (keyNum >= 1 && keyNum <= 6) {
        e.preventDefault()
        const targetSlot = slots.find((s) => s.number === keyNum)
        if (targetSlot) {
          scrollToZone(targetSlot.targetId, targetSlot.number)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Update active slot based on scroll position using IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = slots.find((s) => s.targetId === entry.target.id)
          if (matched) {
            setActiveSlot(matched.number)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    })

    slots.forEach((slot) => {
      const el = document.getElementById(slot.targetId)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="flex items-center gap-1 p-1 bg-kabut-lembah/90 border border-embun/20 rounded-panel backdrop-blur-xs select-none overflow-x-auto max-w-full"
      aria-label="Navigasi cepat hotbar zona (Pintasan tombol 1 sampai 6)"
    >
      {slots.map((slot) => {
        const isActive = activeSlot === slot.number
        return (
          <button
            key={slot.number}
            type="button"
            onClick={() => scrollToZone(slot.targetId, slot.number)}
            className={`relative flex items-center gap-1 px-2 md:px-2.5 py-1 text-small font-pixel transition-colors duration-150 rounded-button shrink-0 focus-visible:outline-2 focus-visible:outline-lentera ${
              isActive
                ? 'bg-kabut-lembah text-lentera shadow-xs'
                : 'text-embun hover:text-tulang hover:bg-malam-gunung/50'
            }`}
            aria-label={`Slot ${slot.number}: Zona ${slot.label} (Tekan angka ${slot.number})`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`w-4 h-4 flex items-center justify-center border text-[11px] leading-none ${
                isActive
                  ? 'border-lentera text-lentera bg-malam-gunung'
                  : 'border-embun/40 text-embun/80'
              }`}
            >
              {slot.number}
            </span>
            <span className="hidden sm:inline">{slot.label}</span>

            {/* Active underline in Lentera */}
            {isActive && (
              <span
                className="absolute bottom-0 left-1 right-1 h-0.5 bg-lentera"
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
