const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const fetchDishes = async (
  count = 20,
  dishName = "",
  diet = "",
  cuisine = ""
) => {
  const params = new URLSearchParams({
    number: count,
    apiKey: API_KEY,
    _: Date.now(),
  });

  if (dishName) params.append("query", dishName);
  if (cuisine) params.append("cuisine", cuisine);
  if (diet) params.append("diet", diet);

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    apiUrl
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error!");

    const wrapped = await response.json();
    const data = JSON.parse(wrapped.contents);

    if (!data.results || data.results.length === 0) return [];

    return data.results.map((recipe) => ({
      name: recipe.title,
      image: recipe.image,
      id: recipe.id,
    }));
  } catch (err) {
    console.error("Error fetching recipes:", err.message);
    return [];
  }
};

export default fetchDishes;
