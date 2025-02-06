const mealsUrl = "https://themealdb.com/api/json/v1/1/search.php?f=b";
const involveUrl =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";
const appId = "UxI6SiKH6YcJVdhweXUy";

export const getMeals = async () => {
  const response = await fetch(mealsUrl);
  const data = await response.json();
  return data.meals.map((meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
  }));
};
