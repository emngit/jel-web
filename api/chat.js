// Vercel serverless function — /api/chat
// Uses Google Gemini API. The key lives ONLY here (server-side env var).
// The browser never sees it.

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

  try {
    // Convert OpenAI-style messages to Gemini format.
    // system messages are injected as systemInstruction (Gemini 1.5+)
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

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text().catch(() => geminiRes.statusText);
      return res.status(502).json({ error: `Gemini API ${geminiRes.status}: ${err}` });
    }

    const data = await geminiRes.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '(empty response)';
    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
