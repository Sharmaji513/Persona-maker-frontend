// const API_URL = "http://localhost:8000/api/chat";

export async function callPersonaAI(prompt, persona) {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, persona })
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error(err);
    return "⚠️ Error: Could not connect to AI server.";
  }
}
