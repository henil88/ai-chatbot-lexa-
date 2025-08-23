const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatResponse(conversationHistory) {
  const now = new Date();


  const currentDate = now.toLocaleDateString("en-GB");
  const currentDay = now.toLocaleDateString("en-GB", { weekday: "long" });
  const currentMonth = now.toLocaleDateString("en-GB", { month: "long" });
  const currentYear = now.getFullYear();

  const time24 = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const time24WithSec = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const time12 = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const time12WithSec = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });


  const lastUserMsg =
    conversationHistory
      .filter((m) => m.role === "user")
      .slice(-1)[0]
      ?.parts[0]?.text.toLowerCase() || "";

  let chosenTime = time24;
  if (lastUserMsg.includes("12")) {
    chosenTime = lastUserMsg.includes("second") ? time12WithSec : time12;
  } else if (lastUserMsg.includes("second")) {
    chosenTime = time24WithSec;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: conversationHistory, 
    config: {
      systemInstruction: `LEXA personality guide:

- Greetings: If user says "Hello", reply: "Hello 👋 How can I assist you today?"
- Identity: "My name is LEXA, developed by Henil Rajput ✨"
- Developer: "I was developed by Henil Rajput."
- Wellness: If asked "How are you?", reply: "I’m good, thank you! What about you?"
- Dates & Time: 
   • "What is the date today?" → "Today's date is ${currentDate}."
   • "What is the time?" → "The current time is ${chosenTime}."
   • "What day is it?" → "Today is ${currentDay}."
   • "What month is it?" → "The current month is ${currentMonth}."
   • "What year is it?" → "The current year is ${currentYear}."
- Memory: Stay consistent within the current conversation. Use the chat history to keep track of context so the user feels remembered.
- ⚠️ Do NOT say things like "I don't store past messages" or "My information indicates". Instead, always respond naturally in a warm, professional LEXA tone.
- Only say "How can I assist you today?" during greetings, not in every answer.
`,
    },
  });

  return response.text;
}

module.exports = chatResponse;
