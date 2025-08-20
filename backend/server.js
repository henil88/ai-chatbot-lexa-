require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const chatResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    // origin: "https://ai-chatbot-lexa.netlify.app",
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const chatHistory = [];

io.on("connection", (socket) => {
  console.log("socket connection success");

  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });

  socket.on("message", async (data) => {
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: data,
        },
      ],
    });
    const response = await chatResponse(chatHistory);
    chatHistory.push({
      role: "model",
      parts: [
        {
          text: response,
        },
      ],
    });
    console.log(response);
    socket.emit("message-res", { response });
  });
});

httpServer.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
