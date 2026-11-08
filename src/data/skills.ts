export type SkillCategory = 'Semua' | 'Full Stack' | 'UI/UX' | 'Backend dan data' | 'Keamanan siber'

export interface SkillItem {
  id: string
  name: string
  category: 'Full Stack' | 'UI/UX' | 'Backend dan data' | 'Keamanan siber'
  level: number // 1 - 5
  description: string
  iconText: string
  iconUrl?: string // Path ke SVG di /public
}

export const skillsData: SkillItem[] = [
  // 1. React
  {
    id: 'fs-react',
    name: 'React',
    category: 'Full Stack',
    level: 5,
    description: 'Membangun antarmuka komponen modular dengan hooks dan manajemen state yang efisien.',
    iconText: 'RC',
    iconUrl: '/material-icon-theme--react.svg'
  },

  // 2. Tailwind CSS
  {
    id: 'fs-tailwind',
    name: 'Tailwind CSS',
    category: 'Full Stack',
    level: 5,
    description: 'Menyusun sistem desain utilitas yang konsisten, modern, responsif, dan terstandarisasi.',
    iconText: 'TW',
    iconUrl: '/devicon--tailwindcss.svg'
  },

  // 3. HTML
  {
    id: 'fs-html',
    name: 'HTML5',
    category: 'Full Stack',
    level: 5,
    description: 'Menyusun markup semantik modern, struktur dokumen web yang kuat, dan standar aksesibilitas.',
    iconText: 'H5',
    iconUrl: '/skill-icons--html.svg'
  },

  // 4. CSS
  {
    id: 'fs-css',
    name: 'CSS3',
    category: 'Full Stack',
    level: 5,
    description: 'Menguasai layout modern (Flexbox, Grid), animasi transisi halus, dan arsitektur styling responsif.',
    iconText: 'C3',
    iconUrl: '/skill-icons--css.svg'
  },

  // 5. Figma
  {
    id: 'uiux-figma',
    name: 'Figma',
    category: 'UI/UX',
    level: 5,
    description: 'Merancang antarmuka visual UI/UX, wireframe presisi, prototipe interaktif, dan design system handoff.',
    iconText: 'FG',
    iconUrl: '/logos--figma.svg'
  },

  // 6. PHP
  {
    id: 'be-php',
    name: 'PHP',
    category: 'Backend dan data',
    level: 4,
    description: 'Mengembangkan logika sisi server, perutean dinamis, manipulasi data, dan integrasi backend.',
    iconText: 'PHP',
    iconUrl: '/material-icon-theme--php.svg'
  },

  // 7. Laravel
  {
    id: 'be-laravel',
    name: 'Laravel',
    category: 'Backend dan data',
    level: 4,
    description: 'Membangun arsitektur server MVC, ORM Eloquent, autentikasi aman, dan RESTful API modern.',
    iconText: 'LV',
    iconUrl: '/material-icon-theme--laravel.svg'
  },

  // 8. MySQL
  {
    id: 'be-mysql',
    name: 'MySQL',
    category: 'Backend dan data',
    level: 4,
    description: 'Merancang skema relasional, optimasi kueri SQL, pengindeksan, dan integritas data.',
    iconText: 'DB',
    iconUrl: '/logos--mysql.svg'
  },

  // 9. PostgreSQL
  {
    id: 'be-postgresql',
    name: 'PostgreSQL',
    category: 'Backend dan data',
    level: 4,
    description: 'Merancang basis data relasional tingkat lanjut, kueri kompleks teroptimasi, dan kepatuhan ACID.',
    iconText: 'PG',
    iconUrl: '/logos--postgresql.svg'
  },

  // 10. Node.js
  {
    id: 'be-node',
    name: 'Node.js',
    category: 'Backend dan data',
    level: 4,
    description: 'Menyusun runtime server asinkron, REST API berperforma tinggi, dan integrasi mikrolayanan.',
    iconText: 'JS',
    iconUrl: '/material-icon-theme--nodejs.svg'
  },

  // 11. TypeScript
  {
    id: 'fs-ts',
    name: 'TypeScript',
    category: 'Full Stack',
    level: 4,
    description: 'Menulis kode aplikasi web berskala besar dengan sistem tipe data statis yang ketat dan andal.',
    iconText: 'TS',
    iconUrl: '/devicon--typescript.svg'
  },

  // 12. Python
  {
    id: 'be-python',
    name: 'Python',
    category: 'Backend dan data',
    level: 3,
    description: 'Membuat skrip otomasi pengolahan berkas, scripting utilitas, dan manipulasi data dasar.',
    iconText: 'PY',
    iconUrl: '/material-icon-theme--python.svg'
  },

  // 13. Keamanan Web Dasar
  {
    id: 'sec-web',
    name: 'Keamanan Web Dasar',
    category: 'Keamanan siber',
    level: 2,
    description: 'Mempelajari dan mengenali celah umum aplikasi web seperti XSS, CSRF, dan validasi input pengguna.',
    iconText: 'SC'
  },

  // 14. Hardening & Header Keamanan
  {
    id: 'sec-headers',
    name: 'Hardening & Header Keamanan',
    category: 'Keamanan siber',
    level: 2,
    description: 'Mempelajari konfigurasi dasar header proteksi (CSP, CORS), SSL/TLS, dan prinsip pengamanan koneksi web.',
    iconText: 'HD'
  },

  // 15. Analisis Celah Sistem
  {
    id: 'sec-audit',
    name: 'Analisis Celah Sistem',
    category: 'Keamanan siber',
    level: 1,
    description: 'Mengeksplorasi dasar-dasar pengujian celah OWASP, audit ketergantungan paket, dan sistem Linux.',
    iconText: 'AU'
  }
]
