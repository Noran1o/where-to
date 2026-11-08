import { Navigation } from 'lucide-react'

export default function Logo({ light = false }) {
  return (
    <span className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent)', display: 'grid', placeItems: 'center', color: '#fff' }}>
        <Navigation size={17} fill="#fff" strokeWidth={2.2} />
      </span>
      <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: light ? '#fff' : 'var(--ink)' }}>
        <bdi>Where To?</bdi>
      </span>
    </span>
  )
}
