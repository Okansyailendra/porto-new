import { ScrollHearts } from './ScrollHearts'
import { HotbarNav } from './HotbarNav'

interface HUDProps {
  bugCount?: number
  onShowHelp?: () => void
}

export function HUD({ bugCount = 0, onShowHelp }: HUDProps) {
  return (
    <header className="sticky top-0 z-50 w-full py-2.5 px-3 sm:px-6 md:px-8 bg-malam-gunung/85 backdrop-blur-md border-b border-embun/15 select-none">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Scroll Hearts */}
        <div className="flex items-center gap-2">
          <ScrollHearts />

          {/* Hidden Bug Counter */}
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-kabut-lembah/90 border border-embun/20 rounded-panel font-pixel text-xs text-embun"
            title="Bug tersembunyi yang ditemukan di halaman"
            aria-label={`Bug tersembunyi ditemukan: ${bugCount} dari 5`}
          >
            <span>🐛</span>
            <span className={bugCount >= 5 ? 'text-lentera font-bold' : 'text-tulang'}>
              {bugCount}/5
            </span>
          </div>
        </div>

        {/* Center: Hotbar Nav */}
        <HotbarNav />

        {/* Right: Help button */}
        {onShowHelp && (
          <button
            type="button"
            onClick={onShowHelp}
            className="w-7 h-7 flex items-center justify-center font-pixel text-xs text-embun hover:text-lentera bg-kabut-lembah/90 border border-embun/20 hover:border-lentera rounded-button transition-colors focus-visible:outline-2 focus-visible:outline-lentera"
            title="Bantuan pintasan & petualangan"
            aria-label="Tampilkan petunjuk dan bantuan navigasi"
          >
            ?
          </button>
        )}
      </div>
    </header>
  )
}
