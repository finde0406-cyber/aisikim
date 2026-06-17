export type BrandId = 'aisikim' | 'moneyflow-radar' | 'risk-check'
export type ContentStyle = 'mixed' | 'roast' | 'insight' | 'philosophy' | 'promo'

export interface ThreadsPost {
  id: number
  brandId: BrandId
  brandName: string
  content: string
  theme: string
  character: string
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
  url: string
  softMentions: string[]
  promoCtas: string[]
  topics: BrandTopic[]
}

export interface TopicOption {
  id: number
  label: string
  theme: string
}

export interface ContentStyleOption {
  id: ContentStyle
  label: string
  description: string
}

const CONTENT_STYLE_LABELS: Record<ContentStyle, string> = {
  mixed: '혼합 운영',
  roast: '팩폭 상황극',
  insight: '데이터 해석',
  philosophy: '철학 한 마디',
  promo: '서비스 기능 언급',
}

export const CONTENT_STYLE_OPTIONS: ContentStyleOption[] = [
  { id: 'mixed', label: '혼합 운영', description: '인사이트 40%, 팩폭 30%, 홍보 30% 감각으로 섞음' },
  { id: 'roast', label: '팩폭 상황극', description: '투자자 행동 패턴을 날카롭게 저격' },
  { id: 'insight', label: '데이터 해석', description: '흐름과 구조를 읽는 인사이트형' },
  { id: 'philosophy', label: '철학 한 마디', description: '짧고 묵직한 공감형 문장' },
  { id: 'promo', label: '서비스 기능 언급', description: '자연스럽게 기능과 쓰임새 연결' },
]

