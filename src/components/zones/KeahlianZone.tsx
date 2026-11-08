import { useState } from 'react'
import { skillsData, type SkillCategory, type SkillItem } from '../../data/skills'
import { techStackData } from '../../data/techStack'

const categories: SkillCategory[] = [
  'Semua',
  'Full Stack',
  'UI/UX',
  'Backend dan data',
  'Keamanan siber'
]

const TECH_SVG: Record<string, string> = {
  react: '/material-icon-theme--react.svg',
  tailwind: '/devicon--tailwindcss.svg',
  html: '/skill-icons--html.svg',
  css: '/skill-icons--css.svg',
  figma: '/logos--figma.svg',
  php: '/material-icon-theme--php.svg',
  laravel: '/material-icon-theme--laravel.svg',
  mysql: '/logos--mysql.svg',
  postgresql: '/logos--postgresql.svg',
  node: '/material-icon-theme--nodejs.svg',
  ts: '/devicon--typescript.svg',
  js: '/skill-icons--javascript.svg',
  python: '/material-icon-theme--python.svg',
  github: '/mdi--github.svg',
}

const TECH_DESC: Record<string, string> = {
  react: 'Antarmuka Komponen & Hook',
  tailwind: 'Desain Utilitas Terstruktur',
  html: 'Semantik Web & Aksesibilitas',
  css: 'Layout Modern & Styling Responsif',
  figma: 'Perancangan Antarmuka & UX',
  php: 'Backend Web Scripting',
  laravel: 'Arsitektur MVC Modern',
  mysql: 'Manajemen Data Relasional',
  postgresql: 'Basis Data Relasional Tingkat Lanjut',
  node: 'Runtime Server & REST API',
  ts: 'Pengetikan Statis Skala Besar',
  js: 'Bahasa Utama Web & DOM',
  python: 'Otomasi & Pengolahan Data',
  github: 'Kolaborasi & Version Control',
}

