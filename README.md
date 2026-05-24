# AI시킴

## 프로젝트 소개
AI시킴은 "AI에게 무엇을 어떻게 시켜야 할지 모르겠다"는 문제를 해결하기 위한 모바일 최적화 웹서비스입니다. 사용자가 긴 설명을 직접 입력하지 않아도, 몇 가지 선택만으로 ChatGPT, Claude, Gemini, Codex 등에 바로 넣을 수 있는 작업지시서를 생성하도록 설계합니다.

## 서비스 정의
- 한 줄 정의: AI에게 뭘 시켜야 할지 모르겠다면, 선택만으로 ChatGPT·Claude·Gemini·Codex에 바로 넣을 수 있는 작업지시서를 만들어주는 모바일 최적화 웹서비스
- 핵심 가치: 입력형 서비스가 아니라 선택 반응형 구조로 AI 초보자의 실행 장벽을 낮춘다
- 핵심 표현: "프롬프트 모음"이 아니라 "결과물을 완성하기 위한 단계별 작업지시서"

## MVP 목표
- 2개월 안에 유료 상품 1개 이상 판매
- 무료 진단과 무료 결과 1개로 진입 장벽 최소화
- 이메일 입력 시 샘플팩 5개 제공
- 외부 결제 링크 기반으로 유료 스타터팩 판매 검증

## 기술 스택 후보
- 프레임워크: Next.js
- 스타일링: Tailwind CSS
- 배포: Vercel
- 이메일 수집: Tally 또는 외부 이메일 폼
- 결제: Lemon Squeezy / 스마트스토어 / 크몽 / Tally+수동 발송 비교 후 선정
- 자료 제공: PDF + Notion 보조 링크
- 추후 검토: Supabase

## 실행 원칙
- 문서 기준으로 먼저 제품 범위를 고정한다.
- 구현 전 `docs/aisikim-prd-v1.md`와 `docs/aisikim-business-plan-v1.md`를 우선 참조한다.
- 사용자 승인 없이 패키지 설치, 프로젝트 생성, 파일 덮어쓰기, 배포, commit, push를 하지 않는다.
- MVP 범위를 넘는 기능은 제안만 가능하며, 별도 승인 전 구현하지 않는다.
- 개인정보, 이메일 동의, 결제 안내는 축소하지 않고 명확하게 다룬다.

## 문서 우선순위
1. `docs/aisikim-prd-v1.md`
2. `docs/aisikim-business-plan-v1.md`
3. `docs/mvp-roadmap.md`
4. `docs/user-flow.md`
5. `AGENTS.md`
6. `CLAUDE.md`
