import React, { useState, useRef, useEffect, useContext } from "react";
import { RecipeContext } from "../context/userContext";
import { BiSolidDish } from "react-icons/bi"; 
import { ImSpoonKnife } from "react-icons/im"; 

const Dropdown = ({ defaultValue, options, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef(null);
  const { setCurrCategory, setCurrCuisine } = useContext(RecipeContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    if (type === "cuisine") setCurrCuisine(option);
    else if (type === "category")
      setCurrCategory(option === "veg-only" ? "vegetarian" : "");
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Choose icon for mobile view
  const Icon = type === "cuisine" ? BiSolidDish : ImSpoonKnife;

  return (
    <div className="flex items-center justify-center font-sans w-full px-2">
      <div
        className="relative inline-block w-full max-w-xs sm:max-w-sm"
        ref={dropdownRef}
      >
        {/* Mobile icon button */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-gray-700 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon className="text-lg" />
        </button>

        {/* Desktop full dropdown */}
        <button
          type="button"
          className="hidden sm:inline-flex justify-between w-full sm:w-40 md:w-48 rounded-md px-3 py-2 text-sm sm:text-base font-medium border border-gray-600 outline-none transition-all duration-200 bg-gray-800 text-white hover:bg-gray-700"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <svg
            className="-mr-1 ml-2 h-5 w-5 transform transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-full sm:w-40 md:w-48 rounded-lg shadow-lg max-h-60 overflow-y-auto bg-gray-800 ring-1 ring-black ring-opacity-30 z-50">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 text-sm sm:text-base text-white hover:bg-gray-700 transition-all duration-150"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
