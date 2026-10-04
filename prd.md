# prd.md — Website Portofolio Okan Syailendra (KannzDev)

Versi: 1.0 · Tanggal: 4 Oktober 2026 · Tema: Game (adventure-first, HUD ala FPS)
Acuan visual: lihat `design.md`.

---

## 1. Ringkasan

Website portofolio satu halaman yang memperkenalkan Okan sebagai frontend developer, game developer, software developer, dan penggiat keamanan siber. Pengunjung bisa membaca profil, melihat keahlian dan project, memeriksa aktivitas GitHub, lalu memainkan mini game.

## 2. Tujuan

1. Rekruter, dosen, dan klien memahami keahlian Okan dalam kurang dari satu menit.
2. Setiap project punya jalur langsung ke kode (GitHub) dan ke hasil jadi (website).
3. Desain terlihat dirancang oleh manusia dan berbeda dari template portofolio umum.
4. Mini game menunjukkan kemampuan game dev secara langsung, tanpa pengunjung harus membuka repositori.

Ukuran keberhasilan:
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90 (mobile).
- Largest Contentful Paint < 2,5 detik pada jaringan 4G.
- Seluruh fitur wajib (bagian 4) berjalan di Chrome, Firefox, Safari, dan Edge versi terbaru.

## 3. Pengguna

| Pengguna | Kebutuhan |
|---|---|
| Rekruter / HR | Lihat keahlian, project, dan cara menghubungi dengan cepat |
| Developer lain | Baca kode project, lihat kualitas kode |
| Dosen / komunitas | Kenali bidang minat dan peran di komunitas |
| Pengunjung umum | Menjelajah dan bermain |

## 4. Fitur wajib

| ID | Fitur | Deskripsi singkat | Prioritas |
|---|---|---|---|
| F1 | Profil | Kartu ID, tiga blok teks, statistik ringkas | P0 |
| F2 | Keahlian | Grid inventory dengan detail per keahlian | P0 |
| F3 | Tech stack | Baris slot logo teknologi | P0 |
| F4 | Project | Peta level, empat project, tombol GitHub dan website | P0 |
| F5 | GitHub contributions | Grid 52×7 bertema fog of war, data asli | P0 |
| F6 | Mini game | Bug Hunt (fase 1), Lentera Maze (fase 2) | P0 / P1 |
| F7 | HUD | Progres scroll, hotbar navigasi, skor tertinggi | P1 |
| F8 | Kontak | Email, GitHub, LinkedIn | P0 |
| F9 | Aksesibilitas | Keyboard, fokus, reduced motion, kontras | P0 |
| F10 | SEO dan berbagi | Meta tag, Open Graph, favicon | P1 |
| F11 | UX dan gerak | Urutan pembuka, parallax hero, minimap, interaksi per zona, easter egg (design.md bagian 6) | P1 |

## 5. Persyaratan per fitur

### F1 Profil
- Nama: Okan Syailendra. Peran: frontend & game developer, software developer.
- Teks: fokus pengembangan antarmuka web, UI/UX, mekanika game; peran Co-External Affairs di Komunitas Koalisi; minat keamanan siber.
- Statistik: 2+ tahun pengalaman, 10 project selesai, 12 teknologi. Angka diperbarui manual di file konten.
- Foto profil diganti dengan file lokal (WebP, lebar maks. 600 px).

### F2 Keahlian
- Data dari satu file `skills.ts`: nama, kelompok, level (1–5), deskripsi satu kalimat.
- Kelompok: Frontend, Game, Backend dan data, Keamanan siber.
- Hover, fokus, dan tap menampilkan panel detail.

### F3 Tech stack
- 12 teknologi: JavaScript, TypeScript, HTML, React, Node.js, Tailwind CSS, PHP, Laravel, MySQL, Python, Figma, GitHub.
- Ikon berupa SVG lokal. Jangan memuat dari CDN pihak ketiga.

### F4 Project
Data dari `projects.ts`. Setiap item memiliki: `slug`, `name`, `tagline`, `description`, `stack[]`, `githubUrl`, `liveUrl`, `status`.

