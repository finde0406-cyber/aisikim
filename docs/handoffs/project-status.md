# AI시킴 프로젝트 상태

갱신: 2026-06-01 / Claude Code (히어로 섹션 선택형 미리보기 구조 개편)

---

## 현재 단계

**히어로 구조 개편 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `47e5431` | fix: regenerate favicon.ico with RGBA PNG layers | 2026-05-30 |
| `3760768` | brand: replace favicon.ico with correct aisikim logo | 2026-05-30 |
| `8cd24cf` | meta: add favicon manifest OG and viewport metadata | 2026-05-30 |
| `e896eae` | brand: resize favicon icons to proper dimensions | 2026-05-30 |
| `b06f5d8` | brand: add aisikim favicon | 2026-05-30 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  components/home/HeroSection.tsx
```

---

## 완료된 것 (커밋 기준)

- 파비콘/메타데이터 보강 및 배포: `47e5431` 커밋 + Vercel 배포 완료
- GitHub 저장소 Public 전환 (Vercel Hobby 호환)
- **히어로 구조 개편 (미커밋):**
  - 텍스트 소개형 → 선택형 미리보기형
  - 모바일: 카피+CTA → 선택 데모 블록 (세로 배치)
  - 데스크톱 sm+: 좌(카피+CTA) | 우(선택 데모) 2열 그리드
  - 선택 칩 3행 + 결과 프리뷰 스니펫

---

## 완료 확인된 항목

| 항목 | 상태 |
|------|------|
| 개인정보 처리방침 페이지 | `app/legal/privacy/page.tsx` 존재 |
| 이용약관 페이지 | `app/legal/terms/page.tsx` 존재 |
| 샘플팩 5개 콘텐츠 실물 | `deliverables/sample-pack/` PDF + Notion 완비 |
| 파비콘 | 올바른 AI시킴 로고 배포 완료 |
| 집중팩 3종 상세 페이지 | `app/focused-pack/dev|work|blog/page.tsx` 커밋 완료 |

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 히어로 개편 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 집중팩 3종 실물 콘텐츠 (PDF/Notion) | 높음 | 상세 페이지는 완성, 발송용 파일 미제작 |
| 집중팩 결제 URL 설정 | 높음 | DEV/WORK/BLOG_PACK_URL |
| `NEXT_PUBLIC_PAYMENT_URL` | 높음 | 스타터팩 결제 |
| `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` | 높음 | 이메일 수집 |
| OG 이미지 제작 | 중간 | SNS 공유 썸네일 |

---

## 다음 단계

1. 커밋 승인 → `ux: redesign hero as selection-preview layout`
2. 집중팩 3종 실물 콘텐츠 제작
3. 결제 채널 + Tally 폼 설정

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