const BRAND_CONFIGS: Record<BrandId, BrandConfig> = {
  aisikim: {
    id: 'aisikim',
    name: 'AI시킴이',
    description: '질문할 줄 모르는 AI 초보자용 원클릭 작업지시서 생성기',
    url: 'aisikim.com',
    softMentions: [
      '질문 구조 막히는 사람용으로 aisikim.com에 묶어둔 게 있음.',
      '이런 흐름이 안 잡히면 aisikim.com에서 바로 돌려보면 됨.',
      '이거 손에 안 익으면 aisikim.com 같은 클릭형 도구가 확실히 편함.',
    ],
    promoCtas: [
      'AI시킴이는 원하는 작업만 몇 번 고르면 질문문을 바로 뽑아줌. aisikim.com',
      '질문 한 줄 못 짜겠으면 AI시킴이에서 클릭 몇 번으로 시작하면 됨. aisikim.com',
      '무료로 한 번 써보고 감 오면 그때 유료팩 붙이면 됨. aisikim.com',
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
    description: '자금 과열 구간을 경계하는 리스크 관리용 흐름 점검 브랜드',
    url: 'moneyflowradar.com',
    softMentions: [
      '이런 자리는 moneyflowradar.com처럼 과열 구간을 먼저 보는 쪽이 덜 위험함.',
      '자금 몰림 자리 체크는 moneyflowradar.com에서 바로 보는 편이 빠름.',
      '뉴스보다 자금 몰림 먼저 보려면 moneyflowradar.com 쪽이 더 직관적임.',
    ],
    promoCtas: [
      '머니플로우레이더는 지금 돈이 과하게 몰린 섹터를 먼저 경고해주는 쪽임. moneyflowradar.com',
      '불나방처럼 뛰어들기 싫으면 moneyflowradar.com에서 과열 자리부터 보고 들어가셈.',
      '대박주 추천보다 어디를 조심해야 하는지 보고 싶으면 moneyflowradar.com이 맞음.',
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
    url: 'check.financialrisklab.com',
    softMentions: [
      '지금 내 상태부터 보고 싶으면 check.financialrisklab.com에서 바로 확인 가능함.',
      '멘탈 흔들릴 때는 check.financialrisklab.com처럼 현실 진단 먼저 하는 쪽이 맞음.',
      '버티기 전에 내 계좌 상태부터 보려면 check.financialrisklab.com 쪽이 빠름.',
    ],
    promoCtas: [
      '리스크체크는 객관식 몇 개만 답하면 지금 계좌 리스크 상태를 바로 팩폭해줌. check.financialrisklab.com',
      '존버 중인데 내가 얼마나 위험한 상태인지 모르겠으면 check.financialrisklab.com에서 먼저 진단해보셈.',
      '탈출 전략 짜기 전에 현실 진단부터 보고 싶으면 check.financialrisklab.com이 맞음.',
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

export function isContentStyle(value: string): value is ContentStyle {
  return value in CONTENT_STYLE_LABELS
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

function pickOne<T>(items: readonly T[]): T {
  return pickRandom(items, 1)[0] ?? items[0]
}

function joinParagraphs(...paragraphs: string[]) {
  return paragraphs.filter(Boolean).join('\n\n')
}

function maybeSoftMention(brand: BrandConfig) {
  return Math.random() < 0.35 ? pickOne(brand.softMentions) : ''
}

function promoClose(brand: BrandConfig) {
  return pickOne(brand.promoCtas)
}

function buildInsightPost(brand: BrandConfig, topic: BrandTopic) {
  if (brand.id === 'moneyflow-radar') {
    const variants = [
      () =>
        joinParagraphs(
          `${topic.hook} 이런 날일수록 뉴스 해석보다 자금이 어디로 옮겨 붙는지 보는 게 더 먼저임. ${topic.quickTip}`,
          `${topic.after} 쪽으로 시선 돌리면 왜 체감이 먼저 싸해졌는지 설명이 됨. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `요즘 장에서 자꾸 느끼는 건, 사람들은 차트보다 늦게 불안해진다는 거임. 돈은 이미 움직였는데 머리로만 납득하려다 타이밍 놓침.`,
          `${topic.theme} 볼 때도 결국 핵심은 ${topic.after}임. ${topic.saving}은 괜히 나오는 게 아님. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `시장은 대놓고 무너지기 전에 먼저 티를 냄. ${topic.before} 쪽에만 매달리면 그 신호를 계속 놓치게 됨.`,
          `${topic.quickTip} 괜히 겁주려는 얘기가 아니라 안 잃으려고 보는 관점임. ${maybeSoftMention(brand)}`.trim(),
        ),
    ]

    return pickOne(variants)()
  }

  if (brand.id === 'risk-check') {
    const variants = [
      () =>
        joinParagraphs(
          `${topic.hook} 근데 사람들 대부분은 수익 날 이유부터 찾고, 깨질 이유는 나중에 봄.`,
          `${topic.quickTip} ${topic.after}가 먼저 잡히면 판단이 덜 감정적으로 흘러감. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `계좌가 흔들릴 때 진짜 필요한 건 희망회로가 아니라 현실 감각임. ${topic.before} 쪽으로만 보면 내 상태가 얼마나 꼬였는지 계속 가려짐.`,
          `${topic.saving} 같은 건 화려한 기법보다 이런 기본 점검에서 갈리는 편임. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `리스크 관리는 겁쟁이처럼 보이기 쉬운데, 실제로는 멘탈 보호 장치에 더 가까움. 한 번 크게 흔들리면 원칙도 다 무너짐.`,
          `${topic.quickTip} 그래서 ${topic.theme}은 수익보다 생존 얘기부터 해야 함. ${maybeSoftMention(brand)}`.trim(),
        ),
    ]

    return pickOne(variants)()
  }

  const variants = [
    () =>
      joinParagraphs(
        `${topic.hook} AI 결과가 별로인 걸 도구 탓만 하는데, 까보면 질문 구조가 허술한 경우가 훨씬 많음.`,
        `${topic.quickTip} 결국 ${topic.after} 쪽으로 바꾸는 사람이 ${topic.saving}도 같이 가져감. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `AI 쓸수록 느끼는 건 성능보다 입력값 차이가 더 크게 먹힌다는 거임. ${topic.before} 쪽에서 헤매면 유료 모델 써도 결과가 밍밍함.`,
        `${topic.theme}은 재능 문제가 아니라 구조 문제인 경우가 많음. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `요즘 초보자들 보면 공부를 더 해야 할 것 같아서 멈추는 경우가 많음. 근데 막상 필요한 건 이론보다 시작 구조 하나인 듯.`,
        `${topic.quickTip} ${topic.after}가 먼저 잡히면 손이 빨라짐. ${maybeSoftMention(brand)}`.trim(),
      ),
  ]

  return pickOne(variants)()
}

function buildRoastPost(brand: BrandConfig, topic: BrandTopic) {
  if (brand.id === 'moneyflow-radar') {
    const variants = [
      () =>
        joinParagraphs(
          `커뮤니티에서 특정 섹터 얘기 도배되면 갑자기 본인만 늦은 것 같아서 손가락이 근질근질해짐. 그러다 이미 사람 다 탄 버스에 막차 타고 앉아서 왜 나만 물렸냐고 함.`,
          `${topic.quickTip} 적어도 어디가 과열인지 보고 들어가야 대가리 덜 깨짐. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `투자 못 참는 사람들 특징이 있음. 차트 한 번 더 보고, 댓글 한 번 더 보고, 결국 제일 붐빌 때 들어감.`,
          `${topic.before} 쪽으로만 반응하면 늘 남이 던질 자리에서 받게 됨. ${topic.after}는 그래서 필요한 거임. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `돈이 몰리는 데는 이유가 있다면서 무지성 진입하는데, 그 다음 문장은 늘 똑같음. 왜 나는 들어가자마자 꺾이냐고.`,
          `그 이유를 미리 보라고 자금 흐름 보는 건데 다들 지나치더라. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `월요일엔 늘 자신감 넘치다가 수요일쯤 되면 리스크 관리는 언제 봐야 하냐고 묻는 사람 많음. 늦음. 이미 한참 늦음.`,
          `${topic.theme}은 돈 벌 타이밍보다 멈춰야 할 타이밍 보는 용도에 더 가까움. ${maybeSoftMention(brand)}`.trim(),
        ),
    ]

    return pickOne(variants)()
  }

  if (brand.id === 'risk-check') {
    const variants = [
      () =>
        joinParagraphs(
          `계좌 -30%인데도 아직 본전 오면 판다고만 말하는 사람들 많음. 문제는 본전 오면 또 욕심나서 안 판다는 거지.`,
          `${topic.quickTip} 지금 상태가 어떤지부터 보는 게 먼저인데 다들 그걸 제일 싫어함. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `손실 난 사람들 중에 제일 위험한 부류는 차분한 척하는 사람임. 이미 멘탈 박살났는데 겉으로만 장기투자라고 포장함.`,
          `${topic.after} 없이 버티기만 하면 결국 판단은 점점 더 흐려짐. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `뉴스를 보는 게 아니라 위로받으려고 기사 찾는 모드 들어가면 답 없음. 내 포지션이 위험한지 아닌지보다, 나를 안심시켜줄 문장만 찾게 됨.`,
          `${topic.theme}은 지식 테스트가 아니라 현실 직시 테스트에 더 가까움. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `사람들이 리스크 관리를 어려워하는 이유는 복잡해서가 아님. 보기 싫은 사실을 먼저 봐야 해서임.`,
          `${topic.quickTip} 그래서 체크리스트가 필요하고, 그래서 자가진단도 필요한 거임. ${maybeSoftMention(brand)}`.trim(),
        ),
      ]

    return pickOne(variants)()
  }

  const variants = [
    () =>
      joinParagraphs(
        `ChatGPT 결제는 바로 해놓고 정작 입력창 앞에서는 10분째 숨만 쉬는 사람 많음. 질문은 못 만들겠고 뭔가는 빨리 얻고 싶고, 그러다 대충 넣고 결과 구리다고 욕함.`,
        `${topic.quickTip} 그래서 ${topic.after} 같은 시작 구조가 필요한 거임. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `AI로 시간 아낀다면서 질문 세 번 고치고, 답변 네 번 다시 시키고, 결국 사람이 다 손보는 패턴 많이 봄. 이쯤 되면 자동화가 아니라 우회 야근임.`,
        `${topic.before}에서 헤매는 사람일수록 선택형 시작점이 훨씬 낫더라. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `작업지시서 공부부터 해야 한다고 겁먹는 순간 이미 시작이 늦어짐. 초보자는 공부보다 첫 성공 경험 하나가 더 중요함.`,
        `${topic.theme} 쪽도 복잡한 명령어보다 제대로 된 질문 한 번이 훨씬 먹힘. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `AI 답변이 마음에 안 드는 사람들 중 절반은 사실 질문을 너무 넓게 넣음. 원하는 건 구체적인데 입력은 늘 두루뭉술함.`,
        `${topic.quickTip} 이거 고치면 체감이 확 달라짐. ${maybeSoftMention(brand)}`.trim(),
      ),
    ]

  return pickOne(variants)()
}

function buildPhilosophyPost(brand: BrandConfig, topic: BrandTopic) {
  if (brand.id === 'moneyflow-radar') {
    const variants = [
      () =>
        joinParagraphs(
          `투자에서 제일 비싼 감정은 조급함인 듯. 남들 다 번다는 분위기에 밀리면, 내 원칙은 제일 먼저 밀려남.`,
          `${topic.quickTip} 결국 안 잃는 사람이 오래 감. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `시장은 늘 뭔가를 유혹함. 근데 돈을 버는 사람보다, 함부로 따라붙지 않는 사람이 더 오래 남더라.`,
          `${topic.theme}은 공격보다 절제가 먼저인 구간을 알려주는 쪽에 가까움. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `늦게 아는 것보다 늦게 참는 게 더 비쌀 때가 있음. 자금 흐름 보는 이유도 결국 그 한 박자를 덜 늦추려는 거고.`,
          `${maybeSoftMention(brand)}`.trim(),
        ),
    ]

    return pickOne(variants)()
  }

  if (brand.id === 'risk-check') {
    const variants = [
      () =>
        joinParagraphs(
          `투자는 맞히는 게임 같아 보여도, 실제로는 안 무너지는 게임에 더 가까움. 한 번 크게 흔들리면 실력보다 멘탈이 먼저 꺾임.`,
          `${topic.quickTip} 결국 생존 확률 관리가 먼저임. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `사람은 손실을 보면 판단이 예뻐지지 않음. 오히려 더 고집 세지고, 더 희망적인 말만 골라 보게 됨.`,
          `${topic.after} 같은 현실 점검이 필요한 이유가 딱 그거임. ${maybeSoftMention(brand)}`.trim(),
        ),
      () =>
        joinParagraphs(
          `원칙이 중요한 건 다 아는데, 원칙이 가장 먼저 무너지는 순간은 늘 불안할 때임. 그래서 평소보다 흔들릴 때 더 단순한 체크가 필요함.`,
          `${maybeSoftMention(brand)}`.trim(),
        ),
    ]

    return pickOne(variants)()
  }

  const variants = [
    () =>
      joinParagraphs(
        `AI는 똑똑한데 사람은 자꾸 막힘. 이상한 일이 아니라 질문을 설계하는 근육이 아직 없는 것뿐임.`,
        `${topic.quickTip} 잘 묻는 사람은 재능보다 구조를 먼저 챙기더라. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `빈 입력창이 사람 기를 꽤 많이 죽임. 뭘 모르는지조차 모르겠을 때는 자유 입력보다 선택지가 훨씬 친절함.`,
        `${topic.after} 같은 시작점 하나가 생각보다 큼. ${maybeSoftMention(brand)}`.trim(),
      ),
    () =>
      joinParagraphs(
        `생산성은 거창한 자동화보다 덜 막히는 시작에서 나오는 듯. 시작이 부드러우면 수정도 덜 지침.`,
        `${maybeSoftMention(brand)}`.trim(),
      ),
    ]

  return pickOne(variants)()
}

function buildPromoPost(brand: BrandConfig, topic: BrandTopic) {
  if (brand.id === 'moneyflow-radar') {
    const variants = [
      () =>
        joinParagraphs(
          `머니플로우레이더는 뭐 사라고 추천하는 도구가 아님. 오히려 지금 돈이 과하게 몰린 섹터가 어디인지 먼저 보여주고, 무지성 진입을 말리는 쪽에 가까움.`,
          `${topic.quickTip} FOMO 올라올 때 한 번만 봐도 판단이 훨씬 차가워짐. ${promoClose(brand)}`,
        ),
      () =>
        joinParagraphs(
          `요즘 만들고 있는 건 대박 종목 찾는 서비스가 아니라, 대가리 깨질 자리 먼저 피하게 도와주는 흐름 점검 도구임. 돈이 어디로 몰리고 어디서 빠지는지 보면서 과열 구간을 경계하게 만듦.`,
          `${topic.theme} 보는 사람은 특히 잘 맞을 거임. ${promoClose(brand)}`,
        ),
      () =>
        joinParagraphs(
          `불나방처럼 따라붙는 투자 줄이려고 머니플로우레이더를 붙여둠. 시장 자금이 이미 한쪽으로 과하게 쏠렸는지 먼저 보고, 조심해야 할 자리인지 바로 체크하는 구조임.`,
          `${promoClose(brand)}`,
        ),
    ]

    return pickOne(variants)()
  }

  if (brand.id === 'risk-check') {
    const variants = [
      () =>
        joinParagraphs(
          `리스크체크는 물린 투자자용 심리 자가진단 도구로 만들었음. 객관식 몇 개만 답하면 지금 내 계좌 상태를 희망회로 말고 현실 기준으로 보게 해줌.`,
          `막연히 버티는 사람보다 일단 자기 상태부터 보는 사람한테 잘 맞음. ${promoClose(brand)}`,
        ),
      () =>
        joinParagraphs(
          `존버 중인데도 마음 한구석이 계속 불안하면 그건 이유가 있는 거임. 리스크체크는 몇 가지 선택만으로 지금 포지션이 얼마나 위험한지 바로 마주하게 만드는 쪽임.`,
          `${topic.theme} 필요하면 꽤 직설적으로 도움 됨. ${promoClose(brand)}`,
        ),
      () =>
        joinParagraphs(
          `손실 난 사람들한테 필요한 건 위로보다 현실 점검인 경우가 많음. 그래서 리스크체크도 복잡한 분석보다, 몇 개 선택만으로 내 상태를 바로 팩폭해주는 형태로 만들어둠.`,
          `${promoClose(brand)}`,
        ),
    ]

    return pickOne(variants)()
  }

  const variants = [
    () =>
      joinParagraphs(
        `AI시킴이는 질문할 줄 모르는 초보자를 위한 원클릭 작업지시서 생성기임. 복잡한 명령어 외울 필요 없이, 원하는 작업 몇 번 고르면 바로 질문문이 나오는 구조로 만들었음.`,
        `${topic.theme}처럼 손이 자주 멈추는 사람한테 특히 잘 맞음. ${promoClose(brand)}`,
      ),
    () =>
      joinParagraphs(
        `작업지시서 공부부터 하다 지치는 사람들 많아서 AI시킴이를 붙여둠. 업종, 목적, 결과물 같은 선택지만 고르면 바로 쓸 수 있는 질문문이 나와서 시작이 빨라짐.`,
        `무료로 먼저 써보고 괜찮으면 그다음 유료팩 붙이면 됨. ${promoClose(brand)}`,
      ),
      () =>
        joinParagraphs(
          `AI시킴이는 그냥 템플릿 모음집이 아님. 질문을 못 만드는 초보자가 클릭 몇 번으로 바로 쓸 수 있게 만든 작업지시서 자판기에 더 가까움.`,
          `${topic.quickTip} 결과가 밍밍해서 늘 재시도하던 사람이라면 체감이 있을 거임. ${promoClose(brand)}`,
        ),
    ]

  return pickOne(variants)()
}

function buildContentByStyle(style: Exclude<ContentStyle, 'mixed'>, brand: BrandConfig, topic: BrandTopic) {
  switch (style) {
    case 'roast':
      return buildRoastPost(brand, topic)
    case 'insight':
      return buildInsightPost(brand, topic)
    case 'philosophy':
      return buildPhilosophyPost(brand, topic)
    case 'promo':
      return buildPromoPost(brand, topic)
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

function buildPostForBrand(
  brandId: BrandId,
  topic: BrandTopic,
  style: Exclude<ContentStyle, 'mixed'>,
  id: number,
): ThreadsPost {
  const brand = BRAND_CONFIGS[brandId]

  return {
    id,
    brandId,
    brandName: brand.name,
    content: buildContentByStyle(style, brand, topic),
    theme: topic.theme,
    character: CONTENT_STYLE_LABELS[style],
  }
}

function resolveStyles(style: ContentStyle, count: number): Exclude<ContentStyle, 'mixed'>[] {
  if (style !== 'mixed') return Array.from({ length: count }, () => style)

  if (count === 1) {
    return [pickOne(['insight', 'insight', 'insight', 'insight', 'roast', 'roast', 'roast', 'promo', 'promo', 'promo'] as const)]
  }

  const base = pickRandom(['insight', 'roast', 'promo'] as const, Math.min(count, 3))
  while (base.length < count) {
    base.push(pickOne(['insight', 'insight', 'insight', 'insight', 'roast', 'roast', 'roast', 'promo', 'promo', 'promo'] as const))
  }
  return base
}

export function buildThreadsPosts(
  brandId: BrandId,
  topicIds?: number[],
  style: ContentStyle = 'mixed',
  count = 3,
): ThreadsPost[] {
  const topics = resolveTopics(brandId, topicIds)
  const selectedTopics = pickRandom(topics, count)
  const styles = resolveStyles(style, count)

  return selectedTopics.map((topic, index) =>
    buildPostForBrand(brandId, topic, styles[index] ?? 'insight', index + 1),
  )
}

export function buildAllBrandThreadsPosts(
  style: ContentStyle = 'mixed',
  countPerBrand = 1,
): ThreadsPost[] {
  const posts: ThreadsPost[] = []
  let nextId = 1
  const brandIds = Object.keys(BRAND_CONFIGS) as BrandId[]
  const allBrandStyles =
    style === 'mixed' && countPerBrand === 1
      ? pickRandom(['insight', 'roast', 'promo'] as const, brandIds.length)
      : undefined

  brandIds.forEach((brandId, index) => {
    const topics = BRAND_CONFIGS[brandId].topics
    const selectedTopics = pickRandom(topics, countPerBrand)
    const styles = allBrandStyles
      ? Array.from({ length: countPerBrand }, () => allBrandStyles[index] ?? 'insight')
      : resolveStyles(style, countPerBrand)

    selectedTopics.forEach((topic, topicIndex) => {
      posts.push(buildPostForBrand(brandId, topic, styles[topicIndex] ?? 'insight', nextId))
      nextId += 1
    })
  })

  return posts
}
