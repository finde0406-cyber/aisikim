# AI시킴 프로젝트 상태

갱신: 2026-05-30 / Claude Code (파비콘/아이콘/메타데이터 보강)

---

## 현재 단계

**메타데이터 보강 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `b06f5d8` | brand: add aisikim favicon | 2026-05-30 |
| `cce1556` | ux: add category-aware result conversion and focused pack pages | 2026-05-29 |
| `5f87bc5` | docs: define focused pack quality and category-aware conversion | 2026-05-27 |
| `65ccfc5` | ux: rebuild home for beginner conversion flow | 2026-05-27 |
| `e0b2852` | copy: remove internal status from starter pack page | 2026-05-27 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  app/layout.tsx

untracked (미커밋):
  app/apple-icon.png
  app/manifest.ts
  public/icon-192.png
  public/icon-512.png
```

---

## 완료된 것 (커밋 기준)

- Sprint 0~6 이후 UX/카피 개선 모두 커밋 완료
- 파비콘(`app/icon.png`, `app/favicon.ico`) 추가: `b06f5d8`
- **메타데이터 보강 (미커밋):**
  - `app/layout.tsx`: viewport(themeColor), metadataBase, OG, twitter, appleWebApp 추가
  - `app/manifest.ts`: `/manifest.webmanifest` 자동 서빙 (PWA 홈 화면 지원)
  - `app/apple-icon.png`: iOS 홈 화면 아이콘 (`<link rel="apple-touch-icon">`)
  - `public/icon-192.png`, `public/icon-512.png`: 매니페스트 아이콘

빌드 검증: `next build` 성공. `/apple-icon.png`, `/manifest.webmanifest` 라우트 생성 확인.

---

## 완료 확인된 항목

| 항목 | 상태 |
|------|------|
| 개인정보 처리방침 페이지 | `app/legal/privacy/page.tsx` 존재 |
| 이용약관 페이지 | `app/legal/terms/page.tsx` 존재 |
| 샘플팩 5개 콘텐츠 실물 | `deliverables/sample-pack/` PDF + Notion 완비 |
| favicon.ico | `app/favicon.ico` 존재 |
| icon.png | `app/icon.png` 존재 |

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 이번 변경 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 집중팩 3종 실물 콘텐츠 (PDF/Notion) | 높음 | 상세 페이지 완성됨 |
| 집중팩 결제 URL `.env.local` 설정 | 높음 | DEV/WORK/BLOG_PACK_URL 필요 |
| `NEXT_PUBLIC_PAYMENT_URL` 설정 | 높음 | 스타터팩 결제 |
| `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정 | 높음 | 이메일 수집 미작동 |
| OG 이미지 제작 | 중간 | SNS 공유 썸네일 없음 |
| icon-192/512 적정 해상도 PNG 교체 | 중간 | 현재 원본 복사본 |
| Vercel 프로젝트 생성 | 낮음 | Sprint 7 |
| 도메인 확보 | 낮음 | Sprint 7 |

---

## 다음 단계

1. 커밋 승인 → `meta: add favicon, manifest, OG and viewport metadata`
2. Vercel 배포 설정
3. 집중팩 실물 콘텐츠 제작

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
