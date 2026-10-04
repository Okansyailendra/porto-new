import { useState, useEffect, useMemo, useRef } from 'react'

export interface ContributionDay {
  date: string
  contributionCount: number
  weekday: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionsData {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface Quantiles {
  q1: number
  q2: number
  q3: number
}

// Format date to Indonesian string, e.g. "12 Mar"
function formatIndonesianDate(dateStr: string): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ]
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const day = d.getUTCDate()
  const month = months[d.getUTCMonth()]
  return `${day} ${month}`
}

export function ContributionsZone() {
  const [data, setData] = useState<ContributionsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFogLifted, setIsFogLifted] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay
    x: number
    y: number
  } | null>(null)

  const zoneRef = useRef<HTMLElement>(null)

  // Fetch contributions.json
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setHasError(false)

    fetch('/contributions.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load contributions')
        return res.json()
      })
      .then((json: ContributionsData) => {
        if (isMounted) {
          if (!json.weeks || !Array.isArray(json.weeks)) {
            throw new Error('Invalid format')
          }
          setData(json)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
        if (isMounted) {
          setHasError(true)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Trigger single fog-lift animation when zone enters viewport (1.2 seconds)
  useEffect(() => {
    if (!zoneRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFogLifted) {
            setIsFogLifted(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(zoneRef.current)
    return () => observer.disconnect()
  }, [isFogLifted])

  // Compute metrics: quantiles, streak, total
  const { quantiles, longestStreak, totalCommits, monthMarkers } = useMemo(() => {
    if (!data || !data.weeks) {
      return {
        quantiles: { q1: 1, q2: 2, q3: 4 },
        longestStreak: 0,
        totalCommits: 0,
        monthMarkers: []
      }
    }

    const allDays: ContributionDay[] = []
    data.weeks.forEach((w) => {
      w.contributionDays.forEach((d) => allDays.push(d))
    })

    // Quantile calculations on non-zero commit counts
    const positiveCounts = allDays
      .map((d) => d.contributionCount)
      .filter((c) => c > 0)
      .sort((a, b) => a - b)

    let q1 = 1
    let q2 = 2
    let q3 = 4

    if (positiveCounts.length >= 4) {
      q1 = positiveCounts[Math.floor(positiveCounts.length * 0.25)]
      q2 = positiveCounts[Math.floor(positiveCounts.length * 0.5)]
      q3 = positiveCounts[Math.floor(positiveCounts.length * 0.75)]
    }

    // Longest streak calculation
    let currentStreak = 0
    let maxStreak = 0
    allDays.forEach((d) => {
      if (d.contributionCount > 0) {
        currentStreak += 1
        if (currentStreak > maxStreak) maxStreak = currentStreak
      } else {
        currentStreak = 0
      }
    })

    // Total commits
    const total = data.totalContributions || allDays.reduce((acc, d) => acc + d.contributionCount, 0)

    // Compute month columns to render month labels
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ]
    const markers: { monthIndex: number; label: string; weekIndex: number }[] = []
    let lastMonth = -1

    data.weeks.forEach((week, wIdx) => {
      const firstDay = week.contributionDays[0]
      if (firstDay) {
        const m = new Date(firstDay.date).getUTCMonth()
        if (m !== lastMonth) {
          markers.push({ monthIndex: m, label: months[m], weekIndex: wIdx })
          lastMonth = m
        }
      }
    })

    return {
      quantiles: { q1, q2, q3 },
      longestStreak: maxStreak,
      totalCommits: total,
      monthMarkers: markers
    }
  }, [data])

  // Get color style based on quantiles
  function getTileColor(count: number, isHighlighted: boolean): string {
    if (count === 0) {
      // Tile tanpa commit: Embun 15% opasitas (tertutup kabut)
      return isHighlighted
        ? 'bg-embun/30 border-embun/40'
        : 'bg-embun/15 border-embun/10'
    }

    if (count <= quantiles.q1) {
      // Level 1: Lumut gelap
      return 'bg-[#3D633C] border-[#4E7D4D]'
    }
    if (count <= quantiles.q2) {
      // Level 2: Lumut menengah
      return 'bg-[#558552] border-[#689E65]'
    }
    if (count <= quantiles.q3) {
      // Level 3: Lumut terang
      return 'bg-lumut border-[#88C484]'
    }
    // Level 4: Lentera
    return 'bg-lentera border-[#FFBD59] shadow-xs'
  }

  return (
    <section
      id="contributions"
      ref={zoneRef}
      aria-label="Zona 5 GitHub contributions"
      className="py-16 md:py-20 border-t border-embun/15 text-left"
    >
      <div className="space-y-6">
        {/* Header Zona */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <h2 className="font-pixel text-h2 text-tulang leading-tight">
              Peta fog of war
            </h2>
            <p className="font-body text-small text-embun">
              Aktivitas kontribusi GitHub dalam 52 minggu terakhir.
            </p>
          </div>

          {/* Ringkasan Angka (design.md 5.7) */}
          {!hasError && !isLoading && (
            <div className="flex flex-wrap items-center gap-4 text-small font-pixel text-tulang bg-kabut-lembah/80 px-3 py-1.5 border border-embun/20 rounded-panel">
              <span className="text-lentera">
                {totalCommits} commit dalam setahun
              </span>
              <span className="text-embun/40" aria-hidden="true">·</span>
              <span className="text-lumut">
                Streak terpanjang: {longestStreak} hari
              </span>
            </div>
          )}
        </div>

        {/* Kondisi Error (prd.md F5) */}
        {hasError ? (
          <div
            className="p-8 bg-kabut-lembah/90 border border-darah-bug/40 rounded-panel text-center space-y-4"
            role="alert"
          >
            <div className="w-12 h-12 mx-auto border border-darah-bug/50 flex items-center justify-center rounded-button bg-malam-gunung">
              <span className="font-pixel text-darah-bug text-xl">!</span>
            </div>
            <p className="font-body text-base text-tulang font-medium">
              Data contributions belum bisa dimuat. Coba muat ulang halaman.
            </p>

            {/* Grid Kosong Placeholder */}
            <div className="opacity-20 pointer-events-none grid grid-flow-col grid-rows-7 gap-1 w-full max-w-[800px] mx-auto p-4 border border-embun/20 rounded-button">
              {Array.from({ length: 52 * 7 }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-embun/15 rounded-[1px]" />
              ))}
            </div>
          </div>
        ) : isLoading ? (
          /* Kondisi Memuat (design.md 6.6: tile kabut berkedip pelan) */
          <div
            className="p-8 bg-kabut-lembah/50 border border-embun/20 rounded-panel flex flex-col items-center justify-center space-y-3"
            aria-live="polite"
          >
            <div className="flex gap-1 animate-pulse">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-embun/20 rounded-[1px]" />
              ))}
            </div>
            <span className="font-pixel text-small text-embun">
              Membuka kabut kontribusi...
            </span>
          </div>
        ) : (
          /* Grid Peta Fog of War 52x7 */
          <div className="p-5 md:p-6 bg-kabut-lembah/70 border border-embun/25 rounded-panel space-y-4 relative">
            {/* Filter / Penyorot Bulan */}
            <div className="flex flex-wrap items-center gap-1 text-xs font-pixel text-embun/80">
              <span className="mr-2 text-tulang/80">Sorot bulan:</span>
              <button
                type="button"
                onClick={() => setSelectedMonth(null)}
                className={`px-2 py-0.5 rounded-button transition-colors ${
                  selectedMonth === null
                    ? 'bg-lentera text-malam-gunung font-bold'
                    : 'hover:text-tulang hover:bg-malam-gunung/60'
                }`}
              >
                Semua
              </button>
              {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(
                (label, mIdx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      setSelectedMonth(selectedMonth === mIdx ? null : mIdx)
                    }
                    className={`px-2 py-0.5 rounded-button transition-colors ${
                      selectedMonth === mIdx
                        ? 'bg-lumut text-malam-gunung font-bold'
                        : 'hover:text-tulang hover:bg-malam-gunung/60'
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            {/* Kontainer Grid Dapat Digeser di Mobile */}
            <div
              className="overflow-x-auto pb-2 focus:outline-hidden"
              tabIndex={0}
              aria-label="Grid aktivitas 52 minggu, dapat digeser horizontal di layar ponsel"
            >
              <div className="min-w-[760px] inline-block">
                {/* Header Label Bulan di atas Kolom */}
                <div className="relative h-5 mb-1.5 text-xs font-pixel text-embun select-none">
                  {monthMarkers.map((marker, idx) => (
                    <span
                      key={idx}
                      className="absolute"
                      style={{
                        left: `${(marker.weekIndex / 52) * 100}%`
                      }}
                    >
                      {marker.label}
                    </span>
                  ))}
                </div>

                {/* Grid 52 Kolom x 7 Baris */}
                <div
                  className="grid grid-flow-col grid-rows-7 gap-1.5 relative select-none"
                  role="region"
                  aria-label="Kalender 52 minggu kontribusi GitHub"
                >
                  {data?.weeks.map((week, wIdx) => {
                    // Animasi angkat kabut dari kiri ke kanan (dur-scene 1.2s)
                    const staggerDelay = isFogLifted ? `${(wIdx / 52) * 1.2}s` : '0s'

                    return week.contributionDays.map((day, dIdx) => {
                      const dayMonth = new Date(day.date).getUTCMonth()
                      const isMonthMatch =
                        selectedMonth === null || selectedMonth === dayMonth

                      const tileColor = getTileColor(day.contributionCount, isMonthMatch)

                      return (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          tabIndex={-1}
                          role="img"
                          aria-label={`${formatIndonesianDate(day.date)}: ${day.contributionCount} commit`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top
                            })
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          onFocus={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top
                            })
                          }}
                          onBlur={() => setHoveredDay(null)}
                          className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[1px] border cursor-pointer focus-visible:outline-2 focus-visible:outline-lentera focus-visible:scale-125 transition-transform duration-100 ${tileColor} ${
                            !isMonthMatch ? 'opacity-20' : 'opacity-100'
                          }`}
                          style={{
                            transitionDelay: isFogLifted ? staggerDelay : '0s',
                            transitionProperty: 'opacity, transform, background-color'
                          }}
                        />
                      )
                    })
                  })}
                </div>
              </div>
            </div>

            {/* Legenda Tingkat Intensitas Kuantil */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-embun/20 text-small font-body text-embun">
              <span className="text-xs">
                Arahkan kursor atau fokus pada tile untuk melihat jumlah commit harian.
              </span>

              <div className="flex items-center gap-1.5 font-pixel text-xs">
                <span className="text-embun/80 mr-1">Kabut (0)</span>
                <span className="w-3 h-3 rounded-[1px] bg-embun/15 border border-embun/10" />
                <span className="w-3 h-3 rounded-[1px] bg-[#3D633C] border border-[#4E7D4D]" />
                <span className="w-3 h-3 rounded-[1px] bg-[#558552] border border-[#689E65]" />
                <span className="w-3 h-3 rounded-[1px] bg-lumut border border-[#88C484]" />
                <span className="w-3 h-3 rounded-[1px] bg-lentera border border-[#FFBD59]" />
                <span className="text-lentera ml-1">Tinggi</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tooltip Bergaya Kotak Dialog Game (design.md 5.7: "12 Mar: 3 commit") */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 bg-kabut-lembah border border-lentera text-tulang font-pixel text-xs rounded-button shadow-xl backdrop-blur-xs select-none"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 6}px`
          }}
          role="tooltip"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-embun">
              {formatIndonesianDate(hoveredDay.day.date)}:
            </span>
            <span
              className={
                hoveredDay.day.contributionCount > 0
                  ? 'text-lentera font-bold'
                  : 'text-tulang/70'
              }
            >
              {hoveredDay.day.contributionCount > 0
                ? `${hoveredDay.day.contributionCount} commit`
                : 'Tidak ada commit'}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
