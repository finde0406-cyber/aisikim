export type BrandId = 'aisikim' | 'moneyflow-radar' | 'risk-check'
export type TemplateType = 'empathy' | 'beforeAfter' | 'scenario' | 'tip'

export interface ThreadsPost {
  id: number
  brandId: BrandId
  brandName: string
  content: string
  theme: string
  template: string
}

interface BrandTopic {
  id: number
  label: string
  theme: string
  hook: string
  before: string
  after: string
  saving: string
  quickTip: string
}

interface BrandConfig {
  id: BrandId
  name: string
  description: string
  mentions: string[]
  ctaVariants: string[]
  topics: BrandTopic[]
}

export interface TopicOption {
  id: number
  label: string
  theme: string
}

export interface TemplateOption {
  id: TemplateType
  label: string
  description: string
}

const TEMPLATE_LABELS: Record<TemplateType, string> = {
  empathy: '공감형',
  beforeAfter: '비교형',
  scenario: '시나리오형',
  tip: '팁형',
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: 'empathy', label: '공감형', description: '문제에 공감하고 해결책 제시' },
  { id: 'beforeAfter', label: '비교형', description: '기존 방식과 바뀐 방식을 비교' },
  { id: 'scenario', label: '시나리오형', description: '구체적 상황으로 흐름 전달' },
  { id: 'tip', label: '팁형', description: '실용적인 팁을 짧게 전달' },
]

