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
  roles: ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer'],
  status: 'Aktif',
  avatarUrl: '/foto.webp',
  bioBlocks: [
    {
      title: 'Fokus pengembangan',
      content: 'Saya merancang aplikasi web full stack modern yang cepat dibuka, aman, dan intuitif digunakan.'
    },
    {
      title: 'Pendalaman keahlian',
      content: 'Fokus utama saya ada pada arsitektur full stack terintegrasi, perancangan UI/UX yang elegan, dan mitigasi keamanan web.'
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
      description: 'Mendalami cyber security dan sistem operasi Linux, serta memfasilitasi sesi belajar dan workshop komunitas.'
    }
  ]
}
