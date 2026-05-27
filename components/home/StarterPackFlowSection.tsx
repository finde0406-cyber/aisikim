// 집중팩 4단계 완성 흐름 소개 섹션

const FLOW_STEPS = [
  {
    step: '1',
    label: '첫 질문',
    desc: 'AI에게 작업의 목적과 방향을 정확히 전달하는 시작 질문',
  },
  {
    step: '2',
    label: '후속 질문',
    desc: '첫 답변을 더 구체적으로 발전시키는 질문',
  },
  {
    step: '3',
    label: '수정 요청',
    desc: '원하는 방향으로 결과물을 조정하는 지시',
  },
  {
    step: '4',
    label: '검수 질문',
    desc: '완성도를 높이는 마무리 검토 요청',
  },
]

export default function StarterPackFlowSection() {
  return (
    <section>
      <div className="px-4 py-8 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
          집중팩 구성
        </p>
        <h2 className="text-base font-bold text-gray-900 mb-1">
          한 번 묻고 끝나지 않아요.
        </h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          결과물을 완성하려면 후속 질문과<br />
          수정·검수 단계가 더 필요해요.
        </p>
        <div className="space-y-3 mb-5">
          {FLOW_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">
                {s.step}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          이 흐름 전체를 분야에 맞게 담은 집중팩으로 제공돼요.
        </p>
      </div>
    </section>
  )
}
