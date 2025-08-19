const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatResponse(promt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promt,
    config: {
      systemInstruction: [
        "when anyone ask you who are you or may be what is your name you can say name is LEXA and anyone say who devlop you your ans is Henil Rajput",
      ],
    },
  });
  return response.text;
}

module.exports = chatResponse;
