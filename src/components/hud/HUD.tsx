import { useState, useEffect } from 'react'

interface NavItem {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'layanan', label: 'LAYANAN' },
  { id: 'pengalaman', label: 'PENGALAMAN' },
  { id: 'project', label: 'PROJECT' },
  { id: 'testimoni', label: 'TESTIMONI' }
]

export function HUD() {
  const [activeSection, setActiveSection] = useState<string>('layanan')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs border-b border-[#E8E4DC]'
          : 'bg-[#FAF8F5]/60 backdrop-blur-xs'
      }`}
    >
      <div className="w-full max-w-[1820px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 h-20 sm:h-22 flex items-center justify-between">
        {/* Logo Kiri: Signature Script persis 'Binjan' di foto */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="group flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#182538] rounded-lg"
          aria-label="Kembali ke atas beranda Okan Syailendra"
        >
          <span className="font-script text-3xl sm:text-4xl lg:text-[46px] text-[#182538] font-bold tracking-wide group-hover:text-[#226357] transition-colors">
            Okan
          </span>
          <span className="w-2 h-2 rounded-full bg-[#EA5938] group-hover:scale-125 transition-transform" />
        </a>

        {/* Menu Navigasi Tengah: Bersih & Terbuka persis di referensi */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-12"
          aria-label="Navigasi Utama"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`text-xs font-bold tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#182538] font-black'
                    : 'text-[#576A7E] hover:text-[#182538]'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Tombol Kanan: 'Let's talk ↗' persis di referensi */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo('kontak')}
            className="hidden sm:inline-flex items-center gap-2.5 text-xs lg:text-sm font-bold text-[#182538] hover:text-[#226357] transition-all group cursor-pointer"
          >
            <span>Let's talk</span>
            <span className="w-8 h-8 rounded-full border border-[#182538]/30 flex items-center justify-center text-xs group-hover:border-[#182538] group-hover:bg-[#182538] group-hover:text-white transition-all shadow-2xs">
              ↗
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#182538] hover:bg-white rounded-full border border-[#E8E4DC] focus-visible:outline-2 focus-visible:outline-[#182538]"
            aria-label="Buka menu navigasi"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#E8E4DC] px-6 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`text-left px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeSection === item.id
                    ? 'border border-[#182538] text-[#182538] font-extrabold'
                    : 'text-[#576A7E] hover:bg-[#FAF8F5]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#E8E4DC] mt-2">
              <a
                href="mailto:okanwahyudi540@gmail.com"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-[#182538] rounded-full shadow-xs"
              >
                <span>✉</span>
                <span>okanwahyudi540@gmail.com</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
