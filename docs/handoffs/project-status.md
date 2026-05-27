# AI시킴 프로젝트 상태

갱신: 2026-05-27 / Claude Code (고객-facing 카피 보정 완료)

---

## 현재 단계

**고객-facing 카피 보정 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `f37110f` | ux: refine homepage copy tone and CTA consistency | 2026-05-27 |
| `fbb6035` | ux: strengthen homepage conversion and focused pack messaging | 2026-05-27 |
| `cc0bd51` | docs: add sellable focused pack deliverables | 2026-05-27 |
| `856c6da` | ux: make sample pack signup state honest | 2026-05-25 |
| `4425d43` | ux: simplify ai tool options and differentiate home CTAs | 2026-05-25 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  components/email/EmailForm.tsx
  components/home/ProblemSection.tsx
```

---

## 완료된 것

- Sprint 0~6: 모두 커밋 완료
- 홈 전환 설득력 보강 (SamplePreview, StarterPackFlow, 유료 카드 등): `fbb6035`
- 집중팩 포지셔닝 정합 + 운영 문구 정정: `fbb6035`
- 홈 카피 `-요`체 통일 + CTA 일관성 정리 (8개 파일): `f37110f`
- **고객-facing 카피 보정 (미커밋):**
  - `EmailForm.tsx`: `신청 연결 준비 중` 제거 → 완성된 서비스 소개 형태로 교체
  - `ProblemSection.tsx`: `자유 입력`, `선택 반응형` 기획 용어 제거 → 고객 언어로 변경

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 카피 보정 커밋 승인 | 높음 | 사용자 승인 후 진행 |
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

1. 커밋 승인 → `copy: remove internal status labels and replace jargon with plain language`
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
