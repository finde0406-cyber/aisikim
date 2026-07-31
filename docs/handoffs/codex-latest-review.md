# Codex 최신 검토

갱신: 2026-06-17 / Codex

## 검토 대상
- `docs/aisikim-prd-v1.md`
- `docs/aisikim-business-plan-v1.md`
- `app/internal/threads-gen/page.tsx`
- `app/internal/threads-gen/posts/route.ts`
- `components/internal/ThreadsContentGenerator.tsx`
- `lib/threads-content.ts`

## 이번 작업 목적
- 내부 운영용 Threads 생성기에서 같은 패턴이 반복되는 문제를 줄인다.
- 홍보 일변도 초안 대신 인사이트형, 팩폭형, 철학형, 홍보형을 선택해서 생성할 수 있게 만든다.
- 혼합 운영 선택 시 채널이 "금융/리스크 관리 인사이트 채널"처럼 보이도록 비홍보성 비중을 높인다.

## PRD / 사업기획서 일치 여부
- 외부 사용자용 MVP 기능을 확장한 것이 아니라 내부 운영용 도구 개선이므로 MVP 범위를 해치지 않음.
- 자체 결제, 로그인, 저장 기능, 관리자 대시보드 같은 범위 초과 구현은 추가되지 않음.
- 표현 면에서도 외부 서비스 본문이 아니라 내부 운영용 초안 생성기 수준으로 유지됨.

## 반영한 변경
- `콘텐츠 성격 선택` UI 추가
  - `혼합 운영`
  - `팩폭 상황극`
  - `데이터 해석`
  - `철학 한 마디`
  - `서비스 기능 언급`
- 혼합 운영 로직 변경
  - 기본적으로 인사이트/팩폭/홍보가 섞이도록 구성
  - 3개 생성 시 같은 결만 반복되지 않도록 분산
- 브랜드별 문체와 내용 재정렬
  - `AI시킴이`: AI 초보자의 질문 막힘, 작업지시서 시작 구조 중심
  - `머니플로우레이더`: 과열 섹터 경계, 자금 흐름, FOMO 방지 중심
  - `리스크체크`: 물린 투자자 심리, 현실 진단, 계좌 리스크 직면 중심
- 카드 메타 정리
  - 기존 템플릿 표시 대신 `주제 · 콘텐츠 성격` 기준으로 노출
- API 변경
  - `/internal/threads-gen/posts`가 `contentStyle`을 받아 서버에서 생성 처리

## 검증 결과
- `npm run lint` 통과
- `npm run build` 통과

## 남은 리스크
- 생성 문구는 확실히 덜 반복되지만, 실제 운영에서는 한 번 더 손으로 한두 문장씩 고쳐 올리는 편이 가장 자연스러움
- 현재는 이미지 없이 텍스트형 초안 중심이므로, 추후 반응을 보며 "짧은형/긴형" 정도의 추가 선택지는 검토 가능
- 내부 도구라서 기능은 충분하지만, 장기적으로 브랜드별 실제 성과가 쌓이면 잘 먹히는 톤을 데이터 기준으로 다시 줄이는 작업이 필요함

## 다음 단계 제안
1. `/internal/threads-gen`에서 각 성격별로 실제 2~3회 생성해 문체 체감 확인
2. 필요하면 `짧게`, `보통`, `길게` 같은 길이 선택지만 추가 검토
3. 만족스러우면 사용자 승인 후 커밋/푸시

---

# 2026-07-20 상품 방향 전환 검토

## 현재 단계

AI시킴 첫 유료 상품을 `바이브코딩 웹서비스 출시 작업지시서팩`으로 좁히고, 개발 집중팩 판매 흐름을 우선 수정하는 단계입니다.

## 반영한 변경

- `docs/aisikim-vibecoding-product-plan-v1.md` 작성
- `docs/threads-card-news-v1.md` 작성
- 홈 상품 소개 영역의 핵심 메시지 수정
- 무료 결과의 개발 카테고리 CTA 수정
- 개발 집중팩 판매 페이지의 제목, 문제, 구성, 구매 문구 수정
- 바이브코딩 출시 흐름 15개 작업지시서 v2 원고 작성
- 12쪽짜리 v2 PDF 생성
- 6장 Threads 카드뉴스 HTML 템플릿 작성

## 기준 문서 일치 여부

- 모바일 웹서비스 MVP 범위를 유지했습니다.
- 로그인, 구독, 관리자 대시보드, 자체 결제는 추가하지 않았습니다.
- 상품은 기존 개발 집중팩의 범위를 확장한 것이 아니라, 아이디어 정리·개발·수정·검수·출시라는 기존 흐름을 고객 결과 중심으로 재배치했습니다.

