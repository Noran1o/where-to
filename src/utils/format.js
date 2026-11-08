import { AREAS, PRICES, findOption } from '../data/options'

// Price as words: "Mid-range" / "متوسط" (no currency symbols)
export const formatPrice = (place, pick) => pick(findOption(PRICES, place.price).label)

// Short location text for cards: the area name, or "3 branches"
export function areaText(place, pick, t) {
  if (place.branches.length > 1) return t('place.branchesCount')(place.branches.length)
  const b = place.branches[0]
  return b ? pick(findOption(AREAS, b.area)?.label || b.label) : ''
}
