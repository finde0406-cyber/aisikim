// Threads API CLI — 검증/발행/답글/토큰갱신
// 사용법:
//   node scripts/threads.mjs verify                 계정 연결 확인
//   node scripts/threads.mjs publish "글 내용"      텍스트 발행
//   node scripts/threads.mjs publish-file 경로      파일 내용 발행 (UTF-8)
//   node scripts/threads.mjs refresh                장기 토큰 갱신 (60일 연장, 발급 24시간 후부터 가능)
// 토큰은 .env.local의 THREADS_ACCESS_TOKEN에서 읽으며 절대 출력하지 않는다.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENV_PATH = path.join(ROOT, '.env.local')
const API = 'https://graph.threads.net/v1.0'

function readEnv() {
  const env = {}
  for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
    const i = line.indexOf('=')
    if (i > 0 && /^[A-Za-z_]/.test(line)) {
      env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^﻿/, '')
    }
  }
  return env
}

function getToken() {
  const token = readEnv().THREADS_ACCESS_TOKEN
  if (!token) {
    console.error('실패: .env.local에 THREADS_ACCESS_TOKEN이 없습니다')
    process.exit(1)
  }
  return token
}

async function api(pathname, { method = 'GET', params = {} } = {}) {
  const url = new URL(
    pathname.startsWith('http') ? pathname : `${API}${pathname}`
  )
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url, { method })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error?.message ?? `HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}

async function verify(token) {
  const me = await api('/me', {
    params: { fields: 'id,username,name', access_token: token },
  })
  console.log(`연결 확인: @${me.username} (id: ${me.id})`)
  return me
}

async function publishText(token, text) {
  if (!text || !text.trim()) throw new Error('발행할 내용이 비어 있습니다')
  if (text.length > 500) throw new Error(`글자 수 초과: ${text.length}/500`)

  const container = await api('/me/threads', {
    method: 'POST',
    params: { media_type: 'TEXT', text, access_token: token },
  })
  // 컨테이너 처리 대기 (텍스트는 보통 즉시 가능하지만 안전하게 잠시 대기)
  await new Promise((r) => setTimeout(r, 2000))
  const published = await api('/me/threads_publish', {
    method: 'POST',
    params: { creation_id: container.id, access_token: token },
  })
  const detail = await api(`/${published.id}`, {
    params: { fields: 'id,permalink', access_token: token },
  })
  console.log(`발행 완료: ${detail.permalink ?? published.id}`)
  return published
}

async function status(token) {
  const me = await verify(token)
  const list = await api('/me/threads', {
    params: {
      fields: 'id,text,permalink,timestamp',
      limit: '10',
      access_token: token,
    },
  })
  const posts = list.data ?? []
  if (posts.length === 0) {
    console.log('발행된 글이 없습니다')
    return
  }
  for (const p of posts) {
    let metrics = 'insights 조회 실패'
    try {
      const ins = await api(`/${p.id}/insights`, {
        params: { metric: 'views,likes,replies,reposts,quotes', access_token: token },
      })
      const m = {}
      for (const d of ins.data ?? []) m[d.name] = d.values?.[0]?.value ?? d.total_value?.value ?? 0
      metrics = `조회 ${m.views ?? 0} · 좋아요 ${m.likes ?? 0} · 답글 ${m.replies ?? 0} · 리포스트 ${m.reposts ?? 0}`
    } catch (err) {
      metrics = `insights 오류: ${err.message}`
    }
    const preview = (p.text ?? '').replace(/\s+/g, ' ').slice(0, 30)
    console.log(`[${p.timestamp}] "${preview}..." — ${metrics}`)
    console.log(`  ${p.permalink}`)
  }
}

async function search(token, query) {
  const res = await api('/keyword_search', {
    params: {
      q: query,
      search_type: 'RECENT',
      fields: 'id,text,username,permalink,timestamp',
      access_token: token,
    },
  })
  const posts = (res.data ?? []).slice(0, 8)
  for (const p of posts) {
    const preview = (p.text ?? '').replace(/\s+/g, ' ').slice(0, 50)
    console.log(`[${p.id}] @${p.username}: "${preview}..."`)
    console.log(`  ${p.permalink}`)
  }
  return posts
}

async function reply(token, replyToId, text) {
  const container = await api('/me/threads', {
    method: 'POST',
    params: { media_type: 'TEXT', text, reply_to_id: replyToId, access_token: token },
  })
  await new Promise((r) => setTimeout(r, 2000))
  const published = await api('/me/threads_publish', {
    method: 'POST',
    params: { creation_id: container.id, access_token: token },
  })
  console.log(`답글 발행: ${published.id}`)
}

async function refresh(token) {
  const data = await api('https://graph.threads.net/refresh_access_token', {
    params: { grant_type: 'th_refresh_token', access_token: token },
  })
  if (!data.access_token) throw new Error('갱신 응답에 토큰 없음')
  // .env.local의 토큰 라인 교체 (BOM 없는 UTF-8)
  const lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)
  const out = lines.map((l) =>
    l.startsWith('THREADS_ACCESS_TOKEN=')
      ? `THREADS_ACCESS_TOKEN=${data.access_token}`
      : l
  )
  fs.writeFileSync(ENV_PATH, out.join('\n'), { encoding: 'utf8' })
  const days = Math.round((data.expires_in ?? 0) / 86400)
  console.log(`토큰 갱신 완료 — 유효기간 약 ${days}일`)
}

const [, , cmd, ...args] = process.argv
const token = getToken()

try {
  if (cmd === 'verify') {
    await verify(token)
  } else if (cmd === 'publish') {
    await verify(token)
    await publishText(token, args.join(' '))
  } else if (cmd === 'publish-file') {
    await verify(token)
    const text = fs.readFileSync(args[0], 'utf8').replace(/^﻿/, '')
    await publishText(token, text)
  } else if (cmd === 'refresh') {
    await refresh(token)
  } else if (cmd === 'status') {
    await status(token)
  } else if (cmd === 'search') {
    await search(token, args.join(' '))
  } else if (cmd === 'reply') {
    const [replyToId, ...rest] = args
    await reply(token, replyToId, rest.join(' '))
  } else {
    console.log('사용법: node scripts/threads.mjs verify | publish "내용" | publish-file 경로 | refresh | status | search "키워드" | reply <id> "내용"')
    process.exit(1)
  }
} catch (err) {
  console.error('오류:', err.message)
  process.exit(1)
}
