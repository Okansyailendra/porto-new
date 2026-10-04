import { useState } from 'react'
import { skillsData, type SkillCategory, type SkillItem } from '../../data/skills'

const categories: SkillCategory[] = [
  'Semua',
  'Frontend',
  'Game',
  'Backend dan data',
  'Keamanan siber'
]

export function SkillsZone() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Semua')
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null)

  const filteredSkills = selectedCategory === 'Semua'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory)

  function handleSlotClick(skill: SkillItem) {
    if (activeSkill?.id === skill.id) {
      setActiveSkill(null) // toggle close
    } else {
      setActiveSkill(skill)
    }
  }

  return (
    <section
      id="keahlian"
      aria-label="Zona 2 Keahlian"
      className="py-16 md:py-20 border-t border-embun/15 text-left"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-pixel text-h2 text-tulang leading-tight">
            Keahlian
          </h2>

          {/* Filter Tab Kategori */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 bg-kabut-lembah/80 border border-embun/20 rounded-panel"
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
                  onClick={() => {
                    setSelectedCategory(category)
                    setActiveSkill(null)
                  }}
                  className={`px-3 py-1 font-pixel text-small rounded-button transition-colors ${
                    isSelected
                      ? 'bg-malam-gunung text-lentera border border-lentera/40 shadow-xs'
                      : 'text-embun hover:text-tulang'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Konten Grid Inventory + Panel Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Grid Inventory Slots (col-span 7 atau 8) */}
          <div className="lg:col-span-7 bg-kabut-lembah/60 border border-embun/20 p-4 rounded-panel">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {filteredSkills.map((skill) => {
                const isActive = activeSkill?.id === skill.id
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleSlotClick(skill)}
                    onMouseEnter={() => setActiveSkill(skill)}
                    className={`group aspect-square p-2 flex flex-col items-center justify-between border rounded-panel transition-all focus-visible:outline-2 focus-visible:outline-lentera ${
                      isActive
                        ? 'border-lentera bg-malam-gunung shadow-xs ring-1 ring-lentera'
                        : 'border-embun/30 bg-malam-gunung/50 hover:border-embun hover:bg-malam-gunung'
                    }`}
                    aria-label={`Slot keahlian ${skill.name}. Level ${skill.level} dari 5`}
                  >
                    {/* Badge Ikon — gambar SVG jika ada, fallback ke teks */}
                    <div className="w-8 h-8 flex items-center justify-center border border-embun/20 bg-kabut-lembah rounded-button overflow-hidden">
                      {skill.iconUrl ? (
                        <img
                          src={skill.iconUrl}
                          alt=""
                          aria-hidden="true"
                          className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <span className="font-pixel text-small text-lentera group-hover:scale-105 transition-transform">
                          {skill.iconText}
                        </span>
                      )}
                    </div>

                    {/* Nama Keahlian */}
                    <span className="font-body text-[11px] leading-tight text-center text-tulang/90 line-clamp-2">
                      {skill.name}
                    </span>

                    {/* Titik Level Ringkas */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`w-1 h-1 ${
                            lvl <= skill.level ? 'bg-lumut' : 'bg-embun/20'
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
            <p className="font-body text-small text-embun mt-3 text-center sm:text-left">
              Arahkan kursor atau klik slot untuk membaca rincian level keahlian.
            </p>
          </div>

          {/* Panel Detail (col-span 5) */}
          <div className="lg:col-span-5 bg-kabut-lembah border border-embun/30 p-5 rounded-panel min-h-[220px] flex flex-col justify-between">
            {activeSkill ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-embun/20 pb-3">
                  <div>
                    <span className="font-pixel text-small text-embun block">
                      {activeSkill.category}
                    </span>
                    <h3 className="font-pixel text-h3 text-tulang">
                      {activeSkill.name}
                    </h3>
                  </div>
                  <span className="font-pixel text-small px-2 py-0.5 border border-lentera/40 text-lentera bg-malam-gunung rounded-button">
                    Lv. {activeSkill.level}/5
                  </span>
                </div>

                {/* Level Bar Bergaya Game Segmen */}
                <div>
                  <div className="flex justify-between items-center text-small font-pixel text-embun mb-1.5">
                    <span>Kemahiran</span>
                    <span>Level {activeSkill.level} dari 5</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 h-3 bg-malam-gunung p-1 border border-embun/30 rounded-button">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-full transition-colors duration-200 ${
                          lvl <= activeSkill.level
                            ? activeSkill.level === 5
                              ? 'bg-lentera'
                              : 'bg-lumut'
                            : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <span className="font-pixel text-small text-embun block mb-1">
                    Deskripsi
                  </span>
                  <p className="font-body text-base text-tulang leading-relaxed">
                    {activeSkill.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-embun">
                <div className="w-10 h-10 border border-dashed border-embun/40 flex items-center justify-center rounded-button">
                  <span className="font-pixel text-lg">?</span>
                </div>
                <p className="font-pixel text-base text-tulang">
                  Slot belum dipilih
                </p>
                <p className="font-body text-small text-embun">
                  Pilih salah satu slot di inventori untuk memeriksa status kemahiran dan deskripsi kemampuan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
