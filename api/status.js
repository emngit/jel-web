// Vercel serverless function — /api/status
// GET  → { online: boolean }
// POST → { online: boolean }  (requires x-admin-secret header)
// Uses the same Upstash Redis instance as /api/visitors.

const { Redis } = require('@upstash/redis');

const KEY = 'jel:online';

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Redis not configured' });
  }

  const redis = new Redis({ url, token });

  // ── GET — public: anyone can check if JEL is online ──────────────────────
  if (req.method === 'GET') {
    const val = await redis.get(KEY);
    return res.status(200).json({ online: val === '1' });
  }

  // ── POST — protected: only JEL can toggle ────────────────────────────────
  if (req.method === 'POST') {
    const secret = process.env.ADMIN_SECRET;
    if (!secret || req.headers['x-admin-secret'] !== secret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { online } = req.body ?? {};
    if (typeof online !== 'boolean') {
      return res.status(400).json({ error: 'Body must be { online: boolean }' });
    }

    await redis.set(KEY, online ? '1' : '0');
    return res.status(200).json({ online });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
