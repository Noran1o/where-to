import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Shuffle, Heart, Home, MapPin, Languages, Moon, Sun } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { useFavorites } from '../context/FavoritesContext'
import Logo from './Logo'
import './Navbar.css'

const LINKS = [
  { to: '/explore', key: 'explore', Icon: Compass },
  { to: '/spin', key: 'spin', Icon: Shuffle },
  { to: '/favorites', key: 'favorites', Icon: Heart },
]

export default function Navbar() {
  const { t, toggleLang } = useLanguage()
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const count = favorites.length > 0 && <span className="nav-badge">{favorites.length}</span>

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" aria-label="Home"><Logo /></Link>

          <nav className="nav-links">
            {LINKS.map(({ to, key }) => (
              <NavLink key={to} to={to} className="nav-link">
                {({ isActive }) => (
                  <>
                    {t(`nav.${key}`)}
                    {key === 'favorites' && count}
                    {isActive && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <span className="nav-city"><MapPin size={15} /> {t('nav.city')}</span>
            <button className="theme-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')} title={theme === 'dark' ? t('theme.light') : t('theme.dark')}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'grid' }}>
                  {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button className="lang-btn" onClick={toggleLang}>
              <Languages size={16} /> {t('nav.switchLang')}
            </button>
          </div>
        </div>
      </header>

      {/* Bottom tab bar — mobile only */}
      <nav className="bottom-nav">
        {[{ to: '/', key: 'home', Icon: Home }, ...LINKS].map(({ to, key, Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className="bottom-link">
            <span className="bottom-icon"><Icon size={20} />{key === 'favorites' && count}</span>
            {key === 'home' ? <bdi>Where To?</bdi> : t(`nav.${key}`)}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
