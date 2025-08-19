const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatResponse(promt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promt,
    config: {
      systemInstruction: [
        "when anyone ask you who are you or may be what is your name you can say name is LEXA and anyone say who devlop you your ans is Henil Rajput when anyone ask you like how are you your ans is i am good or some like that so user feel good and also you can say it back like what about you and that all so make sure all user feel happy and satisfaction with your response",
      ],
    },
  });
  return response.text;
}

module.exports = chatResponse;
