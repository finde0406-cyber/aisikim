// 매일 자동 발행 러너 — Windows 작업 스케줄러가 실행
// 동작: scripts/threads-queue/의 가장 낮은 번호 .txt를 발행하고 published/로 이동, log.txt에 기록
// 일요일에는 토큰 갱신(refresh)도 시도한다 (60일 만료 방지)
// 사용법: node scripts/threads-daily.mjs [--dry]

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENV_PATH = path.join(ROOT, '.env.local')
const QUEUE = path.join(ROOT, 'scripts', 'threads-queue')
const PUBLISHED = path.join(QUEUE, 'published')
const LOG = path.join(QUEUE, 'log.txt')
const API = 'https://graph.threads.net/v1.0'
const DRY = process.argv.includes('--dry')

fs.mkdirSync(PUBLISHED, { recursive: true })

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  fs.appendFileSync(LOG, line + '\n', 'utf8')
}

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

async function api(pathname, { method = 'GET', params = {} } = {}) {
  const url = new URL(pathname.startsWith('http') ? pathname : `${API}${pathname}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url, { method })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error?.message ?? `HTTP ${res.status}`)
  return data
}

async function main() {
  const token = readEnv().THREADS_ACCESS_TOKEN
  if (!token) throw new Error('.env.local에 THREADS_ACCESS_TOKEN 없음')

  // 일요일 토큰 갱신 (실패해도 발행은 계속)
  if (new Date().getDay() === 0 && !DRY) {
    try {
      const data = await api('https://graph.threads.net/refresh_access_token', {
        params: { grant_type: 'th_refresh_token', access_token: token },
      })
      if (data.access_token) {
        const lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)
        fs.writeFileSync(
          ENV_PATH,
          lines
            .map((l) =>
              l.startsWith('THREADS_ACCESS_TOKEN=')
                ? `THREADS_ACCESS_TOKEN=${data.access_token}`
                : l
            )
            .join('\n'),
          'utf8'
        )
        log(`토큰 갱신 완료 (${Math.round((data.expires_in ?? 0) / 86400)}일 유효)`)
      }
    } catch (err) {
      log(`토큰 갱신 실패(발행은 계속): ${err.message}`)
    }
  }

  // 큐에서 다음 글 선택
  const files = fs
    .readdirSync(QUEUE)
    .filter((f) => /^\d+\.txt$/.test(f)) // 숫자 파일명만 큐 대상 (log.txt 등 제외)
    .sort()
  if (files.length === 0) {
    log('큐 비어있음 — 발행할 글 없음 (세션에서 큐 보충 필요)')
    return
  }
  const file = files[0]
  const text = fs.readFileSync(path.join(QUEUE, file), 'utf8').replace(/^﻿/, '').trim()

  if (DRY) {
    log(`[DRY] 발행 예정 파일: ${file} (${text.length}자) — 실제 발행 안 함`)
    return
  }

  // 발행
  const container = await api('/me/threads', {
    method: 'POST',
    params: { media_type: 'TEXT', text, topic_tag: 'AI자동화', access_token: token },
  })
  await new Promise((r) => setTimeout(r, 2000))
  const published = await api('/me/threads_publish', {
    method: 'POST',
    params: { creation_id: container.id, access_token: token },
  })
  const detail = await api(`/${published.id}`, {
    params: { fields: 'permalink', access_token: token },
  })

  // 발행된 파일 이동
  const stamp = new Date().toISOString().slice(0, 10)
  fs.renameSync(path.join(QUEUE, file), path.join(PUBLISHED, `${stamp}-${file}`))
  log(`발행 완료: ${file} → ${detail.permalink ?? published.id} (큐 잔여 ${files.length - 1}개)`)
}

main().catch((err) => {
  log(`오류: ${err.message}`)
  process.exit(1)
})
