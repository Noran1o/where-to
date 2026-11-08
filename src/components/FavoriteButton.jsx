import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoriteButton({ placeId }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(placeId)

  return (
    <motion.button
      className={`fav-btn ${active ? 'is-fav' : ''}`}
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault() // don't open the card link
        e.stopPropagation()
        toggleFavorite(placeId)
      }}
      aria-label="Save"
      aria-pressed={active}
    >
      <motion.span key={String(active)} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }} style={{ display: 'grid' }}>
        <Heart size={17} fill={active ? 'currentColor' : 'none'} />
      </motion.span>
    </motion.button>
  )
}
