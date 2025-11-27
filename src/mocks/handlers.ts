import { rest } from 'msw'
import { ITEMS } from './data'

export const handlers = [
  rest.get('/api/posts', async (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset') || '0')
    const limit = Number(req.url.searchParams.get('limit') || '20')
    const q = req.url.searchParams.get('q') || undefined

    // simulate server-side delay
    const delay = 300 + Math.floor(Math.random() * 700)
    await new Promise(r => setTimeout(r, delay))

    let items = ITEMS
    if (q) {
      const lc = q.toLowerCase()
      items = items.filter(i => i.title.toLowerCase().includes(lc) || i.body.toLowerCase().includes(lc))
    }

    const sliced = items.slice(offset, offset + limit)

    return res(
      ctx.status(200),
      ctx.json({ offset, limit, total: items.length, items: sliced })
    )
  }),
]
