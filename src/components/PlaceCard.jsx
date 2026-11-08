import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { MOODS, findOption, mainCategory } from '../data/options'
import FavoriteButton from './FavoriteButton'
import PlaceImage from './PlaceImage'
import Rating from './Rating'
import OpenBadge from './OpenBadge'
import { formatPrice, areaText } from '../utils/format'
import './PlaceCard.css'

// variant "float"   → photo with a floating white info box (home page)
// variant "overlay" → photo with name & tags on top of it (explore grid)
export default function PlaceCard({ place, index = 0, variant = 'overlay' }) {
  const { t, pick } = useLanguage()
  const cat = mainCategory(place)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/place/${place.id}`} className={`pcard pcard-${variant}`}>
        <PlaceImage place={place} />
        <div className="pcard-top">
          <span className="pcard-pills">
            <span className="pcard-pill">{pick(cat.label)}</span>
            <OpenBadge place={place} className="on-photo" />
          </span>
          <FavoriteButton placeId={place.id} />
        </div>

        {variant === 'float' ? (
          <div className="pcard-box">
            <div className="pcard-box-text">
              <Rating value={place.rating} />
              <h3>{pick(place.name)}</h3>
              <p>{areaText(place, pick, t)} · {formatPrice(place, pick)}</p>
            </div>
            <span className="pcard-arrow"><ArrowRight size={17} className="flip-rtl" /></span>
          </div>
        ) : (
          <div className="pcard-info">
            <div className="pcard-overlay-row">
              <h3>{pick(place.name)}</h3>
              <span className="pcard-rating"><Rating value={place.rating} size={13} /></span>
            </div>
            <p className="pcard-meta"><MapPin size={13} /> {areaText(place, pick, t)} · {formatPrice(place, pick)}</p>
            <div className="pcard-tags">
              {place.moods.slice(0, 3).map((m) => (
                <span key={m}>{pick(findOption(MOODS, m).label)}</span>
              ))}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
