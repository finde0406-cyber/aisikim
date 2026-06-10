export interface ThreadsPost {
  id: number
  content: string
  theme: string
  template: string
}

export const TOPICS = [
  { id: 1, label: 'AI 프롬프트 작성', theme: 'AI 프롬프트 작성', hook: 'AI 글쓰기, 진짜 결과를 원하시나요?' },
  { id: 2, label: '블로그 글쓰기', theme: '블로그 글쓰기', hook: '블로그 글, AI에게 시키면 뻔하죠.' },
  { id: 3, label: '업무 보고서', theme: '업무 보고서', hook: '보고서 작성, AI로 줄이고 싶지 않으신가요?' },
  { id: 4, label: 'ChatGPT 활용', theme: 'ChatGPT 활용', hook: 'ChatGPT, 제대로 쓰고 계신가요?' },
  { id: 5, label: 'AI 시간 절약', theme: 'AI 시간 절약', hook: 'AI 쓰는데 오히려 시간이 더 드시나요?' },
  { id: 6, label: '프롬프트 공부', theme: '프롬프트 공부', hook: '프롬프트 공부, 너무 귀찮으신가요?' },
  { id: 7, label: '1인 사업자', theme: '1인 사업자', hook: '혼자 모든 걸 해야 하는 1인 사업자분.' },
  { id: 8, label: '스타트업 문서', theme: '스타트업 문서', hook: '스타트업, 문서 혼자 만드시나요?' },
  { id: 9, label: '직장인 자기계발', theme: '직장인 자기계발', hook: '직장인, 자기계발 시간이 없으신가요?' },
  { id: 10, label: 'AI 글쓰기 좌절', theme: 'AI 글쓰기 좌절', hook: 'AI 글쓰기, 포기하신 적 있으신가요?' },
  { id: 11, label: 'AI 도구 비교', theme: 'AI 도구 비교', hook: 'ChatGPT, Claude, 뭐가 다른지 모르겠다면?' },
  { id: 12, label: 'AI 구체적 지시', theme: 'AI 구체적 지시', hook: 'AI에게 정확히 시키는 법, 아시나요?' },
  { id: 13, label: '업무 자동화', theme: '업무 자동화', hook: '반복 업무, AI로 줄이는 방법.' },
  { id: 14, label: '콘텐츠 기획', theme: '콘텐츠 기획', hook: '콘텐츠, 기획부터 작성까지 혼자하시나요?' },
  { id: 15, label: 'AI 수익화', theme: 'AI 수익화', hook: 'AI로 수익화, 어려우신가요?' },
  { id: 16, label: '프롬프트 템플릿', theme: '프롬프트 템플릿', hook: '프롬프트 템플릿, 매번 찾으시나요?' },
  { id: 17, label: 'AI 결과물 다듬기', theme: 'AI 결과물 다듬기', hook: 'AI 결과물, 내 스타일로 다듬기 어려우신가요?' },
  { id: 18, label: '비개발자 AI 자동화', theme: '비개발자 AI 자동화', hook: '비개발자도 AI 자동화, 해보고 싶지 않으신가요?' },
  { id: 19, label: 'ChatGPT 유료 활용', theme: 'ChatGPT 유료 활용', hook: 'ChatGPT 유료, 제대로 활용하고 계신가요?' },
  { id: 20, label: 'AI 창업 아이디어', theme: 'AI 창업 아이디어', hook: 'AI로 창업 아이디어, 검증해보셨나요?' },
] as const

export type TemplateType = 'empathy' | 'beforeAfter' | 'scenario' | 'tip'
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
export const TOPIC_OPTIONS: TopicOption[] = TOPICS.map((t) => ({
  id: t.id,
  label: t.label,
  theme: t.theme,
}))
export const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: 'empathy', label: '공감형', description: '문제에 공감하고 해결책 제시' },
  { id: 'beforeAfter', label: '비교형', description: '나쁜 예시 vs 좋은 예시 대조' },
  { id: 'scenario', label: '시나리오형', description: '구체적 상황 Before/After' },
  { id: 'tip', label: '팁형', description: '실용적인 팁을 짧게 전달' },
]

type Topic = (typeof TOPICS)[number]

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

function buildEmpathyPost(topic: Topic): string {
  const painPoints = [
    '진짜 결과가 안 나오더라고요.',
    '뭘 시켜야 할지 막막했어요.',
    '계속 똑같은 스타일만 나왔어요.',
    '결과를 다듬는 게 더 오래 걸렸어요.',
    '질문 자체를 어떻게 해야 할지 몰랐어요.',
  ]
  const selected = pickRandom(painPoints, 2)
  const ctaVariants = [
    '필요하시면 AI시킴에서 선택만으로 만들어보세요.',
    'AI시킴에서 직접 체험해보실 수 있습니다.',
    '간단하게 선택만으로 작업지시서를 만들 수 있어요.',
  ]
  const cta = pickRandom(ctaVariants, 1)[0] ?? ctaVariants[0]
  const brand = pickRandom(['aisikim.com', '#AI시킴'], 1)[0] ?? 'aisikim.com'
  const suffix = brand === 'aisikim.com' ? `\n${brand}` : `\n${brand}`

  return `${topic.hook}

${selected.join('\n')}

${cta}${suffix}`
}

