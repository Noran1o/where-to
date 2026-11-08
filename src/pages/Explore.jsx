import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, Check, SearchX } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { usePlaces } from '../context/PlacesContext'
import SkeletonCard from '../components/SkeletonCard'
import { getOpenStatus } from '../utils/hours'
import { CATEGORIES, COMPANIONS, MOODS, PRICES, AREAS, placeAreas } from '../data/options'
import { filterPlaces, sortPlaces } from '../utils/filterPlaces'
import PlaceCard from '../components/PlaceCard'
import './Explore.css'

export default function Explore() {
  const { t, pick } = useLanguage()
  const { places, loading } = usePlaces()
  // Filters live in the URL (?mood=calm&with=friends) so results can be shared as a link
  const [params, setParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filters = {
    q: params.get('q') ?? '',
    categories: params.get('categories')?.split(',').filter(Boolean) ?? [],
    with: params.get('with') ?? '',
    mood: params.get('mood') ?? '',
    price: params.get('price') ?? '',
    area: params.get('area') ?? '',
  }
  const sort = params.get('sort') ?? 'top'
  const openOnly = params.get('open') === '1'
  const activeCount = filters.categories.length + ['with', 'mood', 'price', 'area'].filter((k) => filters[k] !== '').length + (openOnly ? 1 : 0)

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === '' || (Array.isArray(value) && value.length === 0)) next.delete(key)
    else next.set(key, Array.isArray(value) ? value.join(',') : value)
    setParams(next, { replace: true })
  }
  // Clicking the selected chip again removes that filter
  const toggleSingle = (key, value) => update(key, filters[key] === String(value) ? '' : String(value))
  const toggleCategory = (id) =>
    update('categories', filters.categories.includes(id) ? filters.categories.filter((c) => c !== id) : [...filters.categories, id])
  const clearAll = () => setParams(filters.q ? { q: filters.q } : {}, { replace: true })

  // Only list categories / areas that actually have places
  const categories = CATEGORIES.filter((c) => places.some((p) => p.categories.includes(c.id)))
  const areas = AREAS.filter((a) => places.some((p) => placeAreas(p).includes(a.id)))

  const results = useMemo(() => {
    let list = filterPlaces(places, filters)
    if (openOnly) list = list.filter((p) => getOpenStatus(p) === 'open')
    return sortPlaces(list, sort)
  }, [params, places]) // eslint-disable-line react-hooks/exhaustive-deps

  const chipGroup = (label, key, options) => (
    <div className="f-group">
      <h4>{label}</h4>
      <div className="chip-row">
        {options.map((o) => (
          <button key={o.id} className={`chip ${filters[key] === String(o.id) ? 'active' : ''}`} onClick={() => toggleSingle(key, o.id)}>
            {o.emoji && <span>{o.emoji}</span>} {pick(o.label)}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container">
      <header className="page-head">
        <h1>{t('explore.title')}</h1>
        <p>{t('explore.subtitle')}</p>
      </header>

      <div className="explore-layout">
        {/* ===== Sidebar filters ===== */}
        <aside className={`filters ${drawerOpen ? 'open' : ''}`}>
          <div className="filters-head">
            <h3>{t('explore.filters')}</h3>
            {activeCount > 0 && <button className="f-clear" onClick={clearAll}>{t('explore.clear')}</button>}
            <button className="f-close" onClick={() => setDrawerOpen(false)} aria-label="Close"><X size={20} /></button>
          </div>

          <label className="f-switch">
            <span><span className="open-dot pulse" /> {t('open.filter')}</span>
            <input type="checkbox" checked={openOnly} onChange={(e) => update('open', e.target.checked ? '1' : '')} />
            <span className="switch" aria-hidden="true" />
          </label>

          <div className="f-group">
            <h4>{t('explore.category')}</h4>
            <ul className="f-checks">
              {categories.map((c) => {
                const checked = filters.categories.includes(c.id)
                return (
                  <li key={c.id}>
                    <button className={`f-check ${checked ? 'checked' : ''}`} onClick={() => toggleCategory(c.id)}>
                      <span className="box">{checked && <Check size={13} strokeWidth={3} />}</span>
                      <c.Icon size={16} className="muted" />
                      {pick(c.label)}
                      <span className="count">{places.filter((p) => p.categories.includes(c.id)).length}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {chipGroup(t('explore.with'), 'with', COMPANIONS)}
          {chipGroup(t('explore.mood'), 'mood', MOODS)}
          {chipGroup(t('explore.price'), 'price', PRICES)}

          <div className="f-group">
            <h4>{t('explore.area')}</h4>
            <select className="f-select" value={filters.area} onChange={(e) => update('area', e.target.value)}>
              <option value="">{t('explore.allAreas')}</option>
              {areas.map((a) => <option key={a.id} value={a.id}>{pick(a.label)}</option>)}
            </select>
          </div>

          <button className="btn btn-dark btn-block f-show" onClick={() => setDrawerOpen(false)}>
            {t('explore.showResults')} ({results.length})
          </button>
        </aside>
        {drawerOpen && <div className="filters-backdrop" onClick={() => setDrawerOpen(false)} />}

        {/* ===== Results ===== */}
        <section>
          <div className="toolbar">
            <label className="search">
              <Search size={18} className="muted" />
              <input type="search" value={filters.q} placeholder={t('explore.search')} onChange={(e) => update('q', e.target.value)} />
            </label>
            <button className="btn btn-outline filters-btn" onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontal size={16} /> {t('explore.filters')} {activeCount > 0 && <span className="nav-badge">{activeCount}</span>}
            </button>
            <select className="sort" value={sort} onChange={(e) => update('sort', e.target.value === 'top' ? '' : e.target.value)} aria-label={t('explore.sort')}>
              <option value="top">{t('explore.sortTop')}</option>
              <option value="low">{t('explore.sortLow')}</option>
              <option value="high">{t('explore.sortHigh')}</option>
            </select>
          </div>

          <p className="results-count">{loading ? '…' : t('explore.results')(results.length)}</p>

          {loading ? (
            <div className="grid-cards explore-grid">
              {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : results.length > 0 ? (
            <motion.div layout className="grid-cards explore-grid">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => <PlaceCard key={p.id} place={p} index={i} />)}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div className="empty" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="empty-icon"><SearchX size={24} /></div>
              <h3>{t('explore.emptyTitle')}</h3>
              <p>{t('explore.emptyText')}</p>
              <button className="btn btn-dark" onClick={() => setParams({}, { replace: true })}>{t('explore.clear')}</button>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}
