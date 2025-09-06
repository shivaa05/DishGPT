import React from "react";

const Dish = ({ image, name, cuisine, category, clickHandler }) => {
  return (
    <div
      className="relative group cursor-pointer w-full"
      onClick={() => clickHandler(name, image)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex flex-col justify-end p-4">
        <h2 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
          {name}
        </h2>
        <div className="flex gap-2 mt-2">
          {cuisine && (
            <span className="bg-blue-500 text-white text-xs md:text-sm px-2 py-1 rounded-full">
              {cuisine}
            </span>
          )}
          {category && (
            <span className="bg-green-500 text-white text-xs md:text-sm px-2 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dish;
