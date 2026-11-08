// All filter options live here, so adding a new mood or area is a one-line change.
// Every label has an English and Arabic version.
import { Coffee, UtensilsCrossed, Ticket, Trees, ShoppingBag, Landmark, Laptop } from 'lucide-react'

// `tone` = soft background used when a place has no photo yet
export const CATEGORIES = [
  { id: 'cafe', Icon: Coffee, label: { en: 'Cafés', ar: 'كافيهات' }, tone: ['#C9A27E', '#8C6A4F'] },
  { id: 'restaurant', Icon: UtensilsCrossed, label: { en: 'Restaurants', ar: 'مطاعم' }, tone: ['#D98C6B', '#A65B3F'] },
  { id: 'workspace', Icon: Laptop, label: { en: 'Workspaces', ar: 'ورك سبيس' }, tone: ['#7FA7A3', '#4C7571'] },
  { id: 'entertainment', Icon: Ticket, label: { en: 'Entertainment', ar: 'ترفيه' }, tone: ['#8197B8', '#53698C'] },
  { id: 'outdoor', Icon: Trees, label: { en: 'Outdoors', ar: 'خروجات مفتوحة' }, tone: ['#8DB38B', '#5A8458'] },
  { id: 'shopping', Icon: ShoppingBag, label: { en: 'Shopping', ar: 'تسوق' }, tone: ['#B79BC2', '#836690'] },
  { id: 'historical', Icon: Landmark, label: { en: 'Historical', ar: 'أماكن تاريخية' }, tone: ['#C8B27A', '#8F7B45'] },
]

export const COMPANIONS = [
  { id: 'solo', emoji: '🧍', label: { en: 'Solo', ar: 'لوحدي' } },
  { id: 'friends', emoji: '👯', label: { en: 'Friends', ar: 'مع صحابي' } },
  { id: 'couple', emoji: '💑', label: { en: 'Partner', ar: 'مع شريك حياتي' } },
  { id: 'family', emoji: '👨‍👩‍👧', label: { en: 'Family', ar: 'مع العيلة' } },
]

export const MOODS = [
  { id: 'calm', emoji: '🌿', label: { en: 'Calm', ar: 'هادي' } },
  { id: 'study', emoji: '💻', label: { en: 'Study & work', ar: 'مذاكرة وشغل' } },
  { id: 'chill', emoji: '😌', label: { en: 'Chill', ar: 'رايق' } },
  { id: 'lively', emoji: '🎉', label: { en: 'Lively', ar: 'حيوي' } },
  { id: 'romantic', emoji: '💕', label: { en: 'Romantic', ar: 'رومانسي' } },
]

// Budget levels (no currency symbols — shown as words)
export const PRICES = [
  { id: 0, label: { en: 'Free', ar: 'ببلاش' } },
  { id: 1, label: { en: 'Budget', ar: 'اقتصادي' } },
  { id: 2, label: { en: 'Mid-range', ar: 'متوسط' } },
  { id: 3, label: { en: 'Premium', ar: 'غالي' } },
]

export const AREAS = [
  { id: 'corniche', label: { en: 'El Mashaya (Corniche)', ar: 'المشاية' } },
  { id: 'university', label: { en: 'University District', ar: 'حي الجامعة' } },
  { id: 'toreil', label: { en: 'Toreil', ar: 'توريل' } },
  { id: 'gomhoreya', label: { en: 'El Gomhoreya St', ar: 'شارع الجمهورية' } },
  { id: 'suez', label: { en: 'Suez Canal St', ar: 'شارع قناة السويس' } },
  { id: 'gihan', label: { en: 'Gihan St', ar: 'شارع جيهان' } },
  { id: 'teraa', label: { en: 'El Teraa St', ar: 'شارع الترعة' } },
]

export const findOption = (list, id) => list.find((o) => o.id === id)

// Helpers that work with the place shape
export const placeAreas = (place) => [...new Set(place.branches.map((b) => b.area))]
export const mainCategory = (place) => findOption(CATEGORIES, place.categories[0]) || CATEGORIES[0]
