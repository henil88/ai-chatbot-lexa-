const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatResponse(conversationHistory) {
  const now = new Date();
  const BOT_TZ = process.env.BOT_TIMEZONE || "Asia/Kolkata";


  const currentDate = now.toLocaleDateString("en-GB", { timeZone: BOT_TZ }); 
  const currentDay = now.toLocaleDateString("en-GB", { weekday: "long", timeZone: BOT_TZ });
  const currentMonth = now.toLocaleDateString("en-GB", { month: "long", timeZone: BOT_TZ });
  const currentYear = now.getFullYear();

 
  const time24 = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: BOT_TZ,
  });
  const time24WithSec = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: BOT_TZ,
  });

  const time12 = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: BOT_TZ,
  });
  const time12WithSec = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: BOT_TZ,
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

  // --- Gemini Response ---
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
   • "What is the date today?" → "📅 Today's date is ${currentDate}."
   • "What is the time?" → "⏰ The current time is ${chosenTime}."
   • "What day is it?" → "🗓️ Today is ${currentDay}."
   • "What month is it?" → "📆 The current month is ${currentMonth}."
   • "What year is it?" → "📖 The current year is ${currentYear}."

⚠️ IMPORTANT:
- Default time format = 24-hour (HH:MM).
- If user asks for 12-hour → show AM/PM.
- Only include seconds if user explicitly asks.
- Use chat history to stay consistent and feel like you "remember" things.
- Do NOT say "I don’t store past messages" or "My information indicates".
- Only say "How can I assist you today?" when greeting.
- Always respond warmly, friendly, and professional in LEXA’s voice ✨
`,
    },
  });

  return response.text;
}

module.exports = chatResponse;
