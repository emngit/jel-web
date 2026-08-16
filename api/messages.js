// Vercel serverless function — /api/messages
//
// GET  ?session=<id>            → { messages: [...] }  (visitor or admin polls)
// POST { session, role, text }  → 201  (visitor sends; role="user")
// POST { session, role, text, secret } → 201  (admin replies; role="assistant")
//
// Each chat session is a Redis list: jel:chat:<sessionId>
// Messages are JSON strings: { role, text, ts }
// Sessions expire after 24 hours.

const { Redis } = require('@upstash/redis');

const TTL = 60 * 60 * 24; // 24 h

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Redis not configured' });
  }

  const redis = new Redis({ url, token });

  // ── GET — poll for messages ───────────────────────────────────────────────
  if (req.method === 'GET') {
    const session = req.query?.session;
    if (!session) return res.status(400).json({ error: 'session required' });

    const raw = await redis.lrange(`jel:chat:${session}`, 0, -1);
    const messages = raw.map(r => (typeof r === 'string' ? JSON.parse(r) : r));
    return res.status(200).json({ messages });
  }

  // ── POST — add a message ──────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { session, role, text } = req.body ?? {};

    if (!session || !role || !text) {
      return res.status(400).json({ error: 'session, role, text required' });
    }

    // Admin replies need the secret
    if (role === 'assistant') {
      const secret = process.env.ADMIN_SECRET;
      if (!secret || req.body.secret !== secret) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    const entry = JSON.stringify({ role, text, ts: Date.now() });
    const key   = `jel:chat:${session}`;
    await redis.rpush(key, entry);
    await redis.expire(key, TTL);

    // Also store the session ID in a set so admin can see all active sessions
    if (role === 'user') {
      const setKey = 'jel:chat:sessions';
      await redis.sadd(setKey, session);
      await redis.expire(setKey, TTL);
    }

    return res.status(201).json({ ok: true });
  }

  // ── GET /api/messages/sessions — admin list all active sessions ───────────
  return res.status(405).json({ error: 'Method not allowed' });
};
