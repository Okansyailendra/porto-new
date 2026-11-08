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
  username?: string
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface Quantiles {
  q1: number
  q2: number
  q3: number
}

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
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay
    x: number
    y: number
  } | null>(null)

  const zoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    async function loadContributions() {
      // 1. Coba ambil data kontribusi live langsung dari akun resmi GitHub @Okansyailendra
      try {
        const liveRes = await fetch(
          'https://github-contributions-api.jogruber.de/v4/Okansyailendra?y=last'
        )
        if (liveRes.ok) {
          const liveJson = await liveRes.json()
          if (liveJson.contributions && Array.isArray(liveJson.contributions)) {
            const rawContribs: { date: string; count: number; level: number }[] =
              liveJson.contributions

            const weeks: ContributionWeek[] = []
            let currentWeek: ContributionDay[] = []

            rawContribs.forEach((c) => {
              const dt = new Date(c.date)
              const jsWeekday = dt.getUTCDay() // 0 = Minggu
              currentWeek.push({
                date: c.date,
                contributionCount: c.count,
                weekday: jsWeekday
              })
              if (jsWeekday === 6) {
                weeks.push({ contributionDays: currentWeek })
                currentWeek = []
              }
            })

            if (currentWeek.length > 0) {
              const lastDt = new Date(currentWeek[currentWeek.length - 1].date)
              const curWd = currentWeek[currentWeek.length - 1].weekday
              for (let extra = curWd + 1; extra <= 6; extra++) {
                const nextDt = new Date(lastDt)
                nextDt.setUTCDate(nextDt.getUTCDate() + (extra - curWd))
                currentWeek.push({
                  date: nextDt.toISOString().slice(0, 10),
                  contributionCount: 0,
                  weekday: extra
                })
              }
              weeks.push({ contributionDays: currentWeek })
            }

            const total =
              liveJson.total?.lastYear ??
              rawContribs.reduce((sum, c) => sum + c.count, 0)

            if (isMounted) {
              setData({ username: 'Okansyailendra', totalContributions: total, weeks })
              setIsLoading(false)
              return
            }
          }
        }
      } catch (err) {
        console.warn('Live GitHub fetch fallback to /contributions.json', err)
      }

      // 2. Fallback berkas lokal /contributions.json (tersinkronisasi dengan @Okansyailendra)
      try {
        const localRes = await fetch('/contributions.json')
        if (!localRes.ok) throw new Error('Failed to load contributions')
        const json = await localRes.json()
        if (isMounted) {
          setData(json)
          setIsLoading(false)
        }
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    loadContributions()

    return () => {
      isMounted = false
    }
  }, [])

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

    const total = data.totalContributions || allDays.reduce((acc, d) => acc + d.contributionCount, 0)

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

  function getTileColor(count: number, isHighlighted: boolean): string {
    if (count === 0) {
      return isHighlighted ? 'bg-[#ECE7DF] border-[#DFD9CE]' : 'bg-[#F2EEE7] border-[#E8E4DC]'
    }
    if (count <= quantiles.q1) {
      return 'bg-[#A8D5C8] border-[#93C7B9]'
    }
    if (count <= quantiles.q2) {
      return 'bg-[#5FA898] border-[#4E9787]'
    }
    if (count <= quantiles.q3) {
      return 'bg-[#145E55] border-[#0E443E]'
    }
    return 'bg-[#EA5C38] border-[#C94726] shadow-2xs'
  }

  const numWeeks = data?.weeks.length || 53

  return (
    <div ref={zoneRef} className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-bold text-[#132238]">
              Peta Aktivitas GitHub
            </h3>
            <a
              href="https://github.com/Okansyailendra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#145E55] hover:text-[#0E443E] bg-[#145E55]/10 px-3 py-1 rounded-full hover:bg-[#145E55]/15 transition-all"
            >
              <span>@Okansyailendra</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
          <p className="text-xs sm:text-sm text-[#576A7E]">
            Catatan kontribusi dan komitmen kode resmi akun @Okansyailendra dalam 52 minggu terakhir.
          </p>
        </div>

        {!hasError && !isLoading && (
          <div className="flex items-center gap-3 text-xs font-semibold text-[#132238] bg-[#FAF8F5] px-4 py-2 border border-[#E8E4DC] rounded-full shadow-2xs">
            <span className="text-[#145E55] font-bold">{totalCommits} Kontribusi</span>
            <span className="text-[#8E9EAF]">·</span>
            <span className="text-[#EA5C38] font-bold">{longestStreak} Hari Streak</span>
          </div>
        )}
      </div>

      {hasError ? (
        <div className="p-6 bg-white border border-red-200 rounded-3xl text-center space-y-2">
          <p className="text-sm font-semibold text-red-600">
            Data kontribusi belum bisa dimuat saat ini.
          </p>
        </div>
      ) : isLoading ? (
        <div className="p-8 bg-white border border-[#E8E4DC] rounded-3xl flex flex-col items-center justify-center space-y-3">
          <div className="flex gap-1.5 animate-pulse">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-3.5 h-3.5 bg-[#E8E4DC] rounded-sm" />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#8E9EAF]">
            Menghubungkan ke GitHub @Okansyailendra...
          </span>
        </div>
      ) : (
        <div className="p-5 sm:p-6 bg-white border border-[#E8E4DC] rounded-3xl shadow-xs space-y-4 relative">
          {/* Filter Bulan */}
          <div className="flex flex-wrap items-center gap-1 text-xs font-medium text-[#576A7E]">
            <span className="mr-2 font-bold text-[#132238]">Sorot bulan:</span>
            <button
              type="button"
              onClick={() => setSelectedMonth(null)}
              className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                selectedMonth === null
                  ? 'bg-[#145E55] text-white font-bold'
                  : 'hover:bg-[#FAF8F5]'
              }`}
            >
              Semua
            </button>
            {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map(
              (label, mIdx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedMonth(selectedMonth === mIdx ? null : mIdx)}
                  className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                    selectedMonth === mIdx
                      ? 'bg-[#EA5C38] text-white font-bold'
                      : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Grid Scrollable yang Mengisi Penuh Lebar Kartu */}
          <div className="overflow-x-auto pb-2">
            <div className="w-full min-w-[780px]">
              {/* Header Bulan */}
              <div className="relative h-5 mb-2 text-xs font-semibold text-[#8E9EAF] select-none w-full">
                {monthMarkers.map((marker, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${(marker.weekIndex / numWeeks) * 100}%` }}
                  >
                    {marker.label}
                  </span>
                ))}
              </div>

              {/* Grid Kolom Mingguan Mengisi Penuh Lebar Kartu */}
              <div
                className="grid gap-1 sm:gap-1.5 w-full select-none"
                style={{
                  gridTemplateColumns: `repeat(${numWeeks}, minmax(0, 1fr))`
                }}
              >
                {data?.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5">
                    {week.contributionDays.map((day, dIdx) => {
                      const dayMonth = new Date(day.date).getUTCMonth()
                      const isMonthMatch =
                        selectedMonth === null || selectedMonth === dayMonth

                      const tileColor = getTileColor(day.contributionCount, isMonthMatch)

                      return (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          tabIndex={-1}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setHoveredDay({
                              day,
                              x: rect.left + rect.width / 2,
                              y: rect.top
                            })
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`aspect-square w-full rounded-xs sm:rounded-sm border cursor-pointer transition-all duration-150 ${tileColor} ${
                            !isMonthMatch ? 'opacity-25' : 'opacity-100 hover:scale-125'
                          }`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legenda & Link Akun */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E8E4DC] text-xs text-[#576A7E]">
            <span>Arahkan kursor pada kotak untuk melihat detail aktivitas harian.</span>
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="text-[#8E9EAF] mr-1">Rendah</span>
              <span className="w-3 h-3 rounded-xs bg-[#F2EEE7] border border-[#E8E4DC]" />
              <span className="w-3 h-3 rounded-xs bg-[#A8D5C8]" />
              <span className="w-3 h-3 rounded-xs bg-[#5FA898]" />
              <span className="w-3 h-3 rounded-xs bg-[#145E55]" />
              <span className="w-3 h-3 rounded-xs bg-[#EA5C38]" />
              <span className="text-[#EA5C38] ml-1">Tinggi</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 bg-[#132238] text-white text-xs font-semibold rounded-lg shadow-xl"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 6}px`
          }}
        >
          <span>{formatIndonesianDate(hoveredDay.day.date)}: </span>
          <span className="text-[#F4A723]">
            {hoveredDay.day.contributionCount > 0
              ? `${hoveredDay.day.contributionCount} kontribusi`
              : 'Tidak ada kontribusi'}
          </span>
        </div>
      )}
    </div>
  )
}
