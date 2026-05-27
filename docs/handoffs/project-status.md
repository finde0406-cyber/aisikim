# AI시킴 프로젝트 상태

갱신: 2026-05-27 / Claude Code (집중팩 포지셔닝 정합 + 운영 문구 정정 완료)

---

## 현재 단계

**홈 보강 + 전략 정합성 수정 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `cc0bd51` | docs: add sellable focused pack deliverables | 2026-05-27 |
| `856c6da` | ux: make sample pack signup state honest | 2026-05-25 |
| `8fc733b` | docs: add content quality and email delivery standards | 2026-05-25 |
| `4425d43` | ux: simplify ai tool options and differentiate home CTAs | 2026-05-25 |
| `32d6fae` | ux: improve conversion flow for result and starter pack | 2026-05-25 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  app/page.tsx
  components/home/Footer.tsx
  components/home/HeroSection.tsx
  components/home/PackPreviewSection.tsx
  components/home/ProblemSection.tsx

untracked (미커밋):
  components/home/SamplePreviewSection.tsx
  components/home/StarterPackFlowSection.tsx
```

---

## 완료된 것

- Sprint 0~6: 모두 커밋 완료
- 이메일 신청 가짜 성공 상태 제거: `856c6da`
- AI 선택지 단순화 + 홈 CTA 구조 압축: `4425d43`
- **메인 페이지 전환 설득력 보강 (미커밋):**
  - Hero CTA: "무료 작업지시서 만들기 →"
  - Problem: "AI도 별거 없네 하고 꺼버린다" 추가
  - SamplePreviewSection 신규: 실제 작업지시서 형태 미리보기
  - StarterPackFlowSection 신규: 4단계 완성 흐름 설명
  - PackPreviewSection: 유료 카드 세부 항목 추가
  - Footer: 제공 방식·환불·문의 안내 추가
- **판매 전략 정합성 + 운영 문구 정정 (미커밋):**
  - StarterPackFlowSection 라벨: "스타터팩 구성" → "집중팩 구성"
  - StarterPackFlowSection 하단 문구: 집중팩 중심으로 교체
  - PackPreviewSection 유료 카드: "카테고리 집중팩" 3종 표시, 스타터팩은 번들 블록으로 격하
  - Footer: 미확정 발송 일정 단정 문구 제거 → 위임형 안내로 교체

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 홈 보강 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 결제 채널 확정 + `.env.local` 설정 | 높음 | `NEXT_PUBLIC_PAYMENT_URL` 값 필요 |
| Tally 폼 생성 + `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정 | 높음 | 이메일 수집 미작동 |
| 샘플팩 5개 콘텐츠 실물 | 높음 | 발송 자료 없음 |
| 집중팩 3종 상세 페이지 + 실물 콘텐츠 | 높음 | 앱/웹사이트 개발 집중팩 1순위 |
| 스타터팩 50개 콘텐츠 실물 | 높음 | 결제 연결 전 필요 |
| 개인정보 처리방침·이용약관 페이지 | 중간 | Footer 링크 목적지 없음 |
| Vercel 프로젝트 생성 | 낮음 | Sprint 7 전 필요 |
| 도메인 확보 | 낮음 | Sprint 7 전 가능 |

---

## 다음 단계

1. 커밋 승인 → `ux: align home with focused-pack strategy and fix unconfirmed ops copy`
2. 집중팩 상세 페이지 제작 (1순위: 앱/웹사이트 개발 집중팩)
3. Tally 폼 생성 → `.env.local`에 `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정
4. 결제 채널 확정 → `.env.local`에 `NEXT_PUBLIC_PAYMENT_URL` 설정
5. Sprint 7: Vercel 배포

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. 기준 문서: `docs/conversion-copy-principles-v1.md`, `docs/customer-product-architecture-v1.md`
