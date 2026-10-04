# Panduan Antigravity: dari folder kosong sampai situs tayang

Proyek: portofolio Okan Syailendra. Folder kerja: `C:\laragon\www\porto`.
Acuan: `design.md` (desain, UX, gerak) dan `prd.md` (fitur, stack, tahap).

Aturan kerja yang berlaku di semua tahap:
1. Satu tahap, satu percakapan agen baru. Percakapan yang terlalu panjang membuat agen lupa aturan.
2. Periksa hasil di browser sebelum lanjut.
3. Commit di akhir tiap tahap.
4. Kalau hasil menyimpang, kirim screenshot dan sebut bagian yang salah. Jangan menulis ulang seluruh prompt.

---

## Tahap 0. Persiapan (di luar agen)

Pastikan terpasang: Node.js versi LTS (`node -v`), Git (`git --version`). Laragon tidak dipakai untuk proyek ini karena Vite punya server sendiri.

Susun folder `C:\laragon\www\porto`:

```
porto/
├─ .agents/skills/        (sudah ada: taste-skill, dan stop-slop setelah dipasang)
├─ design/                (screenshot desktop dan mobile dari Stitch)
├─ design.md
├─ prd.md
└─ skills-lock.json
```

Langkah:
1. Pasang stop-slop: `npx skills add https://github.com/hardikpandya/stop-slop`
2. Salin `design.md` dan `prd.md` ke root folder. File `design-stitch.md` tidak perlu dimasukkan; itu hanya untuk Stitch.
3. Simpan screenshot final dari Stitch ke folder `design/` dengan nama jelas: `desktop.png`, `mobile.png`.
4. Siapkan data: username GitHub, email publik, URL LinkedIn, link GitHub dan website empat project, foto profil.
5. Di terminal: `git init`, lalu buat repositori kosong di github.com untuk dihubungkan nanti.
6. Buka folder di Antigravity, mulai percakapan baru, tanya: "Tampilkan skill yang tersedia untukmu." Pastikan `stop-slop` dan `taste-skill` muncul.

---

## Tahap 1. Kerangka proyek

```
Baca design.md dan prd.md di root proyek sampai selesai. Lihat juga screenshot di folder design/ sebagai acuan tata letak.

Aturan untuk seluruh proyek ini:
- Jika skill dan design.md bertentangan, design.md yang menang.
- Gunakan skill stop-slop untuk semua teks yang tampil di situs.
- Jangan memakai gaya soft, minimalis, atau brutalis dari skill. Tema kita adalah game pixel-art seperti dijelaskan di design.md.
- Jangan menambah elemen visual yang tidak ada di design.md.

Kerjakan Tahap 1 dari prd.md bagian 8:
- Setup Vite + React + TypeScript + Tailwind CSS di folder ini. Folder sudah berisi .agents, design/, design.md, prd.md dan skills-lock.json; jangan hapus apa pun.
- Buat src/styles/tokens.css berisi warna, ukuran font, radius, jarak, dan token gerak dari design.md sebagai CSS variable, lalu hubungkan ke Tailwind.
- Pasang font Pixelify Sans dan Atkinson Hyperlegible secara self-host.
- Buat struktur folder sesuai prd.md bagian 7.
- Buat .gitignore yang mengabaikan node_modules, dist, dan .env.
- Halaman awal cukup menampilkan satu judul dengan font dan warna yang benar.

Berhenti setelah selesai. Jelaskan cara menjalankannya.
```

Periksa: `npm run dev` jalan, font dan warna benar, konsol bersih.
Commit: `git add .` lalu `git commit -m "Tahap 1: kerangka proyek"`

---

## Tahap 2. HUD, hero, dan urutan pembuka

Dikerjakan lebih dulu dari zona lain karena menentukan seluruh nuansa situs.

