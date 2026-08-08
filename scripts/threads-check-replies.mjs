// 스레드 새 답글 감지 — 이전 확인 시점과 비교해 새로 생긴 답글만 출력
// 사용법: node scripts/threads-check-replies.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENV_PATH = path.join(ROOT, '.env.local')
const STATE_PATH = path.join(ROOT, 'scripts', 'threads-queue', 'reply-state.json')
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

async function api(pathname, params = {}) {
  const url = new URL(`${API}${pathname}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok) throw new Error(data?.error?.message ?? `HTTP ${res.status}`)
  return data
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'))
  } catch {
    return {}
  }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true })
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8')
}

async function main() {
  const token = readEnv().THREADS_ACCESS_TOKEN
  if (!token) throw new Error('THREADS_ACCESS_TOKEN 없음')

  const state = loadState()
  const list = await api('/me/threads', { fields: 'id,permalink', limit: '15', access_token: token })
  const posts = list.data ?? []

  let foundNew = false
  for (const p of posts) {
    let repliesData
    try {
      repliesData = await api(`/${p.id}/replies`, {
        fields: 'id,text,username,timestamp',
        access_token: token,
      })
    } catch {
      continue
    }
    const seen = new Set(state[p.id] ?? [])
    const newReplies = (repliesData.data ?? []).filter((r) => !seen.has(r.id))
    if (newReplies.length > 0) {
      foundNew = true
      console.log(`NEW_REPLY on ${p.permalink}`)
      for (const r of newReplies) {
        console.log(`  [id:${r.id}] @${r.username}: ${r.text}`)
      }
    }
    state[p.id] = (repliesData.data ?? []).map((r) => r.id)
  }

  saveState(state)
  if (!foundNew) console.log('새 답글 없음')
}

main().catch((err) => {
  console.error('오류:', err.message)
  process.exit(1)
})
