import { createContext, useContext, useEffect, useState } from 'react'
import { PLACES as LOCAL_PLACES } from '../data/places'
import { SHEET_CSV_URL } from '../config'
import { loadPlacesFromSheet } from '../utils/sheet'

const PlacesContext = createContext(null)

// Loads the places once for the whole app:
// - from the Google Sheet if SHEET_CSV_URL is set in config.js
// - otherwise from src/data/places.js
export function PlacesProvider({ children }) {
  const useSheet = Boolean(SHEET_CSV_URL)
  const [places, setPlaces] = useState(useSheet ? [] : LOCAL_PLACES)
  const [loading, setLoading] = useState(useSheet)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!useSheet) return
    loadPlacesFromSheet(SHEET_CSV_URL)
      .then((rows) => setPlaces(rows.length ? rows : LOCAL_PLACES))
      .catch((err) => {
        console.error(err)
        setError(err)
        setPlaces(LOCAL_PLACES) // fall back so the site never looks empty
      })
      .finally(() => setLoading(false))
  }, [useSheet])

  const getPlaceById = (id) => places.find((p) => p.id === id)

  return (
    <PlacesContext.Provider value={{ places, loading, error, getPlaceById }}>
      {children}
    </PlacesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlaces = () => useContext(PlacesContext)
