# AI시킴 프로젝트 상태

갱신: 2026-09-04 / Claude Code (홈 카피 — 개발팩 우선순위 반영 커밋·배포)

---

## 최신 업데이트 (2026-09-04)

홈페이지(Hero/Problem/Category/FinalCTA) 카피를 "앱·웹 개발 집중팩" 중심으로 재정렬해 커밋·푸시(자동 배포). 상세는 `claude-latest-report.md` 참고. **후속 필요**: `SamplePreviewSection`이 아직 "블로그·콘텐츠"를 대표 예시로 보여줘 위 섹션들과 어긋남 — 다음에 맞출 것. 배포 후 조회·구매 신호 며칠 지켜볼 것.

---

## 현재 단계

**✅ 실결제 1건으로 전 구간 검증 성공 (2026-07-31 15:58, 승인번호 18901505, 주문 aisikim-dev-20260731065601-bj7387 — 당일 자정 전 취소 필수).**
결제창 → 카드 인증 → 서버 승인 → signature 검증 → PDF 자동 발송 → 관리자 알림 → 완료 페이지 전부 정상.

트러블슈팅 기록: 최초 결제창에서 "가맹점 식별코드(clientId) 오류" — 원인은 PowerShell 파이프로 Vercel env 등록 시 값 앞에 BOM(﻿)이 붙은 것. Node spawnSync(input)로 8개 변수 재등록 + 재배포로 해결. 이후 env 등록은 반드시 BOM 없는 방식 사용.

2026-07-31 추가: 실결제 테스트 건 당일 매출취소 완료. 약관·개인정보처리방침 커밋됨(02651b6).

**나이스체크아웃 해지 (2026-07-31):** 사용자가 체크아웃 스토어 해지 신청 (나이스페이 결제창과 별개 서비스 확인). 이에 따라:
- Vercel·.env.local에서 옛 체크아웃 링크 env 4종 제거 (NEXT_PUBLIC_PAYMENT_URL, NEXT_PUBLIC_DEV/WORK/BLOG_PACK_URL)
- PrePaymentForm에서 paymentUrl prop·fallback 링크 분기 제거 — 나이스페이 단일 경로, 키 미설정 시 "구매 불가" 안내
- 4개 상품 페이지에서 paymentUrl 전달 제거, env.example 정리
- 미커밋 상태 — 커밋 승인 대기 (lint/build 통과)

---

## 결제 흐름 (구현 완료)

```
상품 페이지 → PrePaymentForm(이름·이메일·연락처·동의)
→ /api/purchase-intent (의향 기록 + 관리자 알림)
→ 나이스페이 결제창 (AUTHNICE.requestPay, 카드 단건)
→ /api/payments/nicepay/return (인증 signature → 금액 검증 → 승인 API → 승인 signature)
→ 구매자 PDF 자동 발송 + 관리자 알림
→ /purchase/complete (실패 시 /purchase/failed)
```

- `NEXT_PUBLIC_NICEPAY_CLIENT_KEY` 미설정 시 기존 나이스체크아웃 링크 방식으로 자동 fallback
- 발송 실패 시: 관리자에게 수동 발송 요청 메일 + 구매자에겐 지연 안내 (`/internal/send-pack` 백업 유지)

---

## 미커밋 변경 (이번 작업)

```
신규: lib/products.ts, lib/nicepay.ts, lib/pack-delivery.ts
신규: app/api/payments/nicepay/return/route.ts
신규: app/purchase/complete/page.tsx, app/purchase/failed/page.tsx
수정: components/purchase/PrePaymentForm.tsx, app/api/payment-webhook/route.ts, env.example
```

※ 이전 세션의 미커밋 변경(홈 컴포넌트, threads 관련, deliverables 등)도 워킹트리에 함께 남아 있음.

---

## 포스타트 답변 반영 (2026-07-31)

- 운영 상점에 테스트 키 없음 → **샌드박스 테스트 불가**
- 단건결제 카드사 심사·셋팅 완료 → **정식오픈 상태**
- 검증 방법: **운영 키로 실결제 1건 → 승인·자동 발송 확인 → 당일 자정 전 매출취소** (나이스페이 관리자 화면에서 취소)

## 운영 결제 전 최종 점검 결과 (2026-07-31)

코드: 상품명 "바이브코딩 웹서비스 출시 작업지시서팩" / 9,900원 — 페이지·결제창(goodsName)·서버 검증(lib/products.ts)·메일 모두 단일 출처로 일치. lint/tsc/build 통과.

환경변수(.env.local 기준, 값 미출력):

