import React from "react";

const Dish = ({image,name,clickHandler}) => {
  return (
    <div className="relative group" onClick={(e)=>clickHandler(name,image)}>
      <img
        src={image}
        alt="dish"
        className="w-72  object-cover rounded-lg group-hover:scale-105 duration-200"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition duration-200 group-hover:scale-105 rounded-lg " id={name}>
        <h1 className="font-extrabold text-3xl text-center text-white">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Dish;
