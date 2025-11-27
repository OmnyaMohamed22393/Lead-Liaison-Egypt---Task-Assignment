// Simple Vercel Serverless function that returns paginated mock posts.
// Supports query params: offset (number), limit (number), q (search string)

function generateMockItems(count = 181) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: String(i),
      title: `Mock post #${i}`,
      body: `This is the body of mock post number ${i}. It contains some sample text to demonstrate pagination and search.`,
      createdAt: new Date(Date.now() - i * 1000 * 60).toISOString(),
    });
  }
  return items;
}

module.exports = (req, res) => {
  try {
    const { offset = '0', limit = '20', q = '' } = req.query || {};
    const off = Math.max(0, parseInt(offset, 10) || 0);
    const lim = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));

    const all = generateMockItems(181);
    const query = String(q || '').trim().toLowerCase();

    const filtered = query
      ? all.filter((it) => (it.title + ' ' + (it.body || '')).toLowerCase().includes(query))
      : all;

    const total = filtered.length;
    const items = filtered.slice(off, off + lim);

    // Optional: set caching headers for small TTL in production
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    res.status(200).json({ offset: off, limit: lim, total, items });
  } catch (err) {
    // Unexpected error
    // eslint-disable-next-line no-console
    console.error('api/posts error', err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
