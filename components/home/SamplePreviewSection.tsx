// 작업지시서 결과물 미리보기 섹션 — 무료 생성 결과의 실제 형태 예시

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
          이런 형태의 작업지시서가 만들어집니다
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] font-medium text-gray-400 mb-3">
            예시 · 블로그 글 초안 · 시작 막힘 · ChatGPT · 쉽고 친절하게
          </p>
          <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
            {SAMPLE_TEXT}
          </p>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          선택한 5가지 값이 모두 반영된 맞춤형 작업지시서
        </p>
      </div>
    </section>
  )
}
