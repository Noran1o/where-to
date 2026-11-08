import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shuffle, Search } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePlaces } from '../context/PlacesContext'
import SkeletonCard from '../components/SkeletonCard'
import { CATEGORIES, COMPANIONS, MOODS, PRICES } from '../data/options'
import PlaceCard from '../components/PlaceCard'
import './Home.css'

// Fade up when an element scrolls into view
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Home() {
  const { t, pick, lang } = useLanguage()
  const { places, loading } = usePlaces()
  const navigate = useNavigate()
  const [plan, setPlan] = useState({ with: '', mood: '', price: '' })

  const choose = (key, value) => setPlan((p) => ({ ...p, [key]: p[key] === value ? '' : value }))
  const goToResults = () => {
    const params = new URLSearchParams()
    Object.entries(plan).forEach(([k, v]) => v !== '' && params.set(k, v))
    navigate(`/explore?${params.toString()}`)
  }

  // Top rated — places with photos first, so the home page looks its best
  const topRated = [...places].sort((a, b) => (b.images.length > 0) - (a.images.length > 0) || b.rating - a.rating).slice(0, 3)
  // Only show categories that have places
  const categories = CATEGORIES.filter((c) => places.some((p) => p.categories.includes(c.id)))

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="container hero-grid">
          <div>
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              {t('hero.title')}{' '}
              <span className={`hero-accent ${lang === 'en' ? 'script' : ''}`}>{t('hero.accent')}</span>
            </motion.h1>
            <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              {t('hero.subtitle')}
            </motion.p>
            <motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link to="/explore" className="btn btn-primary">{t('hero.cta')} <ArrowRight size={17} className="flip-rtl" /></Link>
              <Link to="/spin" className="btn btn-outline"><Shuffle size={16} /> {t('hero.secondary')}</Link>
            </motion.div>
            <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <div className="proof-icons">
                {categories.slice(0, 4).map((c) => (
                  <span key={c.id} style={{ background: c.tone[0] }}><c.Icon size={14} /></span>
                ))}
              </div>
              <span>{t('hero.proof')(places.length)}</span>
            </motion.div>
          </div>

          {/* Quick planner card */}
          <motion.div className="planner" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h2><Search size={18} /> {t('planner.title')}</h2>
            <div className="planner-field">
              <label>{t('planner.with')}</label>
              <div className="chip-row">
                {COMPANIONS.map((c) => (
                  <button key={c.id} className={`chip ${plan.with === c.id ? 'active' : ''}`} onClick={() => choose('with', c.id)}>
                    {c.emoji} {pick(c.label)}
                  </button>
                ))}
              </div>
            </div>
            <div className="planner-field">
              <label>{t('planner.mood')}</label>
              <div className="chip-row">
                {MOODS.map((m) => (
                  <button key={m.id} className={`chip ${plan.mood === m.id ? 'active' : ''}`} onClick={() => choose('mood', m.id)}>
                    {m.emoji} {pick(m.label)}
                  </button>
                ))}
              </div>
            </div>
            <div className="planner-field">
              <label>{t('planner.budget')}</label>
              <div className="segmented">
                {PRICES.map((p) => (
                  <button key={p.id} className={plan.price === String(p.id) ? 'active' : ''} onClick={() => choose('price', String(p.id))}>
                    {pick(p.label)}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={goToResults}>
              {t('planner.go')} <ArrowRight size={17} className="flip-rtl" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section container">
        <motion.div className="section-head" {...reveal()}>
          <div>
            <span className="eyebrow">{t('home.catEyebrow')}</span>
            <h2 className="section-title">{t('home.catTitle')}</h2>
          </div>
        </motion.div>
        <div className="cat-row">
          {categories.map((c, i) => (
            <motion.div key={c.id} {...reveal(i * 0.05)}>
              <Link to={`/explore?categories=${c.id}`} className="cat-tile">
                <span className="cat-icon" style={{ background: `linear-gradient(140deg, ${c.tone[0]}, ${c.tone[1]})` }}>
                  <c.Icon size={26} strokeWidth={1.6} />
                </span>
                <strong>{pick(c.label)}</strong>
                <small>{t('home.places')(places.filter((p) => p.categories.includes(c.id)).length)}</small>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TOP RATED ===== */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <motion.div className="section-head" {...reveal()}>
          <div>
            <span className="eyebrow">{t('home.topEyebrow')}</span>
            <h2 className="section-title">{t('home.topTitle')}</h2>
          </div>
          <Link to="/explore" className="link-more">{t('home.viewAll')} <ArrowRight size={16} className="flip-rtl" /></Link>
        </motion.div>
        <div className="top-grid">
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} variant="float" />)
            : topRated.map((p, i) => <PlaceCard key={p.id} place={p} index={i} variant="float" />)}
        </div>
      </section>

      {/* ===== WHO'S GOING ===== */}
      <section className="section container" style={{ paddingTop: 0 }}>
        <motion.div className="section-head" {...reveal()}>
          <div>
            <span className="eyebrow">{t('home.withEyebrow')}</span>
            <h2 className="section-title">{t('home.withTitle')}</h2>
          </div>
        </motion.div>
        <div className="with-grid">
          {COMPANIONS.map((c, i) => (
            <motion.div key={c.id} {...reveal(i * 0.06)}>
              <Link to={`/explore?with=${c.id}`} className="with-card">
                <span className="with-emoji">{c.emoji}</span>
                <strong>{pick(c.label)}</strong>
                <small>{t('home.places')(places.filter((p) => p.companions.includes(c.id)).length)}</small>
                <ArrowRight size={18} className="with-arrow flip-rtl" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container">
        <motion.div className="cta-band" {...reveal()}>
          <div>
            <h2>{t('home.ctaTitle')}</h2>
            <p>{t('home.ctaText')}</p>
          </div>
          <Link to="/spin" className="btn btn-primary"><Shuffle size={17} /> {t('home.ctaBtn')}</Link>
          <div className="cta-ring ring-1" />
          <div className="cta-ring ring-2" />
        </motion.div>
      </section>
    </>
  )
}
