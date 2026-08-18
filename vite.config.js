import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

// Load .env.local manually for the dev API handler
function loadEnvLocal() {
  try {
    const raw = readFileSync('.env.local', 'utf-8');
    const env = {};
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
    return env;
  } catch {
    return {};
  }
}

// Vite plugin: serves /api/chat locally so plain `vite dev` works
function localApiPlugin() {
  const env = loadEnvLocal();
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', async () => {
          try {
            const { messages } = JSON.parse(Buffer.concat(chunks).toString());
            if (!Array.isArray(messages) || messages.length === 0) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'messages array required' }));
              return;
            }

            const apiKey = env.GEMINI_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Server is missing GEMINI_API_KEY in .env.local' }));
              return;
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
              ...(systemParts.length > 0 && { systemInstruction: { parts: systemParts } }),
              contents: conversationTurns,
              generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
            };

            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
              { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
            );

            if (!geminiRes.ok) {
              const err = await geminiRes.text().catch(() => geminiRes.statusText);
              res.statusCode = 502;
              res.end(JSON.stringify({ error: `Gemini API ${geminiRes.status}: ${err}` }));
              return;
            }

            const data = await geminiRes.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '(empty response)';
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ content }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
});
