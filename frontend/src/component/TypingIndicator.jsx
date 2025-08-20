export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 p-2 bg-gray-100 rounded-xl shadow-sm w-fit">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
    </div>
  );
};
