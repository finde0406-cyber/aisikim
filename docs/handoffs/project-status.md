# AI시킴 프로젝트 상태

갱신: 2026-05-30 / Claude Code (AI시킴 핵심 차별점 카피 보강)

---

## 현재 단계

**핵심 차별점 카피 보강 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `cce1556` | ux: add category-aware result conversion and focused pack pages | 2026-05-29 |
| `5f87bc5` | docs: define focused pack quality and category-aware conversion | 2026-05-27 |
| `65ccfc5` | ux: rebuild home for beginner conversion flow | 2026-05-27 |
| `e0b2852` | copy: remove internal status from starter pack page | 2026-05-27 |
| `52b4f02` | copy: shorten hero subtitle to two lines | 2026-05-27 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  components/home/ProblemSection.tsx
  app/result/page.tsx
  app/focused-pack/dev/page.tsx
  app/focused-pack/work/page.tsx
  app/focused-pack/blog/page.tsx
```

---

## 완료된 것 (커밋 기준)

- Sprint 0~6: 모두 커밋 완료
- 홈 UX 초보자 전환 재구성 (QuickGuide + SamplePreview 강화): `65ccfc5`
- 카테고리 분기 결과 페이지 + 집중팩 3종 상세 페이지: `cce1556`
- **핵심 차별점 카피 보강 (미커밋):**
  - ProblemSection: "한 번 묻고 끝나는 게 아니라 이어갈 수 있어요" 추가
  - 결과 페이지 훅: "한계 프레이밍" → "시작점 + 가능성 프레이밍"
  - 집중팩 3종: hero subtitle "담았어요" → "[막힌 상황], 선택만 하면 이어갈 수 있어요"
  - 집중팩 3종: 포함구성 h2 "흐름 전체" → "이 흐름을 따라가면 돼요"

---

## 완료 확인된 항목

| 항목 | 상태 |
|------|------|
| 개인정보 처리방침 페이지 | `app/legal/privacy/page.tsx` 존재 |
| 이용약관 페이지 | `app/legal/terms/page.tsx` 존재 |
| 샘플팩 5개 콘텐츠 실물 | `deliverables/sample-pack/` PDF + Notion 완비 |

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 이번 변경 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 집중팩 3종 실물 콘텐츠 (PDF/Notion) | 높음 | 상세 페이지 완성됨, 실물 미제작 |
| 집중팩 결제 URL 설정 | 높음 | `.env.local`에 DEV/WORK/BLOG_PACK_URL 필요 |
| 결제 채널 확정 + `NEXT_PUBLIC_PAYMENT_URL` | 높음 | 값 필요 |
| Tally 폼 + `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` | 높음 | 이메일 수집 미작동 |
| 스타터팩 50개 콘텐츠 실물 | 높음 | 결제 연결 전 필요 |
| Vercel 프로젝트 생성 | 낮음 | Sprint 7 전 필요 |
| 도메인 확보 | 낮음 | Sprint 7 전 가능 |

---

## 다음 단계

1. 커밋 승인 → `copy: sharpen ai-sikim differentiator — beginner access and iterative flow`
2. 집중팩 3종 실물 콘텐츠 제작
3. 결제 채널 + Tally 폼 설정
4. Sprint 7: Vercel 배포

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. 기준 문서: `docs/conversion-copy-principles-v1.md`, `docs/customer-product-architecture-v1.md`
