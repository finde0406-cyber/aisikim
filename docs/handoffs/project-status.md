# AI시킴 프로젝트 상태

갱신: 2026-05-25 / Claude Code (Sprint 6 외부 결제 링크 연결 완료)

---

## 현재 단계

**Sprint 6 구현 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `971ae9e` | feat: implement Sprint 5 starter pack detail page | 2026-05-25 |
| `7695bbe` | feat: implement Sprint 4 email collection UI | 2026-05-25 |
| `aa1eec8` | feat: implement Sprint 3 result page | 2026-05-25 |
| `eb07acc` | feat: implement Sprint 2 quiz flow | 2026-05-25 |
| `703b0a4` | feat: implement Sprint 1 landing page | 2026-05-25 |

---

## 현재 Git 상태

```
브랜치: main
원격: origin/main (https://github.com/finde0406-cyber/aisikim.git)
원격 동기화: 971ae9e까지 push 완료

modified (미커밋):
  app/starter-pack/page.tsx
  docs/handoffs/claude-latest-report.md
  docs/handoffs/project-status.md
```

---

## 현재 기준 문서

- `docs/aisikim-prd-v1.md`
- `docs/aisikim-business-plan-v1.md`
- `docs/mvp-roadmap.md`
- `docs/user-flow.md`
- `docs/payment-strategy.md`
- `docs/product-pack-structure.md`
- `docs/email-funnel.md`
- `AGENTS.md`
- `CLAUDE.md`

---

## 완료된 것

- Sprint 0: 기준 문서 전체 커밋 완료
- Sprint 1: 랜딩페이지 — `703b0a4` 커밋됨
- Sprint 2: 선택형 진단 — `eb07acc` 커밋됨
- Sprint 3: 결과 페이지 — `aa1eec8` 커밋됨
- Sprint 4: 이메일 수집 UI — `7695bbe` 커밋됨
- Sprint 5: 스타터팩 상세 페이지 — `971ae9e` 커밋됨
- Sprint 6: 외부 결제 링크 연결 구현 완료 (미커밋)
  - `app/starter-pack/page.tsx` — `NEXT_PUBLIC_PAYMENT_URL` 기반 조건부 결제 CTA
  - 결제 URL 설정 시: 활성 구매 버튼 + 자료 수령 안내
  - 결제 URL 미설정 시: "준비 중" fallback 유지
  - FAQ 항목 3 동적화, 히어로 배지 조건부 처리

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| Sprint 6 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 결제 채널 확정 + `.env.local` 설정 | 높음 | `NEXT_PUBLIC_PAYMENT_URL` 값 필요 |
| Tally 폼 생성 + URL 설정 | 높음 | 이메일 수집 미작동 상태 |
| 샘플팩 5개 콘텐츠 실물 | 높음 | 발송할 자료 없음 |
| 스타터팩 50개 콘텐츠 실물 | 높음 | 결제 연결 전 필요 |
| 개인정보 처리방침·이용약관 초안 | 중간 | |
| Vercel 프로젝트 생성 | 낮음 | Sprint 7 전 필요 |
| 도메인 확보 | 낮음 | Sprint 7 전 가능 |

---

## 다음 단계

1. Sprint 6 커밋 승인 후 `feat: implement Sprint 6 payment link integration` 커밋
2. 결제 채널 1개 확정 → `.env.local`에 `NEXT_PUBLIC_PAYMENT_URL` 설정
3. 병렬: 콘텐츠 실물 준비 + Tally 폼 연동
4. Sprint 7: Vercel 배포

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. `docs/handoffs/codex-latest-review.md` 확인
5. 기준 문서 필요 시 `docs/aisikim-prd-v1.md` 확인
