// Bug Hunt game engine — pure Canvas 2D, no library
// All state is managed inside this module; the React component
// only mounts/unmounts the canvas and forwards events.

// ─── Types ────────────────────────────────────────────────────────────────────

export type BugSize = 'kecil' | 'sedang' | 'besar'
export type GamePhase = 'idle' | 'countdown' | 'playing' | 'paused' | 'finished'

export interface Bug {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: BugSize
  radius: number
  color: string
  alive: boolean
  wobble: number // phase offset for wobble animation
}

export interface HitParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number   // 0..1
  color: string
}

export interface MissMarker {
  x: number
  y: number
  life: number   // 0..1
}

export interface ScoreFloat {
  x: number
  y: number
  vy: number
  life: number   // 0..1
  text: string
}

export interface GameState {
  phase: GamePhase
  score: number
  bestScore: number
  timeLeft: number    // seconds remaining
  combo: number
  bestCombo: number
  accuracy: number    // shots hit / shots fired
  hits: number
  misses: number
  countdown: number   // 3, 2, 1
  bugs: Bug[]
  particles: HitParticle[]
  missMarkers: MissMarker[]
  scoreFloats: ScoreFloat[]
}

// ─── Constants ──────────────────────────────────────────────────────────────

const ROUND_DURATION = 30   // seconds
const LS_KEY = 'bughunt.best'

const BUG_CONFIG: Record<BugSize, { radius: number; speed: number; points: number; color: string }> = {
  kecil:  { radius: 10, speed: 3.0, points: 30, color: '#E5534B' },
  sedang: { radius: 18, speed: 2.0, points: 20, color: '#F4A93B' },
  besar:  { radius: 26, speed: 1.2, points: 10, color: '#6FA36B' },
}

const BODY_COLORS: Record<BugSize, { body: string; eye: string; leg: string; shell: string }> = {
  kecil:  { body: '#E5534B', eye: '#ffffff', leg: '#C43028', shell: '#FF6B5C' },
  sedang: { body: '#F4A93B', eye: '#ffffff', leg: '#D08820', shell: '#FFBB55' },
  besar:  { body: '#6FA36B', eye: '#ffffff', leg: '#4A7A4C', shell: '#88CC88' },
}

// How many bugs on screen at a time
function maxBugsForTime(timeLeft: number): number {
  if (timeLeft > 20) return 3
  if (timeLeft > 10) return 5
  return 7
}

// ─── localStorage helpers ────────────────────────────────────────────────────

export function readBestScore(): number {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw === null) return 0
    const n = parseInt(raw, 10)
    return isNaN(n) ? 0 : n
  } catch {
    return 0
  }
}

function writeBestScore(score: number): void {
  try {
    localStorage.setItem(LS_KEY, String(score))
  } catch {
    // Silently ignore (private browsing / quota)
  }
}

// ─── Engine class ───────────────────────────────────────────────────────────

export class BugHuntEngine {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  state: GameState
  reducedMotion: boolean

  private rafId: number = 0
  private lastTimestamp: number = 0
  private bugIdCounter: number = 0
  private bugSpawnTimer: number = 0
  private bugSpawnInterval: number = 1.2  // seconds between spawns
  private onStateChange: (state: GameState) => void

  constructor(
    canvas: HTMLCanvasElement,
    onStateChange: (state: GameState) => void,
    reducedMotion: boolean
  ) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D context unavailable')
    this.ctx = ctx
    this.reducedMotion = reducedMotion
    this.onStateChange = onStateChange

