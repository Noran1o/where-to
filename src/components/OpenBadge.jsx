import { useLanguage } from '../context/LanguageContext'
import { getOpenInfo, formatTime } from '../utils/hours'

// Small "● Open now · closes 1 AM" label. Shows nothing if hours are unknown.
export default function OpenBadge({ place, detailed = false, className = '' }) {
  const { t, lang } = useLanguage()
  const { status, schedule } = getOpenInfo(place)
  if (status === 'unknown') return null

  let extra = ''
  if (detailed) {
    if (place.time === 'always') extra = ` · ${t('open.always')}`
    else if (status === 'open') extra = ` · ${t('open.closes')} ${formatTime(schedule.close, lang)}`
    else extra = ` · ${t('open.opens')} ${formatTime(schedule.open, lang)}`
  }

  return (
    <span className={`open-badge ${status} ${className}`}>
      <span className="open-dot" />
      {status === 'open' ? t('open.open') : t('open.closed')}
      {extra}
    </span>
  )
}
