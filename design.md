# design.md — Portofolio Okan Syailendra (KannzDev)

Tema terpilih: **Game, adventure-first dengan HUD ala FPS**.
Satu kalimat konsep: portofolio ini adalah dunia game 2D yang bisa dijelajahi, dan setiap bagian situs adalah satu zona di peta dunia itu.

Dokumen ini dibuat untuk ditempel ke Stitch. Bagian "Prompt untuk Stitch" di paling bawah bisa dipakai langsung.

---

## 1. Arah visual

Dunia malam di hutan pegunungan. Penerangnya lentera dan api unggun, jadi cahaya hangat hanya muncul di tempat yang penting (judul zona, tombol utama, tile contribution yang aktif). Sisanya biru-hijau gelap yang tenang.

Referensi rasa, bukan untuk ditiru: UI menu pause game adventure 2D, HUD game FPS taktis yang bersih (tanpa dekorasi berlebih), peta dunia bergaya fog of war.

Yang dihindari:
- Latar hitam pekat dengan satu aksen neon hijau atau ungu.
- Kartu bulat identik dengan bayangan abu yang sama.
- Gradasi ungu-pink pada satu kata di judul.
- Label kecil huruf kapital di atas setiap judul.
- Animasi fade-slide pada setiap section.
- Planet, bintang, astronot, atau elemen luar angkasa (itu desain lama).

## 2. Palet warna

| Nama | Hex | Peran |
|---|---|---|
| Malam Gunung | `#16222D` | Latar utama |
| Kabut Lembah | `#22343F` | Panel, kartu, HUD |
| Lumut | `#6FA36B` | Status aktif, tile contribution level menengah, tombol sekunder |
| Lentera | `#F4A93B` | Aksen utama, tombol utama, sorotan zona aktif |
| Darah Bug | `#E5534B` | Hit marker, error, bug di mini game |
| Tulang | `#E6E0D0` | Teks utama |
| Embun | `#8DB4C4` | Teks sekunder, garis tipis, tile kosong |

Aturan pakai:
- Lentera dipakai hemat. Satu layar maksimal dua elemen berwarna Lentera.
- Teks utama di atas Malam Gunung harus memenuhi kontras WCAG AA (Tulang di atas Malam Gunung sekitar 11:1, aman).
- Darah Bug hanya untuk hal berbahaya atau target tembak, tidak untuk dekorasi.

## 3. Tipografi

- **Judul dan angka HUD:** Pixelify Sans (Google Fonts), bobot 600–700. Dipakai besar dan dibiarkan apa adanya, tanpa gradasi.
- **Teks isi:** Atkinson Hyperlegible (Google Fonts), bobot 400 dan 700. Nyaman dibaca di layar gelap.
- **Kode dan nilai teknis (versi, jumlah commit):** pakai Pixelify Sans juga. Tidak perlu font monospace ketiga.

Skala (rasio 1.25, basis 16 px):

| Level | Ukuran | Pemakaian |
|---|---|---|
| Display | 56 / 64 px | Judul hero saja |
| H2 | 36 px | Judul zona |
| H3 | 24 px | Judul project, panel |
| Body | 16–18 px | Paragraf, panjang baris maksimal 68 karakter |
| Small | 14 px | Keterangan tile, tag |

Gunakan sentence case di seluruh situs. Tidak ada huruf kapital semua untuk label.

## 4. Layout

Satu halaman, scroll vertikal. Setiap section adalah **zona** dengan nama yang menjelaskan isinya.

```
┌──────────────────────────────────────────────────────────┐
│ [♥♥♥♥♡ progress scroll]                 [1][2][3][4][5]  │  HUD atas
├──────────────────────────────────────────────────────────┤
│                                                          │
│   Halo, saya Okan.                    ┌──────────────┐   │
│   Frontend & game developer.          │  ilustrasi   │   │
│   Saya juga belajar keamanan siber.   │  pixel-art   │   │
│                                       │  kemah +     │   │
│   [Main Bug Hunt]  [Lihat project]    │  lentera     │   │
│                                       └──────────────┘   │
│                         + crosshair mengikuti kursor     │
├──────────────────────────────────────────────────────────┤
│  Zona 1  Profil          rata kiri, 2 kolom              │
│  Zona 2  Keahlian        grid inventory                  │
│  Zona 3  Tech stack      hotbar / slot item              │
│  Zona 4  Project         peta level, 4 level             │
│  Zona 5  Contributions   peta fog of war                 │
│  Zona 6  Arcade          mini game                       │
│  Zona 7  Kontak          api unggun                      │
└──────────────────────────────────────────────────────────┘
```

