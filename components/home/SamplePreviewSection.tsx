// 작업지시서 결과물 미리보기 섹션 — 선택→결과 연결 시각화

const SAMPLE_TAGS = [
  '블로그·콘텐츠',
  '시작이 막힘',
  '글 초안',
  'ChatGPT',
  '친절하게',
]

const SAMPLE_TEXT = `## 작업 상황
블로그 글 작업 중입니다.
글 초안 형태의 결과물을 만들어야 합니다.

## 막힌 부분과 요청
아직 어디서 시작해야 할지 모르겠습니다.
먼저 필요한 것들을 물어봐 주세요. 제 상황에
맞는 시작점을 같이 잡아주시면 좋겠습니다.

## 원하는 결과물
유형: 글 초안 (ChatGPT에 바로 붙여 쓸 수 있는 형태)
제목과 소제목을 먼저 잡아주고,
각 섹션의 본문을 채워주세요.

## 답변 방식
쉽고 친절하게 안내해 주세요 ...

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 주제나 키워드
- 이 글을 읽을 대상 독자
- 글의 목적 (정보 제공, 제품 소개 등) ...`

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
            <p className="text-[10px] text-gray-400">ChatGPT · Claude · Gemini에 바로 사용</p>
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
