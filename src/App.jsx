import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import PlaceDetails from './pages/PlaceDetails'
import Spin from './pages/Spin'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'
import { trackPageView } from './utils/analytics'
import { usePlaces } from './context/PlacesContext'
import { useLanguage } from './context/LanguageContext'

// Every page fades in softly
const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export default function App() {
  const location = useLocation()

  const { error } = usePlaces()
  const { t } = useLanguage()

  // On every page change: scroll to top + record a page view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    trackPageView(location.pathname + location.search)
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      {error && <div className="data-error">{t('data.error')}</div>}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/explore" element={<Page><Explore /></Page>} />
            <Route path="/place/:id" element={<Page><PlaceDetails /></Page>} />
            <Route path="/spin" element={<Page><Spin /></Page>} />
            <Route path="/favorites" element={<Page><Favorites /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
