import { useState } from 'react'
import { techStackData } from '../../data/techStack'

// Map tech id ke SVG file di /public (pakai yang sudah ada)
const TECH_SVG: Record<string, string> = {
  js: '/skill-icons--javascript.svg',
  ts: '/devicon--typescript.svg',
  html: '/skill-icons--html.svg',
  react: '/material-icon-theme--react.svg',
  node: '/material-icon-theme--nodejs.svg',
  tailwind: '/devicon--tailwindcss.svg',
  php: '/material-icon-theme--php.svg',
  laravel: '/material-icon-theme--laravel.svg',
  mysql: '/logos--mysql.svg',
  python: '/material-icon-theme--python.svg',
  figma: '/logos--figma.svg',
  github: '/mdi--github.svg',
}

// Tata letak bento: setiap tech dapat "span" berbeda untuk variasi visual
const BENTO_SPANS: Record<string, string> = {
  js:      'col-span-2 row-span-2', // hero slot
  ts:      'col-span-1 row-span-1',
  html:    'col-span-1 row-span-1',
  react:   'col-span-2 row-span-1', // wide
  node:    'col-span-1 row-span-1',
  tailwind:'col-span-1 row-span-2', // tall
  php:     'col-span-1 row-span-1',
  laravel: 'col-span-2 row-span-1', // wide
  mysql:   'col-span-1 row-span-1',
  python:  'col-span-1 row-span-1',
  figma:   'col-span-1 row-span-1',
  github:  'col-span-2 row-span-1', // wide
}

// Deskripsi singkat per teknologi
const TECH_DESC: Record<string, string> = {
  js: 'Bahasa utama web',
  ts: 'Tipe statis',
  html: 'Struktur semantik',
  react: 'UI berbasis komponen',
  node: 'Runtime server',
  tailwind: 'Utility-first CSS',
  php: 'Backend scripting',
  laravel: 'Framework PHP',
  mysql: 'Database relasional',
  python: 'Scripting & data',
  figma: 'Desain & prototipe',
  github: 'Version control',
}

export function TechStackZone() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      id="tech-stack"
      aria-label="Zona 3 Tech stack"
      className="py-16 md:py-20 border-t border-embun/15"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="font-pixel text-h2 text-tulang leading-tight">
            Tech stack
          </h2>
          <span className="font-body text-small text-embun">
            {techStackData.length} perangkat &amp; bahasa utama
          </span>
        </div>

        {/* Bento Grid — Desktop */}
        <div
          className="hidden md:grid gap-2"
          style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '90px' }}
          role="list"
          aria-label="Daftar teknologi"
        >
          {techStackData.map((tech) => {
            const svgUrl = TECH_SVG[tech.id]
            const span = BENTO_SPANS[tech.id] || 'col-span-1 row-span-1'
            const desc = TECH_DESC[tech.id] || ''
            const isHovered = hoveredId === tech.id
            const isLarge = span.includes('row-span-2') || span.includes('col-span-2 row-span-2')

            return (
              <div
                key={tech.id}
                role="listitem"
                onMouseEnter={() => setHoveredId(tech.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(tech.id)}
                onBlur={() => setHoveredId(null)}
                tabIndex={0}
                aria-label={`${tech.name} — ${desc}`}
                className={`${span} relative group overflow-hidden rounded-panel border cursor-default select-none transition-all duration-200 focus-visible:outline-2 focus-visible:outline-lentera ${
                  isHovered
                    ? 'border-embun/60 bg-kabut-lembah shadow-lg scale-[1.02] -translate-y-0.5'
                    : 'border-embun/20 bg-kabut-lembah/50'
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 0 18px 2px ${tech.color}22, inset 0 0 0 1px ${tech.color}33`
                    : undefined
                }}
              >
                {/* Subtle color bleed background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${tech.color}18 0%, transparent 70%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 ${isLarge ? 'w-12 h-12' : 'w-8 h-8'}`}>
                    {svgUrl ? (
                      <img
                        src={svgUrl}
                        alt=""
                        aria-hidden="true"
                        className={`w-full h-full object-contain transition-all duration-200 ${
                          isHovered ? 'opacity-100 scale-110' : 'opacity-60 grayscale'
                        }`}
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-button flex items-center justify-center border border-embun/20 bg-malam-gunung/60"
                        style={{ color: isHovered ? tech.color : '#8DB4C4' }}
                      >
                        <span className="font-pixel text-xs">{tech.name.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>

                  {/* Labels */}
                  <div>
                    <p className={`font-pixel leading-none transition-colors duration-200 ${
                      isLarge ? 'text-sm' : 'text-[11px]'
                    } ${isHovered ? 'text-tulang' : 'text-embun/80'}`}>
                      {tech.name}
                    </p>
                    {isLarge && (
                      <p className={`font-body text-[10px] mt-0.5 transition-colors duration-200 ${
                        isHovered ? 'text-embun' : 'text-embun/40'
                      }`}>
                        {desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom color strip */}
                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 transition-opacity duration-200"
                  style={{
                    background: tech.color,
                    opacity: isHovered ? 0.7 : 0.15
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Mobile: scroll horizontal baris */}
        <div
          className="md:hidden flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
          role="list"
          aria-label="Daftar teknologi — geser untuk melihat semua"
        >
          {techStackData.map((tech) => {
            const svgUrl = TECH_SVG[tech.id]
            const isHovered = hoveredId === tech.id

            return (
              <div
                key={tech.id}
                role="listitem"
                onFocus={() => setHoveredId(tech.id)}
                onBlur={() => setHoveredId(null)}
                tabIndex={0}
                aria-label={`${tech.name}`}
                className="snap-start flex-shrink-0 w-20 h-20 relative rounded-panel border border-embun/20 bg-kabut-lembah/50 flex flex-col items-center justify-center gap-1.5 p-2 focus-visible:outline-2 focus-visible:outline-lentera"
              >
                {svgUrl ? (
                  <img
                    src={svgUrl}
                    alt=""
                    aria-hidden="true"
                    className="w-8 h-8 object-contain opacity-70"
                  />
                ) : (
                  <span className="font-pixel text-xs text-embun">{tech.name.slice(0, 2).toUpperCase()}</span>
                )}
                <p className="font-pixel text-[9px] text-embun/70 text-center leading-tight line-clamp-2">
                  {tech.name}
                </p>
                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-panel opacity-40"
                  style={{ background: tech.color }}
                />
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <p className="font-body text-small text-embun/50 text-center">
          Arahkan kursor ke tile untuk melihat detail teknologi.
        </p>
      </div>
    </section>
  )
}
