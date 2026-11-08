import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import PlaceImage from './PlaceImage'

// Fullscreen photo viewer. `index` = open photo (null = closed)
export default function Lightbox({ place, index, onChange, onClose }) {
  const { t, isRTL } = useLanguage()
  const total = Math.max(place.images.length, 1)
  const open = index !== null

  const go = (step) => onChange((index + step + total) % total)

  // Keyboard: Esc closes, arrows move
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(isRTL ? -1 : 1)
      if (e.key === 'ArrowLeft') go(isRTL ? 1 : -1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden' // stop the page scrolling behind
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button className="lb-btn lb-close" onClick={onClose} aria-label={t('gallery.close')}><X size={22} /></button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="lb-stage"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <PlaceImage place={place} index={index} className="lb-img" />
            </motion.div>
          </AnimatePresence>

          {total > 1 && (
            <>
              <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label={t('gallery.prev')}>
                <ChevronLeft size={24} className="flip-rtl" />
              </button>
              <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label={t('gallery.next')}>
                <ChevronRight size={24} className="flip-rtl" />
              </button>
            </>
          )}
          <span className="lb-count">{index + 1} / {total}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
