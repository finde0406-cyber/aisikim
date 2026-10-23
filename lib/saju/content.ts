// 무료 풀이 문장 — 런타임 AI 생성 없이 고정 문장으로 제공 (품질 일정, 비용 0)
// 영어권 독자 기준: 2인칭, 구체적 이미지, 단정적 예언 대신 성향 묘사

import type { Element } from './calc'

export interface DayMasterText {
  title: string // 예: The Tall Tree
  symbol: string // 한자 상징
  portrait: string
  strength: string
  shadow: string
  restores: string
}

// 일간(天干) 10가지 — STEMS 순서와 동일
export const DAY_MASTERS: DayMasterText[] = [
  {
    title: 'The Tall Tree',
    symbol: '甲木',
    portrait:
      'You grow straight toward whatever you believe in, and people find it easy to lean on you. You would rather start something new than polish someone else\'s plan, and you notice quickly when a room has stopped moving forward.',
    strength: 'You keep your word, and your steadiness gives other people permission to try.',
    shadow: 'A tree does not bend easily. When you are pushed, you can dig in long after the argument stopped mattering.',
    restores: 'Space, daylight, and a project that is clearly yours.',
  },
  {
    title: 'The Climbing Vine',
    symbol: '乙木',
    portrait:
      'You find a way around obstacles instead of through them. You read people well, you adapt fast, and you tend to end up exactly where you wanted to be without anyone noticing how you got there.',
    strength: 'You are tactful and quietly persistent. You win people over one conversation at a time.',
    shadow: 'You can wrap yourself around the wrong support for too long because leaving feels harder than staying.',
    restores: 'One or two people you trust completely, and a little beauty in your surroundings.',
  },
  {
    title: 'The Sun',
    symbol: '丙火',
    portrait:
      'You walk into a room and the temperature changes. You are generous with attention, quick to laugh, and you light up when there is an audience or a cause to rally around.',
    strength: 'You make people feel seen, and you are honest in a way that rarely hurts.',
    shadow: 'The sun shines on everyone, so you sometimes spread yourself too thin to be fully present for anyone.',
    restores: 'Being outdoors, a good audience, and permission to rest without guilt.',
  },
  {
    title: 'The Candle Flame',
    symbol: '丁火',
    portrait:
      'Your warmth is focused rather than loud. You notice small details, remember what people told you months ago, and do your best work in the quiet hours when everyone else has gone home.',
    strength: 'You are deeply loyal, and your attention makes people feel special.',
    shadow: 'A candle flickers in a draft. Criticism can stay with you much longer than praise.',
    restores: 'Calm evenings, meaningful one-to-one time, and work that lets you go deep.',
  },
  {
    title: 'The Mountain',
    symbol: '戊土',
    portrait:
      'You are the person others come back to. You stay calm when plans fall apart, you think in years rather than weeks, and you rarely need to raise your voice to be taken seriously.',
    strength: 'You are dependable, patient, and very hard to rattle.',
    shadow: 'Mountains do not move. Change you did not choose can feel like an earthquake.',
    restores: 'Routine, solid ground under your plans, and time to decide without being rushed.',
  },
  {
    title: 'The Garden Soil',
    symbol: '己土',
    portrait:
      'You make things grow. You are practical, nurturing, and good at turning a messy situation into something that works. People leave a conversation with you feeling more organized than when they arrived.',
    strength: 'You are resourceful and kind in practical ways, not just in words.',
    shadow: 'You give so much that you can quietly run out, and you rarely say so until you are empty.',
    restores: 'Being looked after for once, good food, and finishing something with your own hands.',
  },
  {
    title: 'The Sword',
    symbol: '庚金',
    portrait:
      'You cut straight to what matters. You are decisive, you value fairness, and you respect people who say what they mean. Under pressure you get sharper, not softer.',
    strength: 'You are brave, direct, and fiercely protective of the people on your side.',
    shadow: 'A blade is honest but it can wound. Your directness sometimes lands harder than you meant.',
    restores: 'A clear goal, physical effort, and people who can handle the truth.',
  },
  {
    title: 'The Jewel',
    symbol: '辛金',
    portrait:
      'You notice quality. You have a refined eye, high standards, and a sense of how things should be done. You shine brightest when your work and your surroundings feel polished.',
    strength: 'You are perceptive, elegant, and quietly ambitious.',
    shadow: 'Jewels scratch. You can be harder on yourself than anyone else would ever be.',
    restores: 'Beauty, order, and recognition from people whose taste you respect.',
  },
  {
    title: 'The Ocean',
    symbol: '壬水',
    portrait:
      'You think big and move freely. You are curious about everything, comfortable with uncertainty, and you can hold many ideas at once without needing to settle on one too early.',
    strength: 'You are adaptable, imaginative, and generous with what you know.',
    shadow: 'Water without banks floods. Without some structure, your energy can scatter.',
    restores: 'Travel, new ideas, and a few firm commitments that give your energy a direction.',
  },
  {
    title: 'The Morning Rain',
    symbol: '癸水',
    portrait:
      'You are intuitive and quietly perceptive. You pick up on moods before anyone names them, and your influence works slowly, the way rain changes a landscape over a season.',
    strength: 'You are empathetic, wise beyond what you say out loud, and hard to fool.',
    shadow: 'You absorb other people\'s feelings so easily that it can be hard to tell which ones are yours.',
    restores: 'Solitude, water, music, and people who do not need you to explain yourself.',
  },
]

