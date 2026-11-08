import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { usePlaces } from '../context/PlacesContext'
import { trackEvent } from '../utils/analytics'
import { CATEGORIES, COMPANIONS, mainCategory } from '../data/options'
import { filterPlaces } from '../utils/filterPlaces'
import PlaceImage from '../components/PlaceImage'
import { Shuffle, RotateCcw, ArrowRight } from 'lucide-react'
import './Spin.css'

const SIZE = 320
const R = 150 // wheel radius
const C = SIZE / 2 // center
const MAX_SLICES = 8
const COLORS = ['#2F8F5B', '#15191E', '#8DB38B', '#3B4148', '#C9A27E', '#5A8458', '#8197B8', '#D98C6B']

// Point on the circle at `deg` degrees (0 = top, clockwise)
const polar = (deg, r = R) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)]
}

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export default function Spin() {
  const { t, pick } = useLanguage()
  const { places } = usePlaces()
  const [filters, setFilters] = useState({ with: '', category: '' })
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const [shuffleKey, setShuffleKey] = useState(0)

  // Places on the wheel: matching the filters, shuffled, max 8
  const slices = useMemo(
    () => shuffle(filterPlaces(places, { with: filters.with, categories: filters.category ? [filters.category] : [] })).slice(0, MAX_SLICES),
    [filters, shuffleKey, places], // eslint-disable-line react-hooks/exhaustive-deps
  )
  const seg = 360 / slices.length

  const toggle = (key, value) => {
    if (spinning) return
    setFilters((f) => ({ ...f, [key]: f[key] === value ? '' : value }))
  }

  const spin = () => {
    if (spinning || slices.length < 2) return
    const index = Math.floor(Math.random() * slices.length)
    const center = index * seg + seg / 2
    // Rotate at least 6 full turns, then stop so the chosen slice sits under the pointer (top)
    const base = rotation - (rotation % 360)
    setRotation(base + 360 * 6 + (360 - center))
    setSpinning(true)
    setWinner(null)
    trackEvent('spin_wheel', { places_on_wheel: slices.length })
    setTimeout(() => {
      setSpinning(false)
      setWinner(slices[index])
    }, 4600)
  }

  const spinAgain = () => {
    setWinner(null)
    setShuffleKey((k) => k + 1)
  }

  const short = (text) => (text.length > 13 ? text.slice(0, 12) + '…' : text)

  return (
    <>
      <header className="container page-head spin-head">
        <h1>{t('spin.title')}</h1>
        <p>{t('spin.subtitle')}</p>
      </header>

      <section className="container spin-layout">
        <div className="spin-filters">
          <div className="chip-row">
            {COMPANIONS.map((c) => (
              <button key={c.id} className={`chip ${filters.with === c.id ? 'active' : ''}`} onClick={() => toggle('with', c.id)}>
                {c.emoji} {pick(c.label)}
              </button>
            ))}
          </div>
          <div className="chip-row">
            {CATEGORIES.filter((c) => places.some((p) => p.categories.includes(c.id))).map((c) => (
              <button key={c.id} className={`chip ${filters.category === c.id ? 'active' : ''}`} onClick={() => toggle('category', c.id)}>
                <c.Icon size={15} /> {pick(c.label)}
              </button>
            ))}
          </div>
        </div>

        {slices.length < 2 ? (
          <div className="empty"><div className="empty-icon"><Shuffle size={24} /></div><p>{t('spin.notEnough')}</p></div>
        ) : (
          <div className="wheel-area">
            <div className="wheel-pointer" />
            <div className="wheel-shadow">
              <motion.svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="wheel"
                animate={{ rotate: rotation }}
                transition={{ duration: 4.5, ease: [0.12, 0.8, 0.2, 1] }}
              >
                {slices.map((p, i) => {
                  const [x1, y1] = polar(i * seg)
                  const [x2, y2] = polar((i + 1) * seg)
                  const large = seg > 180 ? 1 : 0
                  const mid = i * seg + seg / 2
                  const cat = mainCategory(p)
                  return (
                    <g key={p.id}>
                      <path d={`M${C},${C} L${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} Z`} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth="2" />
                      {/* Text runs from the center outwards along the middle of the slice */}
                      <g transform={`rotate(${mid - 90} ${C} ${C})`}>
                        <g transform={`translate(${C + R * 0.83 - 9} ${C - 9}) rotate(90 9 9)`}>
                          <cat.Icon size={18} color="#fff" strokeWidth={1.8} />
                        </g>
                        <text x={C + R * 0.47} y={C + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">{short(pick(p.name))}</text>
                      </g>
                    </g>
                  )
                })}
                <circle cx={C} cy={C} r="28" fill="#fff" />
                <circle cx={C} cy={C} r="20" fill="#2F8F5B" />
              </motion.svg>
            </div>

            <motion.button className="btn btn-primary spin-btn" whileTap={{ scale: 0.92 }} onClick={spin} disabled={spinning}>
              <Shuffle size={18} /> {spinning ? t('spin.spinning') : t('spin.spin')}
            </motion.button>
          </div>
        )}
      </section>

      {/* Result popup */}
      <AnimatePresence>
        {winner && (
          <motion.div className="winner-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setWinner(null)}>
            <motion.div
              className="winner-card"
              initial={{ scale: 0.6, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              {['🎉', '✨', '🎊', '⭐', '✨', '🎉'].map((e, i) => (
                <motion.span
                  key={i}
                  className="confetti"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                  animate={{ x: Math.cos(i) * 140, y: Math.sin(i * 2) * 90 - 60, opacity: 0, scale: 1.4 }}
                  transition={{ duration: 1.2, delay: 0.1 }}
                >
                  {e}
                </motion.span>
              ))}
              <div className="winner-img"><PlaceImage place={winner} /></div>
              <p className="winner-label">{t('spin.result')}</p>
              <h2>{pick(winner.name)}</h2>
              <p className="winner-desc">{pick(winner.description)}</p>
              <div className="winner-actions">
                <Link to={`/place/${winner.id}`} className="btn btn-primary">{t('spin.details')} <ArrowRight size={16} className="flip-rtl" /></Link>
                <button className="btn btn-outline" onClick={spinAgain}><RotateCcw size={16} /> {t('spin.again')}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
