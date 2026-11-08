import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <section className="container section" style={{ textAlign: 'center' }}>
      <motion.div initial={{ rotate: -90, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring' }} style={{ display: 'inline-grid', color: 'var(--accent)', marginBottom: '1rem' }}>
        <Compass size={64} strokeWidth={1.4} />
      </motion.div>
      <h1 className="section-title">{t('notFound.title')}</h1>
      <p className="muted" style={{ margin: '0.5rem 0 1.5rem' }}>{t('notFound.text')}</p>
      <Link to="/" className="btn btn-dark">{t('notFound.back')}</Link>
    </section>
  )
}
