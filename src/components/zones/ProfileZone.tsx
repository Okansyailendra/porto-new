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
            className="group relative w-full h-[440px] cursor-pointer focus-visible:outline-2 focus-visible:outline-lentera rounded-panel select-none [perspective:1000px]"
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                isFlipped ? '[transform:rotateY(180deg)]' : 'rotate-[1.5deg] group-hover:rotate-0 group-hover:scale-[1.02]'
              } transition-all`}
            >

              {/* ── Sisi Depan Kartu — Foto Full Background ── */}
              <div className="absolute inset-0 border border-embun/30 rounded-panel [backface-visibility:hidden] overflow-hidden shadow-xl">

                {/* Foto sebagai background penuh kartu */}
                {profileData.avatarUrl ? (
                  <img
                    src={profileData.avatarUrl}
                    alt={`Foto profil ${profileData.name}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center 5%' }}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-kabut-lembah to-malam-gunung" />
                )}

                {/* Scanline — pixel aesthetic */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)'
                  }}
                />

                {/* Gradient gelap dari bawah — menjaga wajah tetap jelas, teks terbaca */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
                  style={{
                    height: '55%',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(10,14,26,0.72) 35%, rgba(10,14,26,0.96) 75%, rgba(10,14,26,1) 100%)'
                  }}
                />

                {/* Pixel corner decorators */}
                <span aria-hidden="true" className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lentera/70 z-30 pointer-events-none" />
                <span aria-hidden="true" className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-lentera/70 z-30 pointer-events-none" />
                <span aria-hidden="true" className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-lentera/40 z-30 pointer-events-none" />
                <span aria-hidden="true" className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lentera/40 z-30 pointer-events-none" />

                {/* Status badge — top right */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-malam-gunung/75 backdrop-blur-sm px-2 py-1 rounded border border-lumut/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-lumut animate-pulse" aria-hidden="true" />
                  <span className="font-pixel text-[10px] text-lumut uppercase tracking-widest">
                    {profileData.status}
                  </span>
                </div>

                {/* Pass label — top left */}
                <div className="absolute top-3 left-3 z-20 bg-malam-gunung/75 backdrop-blur-sm px-2 py-1 rounded border border-embun/25">
                  <span className="font-pixel text-[10px] text-embun/90 uppercase tracking-widest">
                    Game Pass #01
                  </span>
                </div>

                {/* ── Overlay Teks di Bawah (di atas gradient) ── */}
                <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-4 pt-2 flex flex-col gap-3">

                  {/* Nama + Role */}
                  <div>
                    <p className="font-pixel text-base text-tulang leading-snug tracking-wide drop-shadow-md">
                      {profileData.name}
                    </p>
                    <p className="font-body text-[11px] text-embun/80 mt-0.5">
                      {profileData.roles[0]} · {profileData.roles[1]}
                    </p>
                  </div>

                  {/* XP Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-[10px] text-embun/60 uppercase tracking-wider">XP</span>
                      <span className={`font-pixel text-[11px] ${hasMasterHunterBadge ? 'text-lentera' : 'text-embun/70'}`}>
                        {hasMasterHunterBadge ? '🏆 Master Hunter · Lv. 24' : 'Lv. 24'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-malam-gunung/60 rounded-full overflow-hidden border border-embun/20 backdrop-blur-sm">
                      <div
                        className="h-full rounded-full"
                        style={{ width: '72%', background: 'linear-gradient(to right, #6FA36B, #F4A93B)' }}
                      />
                    </div>
                  </div>

                  {/* Footer hint */}
                  <div className="flex justify-center">
                    <span className="font-pixel text-[10px] text-embun/40 tracking-widest animate-pulse">
                      ▼ KLIK UNTUK BALIK ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Sisi Belakang Kartu ── */}
              <div className="absolute inset-0 p-5 bg-kabut-lembah border border-embun/30 rounded-panel flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl overflow-hidden">

                {/* Pixel corner decorators back */}
                <span aria-hidden="true" className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-lentera/60 rounded-tl-panel z-20 pointer-events-none" />
                <span aria-hidden="true" className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lentera/60 rounded-tr-panel z-20 pointer-events-none" />

                {/* Subtle grid background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(244,169,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,169,59,1) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-3 border-b border-embun/20">
                    <span className="font-pixel text-small text-embun uppercase tracking-wider">
                      Catatan Petualang
                    </span>
                    <span className="font-pixel text-small text-lentera">Info</span>
                  </div>

                  <div className="mt-4 space-y-4 font-body text-small text-tulang">
                    <div>
                      <span className="font-pixel text-[10px] text-embun/60 block mb-1 uppercase tracking-widest">Peran utama:</span>
                      <p>Frontend developer, game developer, penggiat keamanan siber.</p>
                    </div>

                    <div>
                      <span className="font-pixel text-[10px] text-embun/60 block mb-1 uppercase tracking-widest">Afiliasi komunitas:</span>
                      <p className="text-lumut font-bold">Komunitas Koalisi</p>
                      <p className="text-xs text-tulang/70 mt-0.5">
                        Co-External Affairs (fokus riset dan edukasi keamanan siber).
                      </p>
                    </div>

                    <div>
                      <span className="font-pixel text-[10px] text-embun/60 block mb-1 uppercase tracking-widest">Statistik:</span>
                      <div className="flex gap-4">
                        {profileData.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <p className="font-pixel text-base text-lentera">{stat.value}</p>
                            <p className="text-[10px] text-embun/60 font-pixel">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-embun/20 flex justify-center">
                  <span className="font-pixel text-[10px] text-embun/40 tracking-widest animate-pulse">
                    ▼ KLIK UNTUK KEMBALI ▼
                  </span>
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

          {/* Baris Statistik Ringkas */}
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