## 검증 결과

- `npm run lint` 통과
- `npm run build` 통과
- v2 PDF 생성 성공 및 12쪽 텍스트 추출 확인
- v2 PDF 표지와 본문 첫 페이지 PNG 시각 검수 완료

## 남은 결정사항

- v2 PDF를 기존 공개 다운로드 파일로 교체할지 결정 필요
- 상품 최종 가격과 외부 결제 상품 ID 확정 필요
- Threads 카드뉴스 HTML을 PNG 이미지 묶음으로 변환할 방식 결정 필요
- 나이스페이 설정 전까지는 결제 연동을 구현하지 않음

## 다음 작업

1. v2 PDF 전체 페이지에서 줄바꿈과 항목 흐름 검수
2. 개발 집중팩 판매 페이지의 예시 문구를 새 원고와 일치시킴
3. 카드뉴스 실제 이미지 출력본 제작
4. 사용자 확인 후 공개 다운로드 경로 교체

## 추가 완료

- v2 PDF 전체 12쪽 렌더링 접촉 시트 검수 완료
- 카드뉴스 6장 PNG 출력 완료
- 카드뉴스 PNG 접촉 시트 검수 완료
- 업로드용 PNG 위치: `deliverables/threads-card-news/png/`

## 결제 준비 추가

- 나이스페이 연동 준비 체크리스트 작성: `docs/nicepay-integration-checklist-v1.md`
- 새 PDF를 공개 경로에 별도 파일명으로 준비: `public/downloads/aisikim-vibecoding-launch-pack-v2.pdf`
- 결제 완료 메일의 개발 상품명을 `바이브코딩 웹서비스 출시 작업지시서팩`으로 통일
- 나이스페이 KEY와 웹훅은 아직 설정하지 않았으며, 실제 payload에 맞춘 서버 구현 전에는 등록하지 않음

## 최신 검증

- `npm run lint` 통과
- `npm run build` 통과

## 2026-07-21 나이스페이 결제경로 예시 검토

### 확인 내용

- 포스타트 예시 PPTX는 총 16쪽이며, AI시킴에는 단건 결제 경로만 해당한다.
- 단건 결제 제출 흐름은 홈페이지 하단정보, URL, 로그인 여부, 상품 상세, 신용카드 선택, 결제모듈 화면 순서다.
- 예시 파일에는 단건 상품을 최소 2~3개 준비하고 `sample`, `test` 문구를 노출하지 말라는 안내가 있다.
- AI시킴 공개 URL은 현재 기존 `앱/웹사이트 개발 집중팩` 문구와 수동 발송 안내가 표시되며, 나이스페이 결제창은 아직 연결되지 않았다.

### 산출물

- `deliverables/nicepay/AI시킴-나이스페이-단건결제경로-제출용-초안.pptx` 생성
- 상품 페이지, URL, 비회원 구매 흐름을 실제 공개 페이지 캡처로 반영
- 결제수단 및 결제모듈 슬라이드는 실제 나이스페이 연동 후 교체하도록 표시

### 제출 전 남은 작업

1. 포스타트 심사 기준에 맞는 사업자 정보와 하단 고지문을 실제 사이트에 반영
2. 나이스페이 결제창 연동 및 임시오픈 테스트
3. 신용카드 선택·결제모듈·결제완료 화면 캡처 추가
4. 상품 목록의 실제 판매 상품 2~3개 노출 여부 확인
5. 초안 문구와 오래된 상품명을 최종 공개 상품명에 맞춰 교체한 뒤 제출

## 2026-07-21 포스타트 추가 답변 반영

포스타트 답변에 따라 결제경로 파일은 나이스체크아웃 스토어가 아니라 AI시킴 자체 홈페이지 기준으로 제출한다. 기존 나이스체크아웃의 단건결제 카드사 심사가 완료되어 카드사 심사는 생략 가능하며, 신용카드 결제모듈 화면은 확인되지 않아도 된다. 대신 상품명, 금액, 상품 상세 정보는 정확히 표시해야 한다.

이에 따라 다음 최종 제출용 PPTX를 생성했다.

- `deliverables/nicepay/AI시킴-나이스페이-단건결제경로-제출용.pptx`

파일에는 현재 공개 홈페이지의 상품 페이지와 다음 정보를 반영했다.

