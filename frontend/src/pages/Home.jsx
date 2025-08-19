// Home.jsx
import React from "react";
import Top from "../component/Top";
import Chatinterface from "../component/Chatinterface";
import Input from "../component/Input";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Top />
      <Chatinterface />
      <Input />
    </div>
  );
};

export default Home;
