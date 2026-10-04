export interface ProjectItem {
  slug: string
  level: number
  name: string
  tagline: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl: string
  status: 'Selesai' | 'Dalam Pengerjaan'
}

export const projectsData: ProjectItem[] = [
  {
    slug: 'tabung-gadget',
    level: 1,
    name: 'TabungGadget',
    tagline: 'Perencana tabungan gadget impian',
    description: 'Aplikasi web untuk merencanakan dan memantau target tabungan pembelian perangkat elektronik. Sistem menyediakan kalkulator estimasi waktu, pencatatan alokasi dana berkala, dan visualisasi progres tabungan.',
    stack: ['PHP', 'MySQL', 'CSS', 'JavaScript'],
    githubUrl: '',
    liveUrl: '',
    status: 'Selesai'
  },
  {
    slug: 'ic-plus',
    level: 2,
    name: 'IC Plus',
    tagline: 'Sistem manajemen layanan kesehatan desa',
    description: 'Platform pencatatan rekam medis dan administrasi klinik desa atau posyandu. Membantu petugas mendata warga, memantau jadwal imunisasi anak, dan mengelola rekap konsultasi kesehatan masyarakat.',
    stack: ['React', 'MySQL', 'Node.js', 'Tailwind'],
    githubUrl: '',
    liveUrl: '',
    status: 'Selesai'
  },
  {
    slug: 'nexora',
    level: 3,
    name: 'Nexora',
    tagline: 'Platform pemesanan hotel terpadu',
    description: 'Sistem reservasi kamar hotel dengan ketersediaan kamar yang diperbarui secara langsung. Dilengkapi modul pemilihan tipe ruangan, ringkasan rincian biaya, dan pencetakan bukti reservasi tamu.',
    stack: ['PHP', 'JavaScript', 'CSS', 'MySQL'],
    githubUrl: '',
    liveUrl: '',
    status: 'Selesai'
  },
  {
    slug: 'construct-erp',
    level: 4,
    name: 'ConstructERP',
    tagline: 'Sistem ERP administrasi konstruksi',
    description: 'Aplikasi manajemen operasional proyek konstruksi untuk mengontrol anggaran biaya material, pembagian jadwal pekerja di lapangan, dan pelaporan berkala progres fisik bangunan.',
    stack: ['React', 'MySQL', 'Node.js', 'Tailwind'],
    githubUrl: '',
    liveUrl: '',
    status: 'Selesai'
  }
]