```
Baca design.md bagian 4, 5.1, 5.2, 6.1 sampai 6.4, dan 6.9 sampai 6.10.

Sebelum menulis kode, tulis rencana tata letak hero dan HUD dalam bentuk ASCII dan daftar komponen. Tunggu persetujuan saya.

Setelah disetujui, kerjakan:
- HUD atas: bar lima hati sebagai progres scroll, hotbar nav lima slot dengan pintasan keyboard 1 sampai 5.
- Hero: judul, satu kalimat deskripsi, dua tombol, ilustrasi pixel-art placeholder (kotak bertuliskan "ilustrasi kemah") di tempat ilustrasi.
- Urutan pembuka sesuai 6.1, dengan tombol Lewati dan penyimpanan di sessionStorage.
- Parallax tiga lapis dengan placeholder berwarna solid.
- Toast petunjuk pengunjung baru sesuai 6.2.
- Dukungan prefers-reduced-motion sesuai 6.10.

Teks mengikuti stop-slop dan contoh di design.md bagian 7. Berhenti setelah selesai.
```

Periksa: tombol 1 sampai 5 berpindah zona, Lewati berfungsi, dengan reduced motion di sistem operasi urutan pembuka dilewati.

---

## Tahap 3. Profil, keahlian, tech stack

```
Baca design.md bagian 5.3 sampai 5.5 dan 6.5 (bagian Profil, Keahlian, Tech stack), serta prd.md F1 sampai F3.

Bangun tiga zona itu:
- Profil: kartu ID yang bisa dibalik, tiga blok teks, statistik sebagai baris kecil.
- Keahlian: grid inventory dengan panel detail dan bar level, tab filter per kelompok.
- Tech stack: baris slot logo, monokrom saat diam dan berwarna saat hover atau fokus.

Data dari src/data/profile.ts dan src/data/skills.ts. Ikon dari SVG lokal, bukan CDN. Teks mengikuti stop-slop. Berhenti setelah selesai.
```

Periksa: semua slot bisa dicapai dengan Tab, panel detail terbuka dengan Enter, tampilan mobile tidak melebar.

---

## Tahap 4. Project dan peta level

Isi dulu data ini di prompt sebelum mengirim.

```
Baca design.md bagian 5.6 dan 6.5 (bagian Project), serta prd.md F4.

Isi src/data/projects.ts dengan empat project: TabungGadget, IC Plus, Nexora, ConstructERP.
URL project:
- TabungGadget: GitHub [isi], website [isi]
- IC Plus: GitHub [isi], website [isi]
- Nexora: GitHub [isi], website [isi]
- ConstructERP: GitHub [isi], website [isi]
Jika URL kosong, sembunyikan tombolnya.

Bangun peta level horizontal dengan empat titik, sprite karakter yang berjalan ke titik terpilih, panel detail yang bisa ditutup dengan Esc, dan versi vertikal di mobile. Tautan eksternal memakai rel="noopener noreferrer". Berhenti setelah selesai.
```

---

## Tahap 5. GitHub contributions

```
Baca design.md bagian 5.7 dan 6.5 (bagian Contributions), serta prd.md F5.

- Buat .github/workflows/contributions.yml yang berjalan setiap 12 jam dan menulis public/contributions.json dari GitHub GraphQL API untuk username [isi username]. Token dibaca dari secret bernama GH_CONTRIB_TOKEN. Jangan menulis token di kode.
- Buat komponen grid 52x7 bergaya fog of war dengan empat tingkat intensitas dari kuantil data.
- Tampilkan total commit dan streak terpanjang.
- Tampilkan pesan kosong dari prd.md jika data gagal dimuat.
- Untuk pengembangan lokal, buat public/contributions.json contoh agar grid bisa dilihat.

Berhenti setelah selesai.
```

Kerjakan sendiri (jangan serahkan ke agen):
1. Di GitHub: Settings > Developer settings > Personal access tokens, buat token dengan izin baca.
2. Di repositori: Settings > Secrets and variables > Actions, tambahkan secret `GH_CONTRIB_TOKEN`.
3. Push proyek ke GitHub, lalu jalankan workflow secara manual satu kali untuk mengisi data asli.

---

## Tahap 6. Bug Hunt

