import { io } from "socket.io-client";


const socket = io("https://ai-chatbot-lexa.onrender.com", {
  autoConnect: true,
});

export default socket;

