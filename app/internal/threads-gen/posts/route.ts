import { NextResponse } from 'next/server'

import {
  buildAllBrandThreadsPosts,
  buildThreadsPosts,
  BRAND_OPTIONS,
  getTopicsForBrand,
  isBrandId,
  TEMPLATE_OPTIONS,
  type BrandId,
  type TemplateType,
} from '@/lib/threads-content'
import { hasVerifiedInternalAccess } from '@/lib/internal-threads-auth'

const VALID_TEMPLATE_IDS = new Set<TemplateType>(TEMPLATE_OPTIONS.map((template) => template.id))
const VALID_BRAND_IDS = new Set<BrandId>(BRAND_OPTIONS.map((brand) => brand.id as BrandId))

function sanitizeTopicIds(brandId: BrandId, value: unknown) {
  if (!Array.isArray(value)) return undefined

  const validTopicIds = new Set(getTopicsForBrand(brandId).map((topic) => topic.id))
  const ids = value
    .filter((item): item is number => typeof item === 'number' && Number.isInteger(item))
    .filter((id) => validTopicIds.has(id))
    .slice(0, 5)

  return ids.length > 0 ? ids : undefined
}

function sanitizeTemplateIds(value: unknown) {
  if (!Array.isArray(value)) return undefined

  const ids = value
    .filter((item): item is TemplateType => typeof item === 'string' && VALID_TEMPLATE_IDS.has(item as TemplateType))
    .slice(0, 4)

  return ids.length > 0 ? ids : undefined
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
    templateIds?: unknown
  }

  const templateIds = sanitizeTemplateIds(body.templateIds)
  const mode = body.mode === 'all-brands' ? 'all-brands' : 'single'

  if (mode === 'all-brands') {
    const posts = buildAllBrandThreadsPosts(templateIds, 1)
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
  const posts = buildThreadsPosts(brandId, topicIds, templateIds, 3)

  return NextResponse.json({ posts })
}
