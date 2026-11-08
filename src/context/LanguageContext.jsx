import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

const readSavedLang = () => {
  try {
    return localStorage.getItem('whereto-lang') || 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLang)

  // Whenever the language changes: flip page direction + remember the choice
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('whereto-lang', lang)
    } catch {
      /* storage unavailable — ignore */
    }
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))

  // t('hero.title1') → walks into the translations object by the dotted path
  const t = (path) => path.split('.').reduce((obj, key) => obj?.[key], translations[lang]) ?? path

  // pick({ ar, en }) → returns the text in the current language
  const pick = (obj) => (obj ? obj[lang] ?? obj.en : '')

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, pick, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
