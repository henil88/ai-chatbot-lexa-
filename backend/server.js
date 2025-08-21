require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const chatResponse = require("./src/service/ai.service");

const httpServer = createServer(app);

const sessions = Object.create(null);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://ai-chatbot-lexa.netlify.app", 
      "http://localhost:5173",               
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
 
});

io.on("connection", (socket) => {
  const userId = String(socket.handshake.query.userId || socket.id);
  console.log("socket connected:", socket.id, "userId:", userId);

  if (!sessions[userId]) sessions[userId] = [];

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id, "userId:", userId);
  
  });

  socket.on("message", async (data) => {
    try {
      sessions[userId].push({
        role: "user",
        parts: [{ text: String(data ?? "") }],
      });

      const responseText = await chatResponse(sessions[userId]);

      sessions[userId].push({
        role: "model",
        parts: [{ text: responseText }],
      });

      console.log(`Reply to userId ${userId}:`, responseText);

      socket.emit("message-res", { response: responseText });
    } catch (err) {
      console.error("AI error:", err?.message || err);
      const friendly =
        err?.status === 429
          ? " I'm at my daily usage limit right now. Please try again later."
          : "Oops, something went wrong. Please try again.";
      socket.emit("message-res", { response: friendly });
    }
  });
});

const PORT = process.env.PORT || 10000;
httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
