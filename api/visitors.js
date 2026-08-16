// Vercel serverless function — /api/visitors
// Proxies the CounterAPI call server-side, avoiding any browser CORS restrictions.

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const r = await fetch('https://api.counterapi.dev/v1/emmanlanusga/visits/up');
    if (!r.ok) throw new Error(`CounterAPI ${r.status}`);
    const data = await r.json();
    // Cache for 60 s on CDN edge so rapid reloads don't inflate the count
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json({ count: data.count });
  } catch (err) {
    return res.status(200).json({ count: null, error: err.message });
  }
};
