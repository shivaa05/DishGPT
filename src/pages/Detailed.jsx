import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RecipeContext } from "../context/userContext";
import { aiCall } from "../components/utils";
import { BiSolidDish } from "react-icons/bi";
import { ImSpoonKnife } from "react-icons/im";
import { GoDotFill } from "react-icons/go";

const Detailed = () => {
  const location = useLocation();
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const { name } = useParams();
  const { currDishImage, setIsLoading, isLoading } = useContext(RecipeContext);
  const { image } = location.state || {};
  
  const fetchData = async () => {
    setIsLoading(true);
    const detailedRecipeData = await aiCall(name, 4);
    setDetailedRecipe(detailedRecipeData);
    console.log(detailedRecipe);

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(detailedRecipe);
  }, [detailedRecipe]);

  return (
    <div className="w-full px-40 py-6 backdrop-blur-md">
      <h1 className="text-center text-3xl font-extrabold font-serif">{name}</h1>
      <div className="overflow-y-hidden h-screen flex gap-8 mt-4 pb-4 ">
        <img
          src={image}
          alt="Dish image"
          className="h-96 object-cover rounded-2xl mt-20"
        />
        <div className="h-full overflow-y-scroll py-5">
          <div className="border-[1px] mb-7 bg-neutral-950 border-blue-300 p-3 mr-10 rounded-lg shadow-[14px_13px_20px_rgba(0,0,0,0.5)]">
            <div className="pb-1 text-xl flex justify-between">
              <div className="flex gap-2 items-center ">
                <BiSolidDish /> {name}
              </div>
              <div className="flex gap-3">
                <GoDotFill
                  className={`border-2 ${
                    detailedRecipe.vegetarian
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                />
                <ImSpoonKnife />
              </div>
            </div>
            <p>{detailedRecipe.short_intro}</p>
            <div className="flex mt-2 gap-5">
              <span className="bg-zinc-600 px-3 py-[3px] rounded-2xl">
                {detailedRecipe.vegetarian ? "veg" : "non-veg"}
              </span>
              <span className="bg-zinc-600 px-3 py-[3px] rounded-2xl">
                {detailedRecipe.time}
              </span>
              <span className="bg-zinc-600 px-3 py-[3px] rounded-2xl">
                {detailedRecipe.calories}
              </span>
              <span className="bg-zinc-600 px-3 py-[3px] rounded-2xl">
                {detailedRecipe.difficulty}
              </span>
            </div>
          </div>
          {/* Steps */}
          <div className="border-[1px] mb-7 bg-neutral-950 border-blue-300 p-3 mr-10 rounded-lg shadow-[14px_13px_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold mb-2">Steps</h2>
            <ul>
              {detailedRecipe.steps?.map((step, index) => (
                <li key={index} className="pb-2">
                  {index + 1}. {step}
                </li>
              ))}
            </ul>
          </div>
          {/* ingredients */}
          <div className="border-[1px] bg-neutral-950 border-blue-300 p-3 mr-10 rounded-lg shadow-[14px_13px_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold mb-2">Ingredients</h2>
            <ul className="list-disc ps-6 grid grid-cols-2">
              {detailedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="pb-2">
                  {ingredient.name} {" - "}({ingredient.quantity})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailed;
