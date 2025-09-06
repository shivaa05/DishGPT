import React, { useState, useRef, useEffect, useContext } from "react";
import { RecipeContext } from "../context/userContext";

const Dropdown = ({defaultValue,options,type}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef(null);
  const { setCurrCategory, setCurrCuisine } = useContext(RecipeContext);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleOptionClick = (option) => {
    if (type === "cuisine") setCurrCuisine(option);
    else if (type === "category") {
      if (option == "veg-only") setCurrCategory("vegetarian");
      else setCurrCategory("");
    }
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <div
        className="relative inline-block text-left w-full max-w-xs"
        ref={dropdownRef}
      >
        <div>
          {/* Button to toggle the dropdown */}
          <button
            type="button"
            className="inline-flex justify-between w-40 rounded-md px-3 py-2 text-sm font-medium border-1 outline-none transition-all duration-200"
            id="options-menu"
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
              aria-hidden="true"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-full rounded-lg shadow-lg max-h-[50vh] scroll-auto overflow-y-scroll bg-black ring-1 ring-opacity-5 z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="pt-1" role="none">
              {options.map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 text-sm border-b-[1px] border-zinc-500 hover:bg-gray-900 transition-all duration-150"
                  role="menuitem"
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
