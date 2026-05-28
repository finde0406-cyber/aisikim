# AI시킴 프로젝트 상태

갱신: 2026-05-27 / Claude Code (홈 UX 초보자 전환 재구성 + QuickGuide 모바일 개선)

---

## 현재 단계

**홈 UX 초보자 전환 재구성 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `e0b2852` | copy: remove internal status from starter pack page | 2026-05-27 |
| `52b4f02` | copy: shorten hero subtitle to two lines | 2026-05-27 |
| `5d84c44` | docs: add hero copy options and update prompt | 2026-05-27 |
| `aca8ce0` | ux: compress homepage and align result page conversion | 2026-05-27 |
| `638b1eb` | docs: add homepage and result flow ux guidance | 2026-05-27 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  app/page.tsx
  components/home/SamplePreviewSection.tsx
  docs/handoffs/claude-latest-report.md
  docs/handoffs/project-status.md

untracked (미커밋):
  components/home/QuickGuideSection.tsx
```

---

## 완료된 것 (커밋 기준)

- Sprint 0~6: 모두 커밋 완료
- 홈 카피 `-요`체 통일 + 집중팩 포지셔닝 정합: 커밋 완료
- 홈 압축 + 결과 페이지 유료 전환 구조 정합: `aca8ce0` 커밋
- 히어로 보조문구 2줄 축약: `52b4f02` 커밋
- 스타터팩/홈 내부 상태 문구 제거: `e0b2852` 커밋
- **홈 UX 초보자 전환 재구성 (미커밋):**
  - HowItWorks → QuickGuideSection 교체 (모바일 세로 스택 / sm 가로 3단)
  - SamplePreviewSection: 선택 태그 5개 + 복사 바 추가

---

## 완료 확인된 항목 (이전 보고 정정)

| 항목 | 상태 |
|------|------|
| 개인정보 처리방침 페이지 | `app/legal/privacy/page.tsx` 존재 |
| 이용약관 페이지 | `app/legal/terms/page.tsx` 존재 |
| 샘플팩 5개 콘텐츠 실물 | `deliverables/sample-pack/` 내 PDF + Notion 소스 완비 |

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 이번 변경 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 집중팩 3종 상세 페이지 + 실물 콘텐츠 | 높음 | result + home CTA 경로 교체 필요 |
| 결제 채널 확정 + `.env.local` 설정 | 높음 | `NEXT_PUBLIC_PAYMENT_URL` 값 필요 |
| Tally 폼 생성 + `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정 | 높음 | 이메일 수집 미작동 |
| 스타터팩 50개 콘텐츠 실물 | 높음 | 결제 연결 전 필요 |
| Vercel 프로젝트 생성 | 낮음 | Sprint 7 전 필요 |
| 도메인 확보 | 낮음 | Sprint 7 전 가능 |

---

## 다음 단계

1. 커밋 승인 → `ux: rebuild home for beginner conversion — quick guide and sample preview`
2. 집중팩 3종 상세 페이지 제작
3. Tally 폼 + 결제 채널 설정
4. Sprint 7: Vercel 배포

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. 기준 문서: `docs/conversion-copy-principles-v1.md`, `docs/customer-product-architecture-v1.md`
