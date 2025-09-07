import React, { useContext, useEffect, useState } from "react";
import { SiCodechef } from "react-icons/si";
import Dropdown from "./Dropdown";
import { RecipeContext } from "../context/userContext";
import fetchDishes from "./utils/fetchDishes";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const {
    setData,
    setIsLoading,
    currCategory,
    currCuisine,
    searchBox,
    setSearchBox,
  } = useContext(RecipeContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
   }, [currCuisine, currCategory]);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchData();
    navigate("/");
    setSearchBox("");
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <div className="w-full bg-black py-3 px-4 flex items-center justify-between relative">
      {/* Logo */}
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <SiCodechef className="text-3xl text-sky-400" />
        <span className="text-2xl font-bold text-fuchsia-200">DishGPT</span>
      </div>

      {/* Desktop form */}
      <form
        className="hidden sm:flex flex-row gap-2 items-center"
        onSubmit={submitHandler}
      >
        <Dropdown defaultValue="Cuisine" options={cuisine} type="cuisine" />
        <Dropdown
          defaultValue="Veg & non-veg"
          options={category}
          type="category"
        />
        <input
          type="text"
          className="w-64 md:w-80 px-3 py-2 rounded-md text-sm sm:text-base outline-none border border-gray-300 text-white bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Search here..."
          value={searchBox}
          onChange={(e) => setSearchBox(e.target.value)}
        />
        <button className="bg-blue-500 px-4 py-2 rounded-3xl text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors duration-200">
          Search
        </button>
      </form>

      {/* Mobile toggle button */}
      <button
        className="sm:hidden text-white text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FiMenu />
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <form
          className="absolute top-full right-0 left-0 mt-1 bg-gray-900 p-4 rounded-b-lg flex flex-col gap-2 sm:hidden z-50"
          onSubmit={submitHandler}
        >
          <Dropdown defaultValue="Cuisine" options={cuisine} type="cuisine" />
          <Dropdown
            defaultValue="Veg & non-veg"
            options={category}
            type="category"
          />
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md text-sm sm:text-base outline-none border border-gray-300 text-white bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="Search here..."
            value={searchBox}
            onChange={(e) => setSearchBox(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-3xl text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default Header;
