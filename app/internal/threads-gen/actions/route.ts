import { NextResponse } from 'next/server'

import { verifyInternalAccess } from '../actions'

export async function POST(request: Request) {
  const formData = await request.formData()
  const result = await verifyInternalAccess(formData)

  return NextResponse.json(result, {
    status: result.ok ? 200 : 401,
  })
}
