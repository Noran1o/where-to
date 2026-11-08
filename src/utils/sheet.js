import Papa from 'papaparse'

// Turns the rows of the Google Sheet into place objects (same shape as src/data/places.js).
// Column names expected in the first row of the sheet — see places-template.csv.

const list = (cell) => (cell || '').split(',').map((x) => x.trim()).filter(Boolean)
const num = (cell, fallback = null) => (cell === '' || cell == null || isNaN(Number(cell)) ? fallback : Number(cell))
const text = (cell) => (cell || '').trim()
const bi = (en, ar) => ({ en: text(en), ar: text(ar) || text(en) })

// Accepts "09:00", "9:00:00" (Google Sheets time format) or "9:00 PM" → "21:00"
function normalizeTime(cell) {
  const m = text(cell).toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?(?::\d{2})?\s*(am|pm)?$/)
  if (!m) return null
  let h = Number(m[1]) % 24
  if (m[3] === 'pm' && h < 12) h += 12
  if (m[3] === 'am' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${m[2] || '00'}`
}

function parseTime(open, close) {
  const o = text(open).toLowerCase()
  if (o === 'always' || o === '24h') return 'always'
  const from = normalizeTime(open)
  const to = normalizeTime(close)
  return from && to ? { open: from, close: to } : null
}

// branches column: "area | Label EN | Label AR | maps link ; area | ... "
function parseBranches(cell) {
  return text(cell).split(';').map((chunk) => chunk.split('|').map((x) => x.trim())).filter((parts) => parts[0])
    .map(([area, en, ar, maps]) => ({ area: area.toLowerCase(), label: bi(en, ar), maps: maps || '' }))
}

export function rowToPlace(row) {
  return {
    id: text(row.id),
    name: bi(row.name_en, row.name_ar),
    categories: list(row.categories).map((c) => c.toLowerCase()),
    rating: num(row.rating, 0),
    price: num(row.price, 1),
    moods: list(row.moods),
    companions: list(row.companions),
    time: parseTime(row.open_time, row.close_time),
    hours: bi(row.hours_en, row.hours_ar),
    branches: parseBranches(row.branches),
    description: bi(row.description_en, row.description_ar),
    links: Object.fromEntries(['instagram', 'facebook', 'website', 'menu'].map((k) => [k, text(row[k])]).filter(([, v]) => v)),
    images: list(row.images),
    logo: text(row.logo) || undefined,
    related: list(row.related),
  }
}

export async function loadPlacesFromSheet(url) {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Sheet request failed (${res.status})`)
  const csv = await res.text()
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true, transformHeader: (h) => h.replace(/^﻿/, '').trim().toLowerCase() })
  // Skip rows without an id, name or branch (empty / half-filled rows)
  return data.map(rowToPlace).filter((p) => p.id && p.name.en && p.branches.length && p.categories.length)
}
