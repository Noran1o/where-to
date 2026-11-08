import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useFavorites } from '../context/FavoritesContext'
import { usePlaces } from '../context/PlacesContext'
import PlaceCard from '../components/PlaceCard'

export default function Favorites() {
  const { t } = useLanguage()
  const { favorites } = useFavorites()
  const { places: allPlaces } = usePlaces()
  const places = allPlaces.filter((p) => favorites.includes(p.id))

  return (
    <div className="container" style={{ paddingBottom: '2rem' }}>
      <header className="page-head">
        <h1>{t('favorites.title')}</h1>
        <p>{t('favorites.subtitle')}</p>
      </header>

      {places.length > 0 ? (
        <motion.div layout className="grid-cards">
          <AnimatePresence mode="popLayout">
            {places.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div className="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="empty-icon"><Heart size={24} /></div>
          <h3>{t('favorites.emptyTitle')}</h3>
          <p>{t('favorites.emptyText')}</p>
          <Link to="/explore" className="btn btn-dark">{t('favorites.browse')}</Link>
        </motion.div>
      )}
    </div>
  )
}
