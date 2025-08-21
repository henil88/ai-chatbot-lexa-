require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const chatResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://ai-chatbot-lexa.netlify.app",
    methods: ["GET", "POST"],
  },
});
const sessions = {};

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);
  sessions[socket.id] = [];

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
    delete sessions[socket.id];
  });

  socket.on("message", async (data) => {
    sessions[socket.id].push({
      role: "user",
      parts: [{ text: data }],
    });
    const response = await chatResponse(sessions[socket.id]);

    sessions[socket.id].push({
      role: "model",
      parts: [{ text: response }],
    });

    console.log(`Reply to ${socket.id}:`, response);

    socket.emit("message-res", { response });
  });
});
httpServer.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
