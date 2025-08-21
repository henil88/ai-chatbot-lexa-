import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";

function getUserId() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }
  return userId;
}

const socket = io("https://ai-chatbot-lexa.onrender.com", {
  autoConnect: true,
  transports: ["websocket"],
  query: { userId: getUserId() },
});

export default socket;
