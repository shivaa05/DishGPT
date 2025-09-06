import React, { useContext, useEffect, useState } from "react";
import Dish from "../components/Dish";
import { useNavigate } from "react-router-dom"
import { RecipeContext } from "../context/userContext";
import Loading from "../components/Loading"

const Home = () => {

  const {data,isLoading,setCurrDishImage} = useContext(RecipeContext)
  const navigate = useNavigate();
  
  const clickHandler = async (name, image) => {
    setCurrDishImage(image);
    navigate(`/dish/${name}`, { state: { image } });
  };
  return (
    <div className="min-h-screen backdrop-blur-sm">
      <div className="flex-wrap flex justify-center gap-6 px-20 py-10">
        {isLoading && <Loading />}
        {!isLoading &&
          data?.map((post, index) => (
            <Dish
              key={index}
              image={post.image}
              name={post.name}
              clickHandler={clickHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
