// Vercel serverless function — /api/visitors
// Uses Upstash Redis (free tier) as a persistent counter.
// Requires two env vars set in Vercel dashboard:
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN

const { Redis } = require('@upstash/redis');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(200).json({ count: null, error: 'Redis not configured' });
  }

  try {
    const redis = new Redis({ url, token });
    const count = await redis.incr('jel-web:visits');
    res.setHeader('Cache-Control', 'no-store'); // always fresh
    return res.status(200).json({ count });
  } catch (err) {
    return res.status(200).json({ count: null, error: err.message });
  }
};
