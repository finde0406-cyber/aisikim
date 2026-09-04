// 작업지시서 결과물 미리보기 섹션 — 선택→결과 연결 시각화

const SAMPLE_TAGS = [
  '앱·웹 개발',
  '시작이 막힘',
  'MVP 범위',
  'Claude Code',
  '단계별로',
]

const SAMPLE_TEXT = `## 작업 상황
앱을 만들어보고 싶은데
아직 아이디어만 있고 범위는 못 정했습니다.

## 막힌 부분과 요청
어떤 기능부터 만들어야 할지 모르겠습니다.
먼저 필요한 것들을 물어봐 주세요. 제 상황에
맞는 시작점을 같이 잡아주시면 좋겠습니다.

## 원하는 결과물
유형: MVP 기능 목록 (Claude Code에 바로 붙여 쓸 수 있는 형태)
핵심 기능 3개와 우선순위를 먼저 잡아주고,
구현 순서까지 정리해주세요.

## 답변 방식
쉽고 친절하게 안내해 주세요 ...

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 만들고 싶은 서비스와 사용자
- 1~2주 안에 완성 가능한 범위인지
- 기술 스택 제약이 있는지 ...`

export default function SamplePreviewSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-8 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-2 text-center uppercase tracking-wide">
          미리보기
        </p>
        <h2 className="text-base font-bold text-gray-900 mb-4 text-center">
          선택만 하면 이런 작업지시서가 나와요
        </h2>

        {/* 선택 태그 */}
        <div className="flex flex-wrap gap-1.5 mb-2 justify-center">
          {SAMPLE_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-medium border border-indigo-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-300 text-center mb-3">↓</p>

        {/* 작업지시서 미리보기 박스 */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4">
            <p className="text-[10px] font-medium text-gray-400 mb-3">
              생성된 작업지시서
            </p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
              {SAMPLE_TEXT}
            </p>
          </div>
          {/* 복사 바 — 사용 방식 시각화 */}
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center justify-between">
            <p className="text-[10px] text-gray-400">Claude Code · Codex · ChatGPT 어디서든 동일하게 작동</p>
            <span className="text-xs font-semibold text-indigo-600">복사하기 →</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          선택한 5가지 값이 모두 반영된 맞춤형 작업지시서예요
        </p>
      </div>
    </section>
  )
}
