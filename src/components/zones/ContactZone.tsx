import { useState, type FormEvent } from 'react'

export function ContactZone() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const recipientEmail = 'okanwahyudi540@gmail.com'

  function copyEmail() {
    navigator.clipboard.writeText(recipientEmail).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !senderEmail.trim() || !message.trim()) {
      setStatus('error')
      setStatusMessage('Mohon lengkapi nama lengkap, alamat email, dan pesan Anda.')
      return
    }

    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: senderEmail.trim(),
          message: message.trim(),
          _subject: `Pesan Baru Portofolio dari ${name.trim()}`,
          _template: 'table',
          _captcha: 'false'
        })
      })

      const data = await response.json()
      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success')
        setStatusMessage(`Pesan Anda berhasil terkirim dan langsung masuk ke kotak masuk ${recipientEmail}.`)
        setName('')
        setSenderEmail('')
        setMessage('')
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan')
      }
    } catch {
      setStatus('error')
      setStatusMessage(
        'Layanan otomatis sedang sibuk. Jangan khawatir, Anda dapat langsung mengirimkan pesan melalui aplikasi email Anda.'
      )
    }
  }

  function handleOpenMailClient() {
    const subject = encodeURIComponent(`Kolaborasi Portofolio dari ${name || 'Pengunjung'}`)
    const body = encodeURIComponent(
      `${message}\n\n---\nPengirim: ${name}\nEmail: ${senderEmail}`
    )
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="kontak"
      aria-label="Zona Kontak — Let's make something amazing together"
      className="min-h-[100dvh] flex flex-col justify-between py-12 lg:py-16 border-t border-[#E8E4DC] relative text-center"
    >
      <div className="w-full max-w-[840px] mx-auto flex-1 flex flex-col justify-center py-4 sm:py-6">
        {/* Header Section dengan Gaya Editorial Warm Ivory & Terracotta */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 select-none">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#182538] tracking-tight leading-[1.08]">
            Let’s make something <br className="hidden sm:block" />
            <span className="text-[#145E55]">amazing together</span>
            <span className="text-[#EA5938]">.</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#576A7E] max-w-[56ch] mx-auto leading-relaxed px-4">
            Terbuka untuk kolaborasi pengembangan web full stack, perancangan antarmuka UI/UX modern, maupun konsultasi sistem. Pesan Anda akan langsung masuk otomatis ke email saya.
          </p>
        </div>

        {/* Card Form Kontak Bersih & Elegan Sesuai Tema Portofolio */}
        <div className="relative bg-white text-[#182538] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8E4DC] shadow-xl text-left transition-all">
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* Field 1: Nama Lengkap */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-extrabold uppercase tracking-wider text-[#182538]"
                >
                  Nama Lengkap
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="cth. Budi Pratama"
                  className="w-full px-4 sm:px-5 py-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl text-[#182538] placeholder-[#8E9EAF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#145E55] focus:bg-white focus:ring-3 focus:ring-[#145E55]/10 transition-all font-sans"
                />
              </div>

              {/* Field 2: Alamat Email */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-extrabold uppercase tracking-wider text-[#182538]"
                >
                  Alamat Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="cth. nama@perusahaan.com"
                  className="w-full px-4 sm:px-5 py-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl text-[#182538] placeholder-[#8E9EAF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#145E55] focus:bg-white focus:ring-3 focus:ring-[#145E55]/10 transition-all font-sans"
                />
              </div>
            </div>

            {/* Field 3: Pesan / Detail Projek */}
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="block text-xs font-extrabold uppercase tracking-wider text-[#182538]"
              >
                Pesan / Detail Projek
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ceritakan tentang ide projek Anda, kebutuhan teknis, atau hal yang ingin kita diskusikan..."
                className="w-full px-4 sm:px-5 py-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl text-[#182538] placeholder-[#8E9EAF] text-sm sm:text-base font-medium focus:outline-none focus:border-[#145E55] focus:bg-white focus:ring-3 focus:ring-[#145E55]/10 transition-all font-sans resize-none"
              />
            </div>

            {/* Feedback Alerts */}
            {status === 'success' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#145E55]/10 border border-[#145E55]/25 text-[#145E55] text-sm flex items-start gap-3.5">
                <span className="text-xl leading-none">✓</span>
                <div>
                  <p className="font-bold text-[#145E55]">Pesan Berhasil Terkirim!</p>
                  <p className="text-xs sm:text-sm text-[#145E55]/90 mt-0.5">{statusMessage}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#EA5938]/10 border border-[#EA5938]/30 text-[#EA5938] text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg leading-none">⚠️</span>
                  <div>
                    <p className="font-bold text-[#EA5938]">Pengiriman Otomatis Terkendala</p>
                    <p className="text-xs text-[#576A7E] mt-0.5">{statusMessage}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleOpenMailClient}
                  className="px-4 py-2 bg-[#EA5938] text-white rounded-xl text-xs font-bold hover:bg-[#D44A2B] transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  Kirim via Aplikasi Email ↗
                </button>
              </div>
            )}

            {/* Tombol Kirim Pesan */}
            <div className="pt-2 border-t border-[#E8E4DC]/60 flex justify-end">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-8 py-4 bg-[#145E55] hover:bg-[#0E443E] text-white text-sm sm:text-base font-bold rounded-full shadow-lg shadow-[#145E55]/20 hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <span>✉</span>
                    <span>Kirim Pesan Sekarang ↗</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Social Connect Pills yang Serasi dengan Tema */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <a
            href="https://github.com/Okansyailendra"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white border border-[#E8E4DC] text-[#182538] text-xs sm:text-sm font-bold flex items-center gap-2.5 hover:border-[#182538] hover:shadow-sm active:scale-98 transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 002 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5A10 10 0 0012 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="https://instagram.com/okansyailendra"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white border border-[#E8E4DC] text-[#182538] text-xs sm:text-sm font-bold flex items-center gap-2.5 hover:border-[#EA5938] hover:text-[#EA5938] hover:shadow-sm active:scale-98 transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Instagram</span>
          </a>

          <a
            href={`mailto:${recipientEmail}`}
            className="px-5 py-2.5 rounded-full bg-[#182538] text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[#145E55] active:scale-98 transition-all shadow-xs"
          >
            <span>✉</span>
            <span>{recipientEmail}</span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="px-4 py-2.5 rounded-full bg-white border border-[#E8E4DC] text-[#182538] text-xs sm:text-sm font-bold hover:border-[#145E55] hover:text-[#145E55] active:scale-98 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>📋</span>
            <span>{copied ? 'Tersalin!' : 'Salin Email'}</span>
          </button>
        </div>
      </div>

      {/* Baris Bawah Footer: Logo Okan | © 2026 All Rights Reserved */}
      <div className="pt-6 pb-2 border-t border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9EAF]">
        <div className="flex items-center gap-3">
          <span className="font-script text-2xl font-bold text-[#182538]">
            Okan
          </span>
          <span className="text-[#E8E4DC]">|</span>
          <p>© 2026 Okan Syailendra. All Rights Reserved.</p>
        </div>

        <p className="text-xs text-[#8E9EAF]">
          Designed with warm editorial aesthetics · React &amp; Tailwind CSS
        </p>
      </div>
    </section>
  )
}
