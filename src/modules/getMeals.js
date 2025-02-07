const mealsUrl = "https://themealdb.com/api/json/v1/1/search.php?f=b";

export const getMeals = async () => {
  const response = await fetch(mealsUrl);
  const data = await response.json();
  return data.meals.map((meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    country: meal.strArea,
    category: meal.strCategory,
    ingredient_1: meal.strIngredient1,
    ingredient_2: meal.strIngredient2,
  }));
};
