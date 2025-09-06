import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 flex flex-col items-center justify-center backdrop-blur-md px-4">
      <img
        src="./bird.png"
        alt="Loading"
        className="h-36 w-36 sm:h-48 sm:w-48 md:h-60 md:w-60 animate-bounce z-[100]"
      />
      <div className="font-mono text-lg sm:text-xl md:text-2xl text-center mt-4 text-white">
        Loading, please wait...
      </div>
    </div>
  );
};

export default Loading;