Alignment: semua teks rata kiri. Hanya hero dan zona kontak yang boleh punya elemen terpusat. Lebar konten maksimum 1120 px.

Nav bagian atas berupa **hotbar** dengan lima slot bernomor. Nomornya benar-benar tombol keyboard (tekan 1–5 untuk loncat ke zona). Ini satu-satunya penomoran di situs, dan fungsinya nyata.

Radius sudut: panel 4 px (kesan blok piksel), tombol 2 px, avatar dan tile kotak. Tidak ada satu radius untuk semua hal.

## 5. Komponen

### 5.1 HUD
- Kiri atas: bar nyawa lima hati. Hati terisi sesuai progres scroll.
- Kanan atas: hotbar nav, slot aktif diberi garis bawah Lentera.
- Kanan bawah: skor tertinggi Bug Hunt (diambil dari localStorage). Kosong jika belum pernah main.
- Kursor di hero berubah jadi crosshair tipis. Di luar hero kembali normal.

### 5.2 Hero
- Judul: "Halo, saya Okan." Satu kalimat deskripsi di bawahnya.
- Ilustrasi pixel-art kemah dan lentera di sisi kanan. Lentera berkedip pelan. Pengunjung bisa menembak elemen dekoratif di sini (lihat bagian 6.3).
- Dua tombol: "Main Bug Hunt" (Lentera, mengarah ke zona Arcade) dan "Lihat project" (garis Embun).

### 5.3 Profil
- Foto dalam bingkai kartu ID bergaya pass game: nama, peran, status "Aktif".
- Tiga blok teks: apa yang saya kerjakan, fokus keahlian, komunitas keamanan siber.
- Statistik di bawahnya hanya jika angkanya benar: 2+ tahun pengalaman, 10 project selesai, 12 teknologi. Tampil sebagai baris kecil, bukan tiga kartu besar.

### 5.4 Keahlian (grid inventory)
- Grid slot persegi. Tiap slot berisi ikon pixel dan nama keahlian.
- Hover atau fokus keyboard membuka panel detail: deskripsi singkat dan level (misal "Level 4 dari 5").
- Kelompok: Frontend, Game, Backend dan data, Keamanan siber.

### 5.5 Tech stack (hotbar)
- Baris slot dengan logo teknologi: JavaScript, TypeScript, HTML, React, Node.js, Tailwind CSS, PHP, Laravel, MySQL, Python, Figma, GitHub.
- Logo tampil monokrom Embun, berwarna penuh saat hover atau fokus.

### 5.6 Project (peta level)
- Empat project: TabungGadget, IC Plus, Nexora, ConstructERP.
- Tampilan: jalur horizontal di peta dengan empat titik level. Klik titik membuka panel di bawahnya berisi deskripsi, tech tag, dan dua tombol: **Kode di GitHub** dan **Buka website**.
- Di mobile, jalur berubah vertikal.
- Status project ("Production") tampil sebagai lencana kecil bertuliskan "Selesai".

### 5.7 GitHub contributions (peta fog of war)
- Data: 52 minggu × 7 hari, tiap hari satu tile persegi.
- Tile tanpa commit: Embun 15% opasitas (tertutup kabut).
- Tile dengan commit: terbuka dengan 4 tingkat warna, dari Lumut gelap ke Lumut terang ke Lentera pada tingkat tertinggi.
- Hover atau fokus: tooltip bergaya kotak dialog game, isi "12 Mar: 3 commit".
- Di bawahnya tertera total, misalnya "149 commit dalam setahun", dan streak terpanjang.
- Satu momen animasi: saat zona masuk layar, kabut terangkat dari kiri ke kanan sekali saja.

