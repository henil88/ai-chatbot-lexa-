import React, { useContext, useEffect, useRef } from "react";
import Botmsg from "./Botmsg";
import Usermsg from "./Usermsg";
import { MessageContext } from "../context/chatContext";
import socket from "../socketClient/socketinit";
import { TypingIndicator } from "./TypingIndicator";

const Chatinterface = () => {
  const { chatHistory, setchatHistory, isTyping, setIsTyping } =
    useContext(MessageContext);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleAiMsg = ({ response }) => {
      setIsTyping(false);
      setchatHistory((prev) => [
        ...prev,
        { role: "ai", text: response, timestamp: Date.now() },
      ]);
    };

    socket.on("message-res", handleAiMsg);

    return () => {
      socket.off("message-res", handleAiMsg);
    };
  }, [chatHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  return (
    <div className="w-full h-[94vh] flex flex-col px-5 mt-15 bg-gradient-to-b from-[#F7EFFF] to-[#E8D5F7]">
      <div className="w-full flex-1 overflow-y-auto flex flex-col gap-2 p-2 mb-20 scrollbar-hide">
        {chatHistory.length <= 0 ? (
          <h1 className="flex items-baseline mt-10 justify-center w-full h-[80%] text-[#4B0082] font-semibold text-2xl md:text-3xl">
            Welcome to LEXA 👋 How can I help you today?
          </h1>
        ) : (
          chatHistory.map((msg, idx) => (
            <React.Fragment key={idx}>
              {msg.role === "user" ? (
                <Usermsg text={msg.text} />
              ) : (
                <Botmsg text={msg.text || ""} />
              )}
              <p
                className={`flex text-gray-500 text-xs ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </React.Fragment>
          ))
        )}
        {isTyping && (
          <div>
            <TypingIndicator />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default Chatinterface;
