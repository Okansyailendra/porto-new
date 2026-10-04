import { useState, useRef } from 'react'

interface HeroZoneProps {
  onExploreProjects?: () => void
  onPlayGame?: () => void
}

interface Spark {
  id: number
  x: number
  y: number
}

export function HeroZone({ onExploreProjects, onPlayGame }: HeroZoneProps) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [sparks, setSparks] = useState<Spark[]>([])
  const illustrationRef = useRef<HTMLDivElement>(null)

  function handleScroll(targetId: string) {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Parallax tracking inside the illustration card (design.md 6.3)
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!illustrationRef.current) return
    const rect = illustrationRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    setParallax({
      x: relX * 12, // max 12px per design.md 6.3
      y: relY * 8
    })
  }

  function handleMouseLeave() {
    setParallax({ x: 0, y: 0 })
  }

  // Shoot interaction on campsite illustration (design.md 6.3)
  function handleCampClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!illustrationRef.current) return
    const rect = illustrationRef.current.getBoundingClientRect()
    const sparkX = e.clientX - rect.left
    const sparkY = e.clientY - rect.top

    const newSpark: Spark = { id: Date.now(), x: sparkX, y: sparkY }
    setSparks((prev) => [...prev.slice(-4), newSpark])

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== newSpark.id))
    }, 400)
  }

  return (
    <section
      id="hero"
      aria-label="Zona pembuka — Halo, saya Okan"
      className="pt-10 pb-16 md:pt-16 md:pb-24 flex flex-col lg:flex-row items-center justify-between gap-10 relative"
    >
      {/* Kolom Teks Kiri */}
      <div className="flex-1 text-left space-y-6">
        <h1 className="font-pixel text-4xl sm:text-5xl lg:text-display text-tulang leading-tight">
          Halo, saya <span className="text-lentera">Okan</span>.
        </h1>

        <p className="font-body text-base sm:text-lg md:text-xl text-tulang/90 max-w-[54ch] leading-relaxed">
          Saya membuat antarmuka web dan game kecil. Saya juga mendalami keamanan siber di Komunitas Koalisi.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={onPlayGame ? onPlayGame : () => handleScroll('arcade')}
            className="px-6 py-3 bg-lentera text-malam-gunung font-pixel text-base font-semibold rounded-button shadow-md hover:brightness-105 active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera focus-visible:outline-offset-2 flex items-center gap-2 cursor-pointer"
          >
            <span>🎯</span>
            <span>Main Bug Hunt</span>
          </button>

          <button
            type="button"
            onClick={onExploreProjects ? onExploreProjects : () => handleScroll('project')}
            className="px-6 py-3 border border-embun text-tulang font-pixel text-base rounded-button hover:border-lentera hover:text-lentera active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera focus-visible:outline-offset-2 flex items-center gap-2 cursor-pointer"
          >
            <span>🗺️</span>
            <span>Lihat project</span>
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Ilustrasi Pixel Art Kemah Malam Pegunungan Interaktif */}
      <div
        ref={illustrationRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCampClick}
        className="w-full lg:w-[480px] aspect-4/3 relative bg-malam-gunung border border-embun/30 rounded-panel overflow-hidden shadow-2xl flex items-center justify-center select-none cursor-crosshair group"
        aria-label="Ilustrasi interaktif perkemahan malam pegunungan. Klik untuk menembakkan partikel."
        title="Klik di perkemahan untuk menembak!"
      >
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full block"
          shapeRendering="crispEdges"
        >
          {/* Langit malam gelap */}
          <rect width="400" height="300" fill="#16222D" />

          {/* Bintang-bintang malam (statis) */}
          <rect x="40" y="30" width="2" height="2" fill="#E6E0D0" opacity="0.8" />
          <rect x="85" y="55" width="3" height="3" fill="#F4A93B" opacity="0.9" />
          <rect x="130" y="25" width="2" height="2" fill="#8DB4C4" opacity="0.7" />
          <rect x="190" y="45" width="2" height="2" fill="#E6E0D0" opacity="0.6" />
          <rect x="250" y="20" width="3" height="3" fill="#FFE28A" opacity="0.9" />
          <rect x="310" y="60" width="2" height="2" fill="#E6E0D0" opacity="0.7" />
          <rect x="360" y="35" width="2" height="2" fill="#8DB4C4" opacity="0.8" />
          <rect x="160" y="80" width="2" height="2" fill="#E6E0D0" opacity="0.5" />
          <rect x="280" y="75" width="2" height="2" fill="#F4A93B" opacity="0.6" />

          {/* Siluet Pegunungan Jauh (Layer 1 - gerak pelan) */}
          <g
            style={{
              transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            <polygon
              points="0,220 80,140 180,210 260,130 350,220 400,180 400,300 0,300"
              fill="#1E2F3E"
            />
          </g>

          {/* Siluet Pohon Pinus Gelap (Layer 2 - gerak sedang) */}
          <g
            style={{
              transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            {/* Pohon 1 */}
            <polygon points="30,240 15,260 45,260" fill="#152430" />
            <polygon points="30,230 18,245 42,245" fill="#152430" />
            <polygon points="30,218 22,232 38,232" fill="#152430" />
            {/* Pohon 2 */}
            <polygon points="65,235 48,255 82,255" fill="#182A38" />
            <polygon points="65,222 52,240 78,240" fill="#182A38" />
            <polygon points="65,210 56,225 74,225" fill="#182A38" />
            {/* Pohon 3 Kanan */}
            <polygon points="340,235 320,260 360,260" fill="#182A38" />
            <polygon points="340,220 325,240 355,240" fill="#182A38" />
            <polygon points="340,208 330,223 350,223" fill="#182A38" />
            {/* Pohon 4 Kanan */}
            <polygon points="375,240 360,260 390,260" fill="#152430" />
            <polygon points="375,228 364,242 386,242" fill="#152430" />
          </g>

          {/* Tanah Depan & Tenda (Layer 3 - gerak responsif penuh) */}
          <g
            style={{
              transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
              transition: 'transform 100ms ease-out'
            }}
          >
            {/* Tanah Depan */}
            <rect x="0" y="248" width="400" height="52" fill="#0F1820" />
            <rect x="0" y="246" width="400" height="2" fill="#22343F" />

            {/* Tenda Berkemah (Tent) */}
            <polygon points="170,165 110,250 230,250" fill="#22343F" />
            <line x1="170" y1="165" x2="170" y2="250" stroke="#8DB4C4" strokeWidth="2" />
            <polygon points="170,185 145,250 195,250" fill="#16222D" />
            <polygon points="170,195 155,250 185,250" fill="#F4A93B" opacity="0.85" />
            <line x1="170" y1="165" x2="90" y2="255" stroke="#8DB4C4" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="170" y1="165" x2="250" y2="255" stroke="#8DB4C4" strokeWidth="1" strokeDasharray="3,3" />

            {/* Tiang Lentera Luar */}
            <rect x="255" y="180" width="3" height="70" fill="#8DB4C4" />
            <rect x="255" y="180" width="16" height="3" fill="#8DB4C4" />
            <rect x="268" y="183" width="2" height="6" fill="#8DB4C4" />

            {/* Lentera Berpendar dengan Animasi Berkedip Pelan */}
            <circle
              cx="269"
              cy="198"
              r="24"
              fill="#F4A93B"
              className="animate-pulse"
              style={{ animationDuration: '2.5s', opacity: 0.22 }}
            />
            <rect x="264" y="189" width="10" height="15" fill="#22343F" stroke="#8DB4C4" strokeWidth="1" />
            <rect x="266" y="192" width="6" height="9" fill="#F4A93B" />
            <rect x="267" y="194" width="4" height="5" fill="#FFE28A" />

            {/* Kotak Petunjuk Kayu di Dekat Tenda */}
            <rect x="285" y="215" width="28" height="18" fill="#3A281A" stroke="#8DB4C4" strokeWidth="1" />
            <rect x="297" y="233" width="4" height="20" fill="#2A1B10" />
            <text x="299" y="228" fill="#F4A93B" fontSize="9" fontFamily="'Pixelify Sans', monospace" textAnchor="middle">
              KAN
            </text>
          </g>
        </svg>

        {/* Hit Sparks on Click */}
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{ left: `${spark.x}px`, top: `${spark.y}px` }}
          >
            <span className="font-pixel text-xs text-lentera font-bold">✦ HIT</span>
          </div>
        ))}

        {/* Indikator Live Petualangan */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-malam-gunung/90 border border-embun/30 rounded-button font-pixel text-[11px] text-lentera">
          Parallax Aktif · Tembak di Layar
        </div>
      </div>
    </section>
  )
}