    this.state = {
      phase: 'idle',
      score: 0,
      bestScore: readBestScore(),
      timeLeft: ROUND_DURATION,
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
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  start(): void {
    this.resetRound()
    this.state.phase = 'countdown'
    this.state.countdown = 3
    this.emit()
    this.scheduleRaf()
  }

  pause(): void {
    if (this.state.phase !== 'playing') return
    this.state.phase = 'paused'
    this.cancelRaf()
    this.emit()
  }

  resume(): void {
    if (this.state.phase !== 'paused') return
    this.state.phase = 'playing'
    this.lastTimestamp = 0   // prevent delta spike
    this.scheduleRaf()
    this.emit()
  }

  restart(): void {
    this.cancelRaf()
    this.start()
  }

  handleClick(clientX: number, clientY: number): void {
    if (this.state.phase !== 'playing') return
    const rect = this.canvas.getBoundingClientRect()
    const scaleX = this.canvas.width / rect.width
    const scaleY = this.canvas.height / rect.height
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    let hit = false
    // Check bugs in reverse (topmost rendered last = front)
    for (let i = this.state.bugs.length - 1; i >= 0; i--) {
      const bug = this.state.bugs[i]
      if (!bug.alive) continue
      const dx = x - bug.x
      const dy = y - bug.y
      if (dx * dx + dy * dy <= bug.radius * bug.radius * 2.5) {
        this.hitBug(bug, x, y)
        hit = true
        break
      }
    }

    if (!hit) {
      this.miss(x, y)
    }
  }

  destroy(): void {
    this.cancelRaf()
  }

  // ── Round lifecycle ────────────────────────────────────────────────────────

  private resetRound(): void {
    this.state.score = 0
    this.state.timeLeft = ROUND_DURATION
    this.state.combo = 0
    this.state.bestCombo = 0
    this.state.accuracy = 0
    this.state.hits = 0
    this.state.misses = 0
    this.state.countdown = 3
    this.state.bugs = []
    this.state.particles = []
    this.state.missMarkers = []
    this.state.scoreFloats = []
    this.bugIdCounter = 0
    this.bugSpawnTimer = 0
    this.bugSpawnInterval = 1.2
  }

  private finishRound(): void {
    this.state.phase = 'finished'
    this.cancelRaf()

    const total = this.state.hits + this.state.misses
    this.state.accuracy = total > 0 ? Math.round((this.state.hits / total) * 100) : 0

    if (this.state.score > this.state.bestScore) {
      this.state.bestScore = this.state.score
      writeBestScore(this.state.score)
    }

    this.drawFrame()
    this.emit()
  }

  // ── Hit / Miss ─────────────────────────────────────────────────────────────

  private hitBug(bug: Bug, x: number, y: number): void {
    bug.alive = false
    this.state.combo += 1
    if (this.state.combo > this.state.bestCombo) {
      this.state.bestCombo = this.state.combo
    }

    const cfg = BUG_CONFIG[bug.size]
    const comboMult = this.state.combo >= 3 ? 2 : 1
    const earned = cfg.points * comboMult

    this.state.score += earned
    this.state.hits += 1

    // Spawn particles
    const particleCount = this.reducedMotion ? 2 : 8
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.4
      const speed = 1.5 + Math.random() * 2.5
      this.state.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: BODY_COLORS[bug.size].body,
      })
    }

    // Score float
    this.state.scoreFloats.push({
      x,
      y,
      vy: -1.5,
      life: 1,
      text: `+${earned}${comboMult > 1 ? ' ×2' : ''}`,
    })

    // Remove dead bug
    this.state.bugs = this.state.bugs.filter((b) => b.alive)
    this.emit()
  }

  private miss(x: number, y: number): void {
    this.state.combo = 0
    this.state.misses += 1

    if (!this.reducedMotion) {
      this.state.missMarkers.push({ x, y, life: 1 })
    }

    this.emit()
  }

  // ── Spawn ──────────────────────────────────────────────────────────────────

  private spawnBug(): void {
    const max = maxBugsForTime(this.state.timeLeft)
    if (this.state.bugs.length >= max) return

    const sizes: BugSize[] = ['kecil', 'sedang', 'besar']
    // Weighted: more big+medium early, more small when time < 10
    const weights = this.state.timeLeft > 10
      ? [0.3, 0.4, 0.3]
      : [0.55, 0.3, 0.15]

    const rand = Math.random()
    let cumulative = 0
    let chosen: BugSize = 'besar'
    for (let i = 0; i < sizes.length; i++) {
      cumulative += weights[i]
      if (rand < cumulative) { chosen = sizes[i]; break }
    }

    const cfg = BUG_CONFIG[chosen]
    const margin = cfg.radius + 10
    const x = margin + Math.random() * (this.canvas.width - margin * 2)
    const y = margin + Math.random() * (this.canvas.height - margin * 2)

    const angle = Math.random() * Math.PI * 2
    const speed = cfg.speed * (0.8 + Math.random() * 0.4)

    this.state.bugs.push({
      id: this.bugIdCounter++,
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: chosen,
      radius: cfg.radius,
      color: cfg.color,
      alive: true,
      wobble: Math.random() * Math.PI * 2,
    })
  }

  // ── RAF loop ───────────────────────────────────────────────────────────────

  private scheduleRaf(): void {
    this.rafId = requestAnimationFrame(this.loop)
  }

  private cancelRaf(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = 0
    }
  }

  private loop = (timestamp: number): void => {
    if (this.lastTimestamp === 0) this.lastTimestamp = timestamp
    const rawDelta = (timestamp - this.lastTimestamp) / 1000  // seconds
    // Cap delta to avoid spiral of death when tab is hidden briefly
    const delta = Math.min(rawDelta, 0.1)
    this.lastTimestamp = timestamp

    if (this.state.phase === 'countdown') {
      this.updateCountdown(delta)
    } else if (this.state.phase === 'playing') {
      this.updatePlaying(delta)
    }

    this.drawFrame()

    if (this.state.phase === 'countdown' || this.state.phase === 'playing') {
      this.scheduleRaf()
    }
  }

  // ── Countdown update ───────────────────────────────────────────────────────

  private countdownAccum: number = 0

  private updateCountdown(delta: number): void {
    this.countdownAccum += delta
    this.state.countdown = Math.max(1, 3 - Math.floor(this.countdownAccum))
    if (this.countdownAccum >= 3) {
      this.state.phase = 'playing'
      this.countdownAccum = 0
      this.emit()
    }
  }

  // ── Playing update ─────────────────────────────────────────────────────────

  private updatePlaying(delta: number): void {
    // Decrease time
    this.state.timeLeft = Math.max(0, this.state.timeLeft - delta)
    if (this.state.timeLeft <= 0) {
      this.finishRound()
      return
    }

    // Speed up in final 10 seconds
    const speedMult = this.state.timeLeft <= 10 ? 1.4 : 1.0

    // Move bugs
    const W = this.canvas.width
    const H = this.canvas.height

    for (const bug of this.state.bugs) {
      bug.wobble += delta * 4
      bug.x += bug.vx * speedMult
      bug.y += bug.vy * speedMult

      // Bounce off walls
      if (bug.x - bug.radius < 0) { bug.x = bug.radius; bug.vx = Math.abs(bug.vx) }
      if (bug.x + bug.radius > W) { bug.x = W - bug.radius; bug.vx = -Math.abs(bug.vx) }
      if (bug.y - bug.radius < 0) { bug.y = bug.radius; bug.vy = Math.abs(bug.vy) }
      if (bug.y + bug.radius > H) { bug.y = H - bug.radius; bug.vy = -Math.abs(bug.vy) }
    }

    // Particles
    for (const p of this.state.particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.08  // gravity
      p.life -= delta * 1.8
    }
    this.state.particles = this.state.particles.filter((p) => p.life > 0)

    // Miss markers
    for (const m of this.state.missMarkers) {
      m.life -= delta * 2.5
    }
    this.state.missMarkers = this.state.missMarkers.filter((m) => m.life > 0)

    // Score floats
    for (const s of this.state.scoreFloats) {
      s.y += s.vy
      s.life -= delta * 1.6
    }
    this.state.scoreFloats = this.state.scoreFloats.filter((s) => s.life > 0)

    // Spawn timer
    this.bugSpawnTimer += delta
    if (this.bugSpawnTimer >= this.bugSpawnInterval) {
      this.bugSpawnTimer = 0
      // Reduce interval as game progresses (faster spawns)
      this.bugSpawnInterval = Math.max(0.4, 1.2 - (ROUND_DURATION - this.state.timeLeft) * 0.025)
      this.spawnBug()
    }

    // Emit React state update every ~80ms to avoid too many re-renders
    const now = Date.now()
    if (Math.floor(now / 80) !== Math.floor((now - delta * 1000) / 80)) {
      this.emit()
    }
  }

  // ── Draw ───────────────────────────────────────────────────────────────────

  drawFrame(): void {
    const ctx = this.ctx
    const W = this.canvas.width
    const H = this.canvas.height

    // Background
    ctx.fillStyle = '#16222D'
    ctx.fillRect(0, 0, W, H)

    // Grid overlay (subtle)
    ctx.strokeStyle = 'rgba(141, 180, 196, 0.04)'
    ctx.lineWidth = 1
    const gridStep = 40
    for (let gx = 0; gx < W; gx += gridStep) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke()
    }
    for (let gy = 0; gy < H; gy += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
    }

    // Time bar
    this.drawTimebar(ctx, W, H)

    // Score & combo HUD inside canvas
    this.drawHUD(ctx, W)

    // Bugs
    for (const bug of this.state.bugs) {
      this.drawBug(ctx, bug)
    }

    // Particles
    for (const p of this.state.particles) {
      ctx.save()
      ctx.globalAlpha = p.life
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.rect(p.x - 2, p.y - 2, 4, 4)
      ctx.fill()
      ctx.restore()
    }

    // Miss markers (pixel X)
    for (const m of this.state.missMarkers) {
      ctx.save()
      ctx.globalAlpha = m.life
      ctx.strokeStyle = '#E5534B'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(m.x - 6, m.y - 6); ctx.lineTo(m.x + 6, m.y + 6)
      ctx.moveTo(m.x + 6, m.y - 6); ctx.lineTo(m.x - 6, m.y + 6)
      ctx.stroke()
      ctx.restore()
    }

    // Score floats
    for (const s of this.state.scoreFloats) {
      ctx.save()
      ctx.globalAlpha = s.life
      ctx.fillStyle = this.state.combo >= 3 ? '#F4A93B' : '#E6E0D0'
      ctx.font = `bold 14px 'Pixelify Sans', monospace`
      ctx.textAlign = 'center'
      ctx.fillText(s.text, s.x, s.y)
      ctx.restore()
    }

    // Countdown overlay
    if (this.state.phase === 'countdown') {
      this.drawCountdownOverlay(ctx, W, H)
    }

    // Pause overlay
    if (this.state.phase === 'paused') {
      this.drawPauseOverlay(ctx, W, H)
    }
  }

  private drawTimebar(ctx: CanvasRenderingContext2D, W: number, H: number): void {
    const barH = 6
    const fraction = this.state.timeLeft / ROUND_DURATION
    const isLow = this.state.timeLeft <= 10

    // Track
    ctx.fillStyle = 'rgba(34, 52, 63, 0.8)'
    ctx.fillRect(0, H - barH, W, barH)

    // Fill
    const fillColor = isLow ? '#E5534B' : '#F4A93B'
    ctx.fillStyle = fillColor
    ctx.fillRect(0, H - barH, W * fraction, barH)

    // Pulse overlay when low time
    if (isLow && !this.reducedMotion) {
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 150)
      ctx.fillStyle = `rgba(229, 83, 75, ${pulse * 0.25})`
      ctx.fillRect(0, H - barH, W * fraction, barH)
    }
  }

  private drawHUD(ctx: CanvasRenderingContext2D, W: number): void {
    // Score
    ctx.fillStyle = '#E6E0D0'
    ctx.font = `bold 16px 'Pixelify Sans', monospace`
    ctx.textAlign = 'left'
    ctx.fillText(`${this.state.score}`, 12, 28)

    // Time
    ctx.textAlign = 'center'
    ctx.fillStyle = this.state.timeLeft <= 10 ? '#E5534B' : '#8DB4C4'
    ctx.font = `bold 16px 'Pixelify Sans', monospace`
    ctx.fillText(`${Math.ceil(this.state.timeLeft)}s`, W / 2, 28)

    // Combo
    if (this.state.combo >= 2) {
      ctx.textAlign = 'right'
      ctx.fillStyle = this.state.combo >= 3 ? '#F4A93B' : '#E6E0D0'
      const comboText = this.state.combo >= 3 ? `×2 COMBO ${this.state.combo}` : `COMBO ${this.state.combo}`
      ctx.font = `bold 14px 'Pixelify Sans', monospace`
      ctx.fillText(comboText, W - 12, 28)
    }
  }

  private drawBug(ctx: CanvasRenderingContext2D, bug: Bug): void {
    const colors = BODY_COLORS[bug.size]
    const r = bug.radius
    const wobble = this.reducedMotion ? 0 : Math.sin(bug.wobble) * 1.5

    ctx.save()
    ctx.translate(bug.x, bug.y + wobble)

    // Direction rotation
    const angle = Math.atan2(bug.vy, bug.vx)
    ctx.rotate(angle + Math.PI / 2)

    // Legs (3 on each side)
    ctx.strokeStyle = colors.leg
    ctx.lineWidth = 1.5
    const legLength = r * 0.7
    for (let i = -1; i <= 1; i++) {
      const legY = i * r * 0.4
      // Left leg
      ctx.beginPath()
      ctx.moveTo(-r * 0.6, legY)
      ctx.lineTo(-r * 0.6 - legLength, legY + legLength * 0.5)
      ctx.stroke()
      // Right leg
      ctx.beginPath()
      ctx.moveTo(r * 0.6, legY)
      ctx.lineTo(r * 0.6 + legLength, legY + legLength * 0.5)
      ctx.stroke()
    }

    // Body shell (ellipse)
    ctx.fillStyle = colors.shell
    ctx.beginPath()
    ctx.ellipse(0, 0, r * 0.7, r, 0, 0, Math.PI * 2)
    ctx.fill()

    // Shell stripe
    ctx.strokeStyle = colors.body
    ctx.lineWidth = r * 0.15
    ctx.beginPath()
    ctx.moveTo(0, -r * 0.8)
    ctx.lineTo(0, r * 0.8)
    ctx.stroke()

    // Head
    ctx.fillStyle = colors.body
    ctx.beginPath()
    ctx.arc(0, -r - r * 0.3, r * 0.45, 0, Math.PI * 2)
    ctx.fill()

    // Eyes
    const eyeX = r * 0.22
    const eyeY = -r - r * 0.3
    ctx.fillStyle = colors.eye
    ctx.beginPath()
    ctx.arc(-eyeX, eyeY, r * 0.14, 0, Math.PI * 2)
    ctx.arc(eyeX, eyeY, r * 0.14, 0, Math.PI * 2)
    ctx.fill()

    // Antennae
    ctx.strokeStyle = colors.leg
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(-r * 0.2, -r - r * 0.55)
    ctx.lineTo(-r * 0.45, -r - r * 1.0)
    ctx.moveTo(r * 0.2, -r - r * 0.55)
    ctx.lineTo(r * 0.45, -r - r * 1.0)
    ctx.stroke()

    ctx.restore()
  }

  private drawCountdownOverlay(ctx: CanvasRenderingContext2D, W: number, H: number): void {
    ctx.fillStyle = 'rgba(22, 34, 45, 0.75)'
    ctx.fillRect(0, 0, W, H)

    const n = this.state.countdown
    const size = 96
    ctx.fillStyle = '#F4A93B'
    ctx.font = `bold ${size}px 'Pixelify Sans', monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(n), W / 2, H / 2)

    ctx.font = `bold 18px 'Pixelify Sans', monospace`
    ctx.fillStyle = '#8DB4C4'
    ctx.fillText('Siap...', W / 2, H / 2 + 72)
    ctx.textBaseline = 'alphabetic'
  }

  private drawPauseOverlay(ctx: CanvasRenderingContext2D, W: number, H: number): void {
    ctx.fillStyle = 'rgba(22, 34, 45, 0.82)'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#E6E0D0'
    ctx.font = `bold 36px 'Pixelify Sans', monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('JEDA', W / 2, H / 2)

    ctx.font = `16px 'Pixelify Sans', monospace`
    ctx.fillStyle = '#8DB4C4'
    ctx.fillText('Tekan tombol Lanjut untuk melanjutkan', W / 2, H / 2 + 44)
    ctx.textBaseline = 'alphabetic'
  }

  // ── Emit ───────────────────────────────────────────────────────────────────

  private emit(): void {
    // Shallow-clone so React sees a new reference
    this.onStateChange({ ...this.state })
  }
}
