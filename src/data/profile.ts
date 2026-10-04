export interface ProfileData {
  name: string
  roles: string[]
  status: string
  avatarUrl?: string
  bioBlocks: {
    title: string
    content: string
  }[]
  stats: {
    label: string
    value: string
  }[]
  communities: {
    role: string
    organization: string
    description: string
  }[]
}

export const profileData: ProfileData = {
  name: 'Okan Syailendra',
  roles: ['Frontend Developer', 'Game Developer', 'Software Developer'],
  status: 'Aktif',
  avatarUrl: '/foto.webp',
  bioBlocks: [
    {
      title: 'Fokus pengembangan',
      content: 'Saya merancang antarmuka web yang cepat dibuka, nyaman dibaca, dan mudah diakses di berbagai perangkat.'
    },
    {
      title: 'Pendalaman keahlian',
      content: 'Fokus utama saya ada pada arsitektur frontend modern, mekanika game 2D, dan interaktivitas yang terukur.'
    },
    {
      title: 'Aktivitas komunitas',
      content: 'Saya bertugas sebagai Co-External Affairs di Komunitas Koalisi, wadah belajar keamanan siber dan pertahanan sistem.'
    }
  ],
  stats: [
    { label: 'pengalaman', value: '2+ tahun' },
    { label: 'project selesai', value: '10' },
    { label: 'teknologi', value: '12' }
  ],
  communities: [
    {
      role: 'Co-External Affairs',
      organization: 'Komunitas Koalisi',
      description: 'Menghubungkan mahasiswa dengan kegiatan riset dan workshop keamanan siber.'
    }
  ]
}