### 5.8 Arcade (mini game)
**Bug Hunt**, game tembak sederhana di canvas.
- Bug piksel muncul di layar, klik untuk menembak, 30 detik.
- Tembakan kena: bug pecah, skor naik. Meleset: tidak ada penalti, tapi combo reset.
- Bug berukuran kecil dan cepat bernilai lebih tinggi.
- Skor tertinggi disimpan di localStorage.
- Kontrol: mouse atau sentuh. Tombol "Mulai", "Ulang", dan "Jeda" jelas terlihat.
- Fase berikutnya: **Lentera Maze**, labirin kecil yang dijelajahi dengan tombol panah.

### 5.9 Kontak
- Latar api unggun. Tombol "Kirim email", "GitHub", "LinkedIn".
- Satu kalimat ajakan, tanpa formulir panjang.

## 6. UX, gerak, dan interaksi

Prinsip: gerak punya tiga sumber yang sah.
1. **Urutan pembuka** yang diputar sekali (6.1).
2. **Jawaban atas aksi pengunjung**: hover, klik, tembak, scroll (6.3 sampai 6.6).
3. **Ambient kecil** yang hanya ada di dua tempat: lentera di hero dan api unggun di kontak.

Gerak tidak boleh muncul di elemen lain secara acak. Bagian yang paling berani adalah Bug Hunt dan peta fog of war; zona lain dibuat tenang supaya dua hal itu menonjol.

### 6.1 Urutan pembuka (sekali, maksimal 2,5 detik)
1. Layar gelap, lentera di hero menyala (0–0,6 dtk).
2. Lima hati di HUD terisi satu per satu (0,6–1,2 dtk).
3. Judul hero tampil huruf demi huruf dengan gaya mesin ketik piksel (1,2–2,2 dtk).
4. Tombol dan hotbar muncul serentak.

Aturan: tombol "Lewati" kecil di pojok, urutan tidak diputar ulang saat pengunjung kembali dalam sesi yang sama (simpan di `sessionStorage`), dan dilewati otomatis pada reduced motion.

### 6.2 Petunjuk untuk pengunjung baru
- Setelah urutan pembuka, tampil satu toast di bawah: "Tekan 1 sampai 5 untuk berpindah zona. Klik di hero untuk menembak."
- Toast hilang sendiri setelah 6 detik atau saat pengunjung menekan tombol apa pun. Tidak muncul lagi di kunjungan berikutnya.
- Ada tombol bantuan "?" di HUD yang menampilkan ulang petunjuk.

### 6.3 Hero: dunia yang bereaksi
- **Parallax tiga lapis** (gunung jauh, pohon pinus, tanah depan). Lapisan bergerak berbeda kecepatan mengikuti scroll dan sedikit mengikuti posisi kursor (maksimal 12 px).
- **Crosshair** di hero. Klik menembakkan efek singkat: tanda hit kecil di titik klik, dan elemen dekoratif (kunang-kunang, bug kecil) yang terkena pecah jadi partikel.
- **Bug tersembunyi:** tiga sampai lima bug piksel merayap di sekitar halaman. Menembaknya menambah hitungan di HUD ("Bug ditemukan 2/5"). Menemukan semuanya membuka lencana kecil di kartu ID profil. Ini bonus, bukan syarat membaca isi situs.

### 6.4 HUD dan navigasi
- **Hati:** terisi mengikuti scroll dengan transisi 200 ms. Saat pengunjung masuk zona baru, hati terakhir berdenyut satu kali.
- **Hotbar:** menekan angka 1–5 memindahkan slot aktif dan menggulir halaman dengan easing lembut (500 ms). Slot aktif diberi garis Lentera yang bergeser dari slot lama ke slot baru.
- **Minimap vertikal** di tepi kanan (desktop saja): titik kecil per zona dengan sprite karakter yang berpindah mengikuti scroll. Klik titik untuk loncat ke zona.
- **Zona terbuka:** saat zona pertama kali masuk layar, muncul toast singkat gaya game, misalnya "Zona project terbuka". Maksimal satu toast pada satu waktu.
- **Tombol kembali ke atas:** muncul setelah zona ketiga, berbentuk slot hotbar kecil.

