import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Wallet, Globe, BookOpen, Heart, Share2, ArrowUpRight, MapPinOff, Navigation } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useFavorites } from '../context/FavoritesContext'
import { usePlaces } from '../context/PlacesContext'
import OpenBadge from '../components/OpenBadge'
import Lightbox from '../components/Lightbox'
import { trackEvent } from '../utils/analytics'
import { COMPANIONS, MOODS, findOption, mainCategory, placeAreas } from '../data/options'
import { mapEmbedUrl } from '../utils/filterPlaces'
import { formatPrice, areaText } from '../utils/format'
import { InstagramIcon, FacebookIcon, GoogleMapsIcon } from '../components/BrandIcons'
import PlaceImage from '../components/PlaceImage'
import PlaceCard from '../components/PlaceCard'
import Rating from '../components/Rating'
import './PlaceDetails.css'

// Pretty text for a link: "instagram.com/coffeecorner"
const prettyUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export default function PlaceDetails() {
  const { id } = useParams() // the :id part of /place/:id
  const navigate = useNavigate()
  const { t, pick } = useLanguage()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [copied, setCopied] = useState(false)
  const { places, loading, getPlaceById } = usePlaces()
  const [lightbox, setLightbox] = useState(null) // index of the open photo, or null
  const place = getPlaceById(id)

  useEffect(() => {
    if (place) trackEvent('view_place', { place_id: place.id, category: place.categories[0] })
  }, [place?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="container details"><div className="skeleton" style={{ height: 420, borderRadius: 24, marginTop: '3rem' }} /></div>

  if (!place) {
    return (
      <div className="container section">
        <div className="empty">
          <div className="empty-icon"><MapPinOff size={24} /></div>
          <h3>{t('place.notFound')}</h3>
          <p />
          <Link to="/explore" className="btn btn-dark">{t('favorites.browse')}</Link>
        </div>
      </div>
    )
  }

  const cat = mainCategory(place)
  const fav = isFavorite(place.id)
  const { links = {} } = place
  const multi = place.branches.length > 1

  // "Also here" (e.g. the cinema inside the mall) first, then places sharing a category or area
  const related = (place.related || []).map(getPlaceById).filter(Boolean)
  const similar = [
    ...related,
    ...places.filter((p) => p.id !== place.id && !related.includes(p) &&
      (p.categories.some((c) => place.categories.includes(c)) || placeAreas(p).some((a) => placeAreas(place).includes(a)))),
  ].slice(0, 3)

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked */ }
  }

  // Info rows
  const rows = [
    !multi && { Icon: MapPin, label: t('place.address'), value: pick(place.branches[0].label) },
    { Icon: Clock, label: t('place.hours'), value: pick(place.hours) },
    { Icon: Wallet, label: t('place.price'), value: formatPrice(place, pick) },
  ].filter(Boolean)

  const socials = [
    links.instagram && { Icon: InstagramIcon, label: t('place.instagram'), href: links.instagram },
    links.facebook && { Icon: FacebookIcon, label: t('place.facebook'), href: links.facebook },
    links.website && { Icon: Globe, label: t('place.website'), href: links.website },
    links.menu && { Icon: BookOpen, label: t('place.menu'), href: links.menu },
  ].filter(Boolean)

  const photoCount = Math.min(Math.max(place.images.length, 1), 3)

  return (
    <div className="container details">
      <button className="back" onClick={() => navigate(-1)}><ArrowLeft size={17} className="flip-rtl" /> {t('place.back')}</button>

      {/* ===== Gallery ===== */}
      <motion.div className={`gallery g-count-${photoCount}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {Array.from({ length: photoCount }, (_, i) => (
          <button key={i} className={i === 0 ? 'g-main' : 'g-side'} onClick={() => setLightbox(i)}>
            <PlaceImage place={place} index={i} />
          </button>
        ))}
        {place.images.length === 0 && <span className="g-note">{t('place.noPhotos')}</span>}
      </motion.div>

      <div className="details-grid">
        {/* ===== Main info ===== */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
          <div className="d-tags">
            <span className="d-cat"><cat.Icon size={14} /> {pick(cat.label)}</span>
            <OpenBadge place={place} detailed />
          </div>
          <div className="d-title-row">
            {place.logo && <img className="d-logo" src={place.logo} alt="" />}
            <h1 className="d-title">{pick(place.name)}</h1>
          </div>
          <div className="d-meta">
            <Rating value={place.rating} size={16} />
            <span className="muted">{t('place.myRating')}</span>
            <span className="dot" />
            <span>{formatPrice(place, pick)}</span>
            <span className="dot" />
            <span className="muted"><MapPin size={14} style={{ verticalAlign: '-2px' }} /> {areaText(place, pick, t)}</span>
          </div>

          <section className="d-block">
            <h3>{t('place.about')}</h3>
            <p className="d-desc">{pick(place.description)}</p>
          </section>

          <section className="d-block d-two">
            <div>
              <h3>{t('place.vibe')}</h3>
              <div className="chip-row">
                {place.moods.map((m) => { const o = findOption(MOODS, m); return <span key={m} className="tag">{o.emoji} {pick(o.label)}</span> })}
              </div>
            </div>
            <div>
              <h3>{t('place.goodFor')}</h3>
              <div className="chip-row">
                {place.companions.map((c) => { const o = findOption(COMPANIONS, c); return <span key={c} className="tag">{o.emoji} {pick(o.label)}</span> })}
              </div>
            </div>
          </section>

          {multi && (
            <section className="d-block">
              <h3>{t('place.branches')} ({place.branches.length})</h3>
              <ul className="branches">
                {place.branches.map((b) => (
                  <li key={b.maps}>
                    <span className="branch-pin"><MapPin size={16} /></span>
                    <span className="branch-name">{pick(b.label)}</span>
                    <a href={b.maps} target="_blank" rel="noreferrer" className="btn btn-outline branch-btn">
                      <Navigation size={14} /> {t('place.directions')}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="d-block">
            <h3>{t('place.location')}</h3>
            <div className="map"><iframe title="map" src={mapEmbedUrl(place)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </section>
        </motion.div>

        {/* ===== Info card (OpenTable style) ===== */}
        <motion.aside className="info-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <ul className="info-rows">
            {rows.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <Icon size={18} className="info-icon" />
                <div>
                  <small>{label}</small>
                  {href ? <a href={href} dir="ltr">{value}</a> : <span>{value}</span>}
                </div>
              </li>
            ))}
          </ul>

          {socials.length > 0 && (
            <ul className="info-links">
              {socials.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon size={18} />
                    <span>{label}<small dir="ltr">{prettyUrl(href)}</small></span>
                    <ArrowUpRight size={16} className="muted" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="info-actions">
            {!multi && (
              <a href={place.branches[0].maps} target="_blank" rel="noreferrer" className="btn btn-outline btn-block">
                <GoogleMapsIcon size={18} /> {t('place.openMaps')}
              </a>
            )}
            <motion.button whileTap={{ scale: 0.97 }} className={`btn btn-block ${fav ? 'btn-soft' : 'btn-primary'}`} onClick={() => toggleFavorite(place.id)}>
              <Heart size={17} fill={fav ? 'currentColor' : 'none'} /> {fav ? t('place.saved') : t('place.save')}
            </motion.button>
            <button className="share-btn" onClick={share}><Share2 size={15} /> {copied ? t('place.copied') : t('place.share')}</button>
          </div>
        </motion.aside>
      </div>

      <Lightbox place={place} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />

      {similar.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <h2 className="section-title" style={{ marginBottom: '1.4rem' }}>{t('place.similar')}</h2>
          <div className="top-grid-3">
            {similar.map((p, i) => <PlaceCard key={p.id} place={p} index={i} variant="float" />)}
          </div>
        </section>
      )}
    </div>
  )
}
