# Claude Code 최신 보고

갱신: 2026-09-04 / Claude Code (홈 카피 — 개발팩 우선순위 반영, 4개월 방치된 미커밋 변경 커밋)

## 현재 단계

홈 랜딩페이지(`components/home/`) 카피를 "앱·웹 개발" 집중팩(현재 유일하게 판매 중인 상품, `PackPreviewSection`에서 이미 확정된 사실) 중심으로 재정렬. 이 변경은 이전 세션이 작성만 하고 커밋하지 않은 상태로 워킹트리에 몇 달 남아있던 것을 발견해 검증 후 반영함.

## 변경 파일

- `HeroSection.tsx`: 헤드라인/서브카피를 다분야 안내형에서 막힘 공감형으로, 선택 데모 미리보기를 앱/웹 개발 시나리오로 통일
- `ProblemSection.tsx`: 문제 목록을 블로그·업무 일반론에서 앱 개발 여정(아이디어→기능 구현→검수→출시·홍보) 단계별 막힘으로 교체
- `CategoryPreviewSection.tsx`: "앱·웹사이트 개발"을 1순위·강조 스타일로 재배치, CTA 문구 변경
- `FinalCTASection.tsx`: 헤드라인/서브카피를 "막힘 확인 → 바이브코딩 출시팩" 흐름으로 변경

## 기준 문서와의 일치 여부

`PackPreviewSection.tsx`(미변경, 기존 코드) 및 `app/focused-pack/dev/page.tsx`(실제 상품 페이지)와 내용 일치 확인 완료 — 이 두 곳은 이미 "개발팩만 현재 판매 중, 블로그·업무팩은 추후 출시"를 전제로 작성돼 있었는데, Hero/Problem/Category 세 섹션만 옛 3분야 병렬 구도로 남아 있어 불일치 상태였음. 이번 변경으로 정합성 확보.

## 반영 중 발견해 수정한 문제

원본 미커밋 diff에는 `HeroSection.tsx`의 선택 데모 미리보기가 내부적으로 불일치했음 — "어떤 작업이에요?" 칩은 여전히 `selected: 0`(블로그 글쓰기)인데, "어떤 결과물?" 칩만 개발 전용 항목(첫 화면과 기능/오류 수정/출시 준비)으로 바뀌어 있어 두 선택이 서로 다른 시나리오를 가리켰고, 그 아래 결과 예시 텍스트도 여전히 "블로그 글" 얘기였음. `selected: 0→2`(앱/웹 개발)로 정정하고 결과 예시 텍스트를 앱 개발 시나리오로 다시 씀.

## 검증 결과

- `npm run lint` PASS
- `npm run build` PASS (전 라우트 정상 생성)

## 남은 리스크

- 이 변경은 Hero/Problem/Category/FinalCTA 4개 섹션만 다룸. **`SamplePreviewSection`은 확인 결과 여전히 "블로그·콘텐츠"를 대표 예시로 보여주고 있어 위 섹션들과 어긋남** — 다음 라운드에서 앱/개발 예시로 맞추는 작업 필요(이번엔 범위 밖이라 손대지 않음). `GuideTeaserSection`은 블로그·개발 가이드를 나란히 소개하는 목적이라 그대로 둬도 무방.
- 효과(전환율 변화)는 발행 후 실측 필요. 배포 후 며칠 지켜보고 조회·구매 신호 확인 권장.

---

## 현재 단계

**나이스체크아웃(수동 발송) → 나이스페이 정식 연동(자동 발송) 전환 — 설계 보고 후 구현 진행.**

---

## 이해한 목표

사용자가 상품 페이지에서 결제하면, 서버가 나이스페이 승인·검증을 마친 뒤
구매자 이메일로 PDF를 **자동 발송**한다. 운영자 수동 발송(/internal/send-pack)은 백업 수단으로 유지.

```
상품 페이지 → PrePaymentForm(이름·이메일·연락처·동의)
→ 나이스페이 결제창(JS SDK, AUTHNICE.requestPay)
→ returnUrl POST 수신 (인증 결과)
→ 서버: 인증 signature 검증 → 금액·상품 검증 → 승인 API 호출
→ 승인 resultCode + signature 검증
→ 구매자 PDF 메일 자동 발송 + 관리자 알림
→ 결제 완료 페이지로 리다이렉트
```

## 연동 방식 확정 근거

- 나이스페이 공식 매뉴얼(github.com/nicepayments/nicepay-manual, `api/payment-window-server.md`) 기준 **결제창 + 서버 승인** 방식.
- `env.example`에 이미 `NEXT_PUBLIC_NICEPAY_CLIENT_KEY` / `NICEPAY_SECRET_KEY` 자리가 있어 신모듈(clientId/secretKey) 방식으로 확정.
- JS SDK: `https://pay.nicepay.co.kr/v1/js/`
- 승인 API: `POST {base}/v1/payments/{tid}` (운영 `api.nicepay.co.kr`, 샌드박스 `sandbox-api.nicepay.co.kr`), Basic Auth = Base64(clientKey:secretKey)
- 인증 signature = sha256(authToken + clientId + amount + secretKey)
- 승인 signature = sha256(tid + amount + ediDate + secretKey)

