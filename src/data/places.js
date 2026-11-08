// ─────────────────────────────────────────────────────────────
//  PLACES DATA — real places in Mansoura
// ─────────────────────────────────────────────────────────────
//
// Shape of one place:
// {
//   id: 'unique-slug',                    // used in the URL: /place/unique-slug
//   name: { en, ar },
//   categories: ['cafe', 'workspace'],    // one or more (see CATEGORIES in options.js)
//   rating: 4.2,                          // Google rating out of 5
//   price: 0-3,                           // 0 free · 1 budget · 2 mid-range · 3 premium
//   moods: ['calm', ...],
//   companions: ['solo', 'friends', 'couple', 'family'],
//   time: {                               // used for "Open now" (24h clock, Cairo time)
//     open: '11:00', close: '02:30',
//     days: { thu: { open: '10:00' } },   // optional: different hours on some days
//   } | 'always' | null,                  // 'always' = 24 hours · null = not fixed
//   hours: { en, ar },                    // text shown to visitors
//   branches: [                           // one or more locations
//     { area: 'corniche', label: { en, ar }, maps: 'Google Maps link' },
//   ],
//   description: { en, ar },
//   links: { instagram, facebook, website, menu },
//   images: ['./places/slug-1.jpg'],      // photos in /public/places/
//   logo: './places/slug-logo.jpg',
//   related: ['other-place-id'],          // e.g. a cinema inside a mall
// }

