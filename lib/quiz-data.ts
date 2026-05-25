// 선택형 진단 질문 데이터 - Sprint 2~3 공통 상수

export type QuizAnswers = {
  category?: string
  blocker?: string
  output?: string
  ai_tool?: string
  style?: string
}

export type QuizStep = {
  id: keyof QuizAnswers
  question: string
  options: { label: string; value: string }[]
}

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'category',
    question: 'AI로 무엇을 하고 싶나요?',
    options: [
      { label: '블로그 글쓰기', value: 'blog' },
      { label: '업무/보고서 작성', value: 'work' },
      { label: '앱/웹사이트 개발', value: 'dev' },
    ],
  },
  {
    id: 'blocker',
    question: '지금 어디서 막히고 있나요?',
    options: [
      { label: '무엇부터 물어봐야 할지 모르겠어요', value: 'dont_know_start' },
      { label: 'AI 답변이 너무 뻔해요', value: 'boring_answer' },
      { label: '내 상황을 어떻게 설명해야 할지 모르겠어요', value: 'cant_explain' },
      { label: '결과물이 마음에 안 들어요', value: 'bad_output' },
      { label: '단계별로 시키는 법을 모르겠어요', value: 'no_steps' },
    ],
  },
  {
    id: 'output',
    question: '어떤 결과물이 필요하나요?',
    options: [
      { label: '글 초안', value: 'draft' },
      { label: '제목/아이디어', value: 'idea' },
      { label: '기획서', value: 'plan' },
      { label: '체크리스트', value: 'checklist' },
      { label: '보고서', value: 'report' },
      { label: '코드/개발 지시문', value: 'code' },
      { label: '판매 문구', value: 'copy' },
      { label: '실행 계획', value: 'action' },
    ],
  },
  {
    id: 'ai_tool',
    question: '어떤 AI를 사용할 건가요?',
    options: [
      { label: 'ChatGPT', value: 'chatgpt' },
      { label: 'Claude', value: 'claude' },
      { label: 'Gemini', value: 'gemini' },
      { label: 'Codex', value: 'codex' },
      { label: 'Claude Code', value: 'claude_code' },
      { label: '잘 모르겠어요', value: 'unknown' },
    ],
  },
  {
    id: 'style',
    question: '원하는 스타일은?',
    options: [
      { label: '쉽고 친절하게', value: 'friendly' },
      { label: '전문가처럼', value: 'professional' },
      { label: '짧고 명확하게', value: 'concise' },
      { label: '상세하고 깊게', value: 'detailed' },
      { label: '실행 중심으로', value: 'action_focused' },
      { label: '보고서처럼', value: 'report_style' },
      { label: '블로그 글처럼', value: 'blog_style' },
    ],
  },
]
