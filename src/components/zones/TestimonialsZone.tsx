import { useState } from 'react'
import { ContributionsZone } from './ContributionsZone'

export function TestimonialsZone() {
  const testimonials = [
    {
      id: 1,
      quote:
        '“Okan memiliki ketelitian tinggi dalam menerjemahkan rancangan antarmuka ke kode yang rapi, cepat, dan mudah dipelihara. Sangat solutif saat diajak berdiskusi.”',
      author: 'Ahmad Fadhil',
      role: 'Frontend Lead',
      avatarColor: 'bg-[#145E55]',
      avatarText: 'AF'
    },
    {
      id: 2,
      quote:
        '“Dedikasi Okan di Komunitas Koalisi sebagai Co-External Affairs sangat terasa dalam menjembatani sesi belajar cyber security, pengenalan sistem Linux, dan workshop bagi mahasiswa.”',
      author: 'Rian Pratama',
      role: 'Cybersecurity Coordinator',
      avatarColor: 'bg-[#EA5C38]',
      avatarText: 'RP'
    },
    {
      id: 3,
      quote:
        '“Perancangan sistem yang rapi dan komunikasi yang proaktif. Setiap tantangan teknis diselesaikan dengan solusi yang tepat guna dan terukur.”',
      author: 'Dian Sasmita',
      role: 'Product & Tech Partner',
      avatarColor: 'bg-[#F4A723]',
      avatarText: 'DS'
    }
  ]

  const [activeIdx, setActiveIdx] = useState(1)
  const [showContributions, setShowContributions] = useState(false)

  return (
    <section
      id="testimoni"
      aria-label="Ulasan Rekan dan Komunitas — People talk about us"
      className="min-h-[100dvh] flex flex-col justify-center py-16 lg:py-24 border-t border-[#E8E4DC] relative text-center"
    >
      <div className="space-y-12 sm:space-y-16 w-full max-w-[1600px] mx-auto">
        {/* Header Section persis seperti di foto referensi */}
        <div className="space-y-3 max-w-[800px] mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#182538] tracking-tight">
            People talk about us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#576A7E] leading-relaxed max-w-[60ch] mx-auto">
            Pengalaman dan kolaborasi bersama dalam proyek digital, pengembangan perangkat lunak, serta edukasi keamanan siber.
          </p>
        </div>

        {/* 3 Kartu Testimoni dengan Kartu Tengah Terangkat (Elevated) persis di foto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-center max-w-[1600px] mx-auto pt-8">
          {testimonials.map((t, idx) => {
            const isCenter = idx === activeIdx
            return (
              <div
                key={t.id}
                onClick={() => setActiveIdx(idx)}
                className={`bg-white rounded-3xl p-8 sm:p-9 lg:p-10 xl:p-12 border transition-all duration-300 cursor-pointer flex flex-col justify-between relative text-center min-h-[300px] sm:min-h-[320px] ${
                  isCenter
                    ? 'border-[#182538]/20 shadow-2xl md:scale-105 z-10 ring-2 ring-[#182538]/5'
                    : 'border-[#E8E4DC] shadow-xs opacity-80 hover:opacity-100 hover:shadow-lg'
                }`}
              >
                {/* Avatar bulat di tengah atas */}
                <div className="flex justify-center -mt-16 sm:-mt-18 lg:-mt-20 mb-4">
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full ${t.avatarColor} text-white flex items-center justify-center font-black text-base sm:text-lg lg:text-xl shadow-lg ring-6 ring-[#FAF8F5]`}
                  >
                    {t.avatarText}
                  </div>
                </div>

                {/* Quote Testimoni */}
                <p className="text-sm sm:text-base lg:text-lg text-[#576A7E] italic leading-relaxed my-3 min-h-[72px]">
                  {t.quote}
                </p>

                {/* Nama dan Peran Author */}
                <div className="pt-4 border-t border-[#E8E4DC]/80">
                  <h3 className="text-base sm:text-lg lg:text-xl font-black text-[#182538]">
                    {t.author}
                  </h3>
                  <span className="text-xs sm:text-sm lg:text-base text-[#8E9EAF] font-bold block mt-1">
                    {t.role}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Indikator Titik Navigasi (Dots) */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx
                  ? 'w-10 bg-[#145E55]'
                  : 'w-3 bg-[#E8E4DC] hover:bg-[#8E9EAF]'
              }`}
              aria-label={`Pilih ulasan ${idx + 1}`}
            />
          ))}
        </div>

        {/* Opsi Tampilkan Aktivitas GitHub */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowContributions(!showContributions)}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-[#145E55] bg-white border border-[#E8E4DC] hover:border-[#145E55] rounded-full shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>{showContributions ? 'Sembunyikan' : 'Tampilkan'} Aktivitas GitHub (52 Minggu)</span>
            <span className="text-xs">{showContributions ? '▲' : '▼'}</span>
          </button>
        </div>

        {showContributions && (
          <div className="pt-6 animate-in fade-in duration-300 max-w-[1600px] mx-auto text-left">
            <ContributionsZone />
          </div>
        )}
      </div>
    </section>
  )
}
