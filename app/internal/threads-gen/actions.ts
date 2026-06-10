'use server'

import { revalidatePath } from 'next/cache'

import { storeVerifiedInternalAccess } from '@/lib/internal-threads-auth'

export async function verifyInternalAccess(formData: FormData) {
  const key = (formData.get('accessKey') as string | null)?.trim() ?? ''
  const expected = process.env.INTERNAL_ACCESS_KEY?.trim() ?? ''

  if (!expected || key !== expected) {
    return { ok: false as const, message: '접근 키가 일치하지 않습니다.' }
  }

  await storeVerifiedInternalAccess()
  revalidatePath('/internal/threads-gen')
  return { ok: true as const }
}
