// Vercel serverless function — /api/chat
// Uses Google Gemini API. The key lives ONLY here (server-side env var).
// Automatically falls back through models if quota (429) or unavailable (404).

// Models tried in order — fastest/cheapest first, most capable last
const MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-3.6-flash',
];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY configuration.' });
  }

  const systemParts = messages
    .filter(m => m.role === 'system')
    .map(m => ({ text: m.content }));

  const conversationTurns = messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  const body = {
    ...(systemParts.length > 0 && {
      systemInstruction: { parts: systemParts },
    }),
    contents: conversationTurns,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  };

  let lastErr = '';
  for (const model of MODELS) {
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      // Retry next model on quota exceeded or model unavailable
      if (geminiRes.status === 429 || geminiRes.status === 404) {
        lastErr = `${model} → ${geminiRes.status}`;
        continue;
      }

      if (!geminiRes.ok) {
        const err = await geminiRes.text().catch(() => geminiRes.statusText);
        return res.status(502).json({ error: `Gemini API error (${model}): ${err}` });
      }

      const data = await geminiRes.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '(empty response)';
      return res.status(200).json({ content, model });
    } catch (err) {
      lastErr = `${model} → ${err.message}`;
    }
  }

  return res.status(503).json({ error: `All Gemini models unavailable. (${lastErr})` });
};