### 6.5 Interaksi per zona
- **Profil:** kartu ID bisa dibalik (klik atau Enter) menampilkan sisi belakang berisi daftar peran dan komunitas. Balik 300 ms. Kartu miring 2° saat diam, lurus saat hover.
- **Keahlian:** hover atau fokus pada slot membuka panel detail dengan bar level yang terisi dalam 400 ms. Slot yang sama diklik lagi untuk menutup. Pengunjung dapat memfilter per kelompok lewat tab kecil di atas grid.
- **Tech stack:** logo berubah dari monokrom ke warna penuh saat hover, disertai gerak naik 2 px. Tidak ada efek lain.
- **Project:** klik titik level menggerakkan sprite karakter di sepanjang jalur ke titik itu (400–600 ms, gerakan bertahap seperti langkah piksel), lalu panel detail terbuka. Klik titik lain memindahkan sprite lagi. Panel punya tombol tutup dan bisa ditutup dengan Esc.
- **Contributions:** saat zona masuk layar, kabut terangkat dari kiri ke kanan sekali (1,2 detik). Hover tile menampilkan dialog "12 Mar: 3 commit". Klik tile bulan tertentu menyorot seluruh bulan itu.
- **Arcade:** lihat 6.7.
- **Kontak:** api unggun berkedip. Hover pada tombol kontak memercikkan beberapa partikel api.

### 6.6 Umpan balik mikro
- **Tombol:** saat ditekan, bergeser 2 px ke bawah dan bayangan pikselnya menghilang.
- **Hover tombol utama:** isian Lentera naik dari bawah dalam 150 ms.
- **Fokus keyboard:** garis Lentera 2 px dengan jarak 2 px dari elemen.
- **Salin email:** tombol "Salin email" berubah jadi "Tersalin" selama 2 detik.
- **Status memuat:** grid contributions menampilkan tile kabut yang berkedip pelan sampai data tiba.
- **Status gagal:** pesan jelas dengan tindakan ("Data contributions belum bisa dimuat. Coba muat ulang halaman.").

### 6.7 Arcade: Bug Hunt
- **Mulai:** hitung mundur 3-2-1 dengan angka piksel besar, lalu bug muncul.
- **Tembakan kena:** bug pecah jadi 6–8 partikel, angka skor melayang naik dan memudar, layar bergetar 2 px selama 80 ms.
- **Tembakan meleset:** tanda silang merah kecil di titik klik, combo kembali ke ×1.
- **Combo:** penghitung combo membesar sedikit setiap naik tingkat, berubah ke Lentera di ×3.
- **Sepuluh detik terakhir:** bar waktu berubah ke merah dan berdenyut, bug muncul lebih cepat.
- **Selesai:** panel hasil berisi skor, akurasi, combo tertinggi, dan perbandingan dengan skor terbaik. Rekor baru ditandai lencana "Rekor baru" dan hati HUD berkedip sekali.
- **Opsional:** efek suara sederhana, mati secara bawaan, dengan tombol speaker di HUD. Status tersimpan di `localStorage`.

### 6.8 Easter egg
- Kode Konami (naik, naik, turun, turun, kiri, kanan, kiri, kanan, B, A) mengubah palet situs ke mode "senja" (latar sedikit lebih hangat) selama sesi itu. Tampilkan toast "Mode senja aktif".
- Cukup satu easter egg. Jangan menambah lagi.

### 6.9 Token gerak
| Token | Nilai | Pemakaian |
|---|---|---|
| `dur-fast` | 120 ms | Hover, tekan tombol |
| `dur-base` | 200–300 ms | Panel, toast, hati |
| `dur-slow` | 500 ms | Scroll antar zona, kartu balik |
| `dur-scene` | 1200 ms | Kabut contributions |
| Easing UI | `cubic-bezier(0.2, 0, 0, 1)` | Elemen antarmuka |
| Easing piksel | `steps(6, end)` | Sprite, mesin ketik, langkah karakter |

### 6.10 Reduced motion dan performa
- `prefers-reduced-motion`: urutan pembuka dilewati, parallax dimatikan, kabut langsung terbuka, kedip lentera dan api unggun dibekukan, getar layar dan partikel dihapus. Fungsi tetap utuh: panel tetap terbuka, tombol tetap bekerja.
- Hanya animasikan `transform` dan `opacity`. Hindari animasi `width`, `height`, atau `top`.
- Parallax dan partikel berhenti saat tab tidak aktif atau elemen di luar layar.
- Anggaran: animasi tidak boleh menurunkan frame rate di bawah 50 fps pada HP kelas menengah.

