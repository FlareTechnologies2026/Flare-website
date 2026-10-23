import React from 'react'

interface Props {
  labels: string[]
  id: string
  className?: string
}

function lemniscatePoints(n = 252, a = 270, cx = 300, cy = 170) {
  const pts: [number, number][] = []
  for (let k = 0; k <= n; k++) {
    const t = Math.PI * 0.62 + (2 * Math.PI * k) / n
    const d = 1 + Math.sin(t) ** 2
    pts.push([cx + (a * Math.cos(t)) / d, cy + (a * Math.sin(t) * Math.cos(t) * 1.25) / d])
  }
  return pts
}

const SHORT = [
  'Discovery call',
  'ICP interview',
  'Lead lists',
  'LinkedIn fixed',
  'Website: SEO, AEO, GEO',
  'Outreach + ads',
  'Meetings booked',
]

const GRADIENT_STOPS = ['#F4140C', '#F97316', '#F5B70F', '#5FC85B', '#14B6BF', '#229FC3', '#6E4CAA', '#E650A0']

export default function LoopSvg({ labels, id, className }: Props) {
  const pts = lemniscatePoints()
  const path = 'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L') + ' Z'

  const n = labels.length

  // Compute fractional positions for each node
  const seg = pts.slice(0, -1).map((p, i) => {
    const dx = pts[i + 1][0] - p[0]
    const dy = pts[i + 1][1] - p[1]
    return Math.sqrt(dx * dx + dy * dy)
  })
  const total = seg.reduce((a, b) => a + b, 0)
  const fracs = Array.from({ length: n }, (_, k) => {
    const idx = Math.round((k * (pts.length - 1)) / n)
    return seg.slice(0, idx).reduce((a, b) => a + b, 0) / total
  })

  // Node positions
  const nodes = Array.from({ length: n }, (_, k) => {
    const t = Math.PI * 0.62 + (2 * Math.PI * k) / n
    const d = 1 + Math.sin(t) ** 2
    const x = 300 + (270 * Math.cos(t)) / d
    const y = 170 + (270 * Math.sin(t) * Math.cos(t) * 1.25) / d
    return { x, y }
  })

  const gid = `spectrum-${id}`

  const stops = GRADIENT_STOPS.map((c, i) => (
    <stop key={i} offset={(i / (GRADIENT_STOPS.length - 1)).toFixed(2)} stopColor={c} />
  ))

  const nodeEls = nodes.map(({ x, y }, idx) => {
    const labS = SHORT[idx] || ''
    let lx = x, ly = y, anc = 'middle'
    if (Math.abs(x - 300) < 40) { lx = x + 24; ly = y + 5; anc = 'start' }
    else if (x > 520) { lx = x + 24; ly = y + 5; anc = 'start' }
    else if (x < 80) { lx = x - 24; ly = y + 5; anc = 'end' }
    else if (y < 170) { lx = x; ly = y - 26; anc = 'middle' }
    else { lx = x; ly = y + 38; anc = 'middle' }

    return (
      <g
        key={idx}
        className="loop-node"
        style={{ '--i': idx + 1 } as React.CSSProperties}
        data-frac={fracs[idx].toFixed(4)}
      >
        <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r="15" />
        <text x={x.toFixed(1)} y={(y + 5).toFixed(1)} textAnchor="middle">{idx + 1}</text>
        <text className="loop-label" x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor={anc as 'start' | 'middle' | 'end'}>{labS}</text>
      </g>
    )
  })

  return (
    <svg className={`loop${className ? ' ' + className : ''}`} viewBox="-40 -40 680 430" role="img" aria-labelledby={`loop-title-${id}`}>
      <title id={`loop-title-${id}`}>{`The Flare Growth System: ${n} steps that run in a continuous loop`}</title>
      <defs>
        <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
          {stops}
        </linearGradient>
      </defs>
      <path className="loop-track" d={path} />
      <path className="loop-line" d={path} pathLength="1" stroke={`url(#${gid})`} />
      {nodeEls}
    </svg>
  )
}
