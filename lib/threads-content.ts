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
    name: 'AI시킴',
    description: 'AI 활용과 작업지시서 중심 브랜드',
    mentions: ['aisikim.com', '#AI시킴'],
    ctaVariants: [
      '필요하시면 AI시킴에서 선택만으로 작업지시서를 만들어보세요.',
      'AI시킴에서 바로 써먹을 수 있는 작업지시서를 만들어볼 수 있습니다.',
      'AI시킴에서는 선택만으로 실전용 작업지시서를 정리할 수 있어요.',
    ],
    topics: [
      { id: 1, label: 'AI 프롬프트 작성', theme: 'AI 프롬프트 작성', hook: 'AI를 써도 결과가 늘 비슷하게 나오시나요?', before: '빈 입력창 앞에서 10분 넘게 고민', after: '선택만으로 작업지시서 완성', saving: '시작 시간 크게 단축', quickTip: '무엇을, 누구에게, 어떤 톤으로 쓸지 한 문장으로 먼저 정리해보세요.' },
      { id: 2, label: '블로그 글쓰기', theme: '블로그 글쓰기', hook: '블로그 글 초안, AI에게 맡겼는데 너무 평범하셨나요?', before: '제목과 도입부에서 계속 막힘', after: '주제와 방향을 선택해 초안 빠르게 확보', saving: '초안 작성 시간 절약', quickTip: '주제만 던지지 말고 독자와 목적까지 함께 넣어야 결과가 달라집니다.' },
      { id: 3, label: '업무 보고서', theme: '업무 보고서', hook: '보고서 작성이 늘 마지막에 몰리시나요?', before: '보고서 구조부터 다시 고민', after: '요약-이슈-제안 흐름으로 바로 요청', saving: '수정 횟수 감소', quickTip: '보고서는 요약, 핵심 이슈, 요청사항 순으로 시키면 훨씬 실무적으로 나옵니다.' },
      { id: 4, label: 'ChatGPT 활용', theme: 'ChatGPT 활용', hook: 'ChatGPT를 쓰는데도 손이 더 많이 가시나요?', before: '대충 물어보고 대충 수정', after: '의도에 맞는 작업지시서로 바로 시작', saving: '결과 다듬는 시간 절약', quickTip: '도구 이름보다도 내가 원하는 출력 형식을 먼저 정의하는 게 중요합니다.' },
      { id: 5, label: 'AI 시간 절약', theme: 'AI 시간 절약', hook: 'AI로 시간을 아끼려다 오히려 더 쓰고 계신가요?', before: '질문을 여러 번 바꿔가며 시도', after: '처음부터 구조화된 지시로 시작', saving: '반복 질문 횟수 감소', quickTip: 'AI에게 묻기 전 결과물 예시를 먼저 머릿속에 정해두면 훨씬 빨라집니다.' },
      { id: 6, label: '프롬프트 공부', theme: '프롬프트 공부', hook: '프롬프트 공부를 따로 해야 하나 고민되시나요?', before: '이론은 봤는데 실전에 못 씀', after: '선택형 구조로 바로 적용', saving: '학습 부담 감소', quickTip: '프롬프트를 외우기보다 반복 작업을 구조화하는 쪽이 실전에 더 빨리 통합니다.' },
      { id: 7, label: 'AI 도구 비교', theme: 'AI 도구 비교', hook: 'ChatGPT, Claude, Gemini 차이가 헷갈리시나요?', before: '도구만 바꿔보다 시간 소모', after: '같은 작업을 다른 방식으로 요청해 비교', saving: '도구 선택 기준 명확화', quickTip: '도구를 비교할 땐 질문을 바꾸지 말고 같은 요청으로 결과만 비교해보세요.' },
      { id: 8, label: '업무 자동화', theme: '업무 자동화', hook: '반복 업무를 AI로 줄이고 싶은데 어디서부터 막히시나요?', before: '자동화 아이디어만 있고 실행이 안 됨', after: '작업 단위를 쪼개서 AI에게 단계별 요청', saving: '반복 루틴 간소화', quickTip: '자동화는 큰 목표보다 반복되는 한 단계부터 줄이는 쪽이 성공 확률이 높습니다.' },
      { id: 9, label: '콘텐츠 기획', theme: '콘텐츠 기획', hook: '콘텐츠 아이디어는 있는데 구조가 안 잡히시나요?', before: '주제만 메모하고 실행 보류', after: '제목, 흐름, CTA까지 한 번에 정리', saving: '기획-작성 간격 단축', quickTip: '콘텐츠는 주제보다 독자가 얻을 변화 한 줄을 먼저 정하면 훨씬 풀기 쉽습니다.' },
      { id: 10, label: 'AI 결과물 다듬기', theme: 'AI 결과물 다듬기', hook: 'AI 결과물이 어딘가 어색해서 못 쓰겠던 적 있으신가요?', before: '초안은 받았는데 내 스타일이 아님', after: '수정 요청용 지시까지 같이 준비', saving: '재작성 부담 감소', quickTip: '초안 생성 프롬프트와 수정 요청 프롬프트를 분리하면 결과가 훨씬 좋아집니다.' },
    ],
  },
  'moneyflow-radar': {
    id: 'moneyflow-radar',
    name: '머니플로우레이더',
    description: '소비 흐름과 현금흐름 점검 중심 브랜드',
    mentions: ['moneyflowradar.com', '#머니플로우레이더'],
    ctaVariants: [
      '머니플로우레이더처럼 내 돈 흐름을 자주 점검해보는 게 꽤 도움이 됩니다.',
      '돈이 어디서 새는지 감이 안 오면 머니플로우레이더 같은 관점이 필요할 수 있습니다.',
      '생활비 흐름을 정리할 땐 머니플로우레이더처럼 흐름 자체를 보는 습관이 중요합니다.',
    ],
    topics: [
      { id: 1, label: '소비 흐름 점검', theme: '소비 흐름 점검', hook: '돈을 아끼려고 하는데 왜 늘 비슷하게 새는지 감이 안 오시나요?', before: '한 달이 지나고 나서야 지출 확인', after: '주간 흐름 단위로 지출 패턴 점검', saving: '새는 구간 빨리 발견', quickTip: '카테고리보다 시간대나 상황별 소비 흐름을 보면 낭비 지점이 더 잘 보입니다.' },
      { id: 2, label: '돈이 새는 지점 찾기', theme: '돈이 새는 지점 찾기', hook: '분명 많이 안 쓴 것 같은데 통장이 가벼우셨나요?', before: '건건이만 보고 전체 흐름은 놓침', after: '작은 반복 지출부터 추적', saving: '지출 인식 정확도 상승', quickTip: '한 번 큰 지출보다 반복되는 작은 결제가 월말 체감에 더 크게 작용할 때가 많습니다.' },
      { id: 3, label: '월말 자금 부족', theme: '월말 자금 부족', hook: '월초엔 괜찮은데 월말만 되면 빠듯해지시나요?', before: '잔액만 보고 안심', after: '주차별 현금흐름으로 예측', saving: '월말 부족 미리 대비', quickTip: '월말 부족은 소득보다 지출 타이밍 문제일 때가 많아서 주차별 흐름을 보는 게 중요합니다.' },
      { id: 4, label: '지출 패턴 인식', theme: '지출 패턴 인식', hook: '내 소비 패턴을 정확히 설명해본 적 있으신가요?', before: '막연히 많이 쓰는 것 같다고 느낌', after: '패턴을 언어화해 통제 포인트 발견', saving: '감정소비 인식 개선', quickTip: '나는 원래 돈을 많이 쓴다가 아니라 언제, 왜 쓰는지로 바꿔 적어보면 패턴이 보입니다.' },
      { id: 5, label: '현금흐름 관리', theme: '현금흐름 관리', hook: '수입이 있어도 여유가 안 느껴지시나요?', before: '입출금만 보고 흐름은 못 봄', after: '고정비와 변동비 흐름을 분리 점검', saving: '체감 잔고 안정감 향상', quickTip: '현금흐름은 잔고보다 타이밍이 중요해서 언제 빠져나가는지를 같이 봐야 합니다.' },
      { id: 6, label: '생활비 통제', theme: '생활비 통제', hook: '생활비를 줄이고 싶은데 어디부터 손대야 할지 모르시나요?', before: '무작정 참기만 시도', after: '줄일 수 있는 구간부터 우선 점검', saving: '실행 가능한 절감 포인트 확보', quickTip: '생활비 통제는 전체를 줄이기보다 손쉬운 1~2개 항목부터 줄이는 게 더 오래 갑니다.' },
      { id: 7, label: '감정 소비 점검', theme: '감정 소비 점검', hook: '기분 따라 쓴 돈이 생각보다 크다고 느끼신 적 있으신가요?', before: '구매 후에만 후회', after: '감정 상태와 소비를 같이 기록', saving: '충동구매 반복 완화', quickTip: '무엇을 샀는지보다 왜 샀는지를 한 줄로 적어두면 패턴이 빨리 드러납니다.' },
      { id: 8, label: '돈 관리 루틴', theme: '돈 관리 루틴', hook: '돈 관리는 해야 하는데 자꾸 미루게 되시나요?', before: '생각날 때만 계좌 확인', after: '짧은 주간 점검 루틴 고정', saving: '관리 피로도 감소', quickTip: '돈 관리 루틴은 길게 하지 말고 10분 안에 끝나는 점검 습관으로 만드는 게 좋습니다.' },
      { id: 9, label: '고정비 점검', theme: '고정비 점검', hook: '고정비는 어쩔 수 없다고 넘기고 계시진 않나요?', before: '자동이체라서 무심코 유지', after: '고정비 항목별 효용 재검토', saving: '불필요한 지출 정리', quickTip: '고정비는 빈도는 낮지만 체감 부담이 크기 때문에 정기 점검만 해도 효과가 큽니다.' },
      { id: 10, label: '재무 감각 키우기', theme: '재무 감각 키우기', hook: '돈 관리는 숫자보다 감각이라고 느끼신 적 있으신가요?', before: '가계부는 쓰는데 판단 기준은 없음', after: '흐름을 읽는 기준을 조금씩 축적', saving: '지출 결정 기준 개선', quickTip: '재무 감각은 많이 아는 것보다 내 흐름을 반복해서 보는 것에서 생깁니다.' },
    ],
  },
  'risk-check': {
    id: 'risk-check',
    name: '리스크체크',
    description: '금융 리스크와 투자 점검 중심 브랜드',
    mentions: ['check.financialrisklab.com', '#리스크체크'],
    ctaVariants: [
      '리스크체크처럼 먼저 점검하고 움직이는 습관이 결국 손실을 줄일 수 있습니다.',
      '불확실할수록 리스크체크 관점으로 한 번 더 점검해보는 게 도움이 됩니다.',
      '투자 판단 전에 리스크체크처럼 체크리스트를 먼저 보는 편이 훨씬 안정적입니다.',
    ],
    topics: [
      { id: 1, label: '금융 리스크 점검', theme: '금융 리스크 점검', hook: '좋은 기회보다 먼저 봐야 할 게 리스크라는 생각, 해보신 적 있으신가요?', before: '수익 가능성만 먼저 확인', after: '손실 가능성부터 체크', saving: '무리한 진입 가능성 감소', quickTip: '리스크 점검은 무엇이 오를까보다 어디서 크게 흔들릴 수 있나를 먼저 보는 것입니다.' },
      { id: 2, label: '투자 전 체크 포인트', theme: '투자 전 체크 포인트', hook: '들어가기 전엔 늘 확신이 큰데, 막상 흔들리면 대응이 어렵지 않으신가요?', before: '진입 근거만 정리', after: '철수 조건까지 같이 점검', saving: '감정 대응 감소', quickTip: '매수 이유만 적지 말고 틀렸다고 인정할 조건도 함께 적어두는 게 중요합니다.' },
      { id: 3, label: '시장 불안 대응', theme: '시장 불안 대응', hook: '시장 불안이 커질수록 뉴스만 더 보게 되시나요?', before: '정보를 더 많이 찾으며 불안 확대', after: '내 자산 기준으로 영향 점검', saving: '과잉 대응 완화', quickTip: '시장 불안은 모두의 문제처럼 보여도 실제 영향은 내 자산 구조에 따라 다르게 나타납니다.' },
      { id: 4, label: '손실 회피 관점', theme: '손실 회피 관점', hook: '수익보다 손실이 더 크게 기억에 남으시나요?', before: '한 번의 손실에 판단 흔들림', after: '손실 허용 범위를 먼저 정의', saving: '판단 기준 유지', quickTip: '손실 회피는 나쁜 게 아니라 범위를 정하지 않을 때 더 위험해집니다.' },
      { id: 5, label: '포트폴리오 점검', theme: '포트폴리오 점검', hook: '분산했다고 생각했는데 사실 비슷한 위험만 모아둔 건 아닐까요?', before: '종목 수만 보고 분산이라 판단', after: '위험 요인 기준으로 다시 확인', saving: '숨은 쏠림 발견', quickTip: '분산은 개수보다 같은 방향으로 흔들리는 자산이 겹치는지를 봐야 합니다.' },
      { id: 6, label: '경제 뉴스 해석', theme: '경제 뉴스 해석', hook: '경제 뉴스가 많을수록 오히려 더 불안해지시나요?', before: '기사마다 반응하며 방향성 상실', after: '내 결정에 필요한 정보만 분리', saving: '과잉 해석 감소', quickTip: '뉴스를 다 이해하려 하기보다 내 포지션에 직접 영향을 주는 정보만 추리는 게 낫습니다.' },
      { id: 7, label: '과도한 낙관 점검', theme: '과도한 낙관 점검', hook: '좋아 보일수록 놓치는 위험은 없는지 체크해보시나요?', before: '기대 수익만 중심으로 판단', after: '반대 시나리오까지 같이 검토', saving: '낙관 편향 완화', quickTip: '확신이 강할수록 반대 근거를 일부러 찾아보는 습관이 필요합니다.' },
      { id: 8, label: '자산 보호 관점', theme: '자산 보호 관점', hook: '불릴 생각은 많이 해도 지킬 생각은 자주 놓치고 있진 않나요?', before: '성장 전략만 중심에 둠', after: '방어 전략도 같이 설계', saving: '하방 충격 대비', quickTip: '자산 보호는 공격을 포기하는 게 아니라 큰 실수를 줄이는 장치에 가깝습니다.' },
      { id: 9, label: '리스크 관리 습관', theme: '리스크 관리 습관', hook: '리스크 관리는 아는데 실전에서 잘 안 지켜지시나요?', before: '원칙은 있지만 상황마다 흔들림', after: '체크리스트 기반으로 반복 점검', saving: '즉흥 대응 축소', quickTip: '리스크 관리는 의지보다 반복 가능한 체크리스트에 더 많이 기대는 편이 좋습니다.' },
      { id: 10, label: '불확실성 대응 사고', theme: '불확실성 대응 사고', hook: '확실하지 않을 때 아무것도 못 하거나 너무 빨리 움직이시나요?', before: '불확실성 앞에서 판단 양극화', after: '가능성별 대응 시나리오 준비', saving: '판단 여유 확보', quickTip: '불확실성은 없애는 대상이 아니라 범위 안에서 대응을 준비하는 대상으로 보는 편이 현실적입니다.' },
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
      '뭘 어떻게 시켜야 할지 막막하고',
      '결과가 너무 평범하게 나오고',
      '수정할수록 시간이 더 드는 경우가 많죠.',
    ],
    'moneyflow-radar': [
      '분명 많이 안 쓴 것 같은데 돈이 줄고',
      '새는 지점이 어딘지 잘 안 보이고',
      '월말이 되면 체감이 더 커지곤 하죠.',
    ],
    'risk-check': [
      '좋아 보여도 불안이 남고',
      '뉴스를 볼수록 판단이 흔들리고',
      '리스크를 어디서 봐야 할지 막막할 때가 있죠.',
    ],
  } as const

  const selected = pickRandom(painPoints[brand.id], 2)

  return `${topic.hook}

${selected.join('\n')}

${formatClosing(brand)}`
}

function buildBeforeAfterPost(brand: BrandConfig, topic: BrandTopic): string {
  const beforeLines = {
    aisikim: 'AI에게 그냥 던짐 → 평범한 답, 수정 반복',
    'moneyflow-radar': '지출 내역만 대충 봄 → 왜 돈이 새는지 감이 안 옴',
    'risk-check': '좋아 보여서 바로 진입 → 흔들릴 때 대응 기준 없음',
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
문제: 흐름은 안 보이고 판단은 계속 늦어짐

${brand.name} 관점이면:
${topic.after}

기대 변화: ${topic.saving}

${formatClosing(brand)}`
}

function buildTipPost(brand: BrandConfig, topic: BrandTopic): string {
  const mention = resolveBrandMention(brand)
  return `💡 ${topic.quickTip}

이런 기준이 필요할 때는 ${brand.name}처럼 먼저 구조를 점검해보는 편이 좋습니다.
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