| Project | Tagline | Stack |
|---|---|---|
| TabungGadget | Perencana tabungan gadget impian | PHP, MySQL, CSS, JavaScript |
| IC Plus | Sistem manajemen layanan kesehatan desa | React, MySQL, Node.js, Tailwind |
| Nexora | Platform pemesanan hotel terpadu | PHP, JavaScript, CSS, MySQL |
| ConstructERP | Sistem ERP administrasi konstruksi | React, MySQL, Node.js, Tailwind |

Deskripsi lengkap mengikuti teks yang sudah ada di portofolio lama. `githubUrl` dan `liveUrl` diisi Okan; jika kosong, tombolnya tidak ditampilkan.

Perilaku:
- Klik atau Enter pada titik level membuka panel detail.
- Satu panel terbuka pada satu waktu.
- Tombol "Kode di GitHub" dan "Buka website" membuka tab baru dengan `rel="noopener noreferrer"`.

### F5 GitHub contributions
- Sumber data: GitHub GraphQL API (`contributionsCollection.contributionCalendar`).
- Token tidak boleh ada di kode frontend. Gunakan GitHub Action terjadwal (setiap 12 jam) yang mengambil data dan menulis `public/contributions.json`; frontend membaca file itu.
- Jika file tidak ada atau gagal dimuat, tampilkan grid kosong dengan pesan: "Data contributions belum bisa dimuat. Coba muat ulang halaman."
- Empat tingkat intensitas dihitung dari kuantil data pengguna, bukan angka tetap.
- Total commit dan streak terpanjang dihitung dari JSON yang sama.
- Grid dapat digeser horizontal di mobile.

### F6 Mini game

**Bug Hunt (P0)**
- Render di `<canvas>`, ukuran menyesuaikan kontainer, minimal 320 px lebar.
- Durasi ronde 30 detik. Bug muncul acak dengan tiga ukuran dan kecepatan.
- Skor: kecil 30, sedang 20, besar 10. Combo ×2 setelah tiga tembakan beruntun, reset saat meleset.
- Skor tertinggi di `localStorage` (kunci `bughunt.best`). Bungkus akses dengan `try/catch`.
- Input: klik mouse dan sentuhan. Tombol Mulai, Jeda, Ulang.
- Frame rate target 60 fps, game loop memakai `requestAnimationFrame` dengan delta time.
- Game berhenti dan jeda otomatis saat tab tidak aktif.
- Mode reduced motion: kurangi efek partikel, bug bergerak lebih lambat.

**Lentera Maze (P1, setelah rilis pertama)**
- Labirin 15×15, pemain bergerak dengan tombol panah atau WASD, cahaya lentera membuka area sekitar.
- Waktu selesai tersimpan sebagai rekor pribadi.

### F7 HUD
- Bar lima hati terisi sesuai persentase scroll.
- Hotbar: angka 1–5 menjadi pintasan keyboard ke zona Profil, Keahlian, Project, Contributions, Arcade.
- Jangan menangkap tombol angka saat fokus berada di input atau di dalam game.

### F8 Kontak
- Tautan `mailto:`, GitHub, dan LinkedIn. Tanpa formulir pada versi 1.0.

### F9 Aksesibilitas
- Semua elemen interaktif dapat dicapai dengan keyboard, urutan tab logis.
- Fokus terlihat (garis 2 px warna Lentera).
- Kontras teks memenuhi WCAG AA.
- `prefers-reduced-motion` dihormati di semua animasi.
- Grid contributions dan game punya alternatif teks (`aria-label`, ringkasan angka).
- Tombol ikon memiliki `aria-label`.

### F11 UX dan gerak
- Ikuti `design.md` bagian 6 sepenuhnya, termasuk token gerak (6.9) dan aturan reduced motion (6.10).
- Urutan pembuka dapat dilewati dan tidak diputar ulang dalam satu sesi.
- Bug tersembunyi di halaman bersifat bonus dan tidak boleh menghalangi pembacaan konten.
- Semua alur di 6.11 harus bisa diselesaikan hanya dengan keyboard.
- Gunakan Framer Motion untuk transisi antarmuka dan CSS atau `requestAnimationFrame` untuk partikel dan sprite.

### F10 SEO dan berbagi
- `<title>`, meta description, Open Graph image (1200×630), favicon pixel-art, `lang="id"`.