function buildBeforeAfterPost(topic: Topic): string {
  const badExample = topic.theme.includes('글') || topic.theme.includes('콘텐츠')
    ? 'AI에게 "글 써줘" → 뻔한 도입, 바로 버림'
    : 'AI에게 그냥 질문 → 애매한 답변, 수정이 더 오래 걸림'
  const goodExample = `AI시킴으로:\n"${topic.theme} 작업지시서. 내 상황에 맞게 선택하면\n3분 만에 완성형 프롬프트가 나옵니다."`
  const ctaVariants = [
    '필요하시면 AI시킴에서 체험해보세요.',
    'AI시킴에서 직접 만들어보실 수 있어요.',
    '간단하게 선택만으로 작업지시서를 만들 수 있습니다.',
  ]
  const cta = pickRandom(ctaVariants, 1)[0] ?? ctaVariants[0]
  const brand = pickRandom(['aisikim.com', '#AI시킴'], 1)[0] ?? 'aisikim.com'
  const suffix = brand === 'aisikim.com' ? `\n${brand}` : `\n${brand}`

  return `❌ 그냥 질문하는 방식\n${badExample}\n\n✅ AI시킴 방식\n${goodExample}\n\n${cta}${suffix}`
}

function buildScenarioPost(topic: Topic): string {
  const scenarios: Record<string, { before: string; after: string; saving: string }> = {
    'AI 프롬프트 작성': { before: '프롬프트 고민 20분', after: '선택만으로 3분 완성', saving: '주 5시간 절약' },
    '블로그 글쓰기': { before: '제목 고민 30분', after: '후보 7개 중 고르기만 하면 끝', saving: '글 시간 50% 단축' },
    '업무 보고서': { before: '보고서 작성 30분', after: '초안 5분 → 수정 10분', saving: '주 5시간 절약' },
    default: { before: '매번 새로운 질문 고민', after: '선택만으로 완성형 작업지시서', saving: '반복 시간 크게 절약' },
  }
  const scenario = scenarios[topic.theme] || scenarios.default
  const ctaVariants = [
    '필요하시면 AI시킴에서 선택만으로 만들어보세요.',
    'AI시킴에서 직접 체험해보실 수 있습니다.',
    '간단하게 선택만으로 작업지시서를 만들 수 있어요.',
  ]
  const cta = pickRandom(ctaVariants, 1)[0] ?? ctaVariants[0]
  const brand = pickRandom(['aisikim.com', '#AI시킴'], 1)[0] ?? 'aisikim.com'
  const suffix = brand === 'aisikim.com' ? `\n${brand}` : `\n${brand}`

  return `${topic.hook}

상황: ${scenario.before}
문제: 결과가 애매하고 수정이 더 오래 걸림

AI시킴이면:
${scenario.after}

결과: ${scenario.saving}

${cta}${suffix}`
}

function buildTipPost(topic: Topic): string {
  const tips: Record<string, string> = {
    'AI 프롬프트 작성': 'AI에게 "글 써줘" 대신 "블로그 글 초안. 대상은 30대 직장인. 목적은 시간 관리 팁 공유. 쉽고 친절하게." 라고 적어보세요.',
    '블로그 글쓰기': '제목부터 막히신다면 AI시킴을 써보세요. 3가지 방향으로 제목 후보 7개를 뽑아줍니다.',
    '업무 보고서': '보고서는 "한 줄 요약 → 핵심 이슈 → 제안" 순으로 AI에게 요청하면 훨씬 실무다운 결과가 나옵니다.',
    default: 'AI에게 구체적으로 시키는 비결: 누가, 무엇을, 왜, 어떻게 쓸지 한 문장으로 정리하고 시작하세요.',
  }
  const tip = tips[topic.theme] || tips.default
  const brand = pickRandom(['aisikim.com', '#AI시킴'], 1)[0] ?? 'aisikim.com'
  const suffix = brand === 'aisikim.com' ? `\n\n${brand}` : ` ${brand}`

  return `💡 ${tip}\n\n필요하시면 AI시킴에서 선택만으로 만들어보세요.${suffix}`
}

const TEMPLATES: Record<TemplateType, (topic: Topic) => string> = {
  empathy: buildEmpathyPost,
  beforeAfter: buildBeforeAfterPost,
  scenario: buildScenarioPost,
  tip: buildTipPost,
}

const TEMPLATE_LABELS: Record<TemplateType, string> = {
  empathy: '공감형',
  beforeAfter: '비교형',
  scenario: '시나리오형',
  tip: '팁형',
}

export function buildThreadsPost(topic: Topic, templateId: TemplateType): ThreadsPost {
  const content = TEMPLATES[templateId](topic)
  return {
    id: Number(topic.id),
    content,
    theme: topic.theme,
    template: TEMPLATE_LABELS[templateId],
  }
}

export function buildThreadsPosts(
  topicIds?: number[],
  templateIds?: TemplateType[],
  count = 3,
): ThreadsPost[] {
  const resolvedTopics = topicIds && topicIds.length > 0
    ? topicIds.map((id) => TOPICS.find((t) => t.id === id)).filter((t): t is Topic => Boolean(t))
    : TOPICS

  const resolvedTemplates = templateIds && templateIds.length > 0
    ? templateIds
    : (['empathy', 'beforeAfter', 'scenario', 'tip'] as TemplateType[])

  const posts: ThreadsPost[] = []
  const combinations = resolvedTopics.flatMap((topic) =>
    resolvedTemplates.map((templateId) => ({ topic, templateId })),
  )
  const pickedCombinations = pickRandom(combinations, count)

  pickedCombinations.forEach(({ topic, templateId }, index) => {
    posts.push({
      ...buildThreadsPost(topic, templateId),
      id: index + 1,
    })
  })

  return posts
}
