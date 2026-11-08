// "Open now" logic — always uses Mansoura's time zone, wherever the visitor is.

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + (m || 0)
}

// Current day + minutes since midnight in Cairo
function cairoNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type).value
  return { day: DAYS.indexOf(get('weekday').toLowerCase().slice(0, 3)), minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) }
}

// Opening hours for a given weekday (applies per-day exceptions like "Thursday opens at 10")
function scheduleFor(time, dayIndex) {
  const extra = time.days?.[DAYS[dayIndex]] || {}
  return { open: extra.open || time.open, close: extra.close || time.close }
}

// Returns { status: 'open' | 'closed' | 'unknown', schedule } — schedule = the hours that apply right now
export function getOpenInfo(place) {
  const { time } = place
  if (!time) return { status: 'unknown' }
  if (time === 'always') return { status: 'open' }

  const { day, minutes } = cairoNow()
  const today = scheduleFor(time, day)
  const yesterday = scheduleFor(time, (day + 6) % 7)

  // Still open from last night? (e.g. yesterday 11:00 → 02:30, and it's 1 AM now)
  const yClose = toMinutes(yesterday.close)
  if (yClose < toMinutes(yesterday.open) && minutes < yClose) return { status: 'open', schedule: yesterday }

  const open = toMinutes(today.open)
  const close = toMinutes(today.close)
  const closesNextDay = close <= open
  const isOpen = minutes >= open && (closesNextDay || minutes < close)
  return { status: isOpen ? 'open' : 'closed', schedule: today }
}

export const getOpenStatus = (place) => getOpenInfo(place).status

// "1 AM" / "١ ص" from "01:00"
export function formatTime(hhmm, lang) {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(2000, 0, 1, h, m)
  return d.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: m ? '2-digit' : undefined })
}
