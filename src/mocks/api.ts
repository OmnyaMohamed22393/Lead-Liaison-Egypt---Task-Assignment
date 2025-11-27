import { ITEMS, MockItem } from './data'

type FetchPostsOpts = { offset?: number; limit?: number; q?: string }

function randomDelay() {
  const delay = 300 + Math.floor(Math.random() * 700)
  return new Promise((res) => setTimeout(res, delay))
}

export async function fetchPosts({ offset = 0, limit = 20, q }: FetchPostsOpts) {
  const params = new URLSearchParams()
  params.set('offset', String(offset))
  params.set('limit', String(limit))
  if (q) params.set('q', q)

  const res = await fetch(`/api/posts?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch')
  const json = await res.json()
  // json shape: { offset, limit, total, items }
  return json as { offset: number; limit: number; total: number; items: MockItem[] }
}
