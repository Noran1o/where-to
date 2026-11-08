import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

// Fonts are bundled with the app (no external requests)
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import '@fontsource/caveat/600.css'

import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { PlacesProvider } from './context/PlacesContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { initAnalytics } from './utils/analytics'

initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouter works on any static host without extra server config */}
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <PlacesProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </PlacesProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
