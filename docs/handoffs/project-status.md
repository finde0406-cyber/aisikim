# AI시킴 프로젝트 상태

갱신: 2026-06-01 / Claude Code (샘플팩 신청 구조 안전성 보완)

---

## 현재 단계

**내부 신청/발송 구조 안전성 보완 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `f72d4a6` | ux: align hero with mobile-first layout | 2026-06-01 |
| `d0c4b03` | ux: redesign hero as selection-preview layout | 2026-06-01 |
| `47e5431` | fix: regenerate favicon.ico with RGBA PNG layers | 2026-05-30 |
| `3760768` | brand: replace favicon.ico with correct aisikim logo | 2026-05-30 |
| `8cd24cf` | meta: add favicon manifest OG and viewport metadata | 2026-05-30 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  app/result/page.tsx
  components/email/EmailForm.tsx

untracked (미커밋):
  app/api/sample-pack/route.ts
  app/api/payment-webhook/route.ts
  lib/mailer.ts
  lib/mail-templates.ts
  env.example
```

---

## 완료된 것 (커밋 기준)

- 파비콘/메타데이터 보강 + Vercel 배포: `47e5431` 이후 커밋들
- GitHub 저장소 Public 전환 (Vercel Hobby 호환)
- 히어로 섹션 선택형 미리보기 개편: `d0c4b03`, `f72d4a6` 커밋
- **내부 신청/발송 구조 (미커밋):**
  - Tally 제거 → 내부 API 직접 연결
  - `lib/mailer.ts`: provider-agnostic, mock 모드 명확 분리
  - `lib/mail-templates.ts`: 샘플팩·유료팩·관리자 HTML 템플릿
  - `app/api/sample-pack/route.ts`: agreed 서버 검증, mock 503 처리
  - `app/api/payment-webhook/route.ts`: 결제 완료 웹훅 핸들러
  - `EmailForm.tsx`: agreed 전송, not_configured = 신청 불가 상태 UI (접수 아님)

---

## 완료 확인된 항목

| 항목 | 상태 |
|------|------|
| 개인정보 처리방침 페이지 | `app/legal/privacy/page.tsx` 존재 |
| 이용약관 페이지 | `app/legal/terms/page.tsx` 존재 |
| 샘플팩 5개 콘텐츠 실물 | `deliverables/sample-pack/` PDF + Notion 완비 |
| 파비콘 | 올바른 AI시킴 로고 배포 완료 |
| 집중팩 3종 상세 페이지 | `app/focused-pack/dev|work|blog/page.tsx` 커밋 완료 |
| 히어로 섹션 개편 | `f72d4a6` 커밋 완료 |

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 이번 변경 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| `MAIL_PROVIDER` + `RESEND_API_KEY` env 설정 | 높음 | 설정 전까지 not_configured 상태 |
| 샘플팩 자료 링크 env 설정 | 높음 | `SAMPLE_PACK_PDF_URL`, `_NOTION_URL` |
| 집중팩 3종 실물 콘텐츠 (PDF/Notion) 제작 | 높음 | 상세 페이지 완성, 발송용 파일 미제작 |
| 결제 provider 연결 + 웹훅 등록 | 높음 | `PAYMENT_WEBHOOK_SECRET` |
| OG 이미지 제작 | 중간 | SNS 공유 썸네일 없음 |
| Vercel env 설정 (배포 반영) | 높음 | 로컬 `.env.local` 외 Vercel 대시보드 설정 필요 |

---

## 다음 단계

1. 커밋 승인 → `feat: replace tally with internal api and mail delivery structure`
2. `.env.local` + Vercel 대시보드에 `MAIL_PROVIDER=resend`, `RESEND_API_KEY`, `MAIL_FROM` 설정
3. 샘플팩 자료 링크 URL env 설정 후 실제 발송 테스트
4. 집중팩 실물 콘텐츠 제작
5. 결제 provider 선택 + 웹훅 URL 등록

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. `env.example` 에서 필요한 환경변수 목록 확인
