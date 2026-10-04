import { useState } from 'react'

interface HiddenBugProps {
  id: number
  positionClasses: string
  onSquash: (id: number) => void
  isSquashed: boolean
}

export function HiddenBug({ id, positionClasses, onSquash, isSquashed }: HiddenBugProps) {
  const [showParticle, setShowParticle] = useState(false)

  if (isSquashed) return null

  function handleClick() {
    setShowParticle(true)
    setTimeout(() => {
      onSquash(id)
    }, 200)
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      className={`absolute z-30 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-crosshair select-none focus-visible:outline-2 focus-visible:outline-darah-bug rounded-full ${positionClasses}`}
      aria-label={`Bug tersembunyi #${id}. Klik untuk menangkap!`}
      title="Tangkap bug!"
    >
      {showParticle ? (
        <span className="font-pixel text-xs text-darah-bug animate-ping font-bold">
          *poof*
        </span>
      ) : (
        <span className="block text-sm transition-transform hover:scale-125 animate-pulse">
          🐞
        </span>
      )}
    </div>
  )
}