const BRAND_CONFIGS: Record<BrandId, BrandConfig> = {
  aisikim: {
    id: 'aisikim',
    name: 'AI시킴이',
    description: '질문할 줄 모르는 AI 초보자용 원클릭 작업지시서 생성기',
    mentions: ['aisikim.com'],
    ctaVariants: [
      '질문 한 줄도 못 짜겠으면 프로필 링크에서 AI시킴이 눌러보셈.',
      'AI 초보면 머리 쓰지 말고 AI시킴이에서 클릭 몇 번으로 질문문 뽑으면 됨.',
      '무료로 한 번 돌려보고 괜찮으면 그때 유료 업그레이드 보면 됨.',
    ],
    topics: [
      { id: 1, label: 'AI 프롬프트 작성', theme: 'AI 프롬프트 작성', hook: 'AI 켰는데 첫 질문부터 막히는 사람 진짜 많네.', before: '빈 입력창 앞에서 멍 때림', after: '몇 번 클릭만 하고 바로 질문문 뽑음', saving: '질문 설계 시간 절약', quickTip: '질문 못 짜겠으면 업종, 목적, 결과물만 먼저 고르면 훨씬 빨라짐.' },
      { id: 2, label: '블로그 글쓰기', theme: '블로그 글쓰기', hook: '블로그 초안 맡겼는데 죄다 교과서 문체로 나오면 현타 오지 않음?', before: '제목과 도입부에서 계속 막힘', after: '클릭 몇 번으로 블로그용 질문문 확보', saving: '초안 시작 속도 개선', quickTip: '주제만 던지지 말고 독자랑 목적까지 같이 넣어야 답이 달라짐.' },
      { id: 3, label: '업무 보고서', theme: '업무 보고서', hook: '보고서 시켜봤더니 두루뭉술한 소리만 길게 나오면 짜치긴 함.', before: '보고서 구조를 내가 다시 짬', after: '보고서용 질문문부터 정리해서 던짐', saving: '수정 횟수 감소', quickTip: '보고서는 요약, 이슈, 요청사항 순으로 시키면 덜 헤맴.' },
      { id: 4, label: 'ChatGPT 활용', theme: 'ChatGPT 활용', hook: 'ChatGPT 유료 결제해놓고 질문은 맨날 비슷하게 넣는 사람 꽤 많음.', before: '대충 물어보고 대충 실망', after: '원하는 결과에 맞는 질문문부터 확보', saving: '도구 활용도 상승', quickTip: '모델 바꾸기 전에 질문 구조부터 바꾸는 게 먼저임.' },
      { id: 5, label: 'AI 시간 절약', theme: 'AI 시간 절약', hook: 'AI로 시간 줄이려다 오히려 더 쓰는 케이스 진짜 흔함.', before: '질문 바꿔가며 계속 재시도', after: '한 번에 덜 틀린 질문으로 시작', saving: '재시도 비용 절감', quickTip: '원하는 결과물 형식을 먼저 정하면 삽질이 확 줄어듦.' },
      { id: 6, label: '프롬프트 공부', theme: '프롬프트 공부', hook: '프롬프트 공부는 귀찮고 결과는 빨리 뽑고 싶은 사람들 딱 많네.', before: '이론은 봤는데 손이 안 감', after: '공부 대신 선택으로 바로 질문 생성', saving: '학습 부담 감소', quickTip: '외우는 것보다 자주 쓰는 흐름을 클릭형으로 고정하는 게 더 실전적임.' },
      { id: 7, label: 'AI 도구 비교', theme: 'AI 도구 비교', hook: 'ChatGPT, Claude 뭐가 나은지 모르겠다면 질문부터 통일해야 됨.', before: '도구마다 질문도 달라짐', after: '같은 질문문으로 결과만 비교', saving: '비교 기준 명확화', quickTip: '도구 비교는 질문을 고정하고 답만 봐야 의미가 있음.' },
      { id: 8, label: '업무 자동화', theme: '업무 자동화', hook: '반복 업무 자동화하고 싶은데 뭘 시켜야 할지 모르는 경우 많음.', before: '자동화 아이디어만 있고 실행 안 됨', after: '작업 단위별 질문문 먼저 뽑음', saving: '실행 진입장벽 완화', quickTip: '자동화는 큰 그림보다 반복 작업 한 칸씩 쪼개는 게 훨씬 잘 됨.' },
      { id: 9, label: '콘텐츠 기획', theme: '콘텐츠 기획', hook: '콘텐츠 기획 막히는 사람들 질문을 너무 넓게 넣는 편임.', before: '주제만 메모하고 실행 보류', after: '제목, 흐름, CTA까지 나눠서 요청', saving: '기획 속도 향상', quickTip: '콘텐츠는 주제보다 독자가 얻는 변화 한 줄이 더 중요함.' },
      { id: 10, label: 'AI 결과물 다듬기', theme: 'AI 결과물 다듬기', hook: 'AI 결과물 어색한데 뭐라고 다시 시켜야 할지 몰라서 버리는 경우 많지.', before: '초안은 있는데 수정 지시가 안 나옴', after: '수정용 질문문까지 같이 확보', saving: '재작성 부담 감소', quickTip: '초안용이랑 수정용 질문은 따로 가져가는 게 훨씬 나음.' },
    ],
  },
  'moneyflow-radar': {
    id: 'moneyflow-radar',
    name: '머니플로우레이더',
    description: '시장 자금 흐름과 리스크 판단 중심 브랜드',
    mentions: ['moneyflowradar.com'],
    ctaVariants: [
      '지금 어디에 돈이 과하게 몰렸는지 궁금하면 머니플로우레이더부터 보고 들어가셈.',
      '불나방처럼 뛰어들기 싫으면 머니플로우레이더로 과열 섹터부터 체크하는 게 맞음.',
      '대가리 깨지기 싫으면 머니플로우레이더로 자금 몰린 자리부터 경계하셈.',
    ],
    topics: [
      { id: 1, label: '시장 자금 흐름 점검', theme: '시장 자금 흐름 점검', hook: '지수는 버티는데 기분이 쎄한 날 있지 않음?', before: '지수와 가격만 보고 방향 판단', after: '시장 안에서 돈이 어디로 이동하는지 함께 확인', saving: '표면 아래 위험 신호를 더 빨리 인지', quickTip: '가격만 보면 늦음. 돈이 어느 섹터로 도망가는지 같이 봐야 흐름이 잡힘.' },
      { id: 2, label: '리스크 오프 신호', theme: '리스크 오프 신호', hook: '시장은 멀쩡한 척하는데 돈은 이미 쫄아서 빠지는 구간이 있음.', before: '뉴스 헤드라인만 보고 안심', after: '방어 자산과 민감 자산 간 자금 이동 비교', saving: '리스크 오프 전환을 더 빨리 감지', quickTip: '위험회피 신호는 뉴스보다 자금 흐름에서 먼저 튀어나오는 편임.' },
      { id: 3, label: '섹터 로테이션 해석', theme: '섹터 로테이션 해석', hook: '같은 상승장이어도 어디에 돈 몰리냐에 따라 결이 완전 다름.', before: '상승/하락만 단순 해석', after: '섹터 간 자금 순환을 함께 점검', saving: '장세의 성격을 더 정확히 이해', quickTip: '섹터 로테이션 보면 지금 장이 공격적인지 방어적인지 바로 감이 옴.' },
      { id: 4, label: '유동성 방향 점검', theme: '유동성 방향 점검', hook: '오르는 이유가 실적인지 유동성빨인지 구분 못 하면 나중에 크게 당함.', before: '가격 상승 자체를 긍정 신호로 해석', after: '유동성 유입과 이탈 흐름을 같이 추적', saving: '상승의 질을 더 냉정하게 판단', quickTip: '유동성 장은 빠르게 뒤집히니까 돈의 속도와 방향 같이 봐야 함.' },
      { id: 5, label: '시장 내부 온도차', theme: '시장 내부 온도차', hook: '지수는 멀쩡한데 체감은 박살나는 날이 괜히 생기는 게 아님.', before: '대표 지수 하나로 시장 전체를 판단', after: '시장 내부의 온도차와 자금 분산 흐름 확인', saving: '체감과 지수의 괴리를 더 잘 설명', quickTip: '지수만 보지 말고 내부 종목 흐름까지 봐야 왜 불안한지 설명이 됨.' },
      { id: 6, label: '리스크 관리 타이밍', theme: '리스크 관리 타이밍', hook: '리스크 관리는 깨진 뒤가 아니라 흐름 꺾일 때 들어가야 됨.', before: '변동성 확대 후에야 대응 시작', after: '자금 이탈 조짐이 보일 때 먼저 점검', saving: '늦은 대응 가능성 축소', quickTip: '이벤트 터지고 나서 대응하면 늘 한 박자 늦음. 흐름 바뀌는 초기가 더 중요함.' },
      { id: 7, label: '방어 자산 이동', theme: '방어 자산 이동', hook: '위험자산 버티는데 안전자산으로 돈 몰리면 그건 경고등 켜진 거임.', before: '자산별로 따로 보고 연결하지 않음', after: '방어 자산 유입을 시장 경고 신호로 점검', saving: '보이지 않는 불안감 조기 감지', quickTip: '안전자산으로 흐르는 돈은 참가자들 심리를 제일 빨리 보여주는 편임.' },
      { id: 8, label: '시장 심리와 자금', theme: '시장 심리와 자금', hook: '시장 심리는 기사보다 돈의 이동에서 더 솔직하게 드러남.', before: '해석 위주의 뉴스 소비', after: '실제 자금 흐름으로 심리 변화를 추적', saving: '소음보다 본질에 집중', quickTip: '말보다 돈이 먼저 움직임. 그래서 해석보다 흐름이 더 중요함.' },
      { id: 9, label: '변동성 확대 전조', theme: '변동성 확대 전조', hook: '큰 변동성은 갑자기 터지는 것 같아도 흐름은 미리 흔들림.', before: '급락이 나와야 위험을 인식', after: '자금 분산과 이탈 패턴을 먼저 관찰', saving: '변동성 전조를 미리 체크', quickTip: '변동성 커지기 전엔 시장 내부 자금 흐름부터 먼저 갈라지는 경우가 많음.' },
      { id: 10, label: '시장 구조 읽기', theme: '시장 구조 읽기', hook: '가격만 보면 자꾸 늦음. 구조를 같이 봐야 덜 깨짐.', before: '상승/하락 결과만 확인', after: '자금 흐름 기반으로 장의 구조를 해석', saving: '판단 기준이 더 구조화됨', quickTip: '시장 구조 읽는다는 건 어디에 돈이 몰리고 어디서 빠지는지 계속 보는 거임.' },
    ],
  },
  'risk-check': {
    id: 'risk-check',
    name: '리스크체크',
    description: '물린 투자자용 심리 자가진단 도구',
    mentions: ['check.financialrisklab.com'],
    ctaVariants: [
      '내 계좌 생존 확률 궁금하면 프로필 링크에서 리스크체크나 돌려보셈.',
      '물린 상태에서 정신승리 중이면 리스크체크로 현실부터 보는 게 먼저임.',
      '탈출이든 버티기든 판단 전에 리스크체크로 멘탈 상태부터 확인해보셈.',
    ],
    topics: [
      { id: 1, label: '금융 리스크 점검', theme: '금융 리스크 점검', hook: '계좌 박살났는데 아직도 버티면 언젠가 오겠지 모드인 사람 꽤 많음.', before: '수익 가능성만 먼저 확인', after: '손실 가능성부터 체크', saving: '무리한 진입 가능성 감소', quickTip: '리스크는 뭐가 오르냐보다 내가 어디서 더 박살날 수 있냐를 먼저 보는 거임.' },
      { id: 2, label: '투자 전 체크 포인트', theme: '투자 전 체크 포인트', hook: '들어갈 땐 확신 넘치는데 흔들리면 대응 못 하는 패턴 반복되지 않음?', before: '진입 근거만 정리', after: '철수 조건까지 같이 점검', saving: '감정 대응 감소', quickTip: '매수 이유만 적지 말고 어디서 틀린 판단인지 인정할지도 같이 적어놔야 됨.' },
      { id: 3, label: '시장 불안 대응', theme: '시장 불안 대응', hook: '시장 불안 커질수록 뉴스만 더 보는 사람들 멘탈 더 흔들림.', before: '정보를 더 많이 찾으며 불안 확대', after: '내 자산 기준으로 영향 점검', saving: '과잉 대응 완화', quickTip: '불안한 장일수록 남 얘기 말고 내 계좌에 뭐가 터질지부터 봐야 함.' },
      { id: 4, label: '손실 회피 관점', theme: '손실 회피 관점', hook: '수익 욕심보다 손실 공포가 더 큰데도 인정 안 하는 경우 많네.', before: '한 번의 손실에 판단 흔들림', after: '손실 허용 범위를 먼저 정의', saving: '판단 기준 유지', quickTip: '손실 회피 자체가 문제라기보다 기준 없이 버티는 게 더 위험함.' },
      { id: 5, label: '포트폴리오 점검', theme: '포트폴리오 점검', hook: '분산했다고 믿었는데 알고 보면 같은 위험만 잔뜩 담은 경우 많음.', before: '종목 수만 보고 분산이라 판단', after: '위험 요인 기준으로 다시 확인', saving: '숨은 쏠림 발견', quickTip: '개수보다 같은 방향으로 같이 박살나는 자산이 겹치는지 보는 게 핵심임.' },
      { id: 6, label: '경제 뉴스 해석', theme: '경제 뉴스 해석', hook: '뉴스 많이 볼수록 더 잘 보이는 게 아니라 더 흔들릴 때도 많음.', before: '기사마다 반응하며 방향성 상실', after: '내 결정에 필요한 정보만 분리', saving: '과잉 해석 감소', quickTip: '뉴스를 다 이해하려 들지 말고 내 포지션에 직격탄인 것만 골라보면 됨.' },
      { id: 7, label: '과도한 낙관 점검', theme: '과도한 낙관 점검', hook: '좋아 보일수록 더 의심해야 하는데 반대로 흥분해서 들어가는 사람 많지.', before: '기대 수익만 중심으로 판단', after: '반대 시나리오까지 같이 검토', saving: '낙관 편향 완화', quickTip: '확신 셀수록 일부러 반대 근거 찾는 습관이 필요함.' },
      { id: 8, label: '자산 보호 관점', theme: '자산 보호 관점', hook: '불릴 생각은 넘치는데 지킬 생각은 늘 뒤로 밀리는 경우 많음.', before: '성장 전략만 중심에 둠', after: '방어 전략도 같이 설계', saving: '하방 충격 대비', quickTip: '자산 보호는 겁먹는 게 아니라 큰 실수 안 하는 장치에 가까움.' },
      { id: 9, label: '리스크 관리 습관', theme: '리스크 관리 습관', hook: '원칙은 있는데 실전만 가면 다 무너지는 사람들 꽤 많네.', before: '원칙은 있지만 상황마다 흔들림', after: '체크리스트 기반으로 반복 점검', saving: '즉흥 대응 축소', quickTip: '리스크 관리는 의지보다 체크리스트빨이 더 큼.' },
      { id: 10, label: '불확실성 대응 사고', theme: '불확실성 대응 사고', hook: '불확실하면 멈추거나 풀베팅하거나 둘 중 하나로 튀는 경우 많음.', before: '불확실성 앞에서 판단 양극화', after: '가능성별 대응 시나리오 준비', saving: '판단 여유 확보', quickTip: '불확실성은 없애는 대상이 아니라 대비하는 대상이라고 보는 게 맞음.' },
    ],
  },
}