## 6. Persyaratan non-fungsional

- Performa: JS awal < 180 KB gzip, gambar WebP, font di-self-host dengan `font-display: swap`.
- Kompatibilitas: dua versi mayor terakhir dari Chrome, Firefox, Safari, Edge; iOS Safari dan Chrome Android.
- Privasi: tanpa pelacak pihak ketiga. Analitik opsional dan hanya yang tanpa cookie.
- Keamanan: tidak ada rahasia di repositori frontend; tautan eksternal memakai `rel="noopener noreferrer"`; atur header keamanan dasar di hosting (CSP, X-Content-Type-Options, Referrer-Policy).

## 7. Stack teknis

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Framework | React 18 + Vite + TypeScript | Sesuai keahlian Okan |
| Gaya | Tailwind CSS, token warna dari `design.md` | Definisikan sebagai CSS variable |
| Animasi UI | Framer Motion | Hanya untuk momen yang disebut di `design.md` |
| Game | Canvas 2D, tanpa library game | Cukup untuk Bug Hunt; Phaser dipertimbangkan hanya jika game bertambah |
| Data konten | File TypeScript lokal (`skills.ts`, `projects.ts`) | Tanpa backend |
| Contributions | GitHub Action + `contributions.json` | Lihat F5 |
| Hosting | Vercel atau GitHub Pages | Pilih salah satu sebelum tahap deploy |
| Kualitas | ESLint, Prettier, Lighthouse CI | |

Struktur folder:

```
portfolio/
├─ public/
│  ├─ contributions.json
│  └─ og-image.png
├─ src/
│  ├─ components/
│  │  ├─ hud/
│  │  ├─ zones/        # Profil, Keahlian, TechStack, Project, Contributions, Arcade, Kontak
│  │  └─ games/        # BugHunt, LenteraMaze
│  ├─ data/            # skills.ts, projects.ts, profile.ts
│  ├─ styles/          # tokens.css
│  ├─ hooks/
│  └─ main.tsx
├─ .github/workflows/contributions.yml
└─ design.md, prd.md
```

## 8. Rencana kerja

| Tahap | Isi | Keluaran |
|---|---|---|
| 0 | Hasilkan desain di Stitch dari `design.md`, revisi bersama | Layar desktop dan mobile final |
| 1 | Setup Vite, Tailwind, token warna, font, struktur folder | Kerangka berjalan |
| 2 | HUD, hero, profil, keahlian, tech stack | Bagian statis lengkap |
| 3 | Project dan peta level | Empat project dengan link |
| 4 | GitHub Action dan grid contributions | Data asli tampil |
| 5 | Bug Hunt | Game dapat dimainkan, skor tersimpan |
| 6 | Interaksi dan gerak (F11), lalu aksesibilitas, reduced motion, responsif, SEO | Lighthouse memenuhi target |
| 7 | Deploy, domain, pengujian lintas peramban | Situs publik |
| 8 | Lentera Maze (opsional) | Game kedua |

## 9. Risiko

| Risiko | Dampak | Penanganan |
|---|---|---|
| Tema game terlalu ramai dan menutupi isi | Rekruter sulit membaca | Bangun dari token `design.md`, batasi dekorasi, uji dengan satu orang luar |
| Game berat di HP | Situs lambat | Muat game secara lazy saat zona Arcade terlihat |
| Token GitHub bocor | Akun terancam | Simpan hanya di GitHub Secrets, tidak pernah di frontend |
| Tampilan terasa generik | Tujuan 3 gagal | Tinjau hasil Stitch dan kode terhadap daftar "yang dihindari" di `design.md` |

## 10. Yang perlu Okan siapkan

1. Username GitHub, URL profil LinkedIn, alamat email publik.
2. `githubUrl` dan `liveUrl` untuk empat project.
3. Foto profil resolusi baik.
4. Keputusan hosting (Vercel atau GitHub Pages) dan apakah memakai domain sendiri.
5. Konfirmasi angka statistik (2+ tahun, 10 project, 12 teknologi) masih akurat.

## 11. Di luar cakupan versi 1.0

Blog, formulir kontak dengan backend, multi-bahasa, leaderboard online, mode terang.
