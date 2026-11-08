# 🌅 Where To? | على فين؟

A bilingual (Arabic / English) web app that helps people in **Mansoura, Egypt** pick where to go out, based on their **mood**, **budget** and **who they're going with**.

## ✨ Features
- **3-step outing planner:** who you're with → your mood → your budget → matching places
- **Explore page** with live filters (category, company, mood, budget, area) and search. Filters are kept in the URL, so results can be shared as a link
- **Place details:** hours, prices, moods, a Google Maps embed, directions, sharing
- **Spin the Wheel 🎡:** let the wheel pick a place from your filtered list
- **Favorites ♥** saved in Local Storage
- **Open now** badge and filter, calculated in Cairo time (handles places that close after midnight)
- **Dark mode** that follows the device setting and can be toggled
- **Fullscreen photo viewer** with keyboard navigation
- **Google Sheets as a CMS:** places are edited in a spreadsheet, no code changes needed
- **Skeleton loading** while data is fetched
- **Google Analytics 4** page views + custom events (place views, saves, wheel spins)
- **Full Arabic (RTL) and English (LTR)** with a one-click switch
- Animated "Nile waves" identity, page transitions and micro-interactions
- Mobile-first, with an app-style bottom navigation bar

## 🛠 Tech Stack
React 19 · Vite · React Router · Framer Motion · Lucide icons · PapaParse · Google Sheets · Google Analytics 4 · CSS (custom properties, dark mode) (custom properties, logical properties for RTL) · Local Storage

## 🚀 Run locally
```bash
npm install
npm run dev
```
Then open the link shown in the terminal (usually http://localhost:5173).

## 📁 Project structure
```
src/
├── components/   # Reusable UI: Navbar, PlaceCard, NileWaves, FavoriteButton...
├── config.js     # Google Sheet link + Analytics ID
├── context/      # Language (AR/EN + RTL), Theme (dark mode), Places (data loading), Favorites
├── data/         # places.js (the places) + options.js (categories, moods, areas...)
├── i18n/         # translations.js — every UI text in both languages
├── pages/        # Home, Explore, PlaceDetails, Spin, Favorites, NotFound
└── utils/        # filters, opening hours, Google Sheet parser, analytics
```

## 📊 Managing places from Google Sheets
1. Open Google Sheets → File → Import → upload `places-template.csv` (it has every column and the current places).
2. Edit / add rows. Lists (moods, companions, images) are comma-separated. `open_time` / `close_time` use 24h time like `09:00`, or `always`.
3. File → Share → **Publish to web** → choose the sheet → **Comma-separated values (.csv)** → Publish, and copy the link.
4. Paste the link in `src/config.js` → `SHEET_CSV_URL`.

Photos in the sheet must be direct image links (e.g. from Cloudinary or ImgBB), or files you put in `public/places/` written as `./places/name.jpg`.

To regenerate the template from `src/data/places.js`: `node scripts/export-csv.mjs`

## 📈 Analytics
Create a free Google Analytics 4 property, copy its Measurement ID (`G-XXXXXXXXXX`) and paste it in `src/config.js` → `GA_MEASUREMENT_ID`.

## ➕ Adding a place in code
Open `src/data/places.js` and add an object with the same shape as the others (the shape is documented at the top of the file): name, category, area, your own rating, price range, moods, who it suits, hours, address, phone and links (Instagram, Facebook, website, menu, Google Maps).
Put photos in `public/places/` and list them in `images: ['./places/my-photo.jpg']`.

## 🗺 Roadmap
- [x] Real places from Mansoura with photos
- [ ] Photos for the remaining places
- [ ] Interactive map of all places (Leaflet + OpenStreetMap)
- [ ] "Plan my outing": a café + dinner combo close to each other
- [ ] Interactive map page
