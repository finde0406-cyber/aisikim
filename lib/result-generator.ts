// 결과 페이지 작업지시서 생성 유틸 - Sprint 3~

import { QUIZ_STEPS, type QuizAnswers } from './quiz-data'

// category별 작업 상황 서술
const CATEGORY_CONTEXT: Record<string, string> = {
  blog: '블로그나 콘텐츠 관련 글 작업을 하고 있습니다',
  work: '업무에서 문서나 보고서를 작성해야 하는 상황입니다',
  dev: '앱이나 웹사이트 개발 작업을 진행 중입니다',
}

// output별 결과물 명칭
const OUTPUT_TARGET: Record<string, string> = {
  draft: '글 초안',
  idea: '아이디어 목록',
  plan: '기획서',
  checklist: '체크리스트',
  report: '보고서',
  code: '코드 또는 개발 지시문',
  copy: '판매 문구',
  action: '실행 계획',
}

// output별 구체적 포맷 지시 (AI에게 어떻게 만들어달라는지)
const OUTPUT_FORMAT: Record<string, string> = {
  draft: '제목과 소제목을 먼저 잡아주고, 각 섹션의 본문을 채워주세요. 바로 발행하거나 제출할 수 있는 완성형으로 주세요.',
  idea: '방향이 서로 다른 3~5가지 선택지를 주세요. 각 아이디어에 한 줄 설명을 붙여주세요.',
  plan: '배경, 목적, 핵심 내용, 기대 효과 항목 구조로 작성해 주세요. 바로 제출할 수 있는 형태로 주세요.',
  checklist: '바로 실행할 수 있는 항목 단위로 나눠주세요. 각 항목은 구체적인 행동 동사로 시작하게 해주세요.',
  report: '목차를 먼저 제안한 뒤, 각 항목별 내용을 채워주세요. 수치나 근거가 필요한 자리는 명확히 표시해 주세요.',
  code: '기능 단위로 나눠서 바로 복사해 쓸 수 있는 완성형 코드를 주세요. 어떤 파일에 어떻게 넣으면 되는지도 함께 알려주세요.',
  copy: '타깃 독자에게 직접 말하는 방식으로 써주세요. 핵심 혜택 중심의 문구와 행동을 유도하는 마무리 문장을 포함해 주세요.',
  action: '오늘 당장 시작할 수 있는 항목부터 순서대로 정리해 주세요. 기간, 목표, 다음 행동이 보이는 구조로 주세요.',
}

// blocker별 상황 서술 + 어떤 도움이 필요한지 연결
const BLOCKER_REQUEST: Record<string, string> = {
  dont_know_start:
    '아직 어디서 시작해야 할지 모르겠습니다.\n바로 결과물을 만들기 전에, 먼저 필요한 것들을 물어봐 주세요. 제 상황에 맞는 시작점을 같이 잡아주시면 좋겠습니다.',
  boring_answer:
    'AI 답변이 너무 일반적으로 나와서 실제로 쓸 수 없었습니다.\n이번에는 막연한 안내 대신, 제 상황에 실제로 맞는 구체적인 내용으로 채워주세요.',
  cant_explain:
    '제 상황을 AI에게 어떻게 설명해야 할지 모르겠습니다.\n상황 파악에 필요한 질문을 먼저 해주세요. 그 답변을 바탕으로 결과물을 만들어 주세요.',
  bad_output:
    '이전에 시도한 결과물이 원하는 방향과 달랐습니다.\n더 구체적이고 완성도 높은 결과물이 나올 수 있도록 접근 방식부터 바꿔주세요.',
  no_steps:
    '어떤 순서로 AI에게 시켜야 할지 몰라서 막혀 있습니다.\n전체 작업을 단계로 나눠주고, 각 단계에서 무엇을 어떻게 요청하면 되는지 먼저 보여주세요.',
}

// style별 실제 지시 (라벨이 아니라 AI에게 어떻게 답하라는 지시)
const STYLE_INSTRUCTION: Record<string, string> = {
  friendly: '쉽고 친절하게 안내해 주세요. 처음 해보는 사람도 바로 이해할 수 있게 설명해 주세요.',
  professional: '전문가적인 어조로 작성해 주세요. 업무 현장에서 쓰이는 정확한 표현을 사용해 주세요.',
  concise: '핵심만 짧고 명확하게 주세요. 불필요한 설명 없이 바로 쓸 수 있는 내용만 주세요.',
  detailed: '각 항목을 상세하게 설명해 주세요. 이유와 예시를 함께 포함해 더 깊이 이해할 수 있게 해주세요.',
  action_focused: '이론보다 바로 실행할 수 있는 내용 중심으로 주세요. 구체적인 행동 단위로 알려주세요.',
  report_style: '보고서 형식으로 작성해 주세요. 번호 체계와 소제목 구조를 갖춰서 읽기 쉽게 해주세요.',
  blog_style: '블로그 글 형식으로 작성해 주세요. 자연스러운 흐름과 읽기 쉬운 소제목 구조로 써주세요.',
}

