# AI시킴 프로젝트 상태

갱신: 2026-06-02 / Claude Code (유료 구매 전 정보 수집 + 운영자 발송 구조)

---

## 현재 단계

**유료 구매 흐름 운영 안전성 최종 보완 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `c7de7c8` | assets: publish sample pack download pdf | 2026-06-01 |
| `1b987c4` | feat: add internal sample pack intake and mail flow | 2026-06-01 |
| `f72d4a6` | ux: align hero with mobile-first layout | 2026-06-01 |
| `d0c4b03` | ux: redesign hero as selection-preview layout | 2026-06-01 |
| `47e5431` | fix: regenerate favicon.ico with RGBA PNG layers | 2026-05-30 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  app/focused-pack/blog/page.tsx
  app/focused-pack/dev/page.tsx
  app/focused-pack/work/page.tsx
  app/starter-pack/page.tsx
  env.example
  lib/mail-templates.ts

untracked (미커밋):
  app/api/internal/send-pack/route.ts
  app/api/purchase-intent/route.ts
  app/internal/send-pack/page.tsx
  components/purchase/PrePaymentForm.tsx
```

---

## 완료된 것 (커밋 기준)

- 파비콘/메타데이터 보강 + Vercel 배포: 완료
- 히어로 섹션 선택형 미리보기 개편: `d0c4b03`, `f72d4a6`
- 샘플팩 내부 API 신청 구조 (mailer, templates, API): `1b987c4`
- 샘플팩 PDF 발행: `c7de7c8`
- **유료 구매 흐름 (미커밋):**
  - `PrePaymentForm`: 구매 전 이름·이메일·연락처·동의 수집
  - `/api/purchase-intent`: 의향 기록 + 관리자 알림
  - `/internal/send-pack`: 운영자 1클릭 발송 화면 + API

---

## 완료 확인된 항목

| 항목 | 상태 |
|------|------|
| 개인정보 처리방침 페이지 | 존재 |
| 이용약관 페이지 | 존재 |
| 샘플팩 5개 콘텐츠 실물 | PDF + Notion 완비, 배포됨 |
| 파비콘 | 올바른 로고 배포 완료 |
| 집중팩 3종 상세 페이지 | 커밋 완료 |
| 히어로 섹션 개편 | 커밋 완료 |
| 샘플팩 신청 내부 API | 커밋 완료 |
| MAIL_PROVIDER + RESEND_API_KEY | 설정 완료 (샘플팩 발송 동작 확인) |
| ADMIN_NOTIFY_EMAIL | 설정 완료 |

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 이번 변경 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| INTERNAL_ACCESS_KEY Vercel 설정 | 높음 | 운영자 발송 화면 인증 |
| 집중팩 3종 + 번들 자료 링크 env 설정 | 높음 | DEV/WORK/BLOG_PACK_PDF_URL 등 |
| OG 이미지 제작 | 중간 | SNS 썸네일 없음 |

---

## 다음 단계

1. 커밋 승인 → `feat: add pre-payment form and internal send panel`
2. `.env.local` + Vercel 대시보드에 env 설정
3. `/internal/send-pack` 접속 + 발송 테스트
4. 집중팩 실물 콘텐츠 링크 env 설정

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5`
2. 이 파일 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. `env.example` — 필요한 env var 목록 확인
