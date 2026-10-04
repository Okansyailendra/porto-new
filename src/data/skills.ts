export type SkillCategory = 'Semua' | 'Frontend' | 'Game' | 'Backend dan data' | 'Keamanan siber'

export interface SkillItem {
  id: string
  name: string
  category: 'Frontend' | 'Game' | 'Backend dan data' | 'Keamanan siber'
  level: number // 1 - 5
  description: string
  iconText: string
  iconUrl?: string // Path ke SVG di /public
}

export const skillsData: SkillItem[] = [
  // Frontend
  {
    id: 'fe-react',
    name: 'React',
    category: 'Frontend',
    level: 5,
    description: 'Membangun antarmuka komponen modular dengan manajemen state efisien.',
    iconText: 'RC',
    iconUrl: '/material-icon-theme--react.svg'
  },
  {
    id: 'fe-ts',
    name: 'TypeScript',
    category: 'Frontend',
    level: 4,
    description: 'Menulis kode frontend berskala besar dengan tipe data yang ketat.',
    iconText: 'TS',
    iconUrl: '/devicon--typescript.svg'
  },
  {
    id: 'fe-tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 5,
    description: 'Menyusun sistem desain utilitas yang konsisten dan responsif.',
    iconText: 'TW',
    iconUrl: '/devicon--tailwindcss.svg'
  },
  {
    id: 'fe-html-css',
    name: 'HTML & CSS Modern',
    category: 'Frontend',
    level: 5,
    description: 'Menyusun struktur semantik, tata letak grid presisi, dan aksesibilitas.',
    iconText: 'H5',
    iconUrl: '/skill-icons--html.svg'
  },

  // Game
  {
    id: 'game-canvas',
    name: 'Canvas 2D API',
    category: 'Game',
    level: 4,
    description: 'Mengembangkan game loop, rendering sprite, dan deteksi tabrakan 2D.',
    iconText: 'CV'
  },
  {
    id: 'game-math',
    name: 'Mekanika Game 2D',
    category: 'Game',
    level: 4,
    description: 'Merancang fisika pergerakan partikel, sistem proyektil, dan aturan ronde.',
    iconText: 'GM'
  },
  {
    id: 'game-pixel',
    name: 'Pixel Art & Desain Tile',
    category: 'Game',
    level: 3,
    description: 'Membuat aset visual bergaya piksel untuk antarmuka game petualangan.',
    iconText: 'PX'
  },

  // Backend dan data
  {
    id: 'be-node',
    name: 'Node.js',
    category: 'Backend dan data',
    level: 4,
    description: 'Menyusun API RESTful dan penanganan data asinkron.',
    iconText: 'JS',
    iconUrl: '/material-icon-theme--nodejs.svg'
  },
  {
    id: 'be-php-laravel',
    name: 'PHP & Laravel',
    category: 'Backend dan data',
    level: 4,
    description: 'Membangun arsitektur server MVC dan perutean aplikasi web.',
    iconText: 'LV',
    iconUrl: '/material-icon-theme--laravel.svg'
  },
  {
    id: 'be-mysql',
    name: 'MySQL',
    category: 'Backend dan data',
    level: 4,
    description: 'Merancang skema relasional, optimasi kueri, dan integritas data.',
    iconText: 'DB',
    iconUrl: '/logos--mysql.svg'
  },
  {
    id: 'be-python',
    name: 'Python',
    category: 'Backend dan data',
    level: 3,
    description: 'Membuat skrip otomasi pengolahan berkas dan pemrosesan data dasar.',
    iconText: 'PY',
    iconUrl: '/material-icon-theme--python.svg'
  },

  // Keamanan siber
  {
    id: 'sec-web',
    name: 'Keamanan Web Dasar',
    category: 'Keamanan siber',
    level: 3,
    description: 'Mengidentifikasi celah umum seperti XSS, CSRF, dan injeksi SQL.',
    iconText: 'SC'
  },
  {
    id: 'sec-headers',
    name: 'Hardening & Header Keamanan',
    category: 'Keamanan siber',
    level: 4,
    description: 'Menerapkan kebijakan Content Security Policy dan proteksi transfer data.',
    iconText: 'HD'
  },
  {
    id: 'sec-audit',
    name: 'Analisis Celah Sistem',
    category: 'Keamanan siber',
    level: 3,
    description: 'Memeriksa ketergantungan paket dan konfigurasi izin akses server.',
    iconText: 'AU'
  }
]