```
Baca design.md bagian 5.8 dan 6.7, serta prd.md F6 (hanya Bug Hunt).

Bangun Bug Hunt dengan Canvas 2D tanpa library game:
- Durasi 30 detik, tiga ukuran bug, combo, skor tertinggi di localStorage dengan try/catch.
- Hitung mundur 3-2-1, partikel saat kena, getar layar 2 px selama 80 ms, tanda silang saat meleset.
- Tombol Mulai, Jeda, Ulang. Jeda otomatis saat tab tidak aktif.
- Dukungan sentuh. Muat game secara lazy saat zona Arcade terlihat.
- Mode reduced motion mengurangi partikel dan getar.
- Efek suara opsional, mati secara bawaan.

Berhenti setelah selesai.
```

Periksa: mainkan di HP sungguhan, bukan hanya mode responsif di browser.

---

## Tahap 7. Kontak, bug tersembunyi, easter egg

```
Baca design.md bagian 5.9, 6.3 (bug tersembunyi), 6.4 (minimap dan toast zona), 6.6, dan 6.8.

Kerjakan:
- Zona kontak dengan api unggun dan tombol Kirim email (dengan "Salin email"), GitHub, LinkedIn.
- Crosshair di hero dan tiga sampai lima bug tersembunyi dengan hitungan di HUD.
- Minimap vertikal di desktop dan toast "zona terbuka".
- Kode Konami untuk mode senja.

Berhenti setelah selesai.
```

---

## Tahap 8. Aksesibilitas, performa, dan SEO

```
Baca prd.md F9, F10, dan bagian 6 (non-fungsional).

- Periksa semua elemen interaktif dengan keyboard dan perbaiki urutan tab.
- Tambahkan aria-label di grid contributions, game, dan tombol ikon.
- Tambahkan meta tag, Open Graph, favicon, lang="id".
- Jalankan Lighthouse mobile dan perbaiki sampai memenuhi target di prd.md bagian 2.
- Pastikan semua alur di design.md bagian 6.11 bisa diselesaikan hanya dengan keyboard.

Laporkan skor sebelum dan sesudah.
```

---

## Tahap 9. Tinjauan desain sebelum tayang

```
Tinjau seluruh situs terhadap daftar "Yang dihindari" di design.md bagian 1, bagian "Do's and Don'ts", dan skill taste-skill. Sebutkan bagian yang masih terlihat generik atau seperti buatan AI, jelaskan kenapa, lalu perbaiki. Jangan menambah dekorasi baru.
Tinjau juga semua teks dengan stop-slop dan tulis ulang yang bermasalah.
```

Setelah itu ganti semua placeholder dengan aset asli: ilustrasi pixel-art kemah dan lentera, ikon keahlian, foto profil.

---

## Tahap 10. Deploy

Pilih satu: Vercel atau GitHub Pages.

```
Siapkan deploy ke [Vercel / GitHub Pages]. Tulis langkah yang harus saya lakukan sendiri (akun, domain), lalu atur konfigurasi build di repositori. Tambahkan header keamanan dasar (CSP, X-Content-Type-Options, Referrer-Policy) jika platformnya mendukung.
```

Setelah situs tayang, uji di Chrome, Firefox, Safari (atau perangkat iOS), dan HP Android. Jalankan ulang Lighthouse pada URL publik.

---

## Tahap 11 (opsional). Lentera Maze

Kerjakan hanya setelah situs pertama tayang.

```
Baca prd.md F6 bagian Lentera Maze dan design.md bagian 5.8. Bangun game kedua di zona Arcade dengan tab pilihan antara Bug Hunt dan Lentera Maze. Berhenti setelah selesai.
```

---

## Jika agen menyimpang

| Masalah | Perbaikan |
|---|---|
| Hasil terlihat generik | Kirim screenshot, sebut elemen yang salah, rujuk bagian "Yang dihindari" di design.md |
| Agen menambah fitur yang tidak diminta | Tulis: "Hapus yang tidak ada di design.md atau prd.md" |
| Agen lupa aturan di tengah jalan | Mulai percakapan baru dan ulangi baris "Baca design.md bagian ..." |
| Skill tidak terbaca | Restart Antigravity, cek folder `.agents/skills/<nama>/SKILL.md` |
| Kode rusak setelah revisi | `git restore .` atau `git checkout` ke commit tahap sebelumnya |