// ai_tool별 "어디에 붙여 쓸 형태" 맥락
const TOOL_HINT: Record<string, string> = {
  chatgpt: 'ChatGPT에 바로 붙여 넣어 쓸 수 있는 형태',
  claude: 'Claude에 바로 붙여 넣어 쓸 수 있는 형태',
  gemini: 'Gemini에 바로 붙여 넣어 쓸 수 있는 형태',
  codex: 'Codex에 바로 붙여 넣어 쓸 수 있는 형태',
  unknown: '어떤 AI에도 바로 붙여 쓸 수 있는 형태',
}

// output별 시작 전 확인 질문 (output 유형에 맞는 구체적 질문)
const OUTPUT_CONFIRM: Record<string, string> = {
  draft:
    '- 주제나 키워드 (어떤 내용을 쓸 것인지)\n- 이 글을 읽을 대상 독자\n- 글의 목적 (정보 제공, 제품 소개, 일상 기록 등)\n- 원하는 분량이나 섹션 구성',
  idea:
    '- 어떤 맥락에서 아이디어가 필요한지\n- 방향이 비슷한 참고 예시나 기준이 있는지\n- 원하는 개수나 방향의 범위',
  plan:
    '- 기획의 배경과 목적\n- 이 기획서를 누가 읽을 것인지\n- 반드시 포함해야 할 핵심 내용\n- 분량이나 형식 요건이 있는지',
  checklist:
    '- 어떤 작업이나 목표를 위한 체크리스트인지\n- 이미 알고 있는 항목이 있다면 무엇인지\n- 얼마나 세분화가 필요한지',
  report:
    '- 보고서의 목적 (현황, 제안, 분석 등)\n- 이 보고서를 누가 읽을 것인지\n- 반드시 포함해야 할 수치나 핵심 내용\n- 분량 또는 형식 요건',
  code:
    '- 만들려는 기능이나 화면\n- 사용하는 언어, 프레임워크, 환경\n- 이미 만들어진 부분이 있다면 어떤 상태인지\n- 어디서 막혀 있는지 구체적으로',
  copy:
    '- 어떤 상품, 서비스, 또는 아이디어를 알릴 것인지\n- 이 문구를 읽을 대상 독자\n- 가장 강조하고 싶은 혜택이나 특징\n- 어디에 쓸 문구인지 (SNS, 홈페이지, 광고 등)',
  action:
    '- 어떤 목표를 위한 실행 계획인지\n- 혼자 진행하는지, 팀과 함께하는지\n- 가능한 기간이나 마감이 있는지\n- 이미 시작한 부분이 있다면 현재 상태',
}

const STEP_LABELS: Record<string, string> = {
  category: '목적',
  blocker: '막힌 부분',
  output: '결과물',
  ai_tool: 'AI 도구',
  style: '스타일',
}

const AI_TOOL_LABEL: Record<string, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
  codex: 'Codex',
  unknown: 'AI',
}

export function generateInstruction(answers: QuizAnswers): string {
  const categoryCtx = CATEGORY_CONTEXT[answers.category ?? ''] ?? '현재 작업이 필요한 상황입니다'
  const outputTarget = OUTPUT_TARGET[answers.output ?? ''] ?? '결과물'
  const outputFormat = OUTPUT_FORMAT[answers.output ?? ''] ?? '명확하게 작성해 주세요.'
  const blockerReq = BLOCKER_REQUEST[answers.blocker ?? ''] ?? '진행 중에 막혀 있습니다.'
  const styleInst = STYLE_INSTRUCTION[answers.style ?? ''] ?? '명확하게 작성해 주세요.'
  const toolHint = TOOL_HINT[answers.ai_tool ?? ''] ?? '어떤 AI에도 바로 붙여 쓸 수 있는 형태'
  const confirmQs =
    OUTPUT_CONFIRM[answers.output ?? ''] ?? '- 작업의 목적과 범위\n- 원하는 결과물의 형태와 분량'

  return `## 작업 상황
${categoryCtx}. ${outputTarget} 형태의 결과물을 만들어야 합니다.

## 막힌 부분과 요청
${blockerReq}

## 원하는 결과물
유형: ${outputTarget} (${toolHint})
${outputFormat}

## 답변 방식
${styleInst}

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
${confirmQs}`
}

export function getAnswerSummary(
  answers: QuizAnswers
): { id: string; label: string; value: string }[] {
  const result: { id: string; label: string; value: string }[] = []
  for (const step of QUIZ_STEPS) {
    const selected = answers[step.id]
    const option = step.options.find(o => o.value === selected)
    if (!option) continue
    const value =
      step.id === 'ai_tool'
        ? (AI_TOOL_LABEL[selected ?? ''] ?? option.label)
        : option.label
    result.push({ id: step.id as string, label: STEP_LABELS[step.id] ?? step.id, value })
  }
  return result
}
