import { HUD } from './components/hud/HUD'
import { HeroZone } from './components/zones/HeroZone'
import { ProfileZone } from './components/zones/ProfileZone'
import { ExperienceZone } from './components/zones/ExperienceZone'
import { ProjectZone } from './components/zones/ProjectZone'
import { KeahlianZone } from './components/zones/KeahlianZone'
import { TestimonialsZone } from './components/zones/TestimonialsZone'
import { ContactZone } from './components/zones/ContactZone'
import { BackToTop } from './components/hud/BackToTop'

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-[#FAF8F5] text-[#182538] flex flex-col relative transition-colors duration-300 overflow-x-hidden selection:bg-[#EA5938]/20 selection:text-[#182538]">
      {/* Top Header Navigasi Kapsul Full Width */}
      <HUD />

      {/* Konten Halaman Full-Width & Full-Screen (Maksimal 1820px) */}
      <main
        id="main-content"
        className="w-full max-w-[1820px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex-1 relative z-10"
        tabIndex={-1}
      >
        {/* Section 1: Hero ("Hey There, I'm Okan") — 1 Layar Penuh */}
        <HeroZone />

        {/* Section 2: What do I help? (Layanan & Nilai Utama) — 1 Layar Penuh */}
        <ProfileZone />

        {/* Section 3: My Work Experience (3-Row Timeline) — 1 Layar Penuh */}
        <ExperienceZone />

        {/* Section 4: My Latest Works (Galeri Project Terpilih) — 1 Layar Penuh */}
        <ProjectZone />

        {/* Section 5: Keahlian & Teknologi — 1 Layar Penuh */}
        <KeahlianZone />

        {/* Section 6: People talk about us (Testimoni) — 1 Layar Penuh */}
        <TestimonialsZone />

        {/* Section 7: Let's make something amazing together & Footer — 1 Layar Penuh */}
        <ContactZone />
      </main>

      {/* Back to Top Warp Button */}
      <BackToTop />
    </div>
  )
}