## 구현 범위

| 파일 | 신규/수정 | 역할 |
|------|----------|------|
| `lib/products.ts` | 신규 | 팩별 상품명·가격 단일 출처 (dev/work/blog 9,900 / starter_bundle 24,900) |
| `lib/nicepay.ts` | 신규 | signature 계산·검증, 승인 API 호출 (서버 전용) |
| `lib/pack-delivery.ts` | 신규 | 자료 URL 조회 + PDF 발송 + 관리자 알림 (webhook 로직 공용화) |
| `app/api/payments/nicepay/return/route.ts` | 신규 | 인증 결과 수신 → 검증 → 승인 → 발송 → 리다이렉트 |
| `app/purchase/complete/page.tsx` | 신규 | 결제 완료 안내 화면 |
| `app/purchase/failed/page.tsx` | 신규 | 결제 실패/중단 안내 화면 |
| `components/purchase/PrePaymentForm.tsx` | 수정 | 결제 이동 단계에서 새탭 링크 대신 결제창 호출 (키 미설정 시 기존 링크 방식 유지) |
| `app/api/payment-webhook/route.ts` | 수정 | pack-delivery 공용 함수 사용으로 정리 (동작 동일) |
| `env.example` | 수정 | NICEPAY_ENV 값 정리 (test→sandbox 표기), 주석 보강 |

## 제외 범위 (MVP 준수)

- 가상계좌·정기결제 미지원 (카드 단건만) → 웹훅 등록 불필요 (체크리스트 2.2 결론과 일치)
- DB 없음 → 주문 저장 없음. 중복 발송 방지는 "동일 tid 재승인 시 나이스페이가 거절"하는 특성 + 주문번호 유일성으로 처리
- 로그인/회원/대시보드 추가 없음

## 상품·주문 데이터 전달 설계

- `orderId`: `aisikim-{packType}-{yyyyMMddHHmmss}-{랜덤6}` — 유일성 확보
- `mallReserved`: `JSON.stringify({ packType, email })` — 인증 결과에 그대로 돌아오므로 서버가 발송 대상 확정에 사용
- 서버는 클라이언트가 보낸 amount를 신뢰하지 않고 `lib/products.ts` 가격과 일치할 때만 승인 진행

## 예상 리스크

| 리스크 | 대응 |
|--------|------|
| 승인 성공 후 메일 발송 실패 | 관리자 알림 + 완료 페이지에 "미수신 시 문의" 안내, /internal/send-pack 백업 발송 |
| Vercel IP 비고정으로 승인 API 차단 가능성 | 나이스페이 IP보안(REST 접근제한) 미사용 상태 확인 필요 (운영 전 사용자 확인 항목) |
| sandbox 키/운영 키 혼동 | NICEPAY_ENV로 명시 분리, 기본값 sandbox |
| mallReserved 파싱 실패 | 파싱 실패 시 승인 호출 전에 중단 (과금 없음) |

## 구현 결과 (2026-07-31, 같은 세션)

설계 범위 그대로 구현 완료. 빌드 검증 통과.

| 검사 | 결과 |
|------|------|
| `npx tsc --noEmit` | PASS |
| `npx next build` | 성공 — `/api/payments/nicepay/return`, `/purchase/complete`, `/purchase/failed` 라우트 생성 확인 |

**변경 파일 (전부 미커밋 — 사용자 승인 대기):**

```
신규: lib/products.ts
신규: lib/nicepay.ts
신규: lib/pack-delivery.ts
신규: app/api/payments/nicepay/return/route.ts
신규: app/purchase/complete/page.tsx
신규: app/purchase/failed/page.tsx
수정: components/purchase/PrePaymentForm.tsx (결제창 호출 + 기존 링크 fallback)
수정: app/api/payment-webhook/route.ts (pack-delivery 공용화)
수정: env.example (나이스페이 신모듈 키 체계 정리)
```

**활성화에 필요한 것 (사용자 작업):**

1. `.env.local` + Vercel에 `NEXT_PUBLIC_NICEPAY_CLIENT_KEY`, `NICEPAY_SECRET_KEY`, `NICEPAY_ENV=sandbox` 설정 (개발정보 > KEY 정보의 테스트 키)
2. 샌드박스 테스트 결제 → 자동 메일 수신 확인 → 당일 자정 전 취소 (체크리스트 11장)
3. 운영 키 발급/전환 시 `NICEPAY_ENV=production`으로 변경
4. 나이스페이 IP보안(REST 접근제한) 미사용 상태인지 확인 (Vercel IP 비고정)

## Codex P1 리뷰 반영 (2026-07-31, 3차)

Codex 지적 P1 3건 + P2 2건 전부 수정 완료. `npm run lint` + `tsc` + `next build` 통과.

