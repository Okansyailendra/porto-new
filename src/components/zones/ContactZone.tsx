import { useState } from 'react'

export function ContactZone() {
  const [copied, setCopied] = useState(false)
  const email = 'okansyailendra@gmail.com'

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section
      id="kontak"
      aria-label="Zona 6 Kontak — Api Unggun Terakhir"
      className="py-16 md:py-24 border-t border-embun/15 text-center relative"
    >
      <div className="max-w-[760px] mx-auto p-8 md:p-12 bg-kabut-lembah/80 border border-embun/30 rounded-panel space-y-8 relative overflow-hidden shadow-2xl">
        {/* Glow ambient api unggun */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-lentera/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Pixel Art Api Unggun (Campfire) */}
        <div className="flex flex-col items-center justify-center select-none" aria-hidden="true">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Percikan Api / Embers yang melayang naik */}
            <span className="absolute top-2 left-6 w-1.5 h-1.5 bg-lentera rounded-[1px] animate-ember-1 pointer-events-none" aria-hidden="true" />
            <span className="absolute top-3 right-5 w-1.5 h-1.5 bg-darah-bug rounded-[1px] animate-ember-2 pointer-events-none" aria-hidden="true" />
            <span className="absolute top-1 left-8 w-1 h-1 bg-yellow-200 rounded-[1px] animate-ember-3 pointer-events-none" aria-hidden="true" />

            {/* Api pixel art SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-16 h-16 animate-bounce"
              style={{ animationDuration: '1.2s' }}
            >
              {/* Batang Kayu */}
              <rect x="4" y="19" width="16" height="3" fill="#6B4423" />
              <rect x="6" y="17" width="12" height="3" fill="#8B5A2B" />
              <rect x="7" y="18" width="10" height="1" fill="#4A2E1B" />
              {/* Api Luar (Lentera Gold) */}
              <path
                d="M12 2 C10 6 7 9 7 13 C7 16 9.2 18 12 18 C14.8 18 17 16 17 13 C17 9 14 6 12 2 Z"
                fill="#F4A93B"
              />
              {/* Api Tengah (Orange/Darah Bug) */}
              <path
                d="M12 6 C10.8 9 9 11 9 14 C9 16 10.3 17 12 17 C13.7 17 15 16 15 14 C15 11 13.2 9 12 6 Z"
                fill="#E5534B"
              />
              {/* Api Inti Terang (Kuning Terang) */}
              <path
                d="M12 9 C11.3 11 10.5 12.5 10.5 14.5 C10.5 15.8 11.2 16.5 12 16.5 C12.8 16.5 13.5 15.8 13.5 14.5 C13.5 12.5 12.7 11 12 9 Z"
                fill="#FFE28A"
              />
            </svg>
          </div>
          <span className="font-pixel text-xs text-embun/60 mt-1">Istirahat di perkemahan</span>
        </div>

        {/* Judul & Deskripsi */}
        <div className="space-y-3">
          <h2 className="font-pixel text-3xl sm:text-4xl text-tulang leading-tight">
            Petualangan hari ini sampai di sini.
          </h2>
          <p className="font-body text-base sm:text-lg text-tulang/90 max-w-[58ch] mx-auto leading-relaxed">
            Mari berkolaborasi membuat antarmuka web yang intuitif, game piksel, atau diskusikan ide proyek Anda. Kirimkan pesan ke surel atau temukan saya di jejaring profesional.
          </p>
        </div>

        {/* Tombol Kontak */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Kirim Email */}
          <a
            href={`mailto:${email}`}
            className="px-6 py-3 bg-lentera text-malam-gunung font-pixel text-base font-semibold rounded-button shadow-md hover:brightness-105 active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera focus-visible:outline-offset-2 flex items-center gap-2"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Kirim email</span>
          </a>

          {/* Salin Email */}
          <button
            type="button"
            onClick={copyEmail}
            className="px-5 py-3 border border-embun text-tulang font-pixel text-base rounded-button hover:border-lentera hover:text-lentera active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera focus-visible:outline-offset-2 flex items-center gap-2"
            aria-label="Salin alamat email ke clipboard"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>{copied ? 'Tersalin!' : 'Salin email'}</span>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/KannzDev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-malam-gunung border border-embun/40 text-tulang font-pixel text-base rounded-button hover:border-lentera hover:text-lentera active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera focus-visible:outline-offset-2 flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M12 2A10 10 0 002 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5A10 10 0 0012 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/okansyailendra"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-malam-gunung border border-embun/40 text-tulang font-pixel text-base rounded-button hover:border-lentera hover:text-lentera active:translate-y-[1px] transition-all focus-visible:outline-2 focus-visible:outline-lentera focus-visible:outline-offset-2 flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Info footer zona */}
        <div className="pt-6 border-t border-embun/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-pixel text-embun">
          <span>Tercatat di GitHub / Non-Monetize</span>
          <span>WIB (UTC+07) · Siap berkontribusi</span>
        </div>
      </div>
    </section>
  )
}
