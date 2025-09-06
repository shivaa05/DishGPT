import React, { useContext } from "react";
import { RecipeContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Empty = () => {
  const { searchBox } = useContext(RecipeContext)
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center pt-30 ">
      <img src="./sad.svg" className="h-30 text-white " />
      <h1 className="text-3xl mt-4 mb-2 font-bold">No Result Found</h1>
      <div className="text-lg text-zinc-600 text-center w-60">
        OOPS!, there is no dish available with name {searchBox}
      </div>
      <button className="px-3 py-[3px] bg-blue-600 rounded-lg text-lg mt-4 cursor-pointer" onClick={navigate("/")}>Go to Home</button>
    </div>
  );
};

export default Empty;