export const ELEMENT_INFO: Record<Element, { name: string; hanja: string; korean: string; nature: string; lack: string; strong: string }> = {
  wood: {
    name: 'Wood', hanja: '木', korean: 'mok',
    nature: 'growth and new beginnings',
    lack: 'Wood is your quietest element. Starting things can take more effort than finishing them. Green spaces, mornings, and learning something new bring it back.',
    strong: 'Wood runs strong in you. You are built for growth, and you get restless when life stands still.',
  },
  fire: {
    name: 'Fire', hanja: '火', korean: 'hwa',
    nature: 'warmth, visibility, and joy',
    lack: 'Fire is your quietest element. You may undersell yourself or wait to be noticed. Sunlight, celebration, and saying your ideas out loud bring it back.',
    strong: 'Fire runs strong in you. You are expressive and warm, and people feel your mood before you speak.',
  },
  earth: {
    name: 'Earth', hanja: '土', korean: 'to',
    nature: 'stability and trust',
    lack: 'Earth is your quietest element. Routines can feel hard to keep. Regular meals, a home base, and fewer open loops bring it back.',
    strong: 'Earth runs strong in you. You are the steady center that other people organize themselves around.',
  },
  metal: {
    name: 'Metal', hanja: '金', korean: 'geum',
    nature: 'clarity, boundaries, and decisions',
    lack: 'Metal is your quietest element. Saying no and ending things may be the hardest part for you. Clear rules, tidy spaces, and deadlines bring it back.',
    strong: 'Metal runs strong in you. You see clearly, decide quickly, and hold a high standard.',
  },
  water: {
    name: 'Water', hanja: '水', korean: 'su',
    nature: 'rest, intuition, and wisdom',
    lack: 'Water is your quietest element. You may push on when you should pause. Sleep, quiet time, and the sound of water bring it back.',
    strong: 'Water runs strong in you. Your inner life is rich, and your instincts are usually right.',
  },
}

// 띠 — BRANCHES 순서 (子=쥐)
export const ZODIAC = [
  { animal: 'Rat', korean: 'jwi', line: 'quick-witted and resourceful' },
  { animal: 'Ox', korean: 'so', line: 'patient and quietly strong' },
  { animal: 'Tiger', korean: 'horangi', line: 'bold and protective' },
  { animal: 'Rabbit', korean: 'tokki', line: 'gentle and clever' },
  { animal: 'Dragon', korean: 'yong', line: 'ambitious and magnetic' },
  { animal: 'Snake', korean: 'baem', line: 'perceptive and private' },
  { animal: 'Horse', korean: 'mal', line: 'free-spirited and energetic' },
  { animal: 'Sheep', korean: 'yang', line: 'warm and creative' },
  { animal: 'Monkey', korean: 'wonsungi', line: 'inventive and playful' },
  { animal: 'Rooster', korean: 'dak', line: 'sharp-eyed and honest' },
  { animal: 'Dog', korean: 'gae', line: 'loyal and fair' },
  { animal: 'Pig', korean: 'dwaeji', line: 'generous and good-hearted' },
]

