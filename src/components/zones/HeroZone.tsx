import { useState } from 'react'

interface HeroZoneProps {
  onExploreProjects?: () => void
}

export function HeroZone({ onExploreProjects }: HeroZoneProps) {
  const [photoLoaded, setPhotoLoaded] = useState(false)

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      aria-label="Zona Pembuka — Halo, saya Okan"
      className="min-h-[calc(100dvh-5.5rem)] lg:h-[calc(100dvh-5.5rem)] flex flex-col justify-center py-8 lg:py-2 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center w-full my-auto">
        {/* Kolom Kiri: Eyebrow Dot, Headline 3 Baris, Email, CTA & Pengalaman */}
        <div className="lg:col-span-4 text-left flex flex-col justify-center space-y-6 sm:space-y-7 lg:space-y-8 order-2 lg:order-1">
          {/* Eyebrow Label: Dot Orange + Role */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EA5938] shrink-0" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#182538]">
              FULL STACK DEVELOPER &amp; UI/UX DESIGNER
            </span>
          </div>

          {/* Main Headline: Hey / There, / I'm Okan. (Dot Orange) */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-black text-[#182538] tracking-tight leading-[0.98]">
              Hey <br />
              There, <br />
              I'm Okan<span className="text-[#EA5938]">.</span>
            </h1>

            <div className="pt-1">
              <a
                href="mailto:okanwahyudi540@gmail.com"
                className="text-base sm:text-lg font-bold text-[#EA5938] hover:underline underline-offset-4 transition-all block"
              >
                okanwahyudi540@gmail.com
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={onExploreProjects ? onExploreProjects : () => scrollTo('project')}
              className="px-7 py-3.5 bg-[#145E55] text-white text-sm sm:text-base font-bold rounded-full shadow-md hover:bg-[#0E443E] hover:shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lihat Project</span>
              <span className="text-xs">↗</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo('kontak')}
              className="px-6 py-3.5 bg-white border border-[#E8E4DC] text-[#182538] text-sm sm:text-base font-bold rounded-full hover:border-[#145E55] hover:text-[#145E55] shadow-2xs active:scale-98 transition-all cursor-pointer"
            >
              Hubungi Saya
            </button>
          </div>

          {/* Stat Box: 2+ TAHUN PENGALAMAN */}
          <div className="flex items-center gap-4 pt-2 sm:pt-4">
            <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#182538] tracking-tight leading-none">
              2+
            </span>
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#576A7E] leading-tight">
              TAHUN <br />
              PENGALAMAN
            </div>
          </div>
        </div>

        {/* Kolom Tengah: Kubah Vaulted Arch Arsitektural Berskala Besar, Grid Blueprint, Foto Okan & Badge Indonesia */}
        <div className="lg:col-span-5 flex justify-center items-end order-1 lg:order-2 relative select-none px-2">
          <div className="relative flex items-end justify-center">
            {/* Aksen Garis Sketsa Pensil Halus di Belakang Kanan Atas Kubah */}
            <svg
              className="absolute -top-8 sm:-top-10 -right-10 sm:-right-16 w-44 sm:w-60 h-44 sm:h-60 pointer-events-none opacity-30 text-[#144E43] -z-10"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M 15,85 C 45,45 65,30 95,12" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 25,90 C 55,50 75,35 98,20" strokeWidth="1.2" strokeDasharray="2 2" />
              <path d="M 10,75 C 40,35 60,20 88,8" strokeWidth="0.8" />
              <path d="M 35,95 C 65,58 85,42 102,28" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M 45,75 C 60,55 78,42 95,35" strokeWidth="0.8" strokeDasharray="2 3" />
            </svg>

            {/* Aksen Kapsul Orange Melayang di Sisi Kiri Kubah */}
            <div
              className="absolute top-1/3 -left-5 sm:-left-7 w-3 sm:w-3.5 h-12 sm:h-14 bg-[#EA5938] rounded-full shadow-md -rotate-15 z-20 pointer-events-none"
              aria-hidden="true"
            />

            {/* Kubah Lengkung Vaulted Arch Skala Besar Warna Deep Teal dengan Grid Blueprint */}
            <div className="relative w-[340px] sm:w-[420px] md:w-[480px] lg:w-[510px] xl:w-[560px] 2xl:w-[600px] h-[440px] sm:h-[520px] md:h-[580px] lg:h-[620px] xl:h-[660px] rounded-t-[190px] sm:rounded-t-[230px] md:rounded-t-[260px] lg:rounded-t-[290px] xl:rounded-t-[310px] bg-[#144E43] overflow-hidden flex items-end justify-center shadow-2xl">
              {/* Overlay Pola Grid Arsitektural & Tiga Lingkaran Konsentris Tepat di Belakang Kepala */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-22 text-white"
                stroke="currentColor"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="arch-grid-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="currentColor" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#arch-grid-pattern)" />

                {/* 3 Lingkaran Konsentris Halus (Halo / Target) di Belakang Kepala */}
                <circle cx="50%" cy="38%" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50%" cy="38%" r="130" stroke="currentColor" strokeWidth="1" />
                <circle cx="50%" cy="38%" r="185" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

                {/* Garis Sumbu Vertikal & Horisontal */}
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="38%" x2="100%" y2="38%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* Foto Okan Transparan Berdefinisi Tinggi Tampil Besar & Gagah di Dalam Kubah */}
              <img
                src="/foto.webp"
                alt="Okan Syailendra"
                width={1400}
                height={1252}
                onLoad={() => setPhotoLoaded(true)}
                className={`relative z-10 w-full h-auto max-h-[430px] sm:max-h-[510px] md:max-h-[570px] lg:max-h-[610px] xl:max-h-[650px] object-contain object-bottom filter drop-shadow-2xl transition-all duration-500 ${
                  photoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                loading="eager"
                decoding="async"
              />

              {/* Badge Hitam Miring 'BASED IN INDONESIA' di Bagian Bawah Kanan Portrait */}
              <div className="absolute bottom-5 right-3 sm:right-6 z-20 -rotate-3 bg-[#182538] text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] px-4 py-2 shadow-2xl border border-white/10 select-none">
                BASED IN INDONESIA
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Kutipan dengan Tanda Petik Orange & Stempel 'Ok' */}
        <div className="lg:col-span-3 text-left lg:text-right flex flex-col justify-center space-y-8 sm:space-y-12 lg:space-y-14 order-3 pl-2 sm:pl-4 lg:pl-6">
          {/* Tanda Petik Terracotta Orange & Teks Kutipan */}
          <div className="space-y-2">
            <span
              className="text-4xl sm:text-5xl font-serif text-[#EA5938] leading-none block select-none lg:ml-auto"
              aria-hidden="true"
            >
              “
            </span>

            <p className="text-xl sm:text-2xl lg:text-[24px] xl:text-[26px] text-[#182538] font-bold leading-snug max-w-[20ch] lg:ml-auto">
              I design beautifully simple things, and I love what I do.
            </p>

            <p className="text-xs sm:text-sm text-[#8E9EAF] font-medium pt-1">
              Available for selected projects
            </p>
          </div>

          {/* Stempel Cap Konsentris 'Ok' & Teks Dua Baris */}
          <div className="flex flex-col items-start lg:items-end space-y-3">
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-dashed border-[#182538]/30 flex items-center justify-center p-1.5 group hover:rotate-12 transition-transform duration-500 cursor-default select-none">
              <div className="w-full h-full rounded-full border border-[#182538]/50 flex items-center justify-center bg-[#FAF8F5]">
                <span className="font-script text-2xl font-bold text-[#182538] italic">
                  Ok
                </span>
              </div>
            </div>

            <div className="text-left lg:text-right font-black text-[10px] sm:text-[11px] uppercase tracking-wider text-[#182538] leading-tight">
              <p>VERIFIED</p>
              <p>PROFESSIONAL DEVELOPER</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
