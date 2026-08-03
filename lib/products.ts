// 판매 상품 정보 단일 출처 — 페이지·결제창·서버 검증·메일이 모두 이 값을 사용
// 상품명·가격이 화면과 서버에서 달라지면 결제 후 발송이 중단되므로 여기서만 수정한다.

export type PackType = 'dev' | 'work' | 'blog' | 'starter_bundle'

export interface PackProduct {
  label: string
  amount: number
  priceText: string
}

export const PACK_PRODUCTS: Record<PackType, PackProduct> = {
  dev: {
    label: '바이브코딩 웹서비스 출시 작업지시서팩',
    amount: 9900,
    priceText: '9,900원',
  },
  work: {
    label: '업무/보고서 집중팩',
    amount: 9900,
    priceText: '9,900원',
  },
  blog: {
    label: '블로그/콘텐츠 집중팩',
    amount: 9900,
    priceText: '9,900원',
  },
  starter_bundle: {
    label: '통합 스타터팩 번들',
    amount: 24900,
    priceText: '24,900원',
  },
}

export const VALID_PACK_TYPES = Object.keys(PACK_PRODUCTS) as PackType[]

export function isPackType(value: string | undefined | null): value is PackType {
  return !!value && VALID_PACK_TYPES.includes(value as PackType)
}

// 런칭 특가 — 첫 판매·후기 확보 목적. 기간 종료 후에는 코드 수정 없이 자동으로 정가로 복귀한다.
const LAUNCH_PROMO = {
  packType: 'dev' as PackType,
  amount: 1900,
  priceText: '1,900원',
  until: new Date('2026-08-11T00:00:00+09:00'),
}

export function isLaunchPromoActive(packType: PackType): boolean {
  return packType === LAUNCH_PROMO.packType && new Date() < LAUNCH_PROMO.until
}

// 결제창·서버 검증·화면 표시가 전부 이 함수를 거쳐야 런칭 특가가 일관되게 반영된다.
export function getEffectivePackProduct(packType: PackType): PackProduct {
  const base = PACK_PRODUCTS[packType]
  if (isLaunchPromoActive(packType)) {
    return { label: base.label, amount: LAUNCH_PROMO.amount, priceText: LAUNCH_PROMO.priceText }
  }
  return base
}
