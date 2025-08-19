import React, { useContext, useEffect, useRef } from "react";
import Botmsg from "./Botmsg";
import Usermsg from "./Usermsg";
import { MessageContext } from "../context/chatContext";
import socket from "../socketClient/socketinit";

const Chatinterface = () => {
  const { chatHistory, setchatHistory } = useContext(MessageContext);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleAiMsg = ({ response }) => {
      setchatHistory((prev) => [
        ...prev,
        { role: "ai", text: response, timestamp: Date.now() },
      ]);
    };

    socket.on("message-res", handleAiMsg);

    return () => {
      socket.off("message-res", handleAiMsg);
    };
  }, [setchatHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="w-full h-[94vh] flex flex-col px-5 mt-10 bg-gradient-to-b from-[#F7EFFF] to-[#E8D5F7]">
      <div className="w-full flex-1 overflow-y-auto flex flex-col gap-2 p-2 mb-20 scrollbar-hide">
        {chatHistory.map((msg, idx) => (
          <React.Fragment key={idx}>
            {msg.role === "user" ? (
              <Usermsg text={msg.text} />
            ) : (
              <Botmsg text={msg.text || ""} />
            )}
            <p
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </React.Fragment>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default Chatinterface;