// 출생 도시 — 시간대 + 경도(지방시 보정용)
export const CITIES: { label: string; tz: string; lon: number }[] = [
  { label: 'Los Angeles, USA', tz: 'America/Los_Angeles', lon: -118.24 },
  { label: 'San Francisco, USA', tz: 'America/Los_Angeles', lon: -122.42 },
  { label: 'Seattle, USA', tz: 'America/Los_Angeles', lon: -122.33 },
  { label: 'Phoenix, USA', tz: 'America/Phoenix', lon: -112.07 },
  { label: 'Denver, USA', tz: 'America/Denver', lon: -104.99 },
  { label: 'Dallas, USA', tz: 'America/Chicago', lon: -96.8 },
  { label: 'Houston, USA', tz: 'America/Chicago', lon: -95.37 },
  { label: 'Chicago, USA', tz: 'America/Chicago', lon: -87.63 },
  { label: 'Atlanta, USA', tz: 'America/New_York', lon: -84.39 },
  { label: 'Miami, USA', tz: 'America/New_York', lon: -80.19 },
  { label: 'Washington DC, USA', tz: 'America/New_York', lon: -77.04 },
  { label: 'New York, USA', tz: 'America/New_York', lon: -74.01 },
  { label: 'Boston, USA', tz: 'America/New_York', lon: -71.06 },
  { label: 'Honolulu, USA', tz: 'Pacific/Honolulu', lon: -157.86 },
  { label: 'Anchorage, USA', tz: 'America/Anchorage', lon: -149.9 },
  { label: 'Vancouver, Canada', tz: 'America/Vancouver', lon: -123.12 },
  { label: 'Calgary, Canada', tz: 'America/Edmonton', lon: -114.07 },
  { label: 'Toronto, Canada', tz: 'America/Toronto', lon: -79.38 },
  { label: 'Montreal, Canada', tz: 'America/Toronto', lon: -73.57 },
  { label: 'Mexico City, Mexico', tz: 'America/Mexico_City', lon: -99.13 },
  { label: 'Bogotá, Colombia', tz: 'America/Bogota', lon: -74.07 },
  { label: 'Lima, Peru', tz: 'America/Lima', lon: -77.04 },
  { label: 'Santiago, Chile', tz: 'America/Santiago', lon: -70.67 },
  { label: 'Buenos Aires, Argentina', tz: 'America/Argentina/Buenos_Aires', lon: -58.38 },
  { label: 'São Paulo, Brazil', tz: 'America/Sao_Paulo', lon: -46.63 },
  { label: 'London, UK', tz: 'Europe/London', lon: -0.13 },
  { label: 'Dublin, Ireland', tz: 'Europe/Dublin', lon: -6.26 },
  { label: 'Paris, France', tz: 'Europe/Paris', lon: 2.35 },
  { label: 'Madrid, Spain', tz: 'Europe/Madrid', lon: -3.7 },
  { label: 'Amsterdam, Netherlands', tz: 'Europe/Amsterdam', lon: 4.9 },
  { label: 'Berlin, Germany', tz: 'Europe/Berlin', lon: 13.4 },
  { label: 'Rome, Italy', tz: 'Europe/Rome', lon: 12.5 },
  { label: 'Stockholm, Sweden', tz: 'Europe/Stockholm', lon: 18.07 },
  { label: 'Warsaw, Poland', tz: 'Europe/Warsaw', lon: 21.01 },
  { label: 'Istanbul, Türkiye', tz: 'Europe/Istanbul', lon: 28.98 },
  { label: 'Cairo, Egypt', tz: 'Africa/Cairo', lon: 31.24 },
  { label: 'Lagos, Nigeria', tz: 'Africa/Lagos', lon: 3.38 },
  { label: 'Johannesburg, South Africa', tz: 'Africa/Johannesburg', lon: 28.05 },
  { label: 'Dubai, UAE', tz: 'Asia/Dubai', lon: 55.27 },
  { label: 'Mumbai, India', tz: 'Asia/Kolkata', lon: 72.88 },
  { label: 'Delhi, India', tz: 'Asia/Kolkata', lon: 77.21 },
  { label: 'Bangkok, Thailand', tz: 'Asia/Bangkok', lon: 100.5 },
  { label: 'Ho Chi Minh City, Vietnam', tz: 'Asia/Ho_Chi_Minh', lon: 106.7 },
  { label: 'Kuala Lumpur, Malaysia', tz: 'Asia/Kuala_Lumpur', lon: 101.69 },
  { label: 'Singapore', tz: 'Asia/Singapore', lon: 103.82 },
  { label: 'Jakarta, Indonesia', tz: 'Asia/Jakarta', lon: 106.85 },
  { label: 'Manila, Philippines', tz: 'Asia/Manila', lon: 120.98 },
  { label: 'Hong Kong', tz: 'Asia/Hong_Kong', lon: 114.17 },
  { label: 'Taipei, Taiwan', tz: 'Asia/Taipei', lon: 121.56 },
  { label: 'Seoul, Korea', tz: 'Asia/Seoul', lon: 126.98 },
  { label: 'Busan, Korea', tz: 'Asia/Seoul', lon: 129.08 },
  { label: 'Tokyo, Japan', tz: 'Asia/Tokyo', lon: 139.69 },
  { label: 'Osaka, Japan', tz: 'Asia/Tokyo', lon: 135.5 },
  { label: 'Perth, Australia', tz: 'Australia/Perth', lon: 115.86 },
  { label: 'Adelaide, Australia', tz: 'Australia/Adelaide', lon: 138.6 },
  { label: 'Brisbane, Australia', tz: 'Australia/Brisbane', lon: 153.03 },
  { label: 'Sydney, Australia', tz: 'Australia/Sydney', lon: 151.21 },
  { label: 'Melbourne, Australia', tz: 'Australia/Melbourne', lon: 144.96 },
  { label: 'Auckland, New Zealand', tz: 'Pacific/Auckland', lon: 174.76 },
]
