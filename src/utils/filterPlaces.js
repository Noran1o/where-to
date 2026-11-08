import { placeAreas } from '../data/options'

// Takes all places + the selected filters and returns only the matching places.
// An empty filter ('' or []) means "any".
export function filterPlaces(places, filters) {
  const { q = '', categories = [], with: companion = '', mood = '', price = '', area = '' } = filters
  const query = q.trim().toLowerCase()

  return places.filter((p) => {
    if (query && !`${p.name.ar} ${p.name.en}`.toLowerCase().includes(query)) return false
    if (categories.length && !categories.some((c) => p.categories.includes(c))) return false
    if (companion && !p.companions.includes(companion)) return false
    if (mood && !p.moods.includes(mood)) return false
    if (price !== '' && p.price !== Number(price)) return false
    if (area && !placeAreas(p).includes(area)) return false
    return true
  })
}

// Sorting options for the Explore page
export function sortPlaces(places, sort) {
  const list = [...places]
  if (sort === 'low') return list.sort((a, b) => a.price - b.price || b.rating - a.rating)
  if (sort === 'high') return list.sort((a, b) => b.price - a.price || b.rating - a.rating)
  return list.sort((a, b) => b.rating - a.rating) // default: top rated
}

// Google Maps embed for the map preview (no API key needed)
export const mapEmbedUrl = (place, branch = place.branches[0]) => {
  const where = branch?.label?.en ? `${branch.label.en}, ` : ''
  return `https://www.google.com/maps?q=${encodeURIComponent(`${place.name.en}, ${where}Mansoura`)}&output=embed`
}
