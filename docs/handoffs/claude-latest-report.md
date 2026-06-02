# Claude Code 최신 보고

갱신: 2026-06-02 / Claude Code (유료 구매 전 정보 수집 + 운영자 발송 구조)

---

## 현재 저장소 확인 결과

| 항목 | 값 |
|------|---|
| 브랜치 | `main` |
| 최신 커밋 | `c7de7c8` `assets: publish sample pack download pdf` |
| 미커밋 변경 | 아래 파일 목록 참조 |

---

## 현재 단계

**유료 구매 흐름 운영 안전성 보완 최종 완료. 커밋 승인 대기 중.**

---

## 이번 세션에서 완료한 것

### 최종 추가 수정 (운영 누락 방지)

| 수정 항목 | 파일 | 내용 |
|----------|------|------|
| ADMIN_NOTIFY_EMAIL 미설정 차단 | `app/api/purchase-intent/route.ts` | 미설정 시 `503 notify_not_configured` 반환 (기존: success) |
| PrePaymentForm 503 처리 통일 | `components/purchase/PrePaymentForm.tsx` | 503 전체를 `not_configured` 상태로 처리 |
| 자료 링크 없으면 발송 차단 | `app/api/internal/send-pack/route.ts` | URL 하나도 없으면 `503 pack_assets_not_configured` |
| 운영 화면 assets 오류 메시지 | `app/internal/send-pack/page.tsx` | "해당 상품의 발송 링크가 아직 설정되지 않았어요" |

**purchase-intent 성공 조건 최종 정리:**

| 상황 | 결과 |
|------|------|
| `ADMIN_NOTIFY_EMAIL` 미설정 | `503 notify_not_configured` → PrePaymentForm: not_configured UI |
| `ADMIN_NOTIFY_EMAIL` 설정 + `MAIL_PROVIDER` 미설정 | `503 mail_not_configured` → not_configured UI |
| `ADMIN_NOTIFY_EMAIL` 설정 + 발송 실패 | `500 notify_failed` → error UI |
| 정상 발송 | `200 success` → ready UI (결제 버튼 표시) |

**internal/send-pack 발송 가능 조건:**

| 조건 | 결과 |
|------|------|
| 자료 URL 하나도 없음 | `503 pack_assets_not_configured` → 운영 화면 경고 메시지 |
| `MAIL_PROVIDER` 미설정 | `503 mail_not_configured` → 운영 화면 경고 메시지 |
| 정상 발송 | `200 success` |

---

### 이전 추가 수정 (가격 정정 + 안전성 보완)

| 수정 항목 | 파일 | 내용 |
|----------|------|------|
| 스타터팩 가격 | `app/starter-pack/page.tsx` | `9,900원` → `24,900원` (3곳 전체) |
| FAQ 문구 | `app/starter-pack/page.tsx` | "결제 시 이메일 주소를 정확히 입력해주세요" → "AI시킴에서 입력한 이메일로 발송돼요" |
| 연락처 필수화 | `PrePaymentForm.tsx` | phone 클라이언트·서버 필수 검증 추가 |
| 관리자 알림 실패 처리 | `app/api/purchase-intent/route.ts` | 발송 실패 시 503/500 반환 |

---

### 구매 전 전체 흐름

```
[구매자]
유료 페이지 → PrePaymentForm 입력(이름·이메일·연락처·동의)
→ POST /api/purchase-intent (Vercel 로그 + 관리자 알림)
→ 결제 페이지로 이동 버튼 표시 → 나이스체크아웃 새탭 오픈
→ 결제 완료

[운영자]
관리자 알림 이메일 확인 → 결제 확인
→ /internal/send-pack 접속 (INTERNAL_ACCESS_KEY 입력)
→ 상품 선택 + 구매자 이메일 입력 → 발송
→ 구매자에게 자료 이메일 발송
```

### 신규 파일

| 파일 | 역할 |
|------|------|
| `components/purchase/PrePaymentForm.tsx` | 구매 전 연락처 수집 폼 (이름·이메일·연락처·동의 → 결제 이동) |
| `app/api/purchase-intent/route.ts` | 구매 의향 기록 API (로그 + 관리자 알림) |
| `app/api/internal/send-pack/route.ts` | 운영자 발송 API (INTERNAL_ACCESS_KEY 보호) |
| `app/internal/send-pack/page.tsx` | 운영자 발송 UI 화면 |

### 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `app/focused-pack/dev/page.tsx` | CTA 섹션 → PrePaymentForm(dev) 교체 |
| `app/focused-pack/work/page.tsx` | CTA 섹션 → PrePaymentForm(work) 교체 |
| `app/focused-pack/blog/page.tsx` | CTA 섹션 → PrePaymentForm(blog) 교체 |
| `app/starter-pack/page.tsx` | CTA 섹션 → PrePaymentForm(starter_bundle) 교체 |
| `lib/mail-templates.ts` | purchaseIntentAdminHtml() 함수 추가 |
| `env.example` | INTERNAL_ACCESS_KEY 항목 추가 |

### 보안

| 항목 | 방식 |
|------|------|
| `/internal/send-pack` API | `INTERNAL_ACCESS_KEY` env var vs 요청 body의 `accessKey` 비교 |
| `/api/purchase-intent` | 이메일 정규식 + 동의 서버 검증 |

### 빌드 확인

| 검사 | 결과 |
|------|------|
| `npx tsc --noEmit` | PASS |
| `next build` | 성공 |
| 신규 라우트 | `/api/internal/send-pack`, `/api/purchase-intent`, `/internal/send-pack` 생성 확인 |

---

## 변경 파일 목록

```
 M app/focused-pack/blog/page.tsx
 M app/focused-pack/dev/page.tsx
 M app/focused-pack/work/page.tsx
 M app/starter-pack/page.tsx
 M env.example
 M lib/mail-templates.ts
?? app/api/internal/send-pack/route.ts
?? app/api/purchase-intent/route.ts
?? app/internal/send-pack/page.tsx
?? components/purchase/PrePaymentForm.tsx
```

---

## 활성화에 필요한 것

| 기능 | 필요한 env var |
|------|--------------|
| 운영자 발송 화면 인증 | `INTERNAL_ACCESS_KEY=<비밀키>` |
| 구매 의향 관리자 알림 | `ADMIN_NOTIFY_EMAIL` + `MAIL_PROVIDER=resend` + `RESEND_API_KEY` |
| 유료팩 자료 발송 | `DEV/WORK/BLOG_PACK_PDF_URL` + `_NOTION_URL` |
| 번들 자료 발송 | `STARTER_BUNDLE_PDF_URL` + `_NOTION_URL` + `_GUIDE_URL` |

---

## 아직 미완료인 것

| 항목 | 긴급도 |
|------|--------|
| 이번 변경 커밋 승인 | 높음 |
| Vercel env 설정 (INTERNAL_ACCESS_KEY 등) | 높음 |
| 집중팩 3종 실물 콘텐츠 (PDF/Notion) 링크 env 설정 | 높음 |
| 샘플팩 자료 링크 env 설정 | 높음 |
| OG 이미지 제작 | 중간 |

---

## 다음 단계 제안

1. 커밋 승인 → `feat: add pre-payment form and internal send panel`
2. Vercel 대시보드 + `.env.local`에 `INTERNAL_ACCESS_KEY` 설정
3. 각 팩 PDF/Notion URL env 설정
4. `/internal/send-pack` 접속 테스트
