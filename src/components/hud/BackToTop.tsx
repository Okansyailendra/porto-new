import { useEffect, useState } from 'react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // Show after scrolling past 800px (around zone 3)
      setIsVisible(window.scrollY > 800)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 px-3 py-2 bg-kabut-lembah/90 border border-embun/40 hover:border-lentera text-tulang hover:text-lentera rounded-panel font-pixel text-xs flex items-center gap-1.5 shadow-xl backdrop-blur-xs transition-all active:translate-y-[1px] focus-visible:outline-2 focus-visible:outline-lentera select-none group"
      aria-label="Kembali ke atas perkemahan (Hero)"
      title="Warp kembali ke perkemahan"
    >
      <span className="w-4 h-4 flex items-center justify-center border border-embun/30 group-hover:border-lentera bg-malam-gunung rounded-button">
        ↑
      </span>
      <span className="hidden sm:inline">Ke Atas</span>
    </button>
  )
}
