# AI시킴 프로젝트 상태

갱신: 2026-05-27 / Claude Code (히어로 보조문구 축약)

---

## 현재 단계

**히어로 보조문구 축약 완료. 커밋 승인 대기 중.**

---

## 커밋 이력

| 해시 | 메시지 | 날짜 |
|------|--------|------|
| `5d84c44` | docs: add hero copy options and update prompt | 2026-05-27 |
| `aca8ce0` | ux: compress homepage and align result page conversion | 2026-05-27 |
| `638b1eb` | docs: add homepage and result flow ux guidance | 2026-05-27 |
| `66b11db` | ux: remove internal-status copy from customer surfaces | 2026-05-27 |
| `f37110f` | ux: refine homepage copy tone and CTA consistency | 2026-05-27 |

---

## 현재 Git 상태

```
브랜치: main

modified (미커밋):
  components/home/HeroSection.tsx
```

---

## 완료된 것 (커밋 기준)

- Sprint 0~6: 모두 커밋 완료
- 홈 카피 `-요`체 통일 + 집중팩 포지셔닝 정합: `f37110f` 커밋
- 내부 상태 문구 제거: `66b11db` 커밋
- 홈 압축 (StarterPackFlowSection 제거) + 결과 페이지 유료 전환 구조 정합: `aca8ce0` 커밋
- **히어로 보조문구 축약 (미커밋):**
  - 보조문구 3줄 → 2줄: "바로 써볼 작업지시서를 만들어드려요."
  - 하단 캡션: `이메일 · 회원가입 불필요` → `이메일·회원가입 없이 시작`

---

## 아직 미완료인 것

| 항목 | 긴급도 | 비고 |
|------|--------|------|
| 히어로 수정 커밋 승인 | 높음 | 사용자 승인 후 진행 |
| 집중팩 3종 상세 페이지 + 실물 콘텐츠 | 높음 | 완성 시 result + home CTA 경로 교체 필요 |
| 결제 채널 확정 + `.env.local` 설정 | 높음 | `NEXT_PUBLIC_PAYMENT_URL` 값 필요 |
| Tally 폼 생성 + `NEXT_PUBLIC_SAMPLE_PACK_FORM_URL` 설정 | 높음 | 이메일 수집 미작동 |
| 샘플팩 5개 콘텐츠 실물 | 높음 | 발송 자료 없음 |
| 스타터팩 50개 콘텐츠 실물 | 높음 | 결제 연결 전 필요 |
| 개인정보 처리방침·이용약관 페이지 | 중간 | Footer 링크 목적지 없음 |
| Vercel 프로젝트 생성 | 낮음 | Sprint 7 전 필요 |
| 도메인 확보 | 낮음 | Sprint 7 전 가능 |

---

## 다음 단계

1. 커밋 승인 → `copy: shorten hero subtitle to two lines`
2. 집중팩 3종 상세 페이지 제작
3. Tally 폼 + 결제 채널 설정
4. Sprint 7: Vercel 배포

---

## 다음 작업자 확인 순서

1. `git status` / `git log --oneline -5` 확인
2. 이 파일(`project-status.md`) 확인
3. `docs/handoffs/claude-latest-report.md` 확인
4. 기준 문서: `docs/conversion-copy-principles-v1.md`, `docs/customer-product-architecture-v1.md`
