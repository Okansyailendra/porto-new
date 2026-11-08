import { useEffect, useState } from 'react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 600)
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
      className="fixed bottom-6 right-6 z-40 px-4 py-2.5 bg-white border border-[#E8E4DC] hover:border-[#145E55] text-[#132238] hover:text-[#145E55] rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg backdrop-blur-md transition-all active:scale-95 cursor-pointer select-none"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-xs">
        ↑
      </span>
      <span className="hidden sm:inline">Ke Atas</span>
    </button>
  )
}
