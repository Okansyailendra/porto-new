import { useEffect, useState } from 'react'

export function ScrollHearts() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setScrollPercent(0)
        return
      }
      const currentScroll = window.scrollY
      const percent = Math.min(100, Math.max(0, (currentScroll / docHeight) * 100))
      setScrollPercent(percent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 5 hearts: each heart represents 20%
  // Heart 1: 0-20%, Heart 2: 20-40%, etc.
  // We can calculate fill state (0 to 1) for each heart.
  const hearts = [1, 2, 3, 4, 5].map((index) => {
    const threshold = (index - 1) * 20
    const filledThreshold = index * 20
    if (scrollPercent >= filledThreshold) return 1
    if (scrollPercent <= threshold) return 0
    return (scrollPercent - threshold) / 20
  })

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 bg-kabut-lembah/90 border border-embun/20 rounded-panel backdrop-blur-xs select-none"
      role="progressbar"
      aria-label="Progres jelajah halaman"
      aria-valuenow={Math.round(scrollPercent)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span className="text-small font-pixel text-embun mr-1 hidden sm:inline">HP</span>
      <div className="flex gap-1">
        {hearts.map((fill, i) => (
          <div key={i} className="relative w-4 h-4 transition-transform duration-200">
            <svg viewBox="0 0 10 9" className="w-full h-full" aria-hidden="true">
              {/* Empty Heart Base */}
              <path
                d="M2 0h2v1H2V0zm4 0h2v1H6V0zM0 1h2v3H0V1zm4 1h2v1H4V2zm4-1h2v3H8V1zM1 4h2v2H1V4zm6 0h2v2H7V4zM2 6h2v1H2V6zm4 0h2v1H6V6zM3 7h4v1H3V7zm1 1h2v1H4V8z"
                fill="#22343F"
                stroke="#8DB4C4"
                strokeWidth="0.5"
              />
              {/* Filled Heart Color */}
              {fill > 0 && (
                <path
                  d="M2 1h2v1H2zm4 0h2v1H6zm-5 1h8v2H1zm1 2h6v2H2zm1 2h4v1H3zm1 1h2v1H4z"
                  fill="#E5534B"
                  style={{
                    opacity: fill >= 0.5 ? 1 : 0.6,
                    transition: 'opacity 200ms cubic-bezier(0.2, 0, 0, 1)'
                  }}
                />
              )}
            </svg>
          </div>
        ))}
      </div>
      <span className="text-small font-pixel text-tulang ml-1">
        {Math.round(scrollPercent)}%
      </span>
    </div>
  )
}
