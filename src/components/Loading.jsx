import React from "react";

const Loading = () => {
  return (
    <div className="w-full absolute h-screen backdrop-blur-lg top-0 pt-30 flex flex-col items-center text-2xl">
      <img src="./bird.png" className="h-60 w-60 animate-bounce inline-block z-100 " />
      <div className="font-mono text-2xl text-center">
        Loading please wait...
      </div>
    </div>
  );
};

export default Loading;
