// Exports src/data/places.js to places-template.csv (to import into Google Sheets)
// Run: node scripts/export-csv.mjs
import { writeFileSync } from 'node:fs'
import { PLACES } from '../src/data/places.js'

const cols = ['id', 'name_en', 'name_ar', 'categories', 'rating', 'price', 'moods', 'companions', 'open_time', 'close_time',
  'hours_en', 'hours_ar', 'branches', 'description_en', 'description_ar', 'instagram', 'facebook', 'website', 'menu',
  'images', 'logo', 'related']

const cell = (v) => {
  const s = v == null ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const rows = PLACES.map((p) => ({
  id: p.id, name_en: p.name.en, name_ar: p.name.ar, categories: p.categories.join(', '), rating: p.rating, price: p.price,
  moods: p.moods.join(', '), companions: p.companions.join(', '),
  open_time: p.time === 'always' ? 'always' : p.time?.open, close_time: p.time === 'always' ? '' : p.time?.close,
  hours_en: p.hours.en, hours_ar: p.hours.ar,
  branches: p.branches.map((b) => [b.area, b.label.en, b.label.ar, b.maps].join(' | ')).join(' ; '),
  description_en: p.description.en, description_ar: p.description.ar, instagram: p.links.instagram, facebook: p.links.facebook,
  website: p.links.website, menu: p.links.menu, images: p.images.join(', '), logo: p.logo, related: (p.related || []).join(', '),
}))

const csv = '﻿' + [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n')
writeFileSync('places-template.csv', csv)
console.log(`Wrote ${rows.length} places to places-template.csv`)
