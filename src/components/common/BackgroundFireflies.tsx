import { useEffect, useRef } from 'react'

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  targetAlpha: number
  fadeSpeed: number
}

export function BackgroundFireflies() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    function handleResize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate 24 ambient fireflies
    const count = Math.min(28, Math.floor(window.innerWidth / 45))
    const fireflies: Firefly[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.1, // gently drift upwards
      size: 1.5 + Math.random() * 2,
      alpha: Math.random() * 0.7,
      targetAlpha: 0.2 + Math.random() * 0.7,
      fadeSpeed: 0.005 + Math.random() * 0.01
    }))

    let lastTime = performance.now()

    function render(now: number) {
      const delta = Math.min(0.1, (now - lastTime) / 1000)
      lastTime = now

      if (!document.hidden && ctx) {
        ctx.clearRect(0, 0, width, height)

        for (const f of fireflies) {
          f.x += f.vx * delta * 60
          f.y += f.vy * delta * 60

          // Wrap edges
          if (f.x < 0) f.x = width
          if (f.x > width) f.x = 0
          if (f.y < 0) f.y = height
          if (f.y > height) f.y = 0

          // Smooth pulse alpha
          if (Math.abs(f.alpha - f.targetAlpha) < 0.02) {
            f.targetAlpha = 0.15 + Math.random() * 0.75
          } else {
            f.alpha += (f.targetAlpha - f.alpha) * f.fadeSpeed
          }

          // Draw warm firefly particle (Lentera gold glow)
          ctx.save()
          ctx.shadowBlur = 8
          ctx.shadowColor = 'rgba(244, 169, 59, 0.8)'
          ctx.fillStyle = `rgba(255, 215, 120, ${f.alpha})`
          ctx.fillRect(f.x, f.y, f.size, f.size)
          ctx.restore()
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
