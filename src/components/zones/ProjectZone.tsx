import { useState } from 'react'
import { projectsData, type ProjectItem } from '../../data/projects'

export function ProjectZone() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const cardThemes = [
    {
      bg: 'bg-[#F4A723]',
      text: 'text-white',
      accent: 'text-amber-100',
      category: 'Web App & Finance',
      previewBg: 'bg-white text-[#132238]'
    },
    {
      bg: 'bg-[#145E55]',
      text: 'text-white',
      accent: 'text-emerald-100',
      category: 'Healthcare System',
      previewBg: 'bg-white text-[#132238]'
    },
    {
      bg: 'bg-[#EA5C38]',
      text: 'text-white',
      accent: 'text-orange-100',
      category: 'Hospitality & Booking',
      previewBg: 'bg-white text-[#132238]'
    },
    {
      bg: 'bg-[#2B4A5A]',
      text: 'text-white',
      accent: 'text-slate-200',
      category: 'Enterprise ERP',
      previewBg: 'bg-white text-[#132238]'
    }
  ]

  return (
    <section
      id="project"
      aria-label="Zona Project — My Latest Works"
      className="min-h-[100dvh] flex flex-col justify-center py-16 lg:py-24 border-t border-[#E8E4DC] relative"
    >
      <div className="space-y-8 sm:space-y-10 lg:space-y-12 w-full max-w-[1750px] mx-auto">
        {/* Header Zona persis di foto referensi */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#182538] tracking-tight">
              My Latest Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#576A7E]">
              Solusi digital dan aplikasi web pilihan yang telah saya rancang dan bangun.
            </p>
          </div>

          <a
            href="https://github.com/Okansyailendra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base lg:text-lg font-bold text-[#EA5938] hover:underline underline-offset-4 flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Explore More Works</span>
            <span className="text-lg">→</span>
          </a>
        </div>

        {/* Galeri Kartu Horizontal / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {projectsData.map((project, idx) => {
            const theme = cardThemes[idx % cardThemes.length]
            return (
              <div
                key={project.slug}
                onClick={() => setSelectedProject(project)}
                className={`group relative ${theme.bg} rounded-3xl p-6 sm:p-7 lg:p-8 h-[480px] sm:h-[510px] lg:h-[540px] xl:h-[570px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer select-none`}
              >
                {/* Header Kartu */}
                <div className="space-y-1.5 text-left relative z-10">
                  <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider ${theme.accent} block`}>
                    {theme.category}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black ${theme.text} tracking-tight`}>
                    {project.name}
                  </h3>
                  <p className={`text-xs sm:text-sm ${theme.accent} line-clamp-1`}>
                    {project.tagline}
                  </p>
                </div>

                {/* Mockup Preview UI di Dalam Kartu seperti pada foto */}
                <div className="relative w-full h-[270px] sm:h-[290px] lg:h-[310px] xl:h-[330px] mt-2 flex items-end justify-center">
                  <div
                    className={`w-[94%] h-[260px] sm:h-[280px] lg:h-[300px] xl:h-[320px] ${theme.previewBg} rounded-2xl p-4 sm:p-5 shadow-xl transform group-hover:scale-103 group-hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between border border-black/5`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-[#8E9EAF] uppercase tracking-wider">
                          0{project.level}
                        </span>
                      </div>
                      <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                      <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                    </div>

                    <div className="bg-[#FAF8F5] p-3 sm:p-3.5 rounded-xl border border-[#E8E4DC]/60 text-left space-y-1">
                      <span className="text-xs sm:text-sm font-black text-[#132238] block line-clamp-1">
                        {project.name} UI System
                      </span>
                      <p className="text-[11px] sm:text-xs text-[#576A7E] line-clamp-2 sm:line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((st) => (
                        <span
                          key={st}
                          className="text-[9px] sm:text-[10px] font-bold px-2 py-1 bg-[#FAF8F5] text-[#132238] rounded-md border border-[#E8E4DC]"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Trigger hint */}
                <div className="flex justify-between items-center relative z-10 pt-1">
                  <span className={`text-[10px] font-bold ${theme.accent}`}>
                    Klik untuk detail
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs group-hover:bg-white group-hover:text-[#132238] transition-colors">
                    ↗
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal Detail Project */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8E4DC] space-y-6 relative animate-in zoom-in-95 duration-200 text-left">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] text-[#132238] hover:bg-[#EA5C38] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup detail modal"
              >
                ✕
              </button>

              <div className="space-y-2 pr-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#145E55] px-3 py-1 bg-[#E9F4F2] rounded-full inline-block">
                  Level 0{selectedProject.level} · {selectedProject.status}
                </span>
                <h3 id="modal-title" className="text-2xl sm:text-3xl font-black text-[#132238]">
                  {selectedProject.name}
                </h3>
                <p className="text-sm font-semibold text-[#576A7E]">
                  {selectedProject.tagline}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E9EAF]">
                  Tentang Project
                </h4>
                <p className="text-sm sm:text-base text-[#132238] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E9EAF]">
                  Teknologi yang Digunakan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1 bg-[#FAF8F5] border border-[#E8E4DC] text-[#132238] rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E4DC] flex flex-wrap items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#132238] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-black transition-colors"
                  >
                    Lihat Kode GitHub
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#145E55] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-[#0E443E] transition-colors"
                  >
                    Buka Website
                  </a>
                )}
                {!selectedProject.githubUrl && !selectedProject.liveUrl && (
                  <p className="text-xs text-[#8E9EAF] italic">
                    Tautan repositori publik belum dipublikasikan atau masih berstatus privat.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
