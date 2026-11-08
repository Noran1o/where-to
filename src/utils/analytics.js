import { GA_MEASUREMENT_ID } from '../config'

// Google Analytics 4 — only loads when GA_MEASUREMENT_ID is set in config.js
let ready = false

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || ready) return
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date())
  // We send page views ourselves on every route change (the app uses client-side routing)
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
  ready = true
}

export function trackPageView(path) {
  if (!ready) return
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}

// Custom events, e.g. trackEvent('save_place', { place_id: 'coffee-corner' })
export function trackEvent(name, params = {}) {
  if (!ready) return
  window.gtag('event', name, params)
}
