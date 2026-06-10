'use client'

import { useState } from 'react'
import { type ThreadsPost, type TopicOption, type TemplateType, TOPIC_OPTIONS, TEMPLATE_OPTIONS } from '@/lib/threads-content'

export default function ThreadsContentGenerator() {
  const [accessKey, setAccessKey] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [posts, setPosts] = useState<ThreadsPost[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([])
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<TemplateType[]>([])
  const [generatedMeta, setGeneratedMeta] = useState<string>('')

  const handleVerify = async () => {
    const trimmed = accessKey.trim()
    if (!trimmed) {
      setError('접근 키를 입력해주세요.')
      return
    }
    const formData = new FormData()
    formData.set('accessKey', trimmed)
    try {
      const res = await fetch('/internal/threads-gen/actions', {
        method: 'POST',
        body: formData,
      })
      const result = (await res.json()) as { ok: boolean; message?: string }
      if (!result.ok) {
        setError(result.message ?? '접근 키가 일치하지 않습니다.')
        setIsVerified(false)
        setPosts([])
        return
      }
      setError('')
      setIsVerified(true)
      await generatePosts([], [])
    } catch {
      setError('서버와 통신하지 못했습니다. 잠시 후 다시 시도해주세요.')
      setIsVerified(false)
      setPosts([])
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleVerify()
    }
  }

  const generatePosts = async (topicIds: number[], templateIds: TemplateType[]) => {
    try {
      const res = await fetch('/internal/threads-gen/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicIds, templateIds }),
      })

      const result = (await res.json()) as { posts?: ThreadsPost[]; meta?: string; message?: string }
      if (!res.ok || !result.posts) {
        if (res.status === 401) {
          setIsVerified(false)
          setPosts([])
          setGeneratedMeta('')
          setError('접근 인증이 만료되었습니다. 다시 확인해주세요.')
          return
        }

        setError(result.message ?? '콘텐츠 생성에 실패했습니다. 잠시 후 다시 시도해주세요.')
        return
      }

      setError('')
      setPosts(result.posts)
      setGeneratedMeta(result.meta ?? '')
    } catch {
      setError('콘텐츠 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleGenerate = () => {
    generatePosts(selectedTopicIds, selectedTemplateIds)
  }

  const handleRandom = () => {
    setSelectedTopicIds([])
    setSelectedTemplateIds([])
    generatePosts([], [])
  }

  const toggleTopic = (id: number) => {
    setSelectedTopicIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 5) return prev
      return [...prev, id]
    })
  }

  const toggleTemplate = (id: TemplateType) => {
    setSelectedTemplateIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      setError('클립보드 복사에 실패했습니다. 수동으로 복사해주세요.')
    }
  }

  if (!isVerified) {
    return (
      <div className="max-w-sm mx-auto w-full">
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-xs font-medium text-gray-400 mb-2">내부 운영용 도구</p>
          <h1 className="text-lg font-bold text-gray-900 mb-1">Threads 콘텐츠 생성기</h1>
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            AI시킴 관련 Threads 홍보 콘텐츠를 자동으로 생성합니다.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">접근 키</label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="접근 키를 입력하세요"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              onClick={handleVerify}
              className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white active:bg-indigo-700"
            >
              확인
            </button>
          </div>

          <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
            이 도구는 내부 운영용입니다. 생성된 콘텐츠에는 AI시킴 브랜드가 자동 포함됩니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-gray-400 mb-0.5">내부 운영용 도구</p>
          <h1 className="text-lg font-bold text-gray-900">Threads 콘텐츠 생성기</h1>
        </div>
        <button
          onClick={() => {
            setIsVerified(false)
            setAccessKey('')
            setPosts([])
            setError('')
          }}
          className="text-xs text-gray-400 underline underline-offset-2"
        >
          잠금
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">주제 선택 (최대 5개)</p>
        <div className="flex flex-wrap gap-2">
          {TOPIC_OPTIONS.map((topic: TopicOption) => {
            const selected = selectedTopicIds.includes(topic.id)
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                  selected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                {topic.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">템플릿 선택 (최대 4개)</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_OPTIONS.map((option) => {
            const selected = selectedTemplateIds.includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => toggleTemplate(option.id)}
                className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                  selected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={handleGenerate}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white active:bg-indigo-700"
        >
          선택한 항목으로 생성
        </button>
        <button
          onClick={handleRandom}
          className="w-full rounded-xl border-2 border-indigo-600 text-indigo-600 px-6 py-3 text-sm font-semibold active:bg-indigo-50"
        >
          전체에서 랜덤 생성
        </button>
      </div>

      {generatedMeta ? <p className="text-[10px] text-gray-400 mb-3">{generatedMeta}</p> : null}

      <div className="space-y-4 mb-4">
        {posts.map((post) => (
          <div key={`${post.id}-${post.template}`} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-gray-400">
                {post.theme} · {TEMPLATE_OPTIONS.find((t) => t.id === post.template)?.label ?? post.template}
              </span>
              <span className="text-[10px] text-gray-300">200~400자</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            <button
              onClick={() => copyToClipboard(post.content, post.id)}
              className={`w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                copiedId === post.id
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-indigo-600 text-white active:bg-indigo-700'
              }`}
            >
              {copiedId === post.id ? '✓ 복사됨' : '클립보드에 복사'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl px-4 py-3">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          AI시킴 브랜드가 자동으로 포함됩니다. 복사 후 Threads에 붙여넣기만 하면 됩니다.
        </p>
      </div>
    </div>
  )
}
