import React, { useContext, useEffect } from "react";
import { SiCodechef } from "react-icons/si";
import Dropdown from "./Dropdown";
import { RecipeContext } from "../context/userContext";
import fetchDishes from "./utils/fetchDishes";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const {
    setData,
    setIsLoading,
    currCategory,
    currCuisine,
    searchBox,
    setSearchBox,
  } = useContext(RecipeContext);
  const cuisine = [
    "Afghan",
    "Albanian",
    "Algerian",
    "Armenian",
    "Austrian",
    "Bangladeshi",
    "Belgian",
    "Bosnian",
    "British",
    "Bulgarian",
    "Burmese",
    "Catalan",
    "Central Asian",
    "Chinese",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "Egyptian",
    "English",
    "Eritrean",
    "Ethiopian",
    "Filipino",
    "Finnish",
    "French",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Hungarian",
    "Icelandic",
    "Indian",
    "Indonesian",
    "Iranian",
    "Irish",
    "Israeli",
    "Italian",
    "Japanese",
    "Jordanian",
    "Kenyan",
    "Korean",
    "Lebanese",
    "Libyan",
    "Malaysian",
    "Mongolian",
    "Moroccan",
    "Nepalese",
    "Norwegian",
    "Pakistani",
    "Palestinian",
    "Persian",
    "Polish",
    "Portuguese",
    "Provençal",
    "Punjabi",
    "Romanian",
    "Russian",
    "Scottish",
    "Serbian",
    "Sichuan",
    "Singaporean",
    "Slovakian",
    "Somali",
    "South Indian",
    "Spanish",
    "Sri Lankan",
    "Swedish",
    "Swiss",
    "Syrian",
    "Thai",
    "Tunisian",
    "Turkish",
    "Ugandan",
    "Uzbek",
    "Vietnamese",
    "Welsh",
  ];
  const category = ["Veg & non-veg", "veg-only"];
  const fetchData = async () => {
    setIsLoading(true);
    const recipes = await fetchDishes(20, searchBox, currCategory, currCuisine);
    setData(recipes);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [currCategory, currCuisine]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchData();
    navigate('/')
    setSearchBox("");
  }

  return (
    <div className="w-full py-3 px-5 flex justify-between bg-black">
      <div className="flex gap-2 items-center">
        <SiCodechef className="text-3xl  text-sky-400" />
        <span className="text-2xl font-bold text-fuchsia-200">DishGPT</span>
      </div>
      <form className="flex gap-5" onSubmit={submitHandler}>
        <Dropdown defaultValue="Cuisine" options={cuisine} type="cuisine" />
        <Dropdown
          defaultValue="Veg & non-veg"
          options={category}
          type="category"
        />
        <input
          type="text"
          className="inline-flex justify-between w-96 rounded-md px-3 py-2 text-sm font-medium border-1 outline-none transition-all duration-200 text-white"
          placeholder="search here.."
          value={searchBox}
          onChange={(e) => {
            setSearchBox(e.target.value);
          }}
        />
        <button className="bg-blue-500 px-4 rounded-3xl cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;
