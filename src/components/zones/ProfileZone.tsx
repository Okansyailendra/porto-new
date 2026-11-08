import { useState } from 'react'

export function ProfileZone() {
  const [activeCard, setActiveCard] = useState<number>(0)

  const services = [
    {
      title: 'UI/UX Design',
      projects: '10+ Desain Antarmuka & Prototipe',
      description: 'Riset pengalaman pengguna, pembuatan wireframe interaktif, sistem desain (design system) berbasis token di Figma, dan pengujian alur navigasi digital.',
      iconBg: 'bg-[#145E55]',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Full Stack Web Development',
      projects: '12+ Sistem Handal & Skalabel',
      description: 'Pengembangan aplikasi web end-to-end dari frontend responsif (React, TypeScript, Tailwind) hingga backend RESTful API (Node.js, Laravel) dan database MySQL.',
      iconBg: 'bg-[#EA5C38]',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Cyber Security & Linux Systems',
      projects: 'Eksplorasi Keamanan & Linux',
      description: 'Mendalami fundamental cyber security, pengoperasian sistem operasi Linux, serta praktik keamanan web dan jaringan di Komunitas Koalisi.',
      iconBg: 'bg-[#F4A723]',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ]

  return (
    <section
      id="layanan"
      aria-label="Layanan dan Nilai Utama — What do I help?"
      className="min-h-[100dvh] flex flex-col justify-center py-16 lg:py-24 border-t border-[#E8E4DC] relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center w-full">
        {/* Kolom Kiri: 3 Kartu Tumpuk dengan Ikon Bulat seperti di foto referensi */}
        <div className="lg:col-span-6 space-y-5 lg:space-y-6">
          {services.map((service, index) => {
            const isSelected = activeCard === index
            return (
              <div
                key={index}
                onClick={() => setActiveCard(index)}
                className={`p-6 sm:p-8 lg:p-9 bg-white rounded-3xl border transition-all duration-300 cursor-pointer flex items-start sm:items-center gap-5 sm:gap-7 ${
                  isSelected
                    ? 'border-[#182538]/25 shadow-xl ring-2 ring-[#182538]/5 translate-x-1 sm:translate-x-2'
                    : 'border-[#EFECE6] shadow-xs hover:border-[#182538]/20 hover:shadow-md'
                }`}
              >
                {/* Ikon Bulat Berwarna */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full ${service.iconBg} flex items-center justify-center shrink-0 shadow-md`}
                >
                  <div className="scale-125">{service.icon}</div>
                </div>

                {/* Konten Teks Kartu */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-[#182538]">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base font-bold text-[#8E9EAF] mt-1">
                    {service.projects}
                  </p>
                  <p className={`text-xs sm:text-sm lg:text-base text-[#576A7E] mt-2.5 leading-relaxed transition-all duration-300 ${isSelected ? 'opacity-100 max-h-36' : 'opacity-80 line-clamp-2'}`}>
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Kolom Kanan: Judul 'What do I help?', Narasi, dan Angka Metrik Besar */}
        <div className="lg:col-span-6 space-y-8 sm:space-y-10 text-left">
          <div className="space-y-5">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#182538] tracking-tight leading-[1.05]">
              What do I help?
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-[#576A7E] leading-relaxed max-w-[50ch]">
              Saya membantu mewujudkan solusi digital mulai dari perancangan antarmuka UI/UX yang intuitif, arsitektur kode full stack yang modular dan terukur, hingga aplikasi sistem yang cepat dan aman.
            </p>

            <p className="text-base sm:text-lg lg:text-xl text-[#576A7E] leading-relaxed max-w-[50ch]">
              Melalui pengalaman di bidang rekayasa perangkat lunak dan keaktifan di <strong className="text-[#145E55] font-bold">Komunitas Koalisi</strong> (Co-External Affairs), saya mengasah pemahaman cyber security dan sistem Linux sembari merancang antarmuka visual yang nyaman dinikmati.
            </p>
          </div>

          {/* Baris Metrik Besar seperti '285+ Project Completed / 190+ Happy Clients' di foto referensi */}
          <div className="pt-6 border-t border-[#E8E4DC] flex flex-wrap items-center gap-10 sm:gap-14 lg:gap-16">
            <div>
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#182538] tracking-tight block">
                10+
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-extrabold text-[#576A7E] uppercase tracking-wider mt-1 block">
                Project Selesai
              </span>
            </div>

            <div>
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#182538] tracking-tight block">
                12+
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-extrabold text-[#576A7E] uppercase tracking-wider mt-1 block">
                Teknologi Dikuasai
              </span>
            </div>

            <div>
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#145E55] tracking-tight block">
                100%
              </span>
              <span className="text-xs sm:text-sm lg:text-base font-extrabold text-[#576A7E] uppercase tracking-wider mt-1 block">
                Dedikasi Kualitas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
