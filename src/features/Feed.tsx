import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPosts } from '../mocks/api'
import debounce from 'lodash.debounce'
import ItemCard from '../ui/ItemCard'

type Post = {
  id: number
  title: string
  body: string
}

const PAGE_SIZE = 20

export default function Feed() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const [query, setQuery] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ['posts', query],
    ({ pageParam = 0 }) => fetchPosts({ offset: pageParam, limit: PAGE_SIZE, q: query }),
    {
      getNextPageParam: (lastPage) => {
        const { offset, total } = lastPage
        const next = offset + lastPage.items.length
        return next < total ? next : undefined
      },
    }
  )

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0]
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  React.useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [onIntersect])

  // reset to first page when query changes
  useEffect(() => {
    // React Query will refetch because query key changed
    // scroll to top of feed for UX
    const el = document.querySelector('.feed')
    if (el) el.scrollTop = 0
  }, [query])

  // debounced input handler (applies to query used by react-query)
  const debouncedSetQuery = React.useMemo(() => debounce((v: string) => setQuery(v), 300), [])

  useEffect(() => () => debouncedSetQuery.cancel(), [debouncedSetQuery])

  // helper: apply search immediately (cancel debounce)
  const applySearchNow = (value: string) => {
    debouncedSetQuery.cancel()
    setQuery(value)
  }

  if (isLoading) return (
    <div className="grid">
      {Array.from({ length: 6 }).map((_, i) => (
        // skeleton cards
        <ItemCard key={`s-${i}`} loading />
      ))}
    </div>
  )

  if (isError) return (
    <div className="center error">
      <p>Failed to load posts.</p>
      <button onClick={() => refetch()}>Retry</button>
    </div>
  )

  return (
    <div className="feed">
      <div style={{ marginBottom: 12 }} className="controls">
        <div className="brand">
          <div className="logo">IS</div>
          <h1>Infinite Scroll Feed</h1>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            aria-label="Search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => {
              const v = e.target.value
              setSearchTerm(v)
              debouncedSetQuery(v)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applySearchNow(searchTerm)
              }
            }}
            style={{ padding: 10, width: 320, borderRadius: 10, border: '1px solid #e2e8f0' }}
          />
          {searchTerm ? (
            <button onClick={() => { setSearchTerm(''); applySearchNow('') }} aria-label="Clear search">Clear</button>
          ) : null}
        </div>
      </div>
      <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: '#475569' }}>
          {data ? `Showing ${data.pages.flatMap(p => p.items).length} of ${data.pages[0]?.total ?? 0} results` : ''}
        </div>
      </div>

      <div className="grid">
        {data?.pages.flatMap(p => p.items).map((post: Post) => (
          <ItemCard key={post.id} title={post.title} body={post.body} />
        ))}
      </div>

      <div className="center" ref={sentinelRef}>
        {isFetchingNextPage ? (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <ItemCard loading />
            <ItemCard loading />
          </div>
        ) : hasNextPage ? 'Scroll to load more' : 'No more items'}
      </div>
    </div>
  )
}
