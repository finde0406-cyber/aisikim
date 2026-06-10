export interface ThreadsPost {
  id: number
  content: string
  theme: string
  emotion: string
  template: TemplateType
}

export const HASHTAGS = ['#AI시킴', '#ChatGPT', '#프롬프트', '#AI글쓰기', '#업무자동화', '#블로그글쓰기'] as const

export const TOPICS = [
  { id: 1, label: 'AI 프롬프트 작성', theme: 'AI 프롬프트 작성', emotion: 'frustration', hook: 'AI에게 "글 써줘" 하면 다 뻔한 내용만 나오죠.' },
  { id: 2, label: '블로그 글쓰기', theme: '블로그 글쓰기', emotion: 'frustration', hook: '블로그 글 쓰다가 제목부터 막히신 적 있으신가요?' },
  { id: 3, label: '업무 보고서', theme: '업무 보고서', emotion: 'disappointment', hook: '매주 보고서 작성하시나요? AI에게 시키면 뻔한 답만 옵니다.' },
  { id: 4, label: 'ChatGPT 사용', theme: 'ChatGPT 사용', emotion: 'inferiority', hook: 'ChatGPT 써보고 실망하신 분, 손 드세요.' },
  { id: 5, label: 'AI 시간 절약', theme: 'AI 시간 절약', emotion: 'frustration', hook: 'AI로 시간 절약하려다가 오히려 시간 쓰고 계신가요?' },
  { id: 6, label: '프롬프트 공부', theme: '프롬프트 공부', emotion: 'frustration', hook: '프롬프트 엔지니어링 공부하기 귀찮으신가요?' },
  { id: 7, label: '1인 사업자', theme: '1인 사업자', emotion: 'disappointment', hook: '1인 사업자 혼자 모든 콘텐츠 만들어야 하시죠?' },
  { id: 8, label: '스타트업 문서', theme: '스타트업 문서', emotion: 'frustration', hook: '스타트업 팀원 없이 문서 혼자 만드시나요?' },
  { id: 9, label: '직장인 자기계발', theme: '직장인 자기계발', emotion: 'inferiority', hook: '직장인 야근 때문에 자기계발 시간 없으신가요?' },
  { id: 10, label: 'AI 글쓰기 좌절', theme: 'AI 글쓰기 좌절', emotion: 'frustration', hook: 'AI 글쓰기 따라하다가 포기하신 분들 많습니다.' },
  { id: 11, label: 'AI 도구 비교', theme: 'AI 도구 비교', emotion: 'confusion', hook: 'Claude, Gemini, 뭐가 다른지 모르겠다면?' },
  { id: 12, label: 'AI 구체적 지시', theme: 'AI 구체적 지시', emotion: 'frustration', hook: 'AI에게 구체적으로 시키는 방법을 모르시겠다면?' },
  { id: 13, label: '업무 자동화', theme: '업무 자동화', emotion: 'disappointment', hook: '매일 반복되는 업무, AI로 줄이고 싶지 않으신가요?' },
  { id: 14, label: '콘텐츠 기획', theme: '콘텐츠 기획', emotion: 'frustration', hook: '콘텐츠 기획부터 작성까지 혼자 하시나요?' },
  { id: 15, label: 'AI 수익화', theme: 'AI 수익화', emotion: 'curiosity', hook: 'AI로 수익화 하고 싶은데 방법을 모르시나요?' },
  { id: 16, label: '프롬프트 템플릿', theme: '프롬프트 템플릿', emotion: 'frustration', hook: '프롬프트 템플릿 찾아다니기 귀찮으신가요?' },
  { id: 17, label: 'AI 결과물 다듬기', theme: 'AI 결과물 다듬기', emotion: 'disappointment', hook: 'AI 결과물을 내 것처럼 다듬는 방법을 모르시나요?' },
  { id: 18, label: '비개발자 AI 자동화', theme: '비개발자 AI 자동화', emotion: 'inferiority', hook: '비개발자인데 AI로 자동화 해보고 싶으신가요?' },
  { id: 19, label: 'ChatGPT 유료 활용', theme: 'ChatGPT 유료 활용', emotion: 'frustration', hook: 'ChatGPT 유료 구독 중인데 제대로 활용 못하고 계신가요?' },
  { id: 20, label: 'AI 창업 아이디어', theme: 'AI 창업 아이디어', emotion: 'curiosity', hook: 'AI로 창업 아이디어 검증해보고 싶으신가요?' },
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
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = shuffleArray(arr)
  return shuffled.slice(0, count)
}
function generateEmpathyPost(topic: (typeof TOPICS)[number]): string {
  const painPoints = [
    '뭘 더 적어야 할지 모르겠고',
    '제목부터 막히고',
    '도대체 여기에 뭐를 넣어야 해?',
    'AI가 준 답이 너무 뻔해서',
    '매번 똑같은 스타일로 나오고',
    '질문 자체를 어떻게 해야 할지',
  ]
  const selected = pickRandom(painPoints, 3)
  return `${topic.hook}

${selected.join('\n')}

그래서 만들었습니다.
선택만으로 작업지시서가 완성되는 AI시킴이.

3분이면 진짜 쓸 수 있는 프롬프트가 나옵니다.
👉 aisikim.com`
}
function generateBeforeAfterPost(topic: (typeof TOPICS)[number]): string {
  const badExample = topic.emotion === 'frustration'
    ? 'AI에게 "글 써줘" → 뻔한 도입, 누구나 쓰는 문장, 바로 버림'
    : 'AI에게 그냥 질문 → 애매한 답변, 수정이 더 오래 걸림'
  const goodExample = `AI시킴으로 생성:\n"${topic.theme} 작업지시서. 내 상황에 맞게 선택하면 \n3분 만에 완성형 프롬프트가 나옵니다."`
  return `❌ 그냥 질문하는 방식\n${badExample}\n\n✅ AI시킴 방식\n${goodExample}\n\n이 차이가 3분 안에 생깁니다.\n👉 aisikim.com`
}
function generateScenarioPost(topic: (typeof TOPICS)[number]): string {
  const scenarios: Record<string, { before: string; after: string; saving: string }> = {
    'AI 프롬프트 작성': {
      before: '프롬프트 생각하다가 20분 소요',
      after: '선택 3번 클릭 → 3분 만에 완성',
      saving: '주 5시간 → 월 20시간 절약',
    },
    '블로그 글쓰기': {
      before: '제목 생각하다가 30분 소요',
      after: '제목 후보 7개 자동 생성 → 고르기만 하면 끝',
      saving: '글 쓰는 시간 50% 단축',
    },
    '업무 보고서': {
      before: '보고서 작성 30분',
      after: '초안 5분 → 수정 10분 → 완성',
      saving: '주 5시간 → 월 20시간 절약',
    },
    default: {
      before: '매번 새로운 질문 고민',
      after: '선택만으로 완성형 작업지시서',
      saving: '반복 시간 크게 절약',
    },
  }
  const scenario = scenarios[topic.theme] || scenarios.default
  return `${topic.hook}

상황: ${scenario.before}
문제: 계속 똑같은 스타일로 나오고, 수정이 더 오래 걸림

AI시킴이면:
${scenario.after}

결과: ${scenario.saving}

👉 aisikim.com`
}
function generateTipPost(topic: (typeof TOPICS)[number]): string {
  const tips: Record<string, string> = {
    'AI 프롬프트 작성': 'AI에게 "글 써줘" 대신 "블로그 글 초안. 대상은 30대 직장인. 목적은 시간 관리 팁 공유. 쉽고 친절하게." 라고 적어보세요.',
    '블로그 글쓰기': '제목부터 막히신다면 AI시킴을 써보세요. 3가지 방향으로 제목 후보 7개를 뽑아줍니다. 정보형, 클릭형, 실전 팁형.',
    '업무 보고서': '보고서는 "한 줄 요약 → 핵심 이슈 → 제안" 순으로 AI에게 요청하면 훨씬 실무다운 결과가 나옵니다.',
    default: 'AI에게 구체적으로 시키는 비결: 누가, 무엇을, 왜, 어떻게 결과를 쓸지 한 문장으로 정리하고 시작하세요.',
  }
  const tip = tips[topic.theme] || tips.default
  return `💡 오늘의 AI 팁\n\n${tip}\n\n이렇게 구체적인 작업지시서를 만들고 싶으신가요?\nAI시킴이 선택만으로 완성시켜드립니다.\n\n👉 aisikim.com/quiz\n\n${HASHTAGS.slice(0, 3).join(' ')}`
}
const TEMPLATES: Record<TemplateType, (topic: (typeof TOPICS)[number]) => string> = {
  empathy: generateEmpathyPost,
  beforeAfter: generateBeforeAfterPost,
  scenario: generateScenarioPost,
  tip: generateTipPost,
}
const TEMPLATE_TYPES: TemplateType[] = ['empathy', 'beforeAfter', 'scenario', 'tip']
export function buildThreadsPost(topic: (typeof TOPICS)[number], templateId: TemplateType): ThreadsPost {
  const content = TEMPLATES[templateId](topic)
  return {
    id: topic.id,
    content,
    theme: topic.theme,
    emotion: topic.emotion,
    template: templateId,
  }
}
export function buildThreadsPosts(
  topicIds?: number[],
  templateIds?: TemplateType[],
): ThreadsPost[] {
  const resolvedTopics = topicIds && topicIds.length > 0
    ? topicIds.map((id) => TOPICS.find((t) => t.id === id)).filter((t): t is (typeof TOPICS)[number] => Boolean(t))
    : TOPICS
  const resolvedTemplates = templateIds && templateIds.length > 0
    ? templateIds
    : TEMPLATE_TYPES
  const posts: ThreadsPost[] = []
  let nextId = 1
  for (const topic of resolvedTopics) {
    for (const templateId of resolvedTemplates) {
      posts.push({
        ...buildThreadsPost(topic, templateId),
        id: nextId,
      })
      nextId += 1
    }
  }
  return posts
}
