// netlify/functions/generate.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const prompt = body.prompt || '';

    if(!prompt) return { statusCode: 400, body: 'Prompt required' };

    const API_KEY = process.env.GROQ_API_KEY;
    if(!API_KEY) return { statusCode: 500, body: 'Server: GROQ_API_KEY not configured' };

    const payload = {
      model: "mixtral-8x7b",
      messages: [
        { role: 'system', content: 'You are a poet: produce 4 short Hindi/Urdu shayari lines about the user prompt. Keep it emotional, lyrical and short. Return plain text only.' },
        { role: 'user', content: `Write a 4-line shayari about: ${prompt}` }
      ],
      max_tokens: 200,
      temperature: 0.85
    };

    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: JSON.stringify(payload)
    });

    if(!resp.ok){
      const t = await resp.text();
      return { statusCode: resp.status, body: t };
    }

    const j = await resp.json();
    const text = j.choices && j.choices[0] && (j.choices[0].message?.content || j.choices[0].text) || '';
    return { statusCode: 200, body: JSON.stringify({ text }) };

  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};
