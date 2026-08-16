// Vercel serverless function — /api/sessions
// GET (admin only) → { sessions: [{ id, lastMsg, unread }] }

const { Redis } = require('@upstash/redis');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.ADMIN_SECRET;
  if (!secret || req.headers['x-admin-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return res.status(500).json({ error: 'Redis not configured' });
  }

  const redis = new Redis({ url, token });

  const ids = await redis.smembers('jel:chat:sessions');
  if (!ids || ids.length === 0) {
    return res.status(200).json({ sessions: [] });
  }

  const sessions = await Promise.all(
    ids.map(async (id) => {
      const raw = await redis.lrange(`jel:chat:${id}`, 0, -1);
      const messages = raw.map(r => (typeof r === 'string' ? JSON.parse(r) : r));
      const last = messages[messages.length - 1] ?? null;
      const unread = messages.filter(m => m.role === 'user').length;
      return { id, messages, lastMsg: last, unread };
    })
  );

  return res.status(200).json({ sessions });
};
