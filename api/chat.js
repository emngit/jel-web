// Vercel serverless function — /api/chat
// The GitHub OAuth token lives ONLY here (server-side env var).
// The browser never sees it.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model = 'gpt-4o' } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const userToken = process.env.COPILOT_TOKEN;
  if (!userToken) {
    return res.status(500).json({ error: 'Server is missing COPILOT_TOKEN configuration.' });
  }

  try {
    // Step 1: exchange the GitHub OAuth user token for a short-lived Copilot token
    const tokenRes = await fetch('https://api.github.com/copilot_internal/v2/token', {
      headers: {
        Authorization: `token ${userToken}`,
        Accept: 'application/json',
      },
    });
    if (!tokenRes.ok) {
      const err = await tokenRes.text().catch(() => tokenRes.statusText);
      return res.status(502).json({ error: `Copilot token exchange ${tokenRes.status}: token may be expired or invalid.` });
    }
    const tokenBody = await tokenRes.text();
    let token;
    try {
      token = JSON.parse(tokenBody).token;
    } catch {
      return res.status(502).json({ error: `Copilot token exchange returned non-JSON response. Token may be expired.` });
    }
    if (!token) {
      return res.status(502).json({ error: `Copilot token exchange succeeded but returned no token.` });
    }

    // Step 2: call the Copilot completions API with the short-lived token
    const chatRes = await fetch('https://api.githubcopilot.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Editor-Version': 'vscode/1.89.0',
        'Copilot-Integration-Id': 'vscode-chat',
      },
      body: JSON.stringify({ model, messages, max_tokens: 1024, temperature: 0.7 }),
    });
    if (!chatRes.ok) {
      const err = await chatRes.text().catch(() => chatRes.statusText);
      return res.status(502).json({ error: `Copilot API ${chatRes.status}: ${err}` });
    }

    const data = await chatRes.json();
    const content = data.choices?.[0]?.message?.content ?? '(empty response)';
    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