| 항목 | 상태 | 조치 |
|------|------|------|
| 나이스페이 클라이언트/시크릿 키 | 설정됨 | — |
| 메일 (RESEND, MAIL_FROM, ADMIN_NOTIFY_EMAIL) | 설정됨 | — |
| **NICEPAY_ENV** | `test` | **`production`으로 변경 필요** — 코드가 production일 때만 운영 승인 API(api.nicepay.co.kr) 호출. test면 sandbox로 가서 승인 실패 |
| **팩 자료 링크 (DEV_PACK_PDF_URL 등)** | **전부 미설정** | 미설정 시 자동 발송 메일에 다운로드 링크가 비어서 감. dev팩 PDF는 `public/downloads/aisikim-vibecoding-launch-pack-v2.pdf`(미커밋)이므로 커밋·배포 후 `https://aisikim.com/downloads/...` 로 설정 |
| NEXT_PUBLIC_SITE_URL | 미설정 | 운영 배포 env에 `https://aisikim.com` 추가 권장 |
| INTERNAL_ACCESS_KEY | 미설정 | 백업 수동 발송(/internal/send-pack) 사용하려면 설정 필요 |
| SAMPLE_PACK_NOTION_URL | 비어있음 | 샘플팩 메일에 Notion 링크 빠짐 (운영 테스트와 무관, 참고) |

Vercel 환경변수는 별도 — 대시보드에서 직접 입력 후 재배포 필요 (시크릿은 채팅/문서에 기록하지 않음).

## 배포 전 최종 점검 완료 (2026-07-31, Codex 재검토 통과 후)

- Codex 재검토: P1 3건 + P2 반영 확인됨 (코드 승인)
- `.env.local` 정비: `NICEPAY_ENV=production` 변경, `NEXT_PUBLIC_SITE_URL`, `DEV_PACK_PDF_URL` 추가 (시크릿 미변경·미출력)
- **로컬 스모크 테스트 ALL PASS** (실과금 없음, localhost:3456):
  1. purchase-intent가 서버 발급 주문(orderId/mallReserved/buyerEmail) 반환 ✓
  2. 인증 서명 위조 → `reason=signature` 차단 ✓
  3. 상품 바꿔치기(dev→work) → `reason=invalid_order` 차단 ✓
  4. 금액 위조(100원) → `reason=amount_mismatch` 차단 ✓
  5. 정상 형식 + 가짜 tid → **운영 API(api.nicepay.co.kr) 도달, U121 거절** → `reason=approval` ✓
     (production 라우팅·Basic 인증 정상 작동 증명)
- 부수 효과: 스모크 테스트 중 관리자 알림 메일 1건 발송됨 (구매 의향: 스모크테스트 — 무시할 것)

## 배포·환경 설정 완료 (2026-07-31)

- 커밋 `9f853f0` push → GitHub 연동 자동 배포 확인
- Vercel CLI(계정 finde0406-cyber)로 Production env 등록: `NEXT_PUBLIC_NICEPAY_CLIENT_KEY`, `NICEPAY_SECRET_KEY`, `NICEPAY_ENV=production`, `NEXT_PUBLIC_SITE_URL` (값 비출력, Sensitive 타입)
- `DEV_PACK_PDF_URL`(59일 전 값) → `https://aisikim.com/downloads/aisikim-vibecoding-launch-pack-v2.pdf` 로 교체
- v2 PDF 운영 서빙 확인 (200, application/pdf, 170KB)
- `vercel redeploy` 완료 → aisikim.com 별칭 연결
- 운영 프로브: return 엔드포인트가 `reason=auth` 응답 → **키 설정 게이트 통과 확인** (미설정 시 not_configured)
- 참고: `vercel link`가 `.gitignore` 수정(미커밋) + `.env.local`에 VERCEL_OIDC_TOKEN 추가 (무해)

## 운영 결제 테스트 절차 (1건 한정 — 사용자 실행 대기)

1. aisikim.com/focused-pack/dev → 정보 입력 → "9,900원으로 결제하기" 클릭 시 **나이스페이 결제창이 뜨는지** 확인 (카드 입력 전까지 과금 없음)
2. 실제 카드로 9,900원 결제 1건 (평일 낮 권장)
3. 확인 3종: /purchase/complete 도착 + 구매자 메일(PDF 링크 포함) + 관리자 알림
4. **당일 자정 전** 나이스페이 관리자 화면에서 매출취소 (주문번호·결제시각 기록)
5. 결과 보고 후 정식 운영 전환

## 다음 단계

1. 커밋 승인 → `feat: integrate nicepay payment window with auto pdf delivery`
2. `.env.local` + Vercel: `NEXT_PUBLIC_NICEPAY_CLIENT_KEY` / `NICEPAY_SECRET_KEY` / `NICEPAY_ENV=sandbox`
3. 샌드박스 테스트 결제 (평일 낮, 당일 자정 전 취소 — 체크리스트 11장)
4. 운영 전환: `NICEPAY_ENV=production` + 포스타트 결제경로 캡처 제출 (체크리스트 12장 — /purchase/complete 화면 포함 가능해짐)
5. 각 팩 자료 링크 env (`DEV/WORK/BLOG_PACK_PDF_URL` 등) 설정 확인

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5`
2. 이 파일 확인
3. `docs/handoffs/claude-latest-report.md` — 이번 구현 상세
4. `docs/nicepay-integration-checklist-v1.md` — 검증 8단계·테스트 주의사항
