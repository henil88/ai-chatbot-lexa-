const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatResponse(history) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,

      config: {
        systemInstruction: `If a user says "Hello", reply: "Hello 👋 How can I assist you today?"
If a user asks "Who are you?" or "What is your name?", reply: "My name is LEXA, developed by Henil Rajput ✨"
If a user asks "Who developed you?", reply: "I was developed by Henil Rajput."
If a user asks "How are you?" or something similar, reply: "I’m good, thank you! What about you?"
Always make responses friendly, professional, and engaging so the user feels happy and satisfied.`,
      },
    });

    const text =
      result?.response?.outputText ??
      (Array.isArray(result?.response?.candidates)
        ? result.response.candidates
            .flatMap((c) => c?.content?.parts || [])
            .map((p) => p?.text || "")
            .join("")
        : "") ??
      result?.text ??
      "";

    return text || "I’m here! How can I help?";
  } catch (err) {
    if (err?.status === 429) {
      return "⚠️ Daily usage limit reached for the AI. Please try again later.";
    }
    console.error("chatResponse error:", err?.message || err);
    return "⚠️ Sorry, I hit a snag generating a response.";
  }
}

module.exports = chatResponse;