export const BRAND_OPTIONS = (Object.values(BRAND_CONFIGS) as BrandConfig[]).map((brand) => ({
  id: brand.id,
  label: brand.name,
  description: brand.description,
}))

export function isBrandId(value: string): value is BrandId {
  return value in BRAND_CONFIGS
}

export function getTopicsForBrand(brandId: BrandId): TopicOption[] {
  return BRAND_CONFIGS[brandId].topics.map((topic) => ({
    id: topic.id,
    label: topic.label,
    theme: topic.theme,
  }))
}

function pickRandom<T>(items: readonly T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

function pickOne<T>(items: T[]): T {
  return pickRandom(items, 1)[0] ?? items[0]
}

function resolveBrandMention(brand: BrandConfig) {
  return pickOne(brand.mentions)
}

function resolveBrandCta(brand: BrandConfig) {
  return pickOne(brand.ctaVariants)
}

function formatClosing(brand: BrandConfig) {
  return `${resolveBrandCta(brand)}\n${resolveBrandMention(brand)}`
}

function buildEmpathyPost(brand: BrandConfig, topic: BrandTopic): string {
  const painPoints = {
    aisikim: [
      '질문 한 줄 못 짜서 시간만 날리고',
      '답은 나오는데 죄다 밍밍하고',
      '수정할수록 더 귀찮아지는 케이스 많음.',
    ],
    'moneyflow-radar': [
      '커뮤니티에서 난리 난다고 바로 손이 나가고',
      '이미 돈이 과하게 몰린 자리인지도 모르고',
      '뒤늦게 물리고 나서 후회하는 케이스 많음.',
    ],
    'risk-check': [
      '계좌는 박살났는데 존버가 답이라고 자기합리화하고',
      '뉴스 하나에 멘탈이 흔들리고',
      '지금 내 상태가 얼마나 위험한지도 잘 모르는 경우 많음.',
    ],
  } as const

  const selected = pickRandom(painPoints[brand.id], 2)

  return `${topic.hook}

${selected.join('\n')}

${formatClosing(brand)}`
}

function buildBeforeAfterPost(brand: BrandConfig, topic: BrandTopic): string {
  const beforeLines = {
    aisikim: 'AI에게 그냥 던짐 → 뻔한 답, 수정 반복',
    'moneyflow-radar': '커뮤니티 보고 바로 진입 → 이미 돈 몰린 섹터에서 대가리 깨짐',
    'risk-check': '계좌 박살나도 존버 외침 → 멘탈은 흔들리는데 현실 진단은 안 함',
  } as const

  return `❌ 기존 방식
${beforeLines[brand.id]}

✅ ${brand.name} 관점
${topic.after}

${formatClosing(brand)}`
}

function buildScenarioPost(brand: BrandConfig, topic: BrandTopic): string {
  return `${topic.hook}

상황: ${topic.before}
문제: ${brand.id === 'aisikim' ? '질문이 안 나와서 시작이 늦어짐' : brand.id === 'moneyflow-radar' ? '돈이 어디로 몰리는지 안 보고 뛰어듦' : '멘탈은 흔들리는데 현실 점검은 안 함'}

${brand.name} 관점이면:
${topic.after}

기대 변화: ${topic.saving}

${formatClosing(brand)}`
}

function buildTipPost(brand: BrandConfig, topic: BrandTopic): string {
  const mention = resolveBrandMention(brand)
  return `💡 ${topic.quickTip}

이런 거 혼자 정리 안 되면 ${brand.name} 한 번 보는 게 더 빠름.
${mention}`
}

const TEMPLATE_BUILDERS: Record<TemplateType, (brand: BrandConfig, topic: BrandTopic) => string> = {
  empathy: buildEmpathyPost,
  beforeAfter: buildBeforeAfterPost,
  scenario: buildScenarioPost,
  tip: buildTipPost,
}

function buildPostForBrand(
  brandId: BrandId,
  topic: BrandTopic,
  templateId: TemplateType,
  id: number,
): ThreadsPost {
  const brand = BRAND_CONFIGS[brandId]

  return {
    id,
    brandId,
    brandName: brand.name,
    content: TEMPLATE_BUILDERS[templateId](brand, topic),
    theme: topic.theme,
    template: TEMPLATE_LABELS[templateId],
  }
}

function resolveTopics(brandId: BrandId, topicIds?: number[]) {
  const topics = BRAND_CONFIGS[brandId].topics
  if (!topicIds || topicIds.length === 0) return topics

  const selected = topicIds
    .map((id) => topics.find((topic) => topic.id === id))
    .filter((topic): topic is BrandTopic => Boolean(topic))

  return selected.length > 0 ? selected : topics
}

function resolveTemplates(templateIds?: TemplateType[]) {
  return templateIds && templateIds.length > 0
    ? templateIds
    : (TEMPLATE_OPTIONS.map((template) => template.id) as TemplateType[])
}

export function buildThreadsPosts(
  brandId: BrandId,
  topicIds?: number[],
  templateIds?: TemplateType[],
  count = 3,
): ThreadsPost[] {
  const topics = resolveTopics(brandId, topicIds)
  const templates = resolveTemplates(templateIds)
  const combinations = topics.flatMap((topic) => templates.map((templateId) => ({ topic, templateId })))
  const selected = pickRandom(combinations, count)

  return selected.map(({ topic, templateId }, index) =>
    buildPostForBrand(brandId, topic, templateId, index + 1),
  )
}

export function buildAllBrandThreadsPosts(
  templateIds?: TemplateType[],
  countPerBrand = 1,
): ThreadsPost[] {
  const templates = resolveTemplates(templateIds)
  const posts: ThreadsPost[] = []
  let nextId = 1

  ;(Object.keys(BRAND_CONFIGS) as BrandId[]).forEach((brandId) => {
    const topics = BRAND_CONFIGS[brandId].topics
    const combinations = topics.flatMap((topic) => templates.map((templateId) => ({ topic, templateId })))
    const selected = pickRandom(combinations, countPerBrand)

    selected.forEach(({ topic, templateId }) => {
      posts.push(buildPostForBrand(brandId, topic, templateId, nextId))
      nextId += 1
    })
  })

  return posts
}
