import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { CATEGORIES } from '../data/options'
import { usePlaces } from '../context/PlacesContext'
import Logo from './Logo'

export default function Footer() {
  const { t, pick } = useLanguage()
  const { places } = usePlaces()
  const categories = CATEGORIES.filter((c) => places.some((p) => p.categories.includes(c.id)))
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="muted" style={{ marginTop: '0.8rem', maxWidth: 320 }}>{t('footer.tagline')}</p>
        </div>
        <div>
          <h4>{t('footer.explore')}</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.id}><Link to={`/explore?categories=${c.id}`}>{pick(c.label)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4><bdi>Where To?</bdi></h4>
          <ul>
            <li><Link to="/explore">{t('nav.explore')}</Link></li>
            <li><Link to="/spin">{t('nav.spin')}</Link></li>
            <li><Link to="/favorites">{t('nav.favorites')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} <bdi>Where To?</bdi> · {t('footer.rights')}</span>
      </div>
      <style>{`
        .footer { background: var(--surface); border-top: 1px solid var(--line); margin-top: 4rem; padding: 3.5rem 0 1.5rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 2rem; }
        .footer h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.8rem; }
        .footer ul { list-style: none; display: grid; gap: 0.45rem; }
        .footer li a { color: var(--muted); font-size: 0.9rem; transition: color 0.2s; }
        .footer li a:hover { color: var(--accent); }
        .footer-bottom { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--line); margin-top: 2.5rem; padding-top: 1.2rem; font-size: 0.8rem; color: var(--muted); }
        @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr 1fr; } .footer-grid > div:first-child { grid-column: 1 / -1; } }
      `}</style>
    </footer>
  )
}
