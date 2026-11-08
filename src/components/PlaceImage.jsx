import { useState } from 'react'
import { mainCategory } from '../data/options'

// Shows the place's photo (fading in once loaded),
// or a soft placeholder with the category icon until photos are added
export default function PlaceImage({ place, index = 0, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const src = place.images?.[index]
  const cat = mainCategory(place)
  const [from, to] = cat.tone

  if (src) {
    return (
      <div className={`place-img place-img-wrap ${className}`} style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}>
        <img src={src} alt={place.name.en} loading="lazy" onLoad={() => setLoaded(true)} className={loaded ? 'is-loaded' : ''} />
      </div>
    )
  }

  return (
    <div className={`place-img place-img-empty ${className}`} style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}>
      <cat.Icon size={56} strokeWidth={1.2} />
    </div>
  )
}
