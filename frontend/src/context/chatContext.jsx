import React, { createContext, useState } from "react";

// ✅ Named export for context
export const MessageContext = createContext();

// ✅ Default export for provider
const ChatContextProvider = ({ children }) => {
  const [chatHistory, setchatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const value = { chatHistory, setchatHistory, isTyping, setIsTyping };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export default ChatContextProvider;