### 6.11 Alur pengguna utama
1. Rekruter: hero, profil, project, buka tautan GitHub atau website. Target: dua klik dari halaman awal.
2. Developer: tech stack, project, GitHub contributions.
3. Pengunjung yang penasaran: hero (menembak bug), Arcade, kembali ke profil.

Semua alur harus bisa diselesaikan tanpa memainkan game dan tanpa mouse.

## 7. Salinan teks (copywriting)

Aturan: kalimat aktif, sentence case, subjek manusia, tanpa kata sifat berlebihan, tanpa tanda pisah panjang.

Contoh:
- Hero: "Halo, saya Okan. Saya membuat antarmuka web dan game kecil."
- Profil: "Saya frontend dan game developer. Saya senang merancang antarmuka yang cepat dipakai dan game yang bisa dimainkan siapa saja."
- Keamanan: "Saya Co-External Affairs di Komunitas Koalisi, komunitas mahasiswa yang belajar keamanan siber bersama."
- Tombol: "Main Bug Hunt", "Lihat project", "Kode di GitHub", "Buka website", "Kirim email".
- Pesan kosong (belum ada skor): "Belum ada skor. Mulai satu ronde."

## 8. Responsif

- Breakpoint: 640, 1024, 1280 px.
- Mobile: HUD atas menyusut jadi hati + menu. Hotbar pindah ke bawah layar sebagai bilah navigasi.
- Grid contributions bisa digeser horizontal di dalam kontainernya. Halaman tidak boleh scroll ke samping.
- Bug Hunt tetap bisa dimainkan dengan sentuhan.

## 9. Aset

- Ilustrasi pixel-art: kemah, lentera, pohon pinus, latar gunung berlapis tiga (parallax statis, tanpa animasi scroll).
- Ikon keahlian: set pixel 24×24, buat konsisten satu gaya.
- Foto profil: foto asli, dipotong persegi.

---

## Prompt untuk Stitch

Salin teks di bawah ini ke Stitch.

```
Desain website portofolio satu halaman untuk Okan Syailendra, frontend dan game developer. Bahasa: Indonesia.

Konsep: dunia game 2D adventure di hutan pegunungan pada malam hari. Setiap section adalah zona di peta dunia. Antarmuka memakai HUD ala game FPS taktis yang bersih.

Palet: latar #16222D, panel #22343F, teks #E6E0D0, teks sekunder #8DB4C4, aksen utama #F4A93B (dipakai hemat), hijau lumut #6FA36B, merah #E5534B hanya untuk target tembak dan error.

Tipografi: judul Pixelify Sans, teks isi Atkinson Hyperlegible. Sentence case, tanpa huruf kapital semua. Semua teks rata kiri.

Struktur: HUD atas (bar lima hati sebagai progres scroll di kiri, hotbar navigasi lima slot bernomor di kanan), hero dengan ilustrasi pixel-art kemah dan lentera, zona Profil (kartu ID bergaya pass game), zona Keahlian (grid inventory dengan slot persegi), zona Tech stack (baris hotbar berisi logo), zona Project (peta level horizontal dengan empat titik: TabungGadget, IC Plus, Nexora, ConstructERP; tiap level punya tombol "Kode di GitHub" dan "Buka website"), zona GitHub contributions (grid 52x7 bergaya peta fog of war: tile tanpa commit tertutup kabut, tile aktif terbuka dengan empat tingkat warna dari lumut ke lentera), zona Arcade (mini game Bug Hunt, tembak bug piksel dalam 30 detik), zona Kontak (api unggun).

Hindari: latar hitam dengan satu aksen neon, kartu bulat identik, gradasi pada satu kata judul, label kecil kapital di atas judul, elemen luar angkasa, animasi fade-slide di setiap section. Sudut panel 4 px, tombol 2 px.

Buat versi desktop (1440 px) dan mobile (390 px).
```
