import React, { useContext } from "react";
import { RecipeContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Empty = () => {
  const { searchBox } = useContext(RecipeContext);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <img
        src="./sad.svg"
        alt="No Result"
        className="h-24 sm:h-32 md:h-40 lg:h-48 mb-4"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-center">
        No Result Found
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-zinc-400 text-center w-60 sm:w-72 md:w-96 mb-4">
        OOPS! There is no dish available with the name{" "}
        <span className="font-semibold text-white">{searchBox}</span>.
      </p>
      <button
        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Empty;
