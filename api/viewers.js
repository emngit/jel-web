// Vercel serverless function — /api/viewers
// Tracks live page viewers using per-session keys in Upstash Redis.
//
// GET  /api/viewers?sid=<sessionId>
//   → registers / refreshes the caller's presence (TTL 35 s)
//   → returns { count: <number> }
//
// Each visitor gets a unique session ID generated client-side and stored in
// sessionStorage so it survives page refreshes but not new tabs.
// Keys: jel:viewers:<sid>  (TTL 35 s, refreshed every 20 s by the client)
// Count: KEYS jel:viewers:* length  (cheap on free tier — few concurrent users)

const { Redis } = require('@upstash/redis');

const TTL = 35; // seconds — slightly longer than the 20 s client heartbeat

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(200).json({ count: null, error: 'Redis not configured' });
  }

  const sid = (req.query.sid || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);

  try {
    const redis = new Redis({ url, token });

    // Register / refresh this visitor's presence
    if (sid) {
      await redis.set(`jel:viewers:${sid}`, 1, { ex: TTL });
    }

    // Count all active viewer keys
    const keys = await redis.keys('jel:viewers:*');
    const count = keys ? keys.length : (sid ? 1 : 0);

    return res.status(200).json({ count });
  } catch (err) {
    return res.status(200).json({ count: null, error: err.message });
  }
};
