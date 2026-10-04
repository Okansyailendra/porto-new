import { useState, useEffect } from 'react'
import { projectsData, type ProjectItem } from '../../data/projects'

export function ProjectZone() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(projectsData[0])

  // Support closing detail panel with Esc key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const activeIndex = selectedProject
    ? projectsData.findIndex((p) => p.slug === selectedProject.slug)
    : -1

  return (
    <section
      id="project"
      aria-label="Zona 4 Project"
      className="py-16 md:py-20 border-t border-embun/15 text-left"
    >
      <div className="space-y-8">
        {/* Header Zona */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="font-pixel text-h2 text-tulang leading-tight">
            Peta level project
          </h2>
          <span className="font-body text-small text-embun">
            Empat petualangan sistem yang telah selesai
          </span>
        </div>

        {/* Peta Jalur Level (Horizontal Desktop, Vertikal Mobile) */}
        <div className="p-6 md:p-8 bg-kabut-lembah/60 border border-embun/25 rounded-panel relative select-none">
          {/* Jalur Peta (Track Line) */}
          {/* Garis Horizontal Desktop */}
          <div
            className="hidden md:block absolute top-[68px] left-[10%] right-[10%] h-1 bg-embun/20 -translate-y-1/2"
            aria-hidden="true"
          >
            {/* Garis Terisi sesuai Level Terpilih */}
            {activeIndex >= 0 && (
              <div
                className="h-full bg-lentera transition-all duration-500 ease-out"
                style={{
                  width: `${(activeIndex / (projectsData.length - 1)) * 100}%`
                }}
              />
            )}
          </div>

          {/* Garis Vertikal Mobile */}
          <div
            className="md:hidden absolute top-[40px] bottom-[40px] left-[39px] w-1 bg-embun/20 -translate-x-1/2"
            aria-hidden="true"
          >
            {activeIndex >= 0 && (
              <div
                className="w-full bg-lentera transition-all duration-500 ease-out"
                style={{
                  height: `${(activeIndex / (projectsData.length - 1)) * 100}%`
                }}
              />
            )}
          </div>

          {/* Titik Checkpoint Level */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 relative z-10">
            {projectsData.map((project) => {
              const isSelected = selectedProject?.slug === project.slug
              return (
                <div
                  key={project.slug}
                  className="flex md:flex-col items-center gap-4 md:gap-3 w-full md:w-auto"
                >
                  {/* Titik Level / Tombol Node */}
                  <div className="relative flex flex-col items-center">
                    {/* Sprite Karakter Melangkah di atas Titik Aktif (Desktop) */}
                    {isSelected && (
                      <div
                        className="hidden md:flex absolute -top-10 items-center justify-center animate-bounce"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 16 16" className="w-8 h-8" aria-hidden="true">
                          <path d="M4 2h8v2H4V2z" fill="#F4A93B" />
                          <path d="M5 4h6v4H5V4z" fill="#E6E0D0" />
                          <path d="M6 5h1v1H6V5zm3 0h1v1H9V5z" fill="#16222D" />
                          <path d="M4 8h8v5H4V8z" fill="#6FA36B" />
                          <path d="M4 10h8v1H4v-1z" fill="#F4A93B" />
                          <path d="M4 13h3v2H4v-2zm5 0h3v2H9v-2z" fill="#8DB4C4" />
                        </svg>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className={`relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-pixel text-lg rounded-panel border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-lentera ${
                        isSelected
                          ? 'bg-lentera text-malam-gunung border-lentera shadow-md scale-105'
                          : 'bg-malam-gunung text-tulang border-embun/40 hover:border-embun hover:scale-102'
                      }`}
                      aria-label={`Pilih Level ${project.level}: ${project.name}`}
                      aria-pressed={isSelected}
                    >
                      <span>0{project.level}</span>

                      {/* Indikator Status Selesai */}
                      <span
                        className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-lumut border border-malam-gunung rounded-full"
                        title="Status: Selesai"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Keterangan Titik */}
                  <div className="flex-1 md:text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-left md:text-center group block focus-visible:outline-hidden"
                    >
                      <span className="font-pixel text-xs text-embun/80 block">
                        Level {project.level}
                      </span>
                      <span
                        className={`font-pixel text-base transition-colors ${
                          isSelected ? 'text-lentera' : 'text-tulang group-hover:text-embun'
                        }`}
                      >
                        {project.name}
                      </span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="font-body text-small text-embun mt-6 text-center md:text-left">
            Tekan atau klik titik level untuk membuka dokumen perancangan dan spesifikasi project.
          </p>
        </div>

        {/* Panel Detail Project yang Terpilih */}
        {selectedProject ? (
          <div
            className="p-6 md:p-8 bg-kabut-lembah border border-embun/30 rounded-panel space-y-6 relative transition-all"
            role="region"
            aria-label={`Detail project ${selectedProject.name}`}
          >
            {/* Header Panel */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-embun/20 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-pixel text-xs px-2 py-0.5 border border-embun/30 text-embun rounded-button bg-malam-gunung">
                    Level 0{selectedProject.level}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-lumut/25 text-lumut font-pixel text-xs font-bold border border-lumut/50 rounded-button">
                    <span className="w-1.5 h-1.5 rounded-full bg-lumut" />
                    {selectedProject.status}
                  </span>
                </div>
                <h3 className="font-pixel text-h3 md:text-2xl text-tulang">
                  {selectedProject.name}
                </h3>
                <p className="font-body text-base text-embun">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Tombol Tutup Panel */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="self-start px-3 py-1 text-small font-pixel text-embun hover:text-tulang border border-embun/30 hover:border-embun rounded-button transition-colors focus-visible:outline-2 focus-visible:outline-lentera"
                aria-label="Tutup panel detail (Esc)"
              >
                Tutup (Esc)
              </button>
            </div>

            {/* Deskripsi Lengkap */}
            <div className="space-y-2">
              <span className="font-pixel text-small text-embun block">
                Tentang project
              </span>
              <p className="font-body text-base text-tulang/90 leading-relaxed max-w-[70ch]">
                {selectedProject.description}
              </p>
            </div>

            {/* Rangkaian Teknologi (Tech Stack) */}
            <div className="space-y-2">
              <span className="font-pixel text-small text-embun block">
                Teknologi yang digunakan
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-pixel text-xs px-2.5 py-1 bg-malam-gunung border border-embun/25 text-tulang rounded-button"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tombol Aksi Tautan Eksternal (Sembunyi jika URL Kosong) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Tombol Kode di GitHub */}
              {selectedProject.githubUrl && selectedProject.githubUrl.trim() !== '' && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-malam-gunung border border-embun text-tulang font-pixel text-base rounded-button hover:border-lentera hover:text-lentera active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M12 2A10 10 0 002 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5A10 10 0 0012 2z" />
                  </svg>
                  <span>Kode di GitHub</span>
                </a>
              )}

              {/* Tombol Buka Website */}
              {selectedProject.liveUrl && selectedProject.liveUrl.trim() !== '' && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-lentera text-malam-gunung font-pixel text-base font-semibold rounded-button shadow-xs hover:brightness-105 active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  <span>Buka website</span>
                </a>
              )}

              {/* Jika kedua tautan belum diisi */}
              {(!selectedProject.githubUrl || selectedProject.githubUrl.trim() === '') &&
                (!selectedProject.liveUrl || selectedProject.liveUrl.trim() === '') && (
                  <p className="font-body text-small text-embun italic">
                    Tautan publik project ini belum dipublikasikan atau masih berstatus privat.
                  </p>
                )}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-kabut-lembah/40 border border-embun/20 rounded-panel text-center text-embun">
            <p className="font-body text-small">
              Pilih salah satu level pada peta untuk membaca ringkasan teknis dan arsitektur project.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
