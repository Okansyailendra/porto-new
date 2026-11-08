export function ExperienceZone() {
  const experiences = [
    {
      company: 'Full Stack Web Development',
      role: 'Full Stack Web Developer',
      period: 'Sep 2026 — Sekarang',
      description:
        'Merancang dan membangun arsitektur aplikasi web end-to-end menggunakan React, TypeScript, Node.js, PHP, Laravel, dan REST API. Mengintegrasikan antarmuka responsif dengan basis data relasional yang andal, aman, dan berkinerja tinggi.'
    },
    {
      company: 'UI/UX & Product Design',
      role: 'UI/UX Designer & Prototyping',
      period: 'Mar 2025 — Sekarang',
      description:
        'Merancang alur pengalaman antarmuka digital dari wireframing hingga prototipe interaktif di Figma. Menyusun sistem desain berbasis token yang konsisten serta alur navigasi pengguna yang intuitif dan teruji.'
    },
    {
      company: 'Komunitas Koalisi',
      role: 'Co-External Affairs & Keamanan Siber',
      period: 'Apr 2026 — Sekarang',
      description:
        'Aktif belajar dan mendalami fundamental cyber security, pengoperasian sistem operasi Linux, serta keamanan jaringan. Turut menjembatani relasi eksternal dan memfasilitasi sesi belajar serta workshop teknis bersama rekan mahasiswa di komunitas.'
    }
  ]

  return (
    <section
      id="pengalaman"
      aria-label="Pengalaman Eksplorasi dan Organisasi"
      className="min-h-[100dvh] flex flex-col justify-center py-16 lg:py-24 border-t border-[#E8E4DC] relative"
    >
      <div className="w-full max-w-[1550px] mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Header Bersih & Bernas */}
        <div className="text-left space-y-3 select-none">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#182538] tracking-tight">
            My Experience<span className="text-[#EA5938]">.</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#576A7E] max-w-[64ch] leading-relaxed">
            Catatan eksplorasi dan dedikasi dalam rekayasa perangkat lunak full stack, perancangan antarmuka, dan kegiatan komunitas.
          </p>
        </div>

        {/* Tabel Editorial Murni Tanpa Kontainer Kartu / Badge AI Slop */}
        <div className="border-t border-[#E8E4DC] divide-y divide-[#E8E4DC]">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="group py-8 sm:py-10 lg:py-12 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl hover:bg-white/80 transition-colors duration-200 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start text-left"
            >
              {/* Kolom 1: Rentang Periode Waktu */}
              <div className="md:col-span-3 text-sm sm:text-base font-semibold text-[#8E9EAF] pt-1">
                {item.period}
              </div>

              {/* Kolom 2: Fokus Bidang & Peran */}
              <div className="md:col-span-4 space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#182538] tracking-tight group-hover:text-[#145E55] transition-colors">
                  {item.company}
                </h3>
                <p className="text-sm sm:text-base font-bold text-[#145E55]">
                  {item.role}
                </p>
              </div>

              {/* Kolom 3: Narasi Eksplorasi & Kontribusi */}
              <div className="md:col-span-5">
                <p className="text-sm sm:text-base lg:text-lg text-[#576A7E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
