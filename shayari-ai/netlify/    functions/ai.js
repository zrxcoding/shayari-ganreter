import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { keyword } = JSON.parse(event.body);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Write a deep emotional 4 line shayari about "${keyword}" in Hinglish with emojis.`
          }
        ]
      })
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
