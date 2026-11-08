import { createContext, useContext, useEffect, useState } from 'react'
import { trackEvent } from '../utils/analytics'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'whereto-favorites'

const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readSaved) // array of place ids

  // Save to Local Storage every time the list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      /* storage unavailable — favorites live only for this visit */
    }
  }, [favorites])

  const isFavorite = (id) => favorites.includes(id)

  const toggleFavorite = (id) => {
    if (!favorites.includes(id)) trackEvent('save_place', { place_id: id })
    setFavorites((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => useContext(FavoritesContext)
