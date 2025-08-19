import { io } from "socket.io-client";

// Initialize the socket connection
const socket = io("https://ai-chatbot-lexa.onrender.com", {
  autoConnect: true,
});

export default socket;
