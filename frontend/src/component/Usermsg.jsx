import React from "react";

const Usermsg = ({ text }) => {
  return (
    <div className="flex justify-end mt-5">
      <div className="bg-[#B173F0] text-[#f8e2e2e1] px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[0px] max-w-xs md:max-w-2xl shadow-md break-words w-[70%]">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Usermsg;
