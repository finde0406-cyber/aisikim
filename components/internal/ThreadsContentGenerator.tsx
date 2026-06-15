'use client'

import { useState } from 'react'
import {
  type BrandId,
  BRAND_OPTIONS,
  getTopicsForBrand,
  type ThreadsPost,
  type TopicOption,
  type TemplateType,
  TEMPLATE_OPTIONS,
} from '@/lib/threads-content'

type GenerateMode = 'single' | 'all-brands'

interface LastRequest {
  mode: GenerateMode
  brandId: BrandId
  topicIds: number[]
  templateIds: TemplateType[]
}

export default function ThreadsContentGenerator() {
  const [accessKey, setAccessKey] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [posts, setPosts] = useState<ThreadsPost[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [activeBrandId, setActiveBrandId] = useState<BrandId>('aisikim')
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([])
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<TemplateType[]>([])
  const [lastRequest, setLastRequest] = useState<LastRequest | null>(null)

  const topicOptions = getTopicsForBrand(activeBrandId)

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
      setPosts([])
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

  const generatePosts = async (payload: {
    mode: GenerateMode
    brandId: BrandId
    topicIds: number[]
    templateIds: TemplateType[]
  }) => {
    try {
      const res = await fetch('/internal/threads-gen/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await res.json()) as { posts?: ThreadsPost[]; message?: string }
      if (!res.ok || !result.posts) {
        if (res.status === 401) {
          setIsVerified(false)
          setPosts([])
          setError('접근 인증이 만료되었습니다. 다시 확인해주세요.')
          return
        }
        setError(result.message ?? '콘텐츠 생성에 실패했습니다. 잠시 후 다시 시도해주세요.')
        return
      }
      setError('')
      setPosts(result.posts)
      setLastRequest(payload)
    } catch {
      setError('콘텐츠 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleGenerate = () => {
    generatePosts({
      mode: 'single',
      brandId: activeBrandId,
      topicIds: selectedTopicIds,
      templateIds: selectedTemplateIds,
    })
  }

  const handleGenerateAllBrands = () => {
    generatePosts({
      mode: 'all-brands',
      brandId: activeBrandId,
      topicIds: [],
      templateIds: selectedTemplateIds,
    })
  }

  const handleRegenerate = () => {
    if (!lastRequest) return
    generatePosts(lastRequest)
  }

  const handleBrandChange = (brandId: BrandId) => {
    setActiveBrandId(brandId)
    setSelectedTopicIds([])
    setPosts([])
    setLastRequest(null)
    setError('')
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

  const copyToClipboard = async (text: string, id: string) => {
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
            브랜드별 Threads 초안을 빠르게 만들어서 바로 복사해 올릴 수 있는 내부 운영용 도구입니다.
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
            이 도구는 내부 운영용입니다. 선택한 브랜드 기준으로 문체와 CTA가 함께 바뀝니다.
          </p>
        </div>
      </div>
    )
  }

  const hasPosts = posts.length > 0

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
            setLastRequest(null)
            setSelectedTopicIds([])
            setSelectedTemplateIds([])
            setActiveBrandId('aisikim')
          }}
          className="text-xs text-gray-400 underline underline-offset-2"
        >
          잠금
        </button>
      </div>

      {!hasPosts && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            선택한 브랜드로 3개 초안을 만들거나, 3개 브랜드 각각 1개씩 바로 생성할 수 있습니다.
          </p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">브랜드 선택</p>
        <div className="flex flex-wrap gap-2">
          {BRAND_OPTIONS.map((brand) => {
            const selected = activeBrandId === brand.id
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={`rounded-full px-3 py-1.5 text-xs border transition-colors ${
                  selected ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                {brand.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">주제 선택</p>
        <div className="flex flex-wrap gap-2">
          {topicOptions.map((topic: TopicOption) => {
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
        <p className="text-xs font-medium text-gray-700 mb-2">템플릿 선택</p>
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
          onClick={handleGenerateAllBrands}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white active:bg-indigo-700"
        >
          3개 브랜드 각각 1개 생성
        </button>
        <button
          onClick={handleGenerate}
          className="w-full rounded-xl border-2 border-indigo-600 text-indigo-600 px-6 py-3 text-sm font-semibold active:bg-indigo-50"
        >
          선택한 브랜드로 3개 생성
        </button>
        {hasPosts && (
          <button
            onClick={handleRegenerate}
            className="w-full rounded-xl border border-gray-200 text-gray-700 px-6 py-3 text-sm font-semibold active:bg-gray-50"
          >
            다시 생성
          </button>
        )}
      </div>

      <div className="space-y-3 mb-4">
        {posts.map((post) => (
          <div key={`${post.brandId}-${post.id}-${post.template}`} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                {post.brandName}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-gray-500">
                {post.theme} · {post.template}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            <button
              onClick={() => copyToClipboard(post.content, `${post.brandId}-${post.id}`)}
              className={`w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                copiedId === `${post.brandId}-${post.id}`
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-indigo-600 text-white active:bg-indigo-700'
              }`}
            >
              {copiedId === `${post.brandId}-${post.id}` ? '✓ 복사됨' : '클립보드에 복사'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl px-4 py-3">
        <p className="text-[10px] text-gray-500 leading-relaxed">
          복사 후 Threads에 붙여넣기만 하면 됩니다.
        </p>
      </div>
    </div>
  )
}