- 상품명: `앱/웹사이트 개발 집중팩`
- 판매금액: `9,900원`
- 제공 방식: 결제 확인 후 구매자 이메일로 PDF 발송
- 로그인 없는 비회원 구매 흐름
- 상품 구성: 기능 정의, 화면 흐름, 요구사항, API 연동, 버그 재현, 단계별 개발, 최종 검수

제출 전에는 공개 사이트의 사업자 정보·약관·개인정보처리방침이 실제 심사 정보와 일치하는지 한 번 더 확인한다.

## 2026-07-31 나이스페이 자동결제 구현 리뷰

### 리뷰 대상

- `docs/handoffs/claude-latest-report.md`
- `docs/handoffs/project-status.md`
- `docs/nicepay-integration-checklist-v1.md` 6장 검증 8단계
- `lib/nicepay.ts`
- `lib/products.ts`
- `lib/pack-delivery.ts`
- `app/api/payments/nicepay/return/route.ts`
- `app/purchase/*`
- `components/purchase/PrePaymentForm.tsx`

### 결론

**현재 상태로 운영 결제와 자동 발송을 시작하면 안 됩니다.**

나이스페이 공식 Server 승인 매뉴얼과 비교했을 때 인증 Signature 계산식은 `sha256(authToken + clientId + amount + SecretKey)`, 승인 Signature 계산식은 `sha256(tid + amount + ediDate + SecretKey)`로 구현되어 공식 명세와 일치한다. 다만 결제 상품·구매자 정보를 묶는 방식과 승인 응답 검증에 보완이 필요하다.

### 발견사항

#### [P1] `mallReserved`에 JSON.stringify 결과를 그대로 전달함

파일: `components/purchase/PrePaymentForm.tsx`

공식 결제창 요청 명세는 `mallReserved`를 JSON 형식으로 사용할 수 있다고 안내하면서도 큰따옴표는 사용할 수 없다고 명시한다. 현재 `JSON.stringify({ packType, email })`는 큰따옴표를 포함하므로 결제 요청이 거절되거나 값이 손상될 수 있다. URL-safe Base64 또는 큰따옴표 없는 서명된 포맷으로 변경하고, 서버에서 복호화·검증해야 한다.

#### [P1] 클라이언트가 보낸 `packType`이 서버에서 상품에 바인딩되지 않음

파일: `components/purchase/PrePaymentForm.tsx`, `app/api/payments/nicepay/return/route.ts`

`mallReserved`와 `orderId`를 클라이언트가 만들고, 서버는 `mallReserved`의 `packType`과 이메일을 신뢰한다. 따라서 같은 가격인 `dev`, `work`, `blog` 사이에서 결제 전 상품 종류를 바꾸어 다른 PDF를 받을 수 있다. `/api/purchase-intent`는 로그와 이메일 알림만 남기고 주문 토큰을 발급하지 않는다. 서버 발급 서명 토큰 또는 저장된 주문 의향과 결제 결과를 대조하는 구조가 필요하다.

#### [P1] 승인 응답의 금액·주문번호·Signature 존재 여부를 강제하지 않음

파일: `app/api/payments/nicepay/return/route.ts`

승인 API 성공 후 `approval.amount`가 기대 금액인지, `approval.orderId`가 인증 요청의 `orderId`와 같은지 확인하지 않는다. 또한 `if (approval.signature && approval.ediDate)` 조건 때문에 두 값 중 하나가 비어도 발송이 진행된다. 체크리스트 6장의 승인 결과 검증과 자동 발송 전 검증을 충족하려면 세 값이 모두 존재하고, 금액·주문번호가 일치하며, Signature가 공식 식으로 검증된 경우에만 발송해야 한다.

#### [P2] 구매자 연락처 형식이 공식 요청 명세와 다를 수 있음

파일: `components/purchase/PrePaymentForm.tsx`

공식 요청 명세는 `buyerTel`을 하이픈 없이 숫자로 전달하도록 안내한다. 현재 사용자가 입력한 `010-1234-5678`을 그대로 전달하므로 결제창 요청 전 숫자만 남기는 정규화가 필요하다.

#### [P2] 동적 `returnUrl` 사용은 조건부로 안전함

파일: `components/purchase/PrePaymentForm.tsx`, `app/api/payments/nicepay/return/route.ts`

현재 `window.location.origin`을 사용한 방식은 로컬·프리뷰·운영 환경을 자동 지원한다는 장점이 있다. 그러나 운영 환경변수가 Vercel Preview에도 노출되면 프리뷰 도메인에서 결제창을 열 수 있으므로 운영 결제에서는 허용된 운영 도메인으로 제한하거나 환경변수 기반 URL을 사용해야 한다.