export function KeahlianZone() {
  const [activeTab, setActiveTab] = useState<'skills' | 'tools'>('skills')
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Semua')
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(skillsData[0])
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredSkills = selectedCategory === 'Semua'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory)

  return (
    <section
      id="keahlian"
      aria-label="Zona Keahlian dan Kemahiran Teknis"
      className="min-h-[100dvh] flex flex-col justify-center py-16 lg:py-24 border-t border-[#E8E4DC] relative text-left"
    >
      <div className="space-y-8 sm:space-y-10 lg:space-y-12 w-full max-w-[1750px] mx-auto">
        {/* Header Zona & Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#182538] tracking-tight">
              Keahlian &amp; Teknologi
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#576A7E]">
              Spektrum kemampuan teknis dari full stack development, perancangan UI/UX, hingga arsitektur keamanan web.
            </p>
          </div>

          {/* Toggle Switcher Kapsul */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#E8E4DC] rounded-full shadow-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-[#145E55] text-white shadow-xs'
                  : 'text-[#576A7E] hover:text-[#182538] hover:bg-[#FAF8F5]'
              }`}
            >
              Matriks Keahlian
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tools')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-[#145E55] text-white shadow-xs'
                  : 'text-[#576A7E] hover:text-[#182538] hover:bg-[#FAF8F5]'
              }`}
            >
              Alat &amp; Bahasa
            </button>
          </div>
        </div>

        {/* Tab 1: Matriks Keahlian */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter Pills Kategori */}
            <div
              className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-[#E8E4DC] rounded-full shadow-xs w-fit"
              role="tablist"
              aria-label="Filter kategori keahlian"
            >
              {categories.map((category) => {
                const isSelected = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#145E55] text-white shadow-xs'
                        : 'text-[#576A7E] hover:text-[#182538] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            {/* Grid Kartu Keahlian + Panel Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
              <div className="lg:col-span-7 bg-white border border-[#E8E4DC] p-5 sm:p-7 rounded-3xl shadow-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {filteredSkills.map((skill) => {
                    const isActive = activeSkill?.id === skill.id
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setActiveSkill(skill)}
                        onMouseEnter={() => setActiveSkill(skill)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 sm:h-32 ${
                          isActive
                            ? 'border-[#145E55] bg-[#E9F4F2] shadow-sm ring-2 ring-[#145E55]/30'
                            : 'border-[#E8E4DC] bg-[#FAF8F5]/60 hover:border-[#145E55]/50 hover:bg-white hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                            {skill.iconUrl ? (
                              <img
                                src={skill.iconUrl}
                                alt=""
                                aria-hidden="true"
                                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                              />
                            ) : (
                              <span className="font-bold text-xs text-[#145E55]">
                                {skill.iconText}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] sm:text-xs font-black text-[#8E9EAF]">
                            Lv.{skill.level}
                          </span>
                        </div>

                        <div>
                          <span className="text-xs sm:text-sm font-black text-[#132238] block line-clamp-1">
                            {skill.name}
                          </span>
                          <div className="flex gap-1 mt-1.5">
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <span
                                key={lvl}
                                className={`h-1.5 flex-1 rounded-full ${
                                  lvl <= skill.level ? 'bg-[#145E55]' : 'bg-[#E8E4DC]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Panel Detail Preview Kanan */}
              <div className="lg:col-span-5 bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-3xl shadow-sm min-h-[340px] sm:min-h-[380px] flex flex-col justify-between space-y-6">
                {activeSkill && (
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3 border-b border-[#E8E4DC] pb-4">
                      <div>
                        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#EA5938] block">
                          {activeSkill.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#132238] mt-1">
                          {activeSkill.name}
                        </h3>
                      </div>
                      <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-[#E9F4F2] text-[#145E55] rounded-full border border-[#145E55]/20">
                        Lv.{activeSkill.level}/5
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-[#576A7E]">
                        <span>Tingkat Kemahiran</span>
                        <span>{activeSkill.level * 20}%</span>
                      </div>
                      <div className="h-2.5 bg-[#FAF8F5] rounded-full overflow-hidden p-0.5 border border-[#E8E4DC]">
                        <div
                          className="h-full bg-[#145E55] rounded-full transition-all duration-500"
                          style={{ width: `${activeSkill.level * 20}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#8E9EAF]">
                        Deskripsi &amp; Penggunaan
                      </span>
                      <p className="text-sm sm:text-base text-[#576A7E] leading-relaxed">
                        {activeSkill.description}
                      </p>
                    </div>
                  </div>
                )}
                <p className="text-xs text-[#8E9EAF] italic pt-3 border-t border-[#E8E4DC]">
                  Arahkan kursor atau sentuh slot keahlian untuk memeriksa detail pengalaman teknis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Alat & Teknologi Bento Grid */}
        {activeTab === 'tools' && (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {techStackData.map((tech) => {
                const svgUrl = TECH_SVG[tech.id]
                const desc = TECH_DESC[tech.id] || ''
                const isHovered = hoveredId === tech.id

                return (
                  <div
                    key={tech.id}
                    onMouseEnter={() => setHoveredId(tech.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`bg-white p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between h-36 sm:h-40 relative select-none ${
                      isHovered
                        ? 'border-[#145E55]/40 shadow-xl -translate-y-1.5 ring-2 ring-[#145E55]/15'
                        : 'border-[#E8E4DC] shadow-xs hover:border-[#145E55]/30'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center p-2">
                      {svgUrl ? (
                        <img
                          src={svgUrl}
                          alt={tech.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="font-black text-sm text-[#132238]">
                          {tech.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-black text-[#132238]">
                        {tech.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#8E9EAF] line-clamp-1 leading-snug">
                        {desc}
                      </p>
                    </div>

                    <div
                      className="absolute bottom-0 inset-x-5 h-1 rounded-full opacity-60"
                      style={{ backgroundColor: tech.color }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
