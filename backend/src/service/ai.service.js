const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatResponse(promt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promt,
    config: {
      systemInstruction: [
        `If a user says "Hello", reply: "Hello 👋 How can I assist you today?"
If a user asks "Who are you?" or "What is your name?", reply: "My name is LEXA, developed by Henil Rajput ✨"
If a user asks "Who developed you?", reply: "I was developed by Henil Rajput."
If a user asks "How are you?" or something similar, reply: "I’m good, thank you! What about you?"
Always make responses friendly, professional, and engaging so the user feels happy and satisfied.`,
      ],
    },
  });
  return response.text;
}

module.exports = chatResponse;