### Claude Code 보고서의 ‘다르게 판단한 부분’ 검토

1. **MID를 코드에서 사용하지 않는 판단**: 타당하다. 신모듈의 결제창과 Basic 승인 API는 clientId·secretKey를 사용하며, MID는 런타임 필수값이 아닐 수 있다. 단, 상점 관리자·운영 전환 확인용 정보로는 별도 관리해야 한다.
2. **별도 저장소 없이 중복 발송 방지**: 부분적으로만 타당하다. 동일 `tid` 재승인 실패를 이용한 중복 방지는 카드 Server 승인 흐름에서 실용적인 방어가 될 수 있지만, 현재 웹훅은 임시 payload를 허용하고 발송 이력 저장도 없다. 자동 발송의 재처리·감사·장애 복구까지 보장하는 idempotency는 아니다.
3. **요청 origin으로 동적 returnUrl 생성**: 개발·프리뷰에는 타당하지만 운영 도메인 제한이 추가되어야 한다.
4. **카드 단건결제에서 웹훅 미등록**: 초기 카드 Server 승인만 사용할 경우 타당하다. 다만 나중에 가상계좌·비동기 결제수단을 추가하면 나이스페이 실제 webhook payload와 검증 로직으로 교체해야 한다.

### 체크리스트 6장 8단계 대조

1. 인증 결과코드: 반영
2. 인증 응답 Signature: 공식 계산식 일치, `clientId` 응답값 대조 보완 권장
3. 상품·금액 검증: 금액은 반영, 상품 바인딩과 주문 토큰 보완 필요
4. 서버 승인 API: 반영
5. 승인 결과코드: `resultCode=0000` 및 `status=paid` 반영
6. 승인 Signature: 계산식 일치, Signature·ediDate 필수 검증과 amount/orderId 대조 필요
7. 구매자 PDF 발송: 반영
8. 관리자 알림: 반영

### 공식 근거

- 결제창 Server 승인 매뉴얼: `mallReserved`, 인증 Signature, 승인 흐름 및 요청·응답 명세 확인
- API·JS SDK 문서: 승인 API endpoint와 Basic 인증 방식 확인

### 다음 조치

1. `mallReserved`를 안전한 서명 토큰으로 변경
2. 승인 응답의 `tid`, `orderId`, `amount`, `ediDate`, `signature` 필수 검증
3. `buyerTel` 숫자 정규화
4. 운영 환경에서 `returnUrl`을 `https://aisikim.com`으로 제한
5. 수정 후 lint/build 및 위조·금액 불일치·중복 return 테스트
6. 그 후에만 샌드박스 결제 테스트 진행

## 2026-07-31 수정본 재검토 추가

### 수정 확인

- `mallReserved`: JSON 대신 큰따옴표 없는 서버 발급 HMAC 토큰으로 변경됨
- 상품·이메일 바인딩: 서버 발급 주문번호와 HMAC 검증으로 보완됨
- 승인 응답: `signature`, `ediDate`, `orderId`, `amount`, `tid` 존재·일치·Signature 검증으로 보완됨
- `buyerTel`: 결제창 전달 전에 숫자만 남기도록 변경됨

### [P1] 운영 키와 환경 설정 불일치

현재 로컬 `.env.local`을 값 노출 없이 확인한 결과:

- `NEXT_PUBLIC_NICEPAY_CLIENT_KEY` 접두어: `R2` (운영형 키)
- `NICEPAY_ENV`: `test`

현재 `lib/nicepay.ts`는 `NICEPAY_ENV`가 정확히 `production`일 때만 운영 API를 사용하고, 그 외에는 샌드박스 API를 사용한다. 포스타트가 테스트 상점 키를 별도로 제공하지 않는다고 안내했으므로, 운영 키로 실제 테스트하기 전 로컬·Vercel 환경에서 `NICEPAY_ENV=production`으로 맞춰야 한다. 이 설정을 바꾸지 않으면 운영 키로 샌드박스 API를 호출하게 되어 결제가 실패할 수 있다.

### 수정본 재검토 결론

코드상의 기존 P1 지적사항은 수정되었고 `npm run lint`, `npm run build`도 통과했다. 단, 위 환경변수 불일치를 해결하고 운영 배포 후 실제 결제 1건을 진행해야 최종 검증이 가능하다. 실결제 직후에는 반드시 당일 취소한다.
