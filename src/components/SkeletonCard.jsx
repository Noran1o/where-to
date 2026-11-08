// Grey shimmering placeholder shown while places are loading
export default function SkeletonCard({ variant = 'overlay' }) {
  return (
    <div className={`skeleton-card ${variant}`}>
      <div className="skeleton sk-img" />
      <div className="sk-lines">
        <div className="skeleton" style={{ width: '40%', height: 12 }} />
        <div className="skeleton" style={{ width: '75%', height: 16 }} />
        <div className="skeleton" style={{ width: '55%', height: 12 }} />
      </div>
    </div>
  )
}