export const PLACES = [
  {
    id: 'shelter',
    name: { en: 'Shelter', ar: 'شيلتر' },
    categories: ['restaurant', 'cafe'],
    rating: 4.0,
    price: 2,
    moods: ['calm', 'chill'],
    companions: ['solo', 'friends', 'couple', 'family'],
    time: { open: '11:00', close: '02:30' },
    hours: { en: 'Daily, 11 AM – 2:30 AM', ar: 'يوميًا من ١١ الصبح لـ ٢:٣٠ بالليل' },
    branches: [
      { area: 'corniche', label: { en: 'El Mashaya', ar: 'المشاية' }, maps: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x14f79d002ac627bd:0xdecab9431448dafc' },
    ],
    description: {
      en: 'A multi-cuisine restaurant and café on El Mashaya, with a green outdoor garden seating area under the trees.',
      ar: 'مطعم وكافيه على المشاية، فيه أكلات متنوعة وقعدة برا في جنينة خضرا تحت الشجر.',
    },
    links: { instagram: 'https://www.instagram.com/shelter.egy', facebook: 'https://www.facebook.com/share/19roJJydAx/' },
    images: ['./places/shelter-1.jpg', './places/shelter-2.jpg'],
    logo: './places/shelter-logo.jpg',
  },
  {
    id: 'chicken-kickers',
    name: { en: 'Chicken Kickers', ar: 'تشيكن كيكرز' },
    categories: ['restaurant'],
    rating: 4.2,
    price: 2,
    moods: ['lively'],
    companions: ['solo', 'friends', 'couple', 'family'],
    time: { open: '12:00', close: '02:00', days: { thu: { open: '10:00' } } },
    hours: { en: 'Daily, 12 PM – 2 AM · Thursday from 10 AM', ar: 'يوميًا من ١٢ الضهر لـ ٢ بالليل · الخميس من ١٠ الصبح' },
    branches: [
      { area: 'corniche', label: { en: 'El Mashaya', ar: 'المشاية' }, maps: 'https://maps.app.goo.gl/Ves15XGpyzgEjjPF8' },
    ],
    description: {
      en: 'Fried chicken buckets and loaded crispy chicken burgers on El Mashaya — a lively pick for a quick bite with friends or family.',
      ar: 'باكتات فراخ مقرمشة وبرجر فراخ كريسبي محمل على المشاية. اختيار حيوي لأكلة سريعة مع الصحاب أو العيلة.',
    },
    links: { instagram: 'https://www.instagram.com/chicken.kickers', facebook: 'https://www.facebook.com/share/19hLSgVmWx/' },
    images: ['./places/chicken-kickers-1.jpg', './places/chicken-kickers-2.jpg'],
    logo: './places/chicken-kickers-logo.jpg',
  },
  {
    id: 'sharqy',
    name: { en: 'Sharqy', ar: 'شرقي' },
    categories: ['restaurant'],
    rating: 3.9,
    price: 1,
    moods: ['lively'],
    companions: ['solo', 'friends'],
    time: { open: '06:00', close: '00:00' },
    hours: { en: 'Daily, 6 AM – 12 AM', ar: 'يوميًا من ٦ الصبح لـ ١٢ بالليل' },
    branches: [
      { area: 'gomhoreya', label: { en: 'El Gomhoreya St', ar: 'شارع الجمهورية' }, maps: 'https://maps.app.goo.gl/FGF9vHKqjVXPJWKz7' },
      { area: 'university', label: { en: 'University District', ar: 'حي الجامعة' }, maps: 'https://maps.app.goo.gl/EhtqJk8aWCRMJARd7' },
      { area: 'suez', label: { en: 'Suez Canal St', ar: 'شارع قناة السويس' }, maps: 'https://maps.app.goo.gl/Ju4XPRBELD8rbY8TA' },
    ],
    description: {
      en: 'Egyptian breakfast classics — foul, falafel and more — at budget prices, with three branches across Mansoura.',
      ar: 'فطار مصري أصلي: فول وطعمية وغيرهم بأسعار اقتصادية، وليه ٣ فروع في المنصورة.',
    },
    links: { instagram: 'https://www.instagram.com/sharqyeg', facebook: 'https://www.facebook.com/share/1Mf4yRqxS9/' },
    images: ['./places/sharqy-1.jpg'],
    logo: './places/sharqy-logo.jpg',
  },
  {
    id: 'roshdy',
    name: { en: 'Roshdy 3asaree3', ar: 'رشدي على السريع' },
    categories: ['restaurant'],
    rating: 4.2,
    price: 2,
    moods: ['lively'],
    companions: ['solo', 'friends', 'couple', 'family'],
    time: null,
    hours: { en: 'Hours vary — check their page', ar: 'المواعيد بتتغير، شوف صفحتهم' },
    branches: [
      { area: 'gihan', label: { en: 'Gihan St', ar: 'شارع جيهان' }, maps: 'https://maps.app.goo.gl/xdRZUemYBFRQi8iu8' },
      { area: 'corniche', label: { en: 'El Mashaya', ar: 'المشاية' }, maps: 'https://share.google/Qx38yMytfY3E6Nm0I' },
    ],
    description: {
      en: 'Loaded sandwiches and crispy chicken boxes, served fast — with two branches on Gihan St and El Mashaya.',
      ar: 'ساندوتشات وبوكسات فراخ كريسبي محملة، على السريع. وليه فرعين في شارع جيهان والمشاية.',
    },
    links: { instagram: 'https://www.instagram.com/roshdy.3asaree3', facebook: 'https://www.facebook.com/share/1E2JW4VMKM/' },
    images: ['./places/roshdy-1.jpg'],
    logo: './places/roshdy-logo.jpg',
  },
  {
    id: 'somesense',
    name: { en: 'SomeSense', ar: 'SomeSense' },
    categories: ['cafe'],
    rating: 4.5,
    price: 2,
    moods: ['chill', 'lively'],
    companions: ['solo', 'friends', 'couple'],
    time: { open: '08:00', close: '01:00' },
    hours: { en: 'Daily, 8 AM – 1 AM', ar: 'يوميًا من ٨ الصبح لـ ١ بالليل' },
    branches: [
      { area: 'corniche', label: { en: 'Upper Mashaya, opposite the Faculty of Law gate', ar: 'المشاية العلوية، أمام بوابة كلية الحقوق' }, maps: 'https://share.google/HEDoeJOK8Y9Xqmgo4' },
    ],
    description: {
      en: 'Coffee and brunch on the Upper Mashaya, right opposite the Faculty of Law gate.',
      ar: 'قهوة وفطار على المشاية العلوية، قصاد بوابة كلية الحقوق.',
    },
    links: { instagram: 'https://www.instagram.com/somesense.eg', facebook: 'https://www.facebook.com/share/1Bu56u2WUi/' },
    images: ['./places/somesense-1.jpg', './places/somesense-2.jpg'],
    logo: './places/somesense-logo.jpg',
  },
  {
    id: 'rivo-coffee',
    name: { en: 'Rivo Coffee', ar: 'Rivo Coffee' },
    categories: ['cafe'],
    rating: 4.2,
    price: 2,
    moods: ['chill', 'lively', 'study'],
    companions: ['solo', 'friends', 'couple'],
    time: null,
    hours: { en: 'Hours vary — check their page', ar: 'المواعيد بتتغير، شوف صفحتهم' },
    branches: [
      { area: 'teraa', label: { en: 'El Teraa St', ar: 'شارع الترعة' }, maps: 'https://share.google/S5BQPaV0zRgwcefum' },
      { area: 'university', label: { en: 'University District', ar: 'حي الجامعة' }, maps: 'https://share.google/9JLl13R9xz7TgomO4' },
      { area: 'gomhoreya', label: { en: 'El Gomhoreya St', ar: 'شارع الجمهورية' }, maps: 'https://share.google/J9cCytIqzrqLgH0AH' },
    ],
    description: {
      en: 'A laid-back coffee spot with three branches — good for hanging out or a study session.',
      ar: 'كافيه رايق ليه ٣ فروع، ينفع للقعدة مع الصحاب أو للمذاكرة.',
    },
    links: { instagram: 'https://www.instagram.com/rivo_coffee', facebook: 'https://www.facebook.com/share/19R5kktsNP/' },
    images: ['./places/rivo-1.jpg', './places/rivo-2.jpg'],
    logo: './places/rivo-logo.jpg',
  },
  {
    id: 'orca-hub',
    name: { en: 'ORCA Hub', ar: 'ORCA Hub' },
    categories: ['cafe', 'workspace'],
    rating: 4.5,
    price: 2,
    moods: ['chill', 'calm', 'study'],
    companions: ['solo', 'friends'],
    time: { open: '08:00', close: '02:00' },
    hours: { en: 'Daily, 8 AM – 2 AM', ar: 'يوميًا من ٨ الصبح لـ ٢ بالليل' },
    branches: [
      { area: 'university', label: { en: 'University District', ar: 'حي الجامعة' }, maps: 'https://maps.app.goo.gl/oxaehLy7t46huY5LA' },
    ],
    description: {
      en: 'A café and workspace in the University District — made for laptops, studying and focused work.',
      ar: 'كافيه وورك سبيس في حي الجامعة، معمول للمذاكرة والشغل باللابتوب.',
    },
    links: { instagram: 'https://www.instagram.com/orcahubeg', facebook: 'https://www.facebook.com/share/19nXpP3TLN/' },
    images: ['./places/orca-1.jpg', './places/orca-2.jpg'],
    logo: './places/orca-logo.jpg',
  },
  {
    id: 'coffee-lab',
    name: { en: 'Coffee Lab', ar: 'Coffee Lab' },
    categories: ['cafe', 'workspace'],
    rating: 4.2,
    price: 2,
    moods: ['chill', 'calm', 'study'],
    companions: ['solo', 'friends', 'couple'],
    time: 'always',
    hours: { en: 'Open 24 hours', ar: 'مفتوح ٢٤ ساعة' },
    branches: [
      { area: 'corniche', label: { en: 'El Mashaya', ar: 'المشاية' }, maps: 'https://share.google/ENgZYbrZ3muWo19ms' },
    ],
    description: {
      en: 'A café and workspace on El Mashaya, open 24 hours — great for late-night study sessions.',
      ar: 'كافيه وورك سبيس على المشاية، مفتوح ٢٤ ساعة، ومناسب للمذاكرة بالليل.',
    },
    links: { instagram: 'https://www.instagram.com/coffeelabeg' },
    images: [],
    logo: './places/coffee-lab-logo.jpg',
  },
  {
    id: 'galaxy-cinema',
    name: { en: 'Galaxy Cinema', ar: 'سينما جلاكسي' },
    categories: ['entertainment'],
    rating: 4.0,
    price: 2,
    moods: ['chill', 'calm', 'romantic'],
    companions: ['solo', 'friends', 'couple', 'family'],
    time: null,
    hours: { en: 'Depends on showtimes', ar: 'حسب مواعيد الحفلات' },
    branches: [
      { area: 'corniche', label: { en: 'El Mashaya, opposite Gezirat El Ward Club', ar: 'المشاية، أمام نادي جزيرة الورد' }, maps: 'https://share.google/0Hz5kVRYDeaStoVdz' },
      { area: 'university', label: { en: 'Al Gamaa Plaza Mall', ar: 'الجامعة بلازا مول' }, maps: 'https://share.google/VVqRdK7wzpiJswGYy' },
    ],
    description: {
      en: 'A movie theater with two branches: on El Mashaya opposite Gezirat El Ward Club, and inside Al Gamaa Plaza Mall.',
      ar: 'سينما ليها فرعين: على المشاية أمام نادي جزيرة الورد، وجوه الجامعة بلازا مول.',
    },
    links: { instagram: 'https://www.instagram.com/galaxy_cinema_mansoura', facebook: 'https://www.facebook.com/share/1Z6ip7cAsX/' },
    images: ['./places/galaxy-1.jpg'],
    logo: './places/galaxy-logo.jpg',
    related: ['al-gamaa-plaza-mall'],
  },
  {
    id: 'toreil-walkway',
    name: { en: 'Toreil Walkway', ar: 'ممشى توريل' },
    categories: ['outdoor'],
    rating: 4.6,
    price: 0,
    moods: ['chill', 'calm', 'romantic', 'lively'],
    companions: ['solo', 'friends', 'couple', 'family'],
    time: 'always',
    hours: { en: 'Open 24 hours', ar: 'مفتوح ٢٤ ساعة' },
    branches: [
      { area: 'toreil', label: { en: 'Toreil, next to Metro Market', ar: 'توريل، بجوار مترو ماركت' }, maps: 'https://share.google/swupOg24sTUsiJ3UH' },
    ],
    description: {
      en: 'A free public walkway in Toreil next to Metro Market — a calm spot to walk and sit, lively but never noisy.',
      ar: 'ممشى عام ببلاش في توريل جنب مترو ماركت. مكان رايق تتمشى وتقعد فيه، فيه حياة من غير دوشة.',
    },
    links: {},
    images: [],
  },
  {
    id: 'the-chef-hassan-khalil',
    name: { en: 'The Chef Hassan Khalil', ar: 'The Chef Hassan Khalil' },
    categories: ['restaurant'],
    rating: 4.4,
    price: 3,
    moods: ['chill', 'calm', 'romantic'],
    companions: ['solo', 'friends', 'couple'],
    time: { open: '10:00', close: '04:00', days: { thu: { close: '04:30' }, fri: { close: '04:30' } } },
    hours: { en: 'Daily, 10 AM – 4 AM · Thu & Fri until 4:30 AM', ar: 'يوميًا من ١٠ الصبح لـ ٤ الفجر · الخميس والجمعة لحد ٤:٣٠' },
    branches: [
      { area: 'gomhoreya', label: { en: 'El Gomhoreya St', ar: 'شارع الجمهورية' }, maps: 'https://share.google/IRCTLUp8kRxBrcBNb' },
    ],
    description: {
      en: 'Sandwiches, pasta plates and crispy chicken by The Chef Hassan Khalil on El Gomhoreya St, with a Nile view and open until the early morning.',
      ar: 'ساندوتشات وأطباق باستا وفراخ كريسبي من The Chef Hassan Khalil في شارع الجمهورية، بفيو على النيل ومفتوح لحد الفجر.',
    },
    links: { instagram: 'https://www.instagram.com/the.chef.eg', facebook: 'https://www.facebook.com/share/14v7tWbv1MM/' },
    images: ['./places/thechef-1.jpg', './places/thechef-2.jpg'],
    logo: './places/thechef-logo.jpg',
  },
  {
    id: 'al-gamaa-plaza-mall',
    name: { en: 'Al Gamaa Plaza Mall', ar: 'الجامعة بلازا مول' },
    categories: ['shopping', 'cafe', 'restaurant', 'entertainment'],
    rating: 4.1,
    price: 2,
    moods: ['chill', 'lively'],
    companions: ['solo', 'friends', 'couple'],
    time: { open: '11:00', close: '00:00' },
    hours: { en: 'Daily, 11 AM – 12 AM', ar: 'يوميًا من ١١ الصبح لـ ١٢ بالليل' },
    branches: [
      { area: 'university', label: { en: 'University District', ar: 'حي الجامعة' }, maps: 'https://share.google/OLeEENJcHBbIG3owg' },
    ],
    description: {
      en: 'A shopping mall in the University District with stores, cafés, restaurants and a Galaxy Cinema branch.',
      ar: 'مول في حي الجامعة فيه محلات وكافيهات ومطاعم، وفيه فرع لسينما جلاكسي.',
    },
    links: {},
    images: ['./places/gamaa-plaza-1.jpg'],
    related: ['galaxy-cinema'],
  },
]

export const getPlaceById = (id) => PLACES.find((p) => p.id === id)
