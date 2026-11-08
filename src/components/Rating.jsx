import { Star } from 'lucide-react'

export default function Rating({ value, size = 15 }) {
  return (
    <span className="rating">
      <Star size={size} />
      {value.toFixed(1)}
    </span>
  )
}
