async function getChristmasMessage() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Generate a short festive Christmas message.",
        },
        {
          role: "user",
          content: "Write a crhistmass messahe as we get closer to christmas",
        },
      ],
      max_tokens: 60,
    }),
  });

  const data = await response.json();

  document.getElementById("christmas-message").innerText =
    data.choices[0].message.content;
}

getChristmasMessage();
