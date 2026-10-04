import { useState } from 'react'
import { techStackData } from '../../data/techStack'
import { TechIcon } from './TechIcon'

export function TechStackZone() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <section
      id="tech-stack"
      aria-label="Zona 3 Tech stack"
      className="py-16 md:py-20 border-t border-embun/15 text-left"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="font-pixel text-h2 text-tulang leading-tight">
            Tech stack
          </h2>
          <span className="font-body text-small text-embun">
            12 perangkat lunak dan bahasa utama
          </span>
        </div>

        {/* Baris Slot Hotbar 12 Item */}
        <div
          className="p-3 bg-kabut-lembah/70 border border-embun/25 rounded-panel overflow-x-auto"
          role="region"
          aria-label="Daftar teknologi dalam format hotbar slot"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 min-w-[680px] lg:min-w-0">
            {techStackData.map((tech) => {
              const isHovered = hoveredTech === tech.id
              return (
                <div
                  key={tech.id}
                  tabIndex={0}
                  onMouseEnter={() => setHoveredTech(tech.id)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onFocus={() => setHoveredTech(tech.id)}
                  onBlur={() => setHoveredTech(null)}
                  className="group relative flex flex-col items-center justify-between p-3 aspect-square bg-malam-gunung/70 border border-embun/20 rounded-panel transition-all duration-120 hover:-translate-y-[2px] focus-visible:-translate-y-[2px] hover:border-embun focus-visible:border-lentera focus-visible:outline-hidden cursor-default select-none"
                  aria-label={tech.name}
                >
                  {/* Ikon: Monokrom Embun secara bawaan, berwarna saat hover */}
                  <div
                    className="w-7 h-7 flex items-center justify-center transition-colors duration-120"
                    style={{
                      color: isHovered ? tech.color : '#8DB4C4'
                    }}
                  >
                    <TechIcon id={tech.id} className="w-6 h-6" />
                  </div>

                  {/* Label Nama Teknologi */}
                  <span
                    className={`font-pixel text-[11px] leading-tight text-center transition-colors duration-120 truncate w-full ${
                      isHovered ? 'text-tulang' : 'text-embun/80'
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
