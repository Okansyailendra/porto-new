import { useState } from 'react'
import { profileData } from '../../data/profile'

interface ProfileZoneProps {
  hasMasterHunterBadge?: boolean
}

export function ProfileZone({ hasMasterHunterBadge = false }: ProfileZoneProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  function toggleFlip() {
    setIsFlipped((prev) => !prev)
  }

  return (
    <section
      id="profil"
      aria-label="Zona 1 Profil"
      className="py-16 md:py-20 border-t border-embun/15 text-left"
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {/* Kolom Kiri: Kartu ID Bergaya Pass Game (Bisa Dibalik) */}
        <div className="w-full sm:w-[320px] shrink-0 mx-auto lg:mx-0">
          <div
            tabIndex={0}
            role="button"
            aria-label="Kartu pass game Okan. Klik atau tekan Enter untuk membalik sisi kartu"
            aria-expanded={isFlipped}
            onClick={toggleFlip}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleFlip()
              }
            }}
            className="group relative w-full h-[380px] cursor-pointer focus-visible:outline-2 focus-visible:outline-lentera rounded-panel select-none [perspective:1000px]"
          >
            <div
              className={`relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d] ${
                isFlipped ? '[transform:rotateY(180deg)]' : 'rotate-[2deg] group-hover:rotate-0'
              }`}
            >
              {/* Sisi Depan Kartu */}
              <div className="absolute inset-0 p-5 bg-kabut-lembah border border-embun/30 rounded-panel flex flex-col justify-between [backface-visibility:hidden] shadow-md">
                {/* Header Pass */}
                <div className="flex items-center justify-between pb-3 border-b border-embun/20">
                  <span className="font-pixel text-small text-embun uppercase tracking-wider">
                    Game Pass #01
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-lumut animate-pulse" />
                    <span className="font-pixel text-small text-lumut">
                      {profileData.status}
                    </span>
                  </div>
                </div>

                {/* Bingkai Foto Avatar */}
                <div className="my-auto flex flex-col items-center">
                  <div className="w-28 h-28 border-2 border-embun/40 bg-malam-gunung flex items-center justify-center rounded-panel overflow-hidden">
                    <span className="font-pixel text-4xl text-embun select-none">
                      OS
                    </span>
                  </div>
                  <p className="font-pixel text-h3 text-tulang mt-4 mb-1 text-center">
                    {profileData.name}
                  </p>
                  <p className="font-body text-small text-embun text-center">
                    {profileData.roles.join(' · ')}
                  </p>
                </div>

                {/* Footer Pass */}
                <div className="pt-3 border-t border-embun/20 flex justify-between items-center text-small font-pixel">
                  <span className="text-embun">Klik untuk balik</span>
                  <span className={hasMasterHunterBadge ? 'text-lentera font-bold' : 'text-embun'}>
                    {hasMasterHunterBadge ? 'Lv. 24 🏆 Master Hunter' : 'Lv. 24'}
                  </span>
                </div>
              </div>

              {/* Sisi Belakang Kartu */}
              <div className="absolute inset-0 p-5 bg-kabut-lembah border border-embun/30 rounded-panel flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-embun/20">
                    <span className="font-pixel text-small text-embun uppercase tracking-wider">
                      Catatan Petualang
                    </span>
                    <span className="font-pixel text-small text-lentera">Info</span>
                  </div>

                  <div className="mt-4 space-y-4 font-body text-small text-tulang">
                    <div>
                      <span className="font-pixel text-xs text-embun block mb-1">Peran utama:</span>
                      <p>Frontend developer, game developer, penggiat keamanan siber.</p>
                    </div>

                    <div>
                      <span className="font-pixel text-xs text-embun block mb-1">Afiliasi komunitas:</span>
                      <p className="text-lumut font-bold">Komunitas Koalisi</p>
                      <p className="text-xs text-tulang/80 mt-0.5">
                        Co-External Affairs (fokus riset dan edukasi keamanan siber).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-embun/20 flex justify-between items-center text-small text-embun font-pixel">
                  <span>Klik untuk kembali</span>
                  <span>Sisi 2/2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Judul Zona, Tiga Blok Teks & Baris Statistik */}
        <div className="flex-1 space-y-6">
          <h2 className="font-pixel text-h2 text-tulang leading-tight">
            Profil
          </h2>

          <div className="space-y-4">
            {profileData.bioBlocks.map((block, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="font-pixel text-base text-lentera">
                  {block.title}
                </h3>
                <p className="font-body text-base text-tulang/90 leading-relaxed max-w-[65ch]">
                  {block.content}
                </p>
              </div>
            ))}
          </div>

          {/* Baris Statistik Ringkas (Bukan kartu besar) */}
          <div className="pt-4 border-t border-embun/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-tulang font-body">
            {profileData.stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-pixel text-lg text-lentera">
                  {stat.value}
                </span>
                <span className="text-embun">
                  {stat.label}
                </span>
                {idx < profileData.stats.length - 1 && (
                  <span className="text-embun/40 ml-4 hidden sm:inline" aria-hidden="true">
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
