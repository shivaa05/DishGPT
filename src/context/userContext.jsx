import React, { createContext, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const recipes = [
    {
      name: "Poached Egg With Spinach and Tomato",
      image: "https://img.spoonacular.com/recipes/656481-556x370.jpg",
    },
    {
      name: "Grilled Lemongrass Shrimp",
      image: "https://img.spoonacular.com/recipes/645754-556x370.jpg",
    },
    {
      name: "Beans With Smoked Pork Hock",
      image: "https://img.spoonacular.com/recipes/634548-556x370.jpg",
    },
    {
      name: "Home made coffee ice cream",
      image: "https://img.spoonacular.com/recipes/646868-556x370.jpg",
    },
    {
      name: "Peach Melba",
      image: "https://img.spoonacular.com/recipes/655130-556x370.jpg",
    },
    {
      name: "Sweet and Spicy Country-Style Ribs",
      image: "https://img.spoonacular.com/recipes/662463-556x370.jpg",
    },
    {
      name: "Chocolate Orange Madeleines",
      image: "https://img.spoonacular.com/recipes/639125-556x370.jpg",
    },
    {
      name: "Spring Greens With Pears, Sugared Walnuts & Gorgonzola",
      image: "https://img.spoonacular.com/recipes/661417-556x370.jpg",
    },
    {
      name: "Greek Inspired Spring Omelet",
      image: "https://img.spoonacular.com/recipes/645315-556x370.jpg",
    },
    {
      name: "Classic Mint Julep",
      image: "https://img.spoonacular.com/recipes/639618-556x370.jpg",
    },
    {
      name: "Homemade Broccoli Cheddar Soup",
      image: "https://img.spoonacular.com/recipes/646930-556x370.jpg",
    },
    {
      name: "Apple Pie Bars",
      image: "https://img.spoonacular.com/recipes/632573-556x370.jpg",
    },
  ];
  const [currCuisine, setCurrCuisine] = useState("");
  const [currCategory, setCurrCategory] = useState("");
  const [currDishImage, setCurrDishImage] = useState("");
  const [data, setData] = useState(recipes);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBox, setSearchBox] = useState("");

  return (
    <RecipeContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        currDishImage,
        setCurrDishImage,
        currCuisine,
        setCurrCuisine,
        currCategory,
        setCurrCategory,
        searchBox,
        setSearchBox
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
