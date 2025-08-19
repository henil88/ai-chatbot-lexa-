import { useContext, useState } from "react";
import chaticon from "../assets/chat-icon.png";
import { MessageContext } from "../context/chatContext";
import socket from "../socketClient/socketinit";

const Input = () => {
  const { chatHistory, setchatHistory } = useContext(MessageContext);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    // console.log(message);
    socket.emit("message", message);
    setchatHistory((prev) => [
      ...prev,
      { role: "user", text: message, timestamp: Date.now()},
    ]);
    setMessage("");
  };
  return (
    <div className="fixed bottom-2 w-full flex justify-center z-50 px-2 sm:px-5">
      <div className="bg-white flex items-center justify-between px-3 py-2 w-full sm:w-[90%] md:w-[80%] rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 outline-none text-sm sm:text-base px-2 py-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <img
          src={chaticon}
          alt="Send"
          className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer ml-2"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Input;
