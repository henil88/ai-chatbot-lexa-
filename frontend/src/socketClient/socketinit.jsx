import { io } from "socket.io-client";

const socket = io("https://ai-chatbot-lexa.onrender.com", {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
