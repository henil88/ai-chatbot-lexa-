import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const Botmsg = ({ text }) => {
  return (
    <div className="flex justify-start mt-5">
      <div className="bg-[#fff] text-[#000] px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-[0px] max-w-xs md:max-w-2xl shadow-md break-words w-[70%]">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {children}
              </a>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Botmsg;
