import { NextResponse } from 'next/server'

import {
  buildThreadsPosts,
  TEMPLATE_OPTIONS,
  type TemplateType,
  TOPIC_OPTIONS,
} from '@/lib/threads-content'
import { hasVerifiedInternalAccess } from '@/lib/internal-threads-auth'

const VALID_TOPIC_IDS = new Set(TOPIC_OPTIONS.map((topic) => topic.id))
const VALID_TEMPLATE_IDS = new Set<TemplateType>(TEMPLATE_OPTIONS.map((template) => template.id))

function sanitizeTopicIds(value: unknown) {
  if (!Array.isArray(value)) return undefined

  const ids = value
    .filter((item): item is number => typeof item === 'number' && Number.isInteger(item))
    .filter((id) => VALID_TOPIC_IDS.has(id))
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
    topicIds?: unknown
    templateIds?: unknown
  }

  const topicIds = sanitizeTopicIds(body.topicIds)
  const templateIds = sanitizeTemplateIds(body.templateIds)
  const posts = buildThreadsPosts(topicIds, templateIds, 3)

  return NextResponse.json({ posts })
}