| 지적 | 수정 내용 | 파일 |
|------|----------|------|
| P1-a: mallReserved JSON 큰따옴표 제한 | JSON 제거 → `v1.{packType}.{hex(email)}.{hmac}` 형식 ([A-Za-z0-9.]만 사용) | `lib/nicepay.ts` |
| P1-b: 상품이 클라이언트 값에 의존 | **서버 발급 서명 토큰 도입** — `/api/purchase-intent`가 orderId 생성 + HMAC-SHA256(orderId\|packType\|email, secretKey)으로 서명한 mallReserved를 발급. 클라이언트는 전달만 하고 return 라우트가 timingSafeEqual로 재검증. dev↔work↔blog 스왑 불가 | `lib/nicepay.ts`, `app/api/purchase-intent/route.ts`, `PrePaymentForm.tsx` |
| P1-c: 승인 응답 검증 불충분 | signature·ediDate 존재 + orderId 일치 + amount 일치 + tid 일치 + signature 검증을 **전부 필수**로 변경. 하나라도 실패 시 발송 차단 + 운영자 알림 | `app/api/payments/nicepay/return/route.ts` |
| P2: 전화번호 하이픈 | `buyerTel: phone.replace(/\D/g, '')` | `PrePaymentForm.tsx` |
| P2: 운영 returnUrl 고정 | `NEXT_PUBLIC_SITE_URL` 설정 시 해당 도메인으로 고정 (미설정 시 origin — 로컬/프리뷰용) | `PrePaymentForm.tsx`, `env.example` |

설계 노트: DB 없이 무결성을 보장하기 위해 "서버가 서명해 발급 → 결제창 경유 → 서버가 재검증" 구조를 선택. 시크릿 키가 HMAC 키를 겸하며 서버 밖으로 나가지 않는다.

## Codex 브리핑 대조 결과 (2026-07-31 추가)

사용자가 전달한 Codex용 개발 브리핑과 구현을 항목별 대조함. 구현 범위 1~9 중 1~8은 완료, 9(수동 발송 문구 정리)는 스타터팩 FAQ "영업일 1~2일 발송" 문구를 나이스페이 키 설정 시 "자동 발송"으로 전환되도록 조건 분기 처리 완료. `npm run lint` 무경고 통과.

브리핑과 다르게 판단한 부분 (리뷰 시 확인 요망):

| 항목 | 브리핑 | 구현 판단 | 근거 |
|------|--------|----------|------|
| MID 미설정 시 결제 차단 | MID 없으면 버튼 비활성 | **클라이언트 키/시크릿 키 기준으로 차단** (MID 미사용) | 신모듈 v1 API는 clientId/secretKey만 사용. MID는 코드에서 불필요 — 키 미설정 시 기존 나이스체크아웃 링크로 fallback, 그것도 없으면 구매 불가 UI |
| 중복 발송 방지 저장소 | 필요 시 리스크 보고 | **별도 저장소 없이 진행** | 승인 API가 동일 tid 재승인을 거절하므로(발송은 승인 성공 시에만) 이중 발송 경로가 없음. orderId는 매 시도마다 유일 생성. DB 금지 MVP 규칙 준수. 잔여 리스크: 승인 성공 후 페이지 이탈 시에도 메일은 이미 발송됨(문제 없음) |
| returnUrl env | NICEPAY_RETURN_URL 사용 | **요청 origin에서 동적 생성** | 로컬/프리뷰/운영 환경마다 env 수정 불필요, 값 불일치 사고 방지 |
| 웹훅(hook.md) | 참고자료 포함 | **카드 단건에는 미등록** | 체크리스트 2.2/10장 결론 그대로 — 가상계좌 추가 시 연결 |

기준 문서 간 충돌 메모: PRD v1 16장은 "외부 결제 링크 우선, 자체 결제 제외"로 작성돼 있음. 나이스페이 PG 연동은 카드정보를 우리가 다루지 않으므로 "자체 결제 시스템"이 아니며, `nicepay-integration-checklist-v1.md` + 사용자 지시가 현재 기준. **PRD 16장을 PG 연동 기준으로 갱신 필요 (문서 작업, Codex 검토 대상).**

남은 나이스페이 업체 확인사항 (운영 전환 전):
1. 테스트 키로 샌드박스 결제 가능 상태인지 (임시오픈 조건)
2. IP보안(REST API 접근제한) 미사용 확인 — Vercel 서버리스는 고정 IP 아님
3. 포스타트 결제경로 캡처 제출 시점·양식
4. 운영 키 발급 조건 (심사 승인 후)

## 기준 문서 정합성

- `docs/nicepay-integration-checklist-v1.md` 6장(서버 검증 8단계) 전부 반영
- 카드 우선·웹훅 보류는 체크리스트 10장 결론 그대로
- PRD의 "자체 결제 시스템 금지"는 PG(나이스페이) 연동이므로 위반 아님 — 결제 자체는 나이스페이가 처리
