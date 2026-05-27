# Claude Code 최신 보고

갱신: 2026-05-27 / Claude Code (홈 카피 2차 미세 수정 — HowItWorks + CategoryPreview 톤 통일)

---

## 현재 저장소 확인 결과

| 항목 | 값 |
|------|---|
| 브랜치 | `main` |
| 최신 커밋 | `cc0bd51` `docs: add sellable focused pack deliverables` |
| 미커밋 변경 | 아래 파일 목록 참조 |

---

## 현재 단계

**홈 카피 전체 `-요`체 통일 + CTA 일관성 정리 완료. 커밋 승인 대기 중.**

---

## 이번 세션에서 완료한 것

### 1차 카피 수정 (이전 세션)
- 전체 고객-facing 카피 `-다/-습니다` → `-요`체 통일 (6개 파일)
- `분야별 순차 출시 예정` 제거 → `필요한 분야만 선택해 바로 활용할 수 있어요`

### 2차 카피 수정 (이번 세션)

#### `HowItWorksSection.tsx`
- Step 1 desc: `선택지에서 고릅니다.` → `골라요.`
- Step 2 desc: `작업지시서가 만들어집니다.` → `만들어져요.`
- Step 3 desc: `복사하면 끝입니다.` → `복사하면 돼요.`

#### `CategoryPreviewSection.tsx`
- CTA 링크: `내 작업 분야로 진단하기 →` → `내 작업지시서 만들기 →`
- 근거: 홈 전체 방향이 `무료 작업지시서 만들기`로 통일되어 있어 `진단`이 톤과 맞지 않음

#### `FinalCTASection.tsx`
- 변경 없음 — 이미 `-세요`체로 일관성 있음

TypeScript 타입 검사 통과 (`npx tsc --noEmit` — 출력 없음).

---

## 변경 파일 목록

```
 M components/home/CategoryPreviewSection.tsx
 M components/home/Footer.tsx
 M components/home/HeroSection.tsx
 M components/home/HowItWorksSection.tsx
 M components/home/PackPreviewSection.tsx
 M components/home/ProblemSection.tsx
 M components/home/SamplePreviewSection.tsx
 M components/home/StarterPackFlowSection.tsx
```

---

## 아직 미완료인 것

| 항목 | 긴급도 |
|------|--------|
| 이번 변경 커밋 승인 | 높음 |
| 집중팩 3종 상세 페이지 및 실물 콘텐츠 제작 | 높음 |
| 결제 채널 확정 + `.env.local` 설정 | 높음 |
| Tally 폼 생성 + `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정 | 높음 |
| 샘플팩 5개 콘텐츠 실물 | 높음 |
| 개인정보 처리방침·이용약관 페이지 | 중간 |
| Vercel 프로젝트 생성 | 낮음 |
| 도메인 확보 | 낮음 |

---

## 다음 단계 제안

1. 커밋 승인 → `copy: unify home tone to -요 form and align CTAs`
2. 집중팩 상세 페이지 제작 (1순위: 앱/웹사이트 개발 집중팩)
3. Tally 폼 생성 → `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정
4. 결제 채널 확정 → `NEXT_PUBLIC_PAYMENT_URL` 설정
5. Sprint 7: Vercel 배포
