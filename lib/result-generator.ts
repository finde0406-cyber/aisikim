// 결과 페이지 작업지시서 생성 유틸 - Sprint 3~

import { QUIZ_STEPS, type QuizAnswers } from './quiz-data'

const CATEGORY_DESC: Record<string, string> = {
  blog: '블로그/콘텐츠',
  work: '업무/보고서',
  dev: '앱/웹사이트 개발',
}

const BLOCKER_SENTENCE: Record<string, string> = {
  dont_know_start: 'AI에게 무엇부터 물어봐야 할지 몰라서 시작 자체가 막혀 있습니다.',
  boring_answer: 'AI 답변이 너무 뻔하게 나와서 어떻게 다르게 시도해야 할지 막막합니다.',
  cant_explain: '제 상황을 AI에게 어떻게 설명해야 할지 모르는 상태입니다.',
  bad_output: '결과물이 원하는 방향과 달라서 다시 접근이 필요합니다.',
  no_steps: '단계별로 어떻게 시켜야 할지 몰라서 막혀 있습니다.',
}

const OUTPUT_LABEL: Record<string, string> = {
  draft: '글 초안',
  idea: '제목/아이디어',
  plan: '기획서',
  checklist: '체크리스트',
  report: '보고서',
  code: '코드/개발 지시문',
  copy: '판매 문구',
  action: '실행 계획',
}

const STYLE_DESC: Record<string, string> = {
  friendly: '쉽고 친절한 방식으로',
  professional: '전문가적인 어조로',
  concise: '짧고 명확하게',
  detailed: '상세하고 깊이 있게',
  action_focused: '실행 중심으로',
  report_style: '보고서 형식에 맞게',
  blog_style: '블로그 글 형식에 맞게',
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
  const category = CATEGORY_DESC[answers.category ?? ''] ?? '현재 작업'
  const blocker = BLOCKER_SENTENCE[answers.blocker ?? ''] ?? '진행 중에 막혀 있습니다.'
  const output = OUTPUT_LABEL[answers.output ?? ''] ?? '결과물'
  const tool = AI_TOOL_LABEL[answers.ai_tool ?? ''] ?? 'AI'
  const style = STYLE_DESC[answers.style ?? ''] ?? '명확하게'

  return `## 작업 배경
${category} 관련 작업 중입니다. 이 작업에서 ${output} 형태의 결과물이 필요합니다.

## 현재 막힌 부분
${blocker}

## 요청 사항
${output}를 만들 수 있도록 도와주세요.

## 작업 조건
- 사용 도구: ${tool}
- 스타일: ${style}
- 먼저 핵심 구조나 큰 틀을 제안해 주고, 이후 단계적으로 완성할 수 있게 안내해 주세요.

## 시작 전 확인사항
작업에 필요한 정보가 더 있다면 먼저 물어봐 주세요.
특히 결과물의 목적, 대상 독자, 원하는 분량, 세부 방향을 우선 확인해 주세요.`
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
