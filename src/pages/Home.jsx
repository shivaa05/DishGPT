import React, { useContext } from "react";
import Dish from "../components/Dish";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/userContext";
import Loading from "../components/Loading";

const Home = () => {
  const { data, isLoading, setCurrDishImage } = useContext(RecipeContext);
  const navigate = useNavigate();

  const clickHandler = (name, image) => {
    setCurrDishImage(image);
    navigate(`/dish/${name}`, { state: { image } });
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading && <Loading />}
      {!isLoading &&
        data?.map((post, index) => (
          <Dish
            key={index}
            image={post.image}
            name={post.name}
            cuisine={post.cuisine}
            category={post.category}
            clickHandler={clickHandler}
          />
        ))}
    </div>
  );
};

export default Home;
