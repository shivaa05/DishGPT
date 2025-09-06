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
  const { setIsLoading } = useContext(RecipeContext);
  const { image } = location.state || {};

  const fetchData = async () => {
    setIsLoading(true);
    const detailedRecipeData = await aiCall(name, 4);
    setDetailedRecipe(detailedRecipeData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 backdrop-blur-md">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif mb-6">
        {name}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Dish Image */}
        <img
          src={image}
          alt="Dish"
          className="w-full lg:w-1/3 h-64 sm:h-80 md:h-96 object-cover rounded-2xl"
        />

        {/* Details */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Basic Info */}
          <div className="border border-blue-300 bg-neutral-950 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <div className="flex gap-2 items-center text-lg sm:text-xl">
                <BiSolidDish /> {name}
              </div>
              <div className="flex gap-3 mt-2 sm:mt-0">
                <GoDotFill
                  className={`${
                    detailedRecipe.vegetarian
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                />
                <ImSpoonKnife />
              </div>
            </div>
            <p className="text-sm sm:text-base">{detailedRecipe.short_intro}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-zinc-600 px-3 py-1 rounded-2xl text-sm sm:text-base">
                {detailedRecipe.vegetarian ? "veg" : "non-veg"}
              </span>
              <span className="bg-zinc-600 px-3 py-1 rounded-2xl text-sm sm:text-base">
                {detailedRecipe.time}
              </span>
              <span className="bg-zinc-600 px-3 py-1 rounded-2xl text-sm sm:text-base">
                {detailedRecipe.calories}
              </span>
              <span className="bg-zinc-600 px-3 py-1 rounded-2xl text-sm sm:text-base">
                {detailedRecipe.difficulty}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="border border-blue-300 bg-neutral-950 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Steps</h2>
            <ul className="list-decimal pl-5 space-y-1">
              {detailedRecipe.steps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Ingredients */}
          <div className="border border-blue-300 bg-neutral-950 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Ingredients</h2>
            <ul className="list-disc pl-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {detailedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - ({ingredient.quantity})
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
