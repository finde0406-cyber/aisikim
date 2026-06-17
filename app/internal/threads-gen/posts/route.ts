import { NextResponse } from 'next/server'

import {
  buildAllBrandThreadsPosts,
  buildThreadsPosts,
  BRAND_OPTIONS,
  CONTENT_STYLE_OPTIONS,
  getTopicsForBrand,
  isBrandId,
  isContentStyle,
  type BrandId,
  type ContentStyle,
} from '@/lib/threads-content'
import { hasVerifiedInternalAccess } from '@/lib/internal-threads-auth'

const VALID_BRAND_IDS = new Set<BrandId>(BRAND_OPTIONS.map((brand) => brand.id as BrandId))
const VALID_CONTENT_STYLES = new Set<ContentStyle>(CONTENT_STYLE_OPTIONS.map((option) => option.id))

function sanitizeTopicIds(brandId: BrandId, value: unknown) {
  if (!Array.isArray(value)) return undefined

  const validTopicIds = new Set(getTopicsForBrand(brandId).map((topic) => topic.id))
  const ids = value
    .filter((item): item is number => typeof item === 'number' && Number.isInteger(item))
    .filter((id) => validTopicIds.has(id))
    .slice(0, 5)

  return ids.length > 0 ? ids : undefined
}

function sanitizeContentStyle(value: unknown) {
  if (typeof value !== 'string' || !isContentStyle(value) || !VALID_CONTENT_STYLES.has(value)) {
    return 'mixed' satisfies ContentStyle
  }

  return value
}

export async function POST(request: Request) {
  const verified = await hasVerifiedInternalAccess()
  if (!verified) {
    return NextResponse.json(
      { error: 'unauthorized', message: '접근 키 검증이 필요합니다.' },
      { status: 401 },
    )
  }

  const body = (await request.json().catch(() => ({}))) as {
    brandId?: unknown
    mode?: unknown
    topicIds?: unknown
    contentStyle?: unknown
  }

  const mode = body.mode === 'all-brands' ? 'all-brands' : 'single'
  const contentStyle = sanitizeContentStyle(body.contentStyle)

  if (mode === 'all-brands') {
    const posts = buildAllBrandThreadsPosts(contentStyle, 1)
    return NextResponse.json({ posts })
  }

  if (typeof body.brandId !== 'string' || !isBrandId(body.brandId) || !VALID_BRAND_IDS.has(body.brandId)) {
    return NextResponse.json(
      { error: 'invalid_brand', message: '유효한 브랜드를 선택해주세요.' },
      { status: 400 },
    )
  }

  const brandId = body.brandId
  const topicIds = sanitizeTopicIds(brandId, body.topicIds)
  const posts = buildThreadsPosts(brandId, topicIds, contentStyle, 3)

  return NextResponse.json({ posts })
}
