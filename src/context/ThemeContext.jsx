import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const initialTheme = () => {
  try {
    const saved = localStorage.getItem('whereto-theme')
    if (saved) return saved
  } catch { /* storage unavailable */ }
  // First visit: follow the device setting
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('whereto-theme', theme) } catch { /* ignore */ }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
