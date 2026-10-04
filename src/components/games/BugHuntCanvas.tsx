import { useCallback, useEffect, useRef, useState } from 'react'
import { BugHuntEngine, readBestScore, type GameState } from './BugHuntEngine'

interface BugHuntCanvasProps {
  reducedMotion: boolean
}

export function BugHuntCanvas({ reducedMotion }: BugHuntCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<BugHuntEngine | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [uiState, setUiState] = useState<GameState>({
    phase: 'idle',
    score: 0,
    bestScore: readBestScore(),
    timeLeft: 30,
    combo: 0,
    bestCombo: 0,
    accuracy: 0,
    hits: 0,
    misses: 0,
    countdown: 3,
    bugs: [],
    particles: [],
    missMarkers: [],
    scoreFloats: [],
  })

  // ── Canvas resize ──────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const w = Math.max(320, Math.floor(rect.width))
    const h = Math.max(240, Math.floor(rect.height))

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      // Redraw if engine exists
      engineRef.current?.drawFrame()
    }
  }, [])

  // ── Engine init ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const engine = new BugHuntEngine(canvas, setUiState, reducedMotion)
    engineRef.current = engine

    // Draw idle screen
    engine.drawFrame()

    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [reducedMotion, resizeCanvas])

  // ── Resize observer ────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(resizeCanvas)
    ro.observe(container)
    return () => ro.disconnect()
  }, [resizeCanvas])

  // ── Visibility change: auto-pause when tab is hidden ──────────────────────
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        engineRef.current?.pause()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // ── Keyboard: Space to pause/resume ───────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Don't intercept if focus is not inside game area
      if (!containerRef.current?.contains(document.activeElement)) return
      if (e.key === ' ') {
        e.preventDefault()
        const phase = engineRef.current?.state.phase
        if (phase === 'playing') engineRef.current?.pause()
        else if (phase === 'paused') engineRef.current?.resume()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // ── Pointer events (mouse + touch) ─────────────────────────────────────────
  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    // Prevent double-firing on touch devices
    e.preventDefault()
    engineRef.current?.handleClick(e.clientX, e.clientY)
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLCanvasElement>) {
    if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0]
      engineRef.current?.handleClick(touch.clientX, touch.clientY)
    }
  }

  // ── Button handlers ────────────────────────────────────────────────────────
  function handleStart() { engineRef.current?.start() }
  function handlePause() { engineRef.current?.pause() }
  function handleResume() { engineRef.current?.resume() }
  function handleRestart() { engineRef.current?.restart() }

  const phase = uiState.phase
  const isPlaying = phase === 'playing'
  const isPaused = phase === 'paused'
  const isCountdown = phase === 'countdown'
  const isFinished = phase === 'finished'
  const isIdle = phase === 'idle'

  // Cursor style during play
  const canvasCursor = isPlaying ? 'crosshair' : 'default'

  return (
    <div className="space-y-4">
      {/* Canvas container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video min-h-[240px] max-h-[480px] bg-malam-gunung border border-embun/30 rounded-panel overflow-hidden"
        style={{ minWidth: 320 }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ cursor: canvasCursor, touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onTouchEnd={handleTouchEnd}
          aria-label="Area permainan Bug Hunt"
        />

        {/* Idle overlay rendered on top of canvas */}
        {isIdle && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-malam-gunung/80 pointer-events-none select-none">
            <div className="text-center space-y-2">
              <p className="font-pixel text-h3 text-lentera">Bug Hunt</p>
              <p className="font-body text-small text-embun max-w-[38ch] text-center">
                30 detik. Klik bug untuk menembak. Combo ×2 setelah tiga tembakan beruntun.
              </p>
            </div>
            {uiState.bestScore > 0 && (
              <p className="font-pixel text-small text-embun/80">
                Skor terbaik: <span className="text-lentera">{uiState.bestScore}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Action buttons */}
        <div className="flex items-center gap-2">
          {(isIdle || isFinished) && (
            <button
              type="button"
              onClick={isIdle ? handleStart : handleRestart}
              className="px-5 py-2.5 bg-lentera text-malam-gunung font-pixel text-base font-semibold rounded-button hover:brightness-105 active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
            >
              {isIdle ? 'Mulai' : 'Ulang'}
            </button>
          )}

          {isCountdown && (
            <button
              type="button"
              disabled
              className="px-5 py-2.5 bg-kabut-lembah text-embun/60 font-pixel text-base rounded-button cursor-not-allowed border border-embun/20"
            >
              Siap...
            </button>
          )}

          {isPlaying && (
            <>
              <button
                type="button"
                onClick={handlePause}
                className="px-5 py-2.5 border border-embun text-tulang font-pixel text-base rounded-button hover:border-lentera hover:text-lentera active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
              >
                Jeda
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 border border-embun/40 text-embun font-pixel text-small rounded-button hover:border-darah-bug hover:text-darah-bug active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
              >
                Ulang
              </button>
            </>
          )}

          {isPaused && (
            <>
              <button
                type="button"
                onClick={handleResume}
                className="px-5 py-2.5 bg-lentera text-malam-gunung font-pixel text-base font-semibold rounded-button hover:brightness-105 active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
              >
                Lanjut
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 border border-embun/40 text-embun font-pixel text-small rounded-button hover:border-darah-bug hover:text-darah-bug active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
              >
                Ulang
              </button>
            </>
          )}
        </div>

        {/* Right: Live score */}
        {(isPlaying || isPaused || isCountdown) && (
          <div className="flex items-center gap-4 font-pixel text-small">
            <div className="text-right">
              <span className="text-embun block text-[11px]">Skor</span>
              <span className="text-lentera text-lg">{uiState.score}</span>
            </div>
            {uiState.combo >= 2 && (
              <div className="text-right">
                <span className="text-embun block text-[11px]">Combo</span>
                <span className={`text-lg ${uiState.combo >= 3 ? 'text-lentera' : 'text-tulang'}`}>
                  ×{uiState.combo >= 3 ? 2 : 1} ({uiState.combo})
                </span>
              </div>
            )}
            <div className="text-right">
              <span className="text-embun block text-[11px]">Waktu</span>
              <span className={`text-lg ${uiState.timeLeft <= 10 ? 'text-darah-bug' : 'text-tulang'}`}>
                {Math.ceil(uiState.timeLeft)}s
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Results Panel (finished) */}
      {isFinished && (
        <div className="p-5 bg-kabut-lembah border border-embun/30 rounded-panel space-y-4">
          <div className="flex items-center justify-between border-b border-embun/20 pb-3">
            <h3 className="font-pixel text-h3 text-tulang">Ronde selesai</h3>
            {uiState.score >= uiState.bestScore && uiState.score > 0 && (
              <span className="font-pixel text-small px-3 py-1 bg-lentera/20 text-lentera border border-lentera/40 rounded-button">
                Rekor baru
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="font-pixel text-xs text-embun block mb-0.5">Skor</span>
              <span className="font-pixel text-2xl text-lentera">{uiState.score}</span>
            </div>
            <div>
              <span className="font-pixel text-xs text-embun block mb-0.5">Akurasi</span>
              <span className="font-pixel text-2xl text-tulang">{uiState.accuracy}%</span>
            </div>
            <div>
              <span className="font-pixel text-xs text-embun block mb-0.5">Combo tertinggi</span>
              <span className="font-pixel text-2xl text-tulang">{uiState.bestCombo}</span>
            </div>
            <div>
              <span className="font-pixel text-xs text-embun block mb-0.5">Skor terbaik</span>
              <span className="font-pixel text-2xl text-lumut">{uiState.bestScore}</span>
            </div>
          </div>

          {uiState.score === 0 && (
            <p className="font-body text-small text-embun/70 italic">
              Belum ada skor. Mulai satu ronde.
            </p>
          )}
        </div>
      )}

      {/* Score legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-pixel text-xs text-embun/80">
        <span>
          Bug kecil <span className="text-darah-bug">·</span> 30 poin
        </span>
        <span>
          Bug sedang <span className="text-lentera">·</span> 20 poin
        </span>
        <span>
          Bug besar <span className="text-lumut">·</span> 10 poin
        </span>
        <span className="text-lentera/80">
          Combo ×2 setelah 3 tembakan beruntun
        </span>
      </div>
    </div>
  )
}
