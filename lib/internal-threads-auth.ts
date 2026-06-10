import { createHash } from 'node:crypto'

import { cookies } from 'next/headers'

export const THREADS_ACCESS_COOKIE = 'aisikim_threads_access'

function buildAccessSignature(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function getExpectedAccessKey() {
  return process.env.INTERNAL_ACCESS_KEY?.trim() ?? ''
}

export async function hasVerifiedInternalAccess() {
  const expected = getExpectedAccessKey()
  if (!expected) return false

  const cookieStore = await cookies()
  const stored = cookieStore.get(THREADS_ACCESS_COOKIE)?.value
  return stored === buildAccessSignature(expected)
}

export async function storeVerifiedInternalAccess() {
  const expected = getExpectedAccessKey()
  const cookieStore = await cookies()

  cookieStore.set(THREADS_ACCESS_COOKIE, buildAccessSignature(expected), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/internal/threads-gen',
    maxAge: 60 * 60 * 12,
  })
}
