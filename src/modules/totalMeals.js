const mealsUrl = "https://themealdb.com/api/json/v1/1/search.php?f=b";

const getTotalMeals = async () => {
  const response = await fetch(mealsUrl);
  const data = await response.json();
  const totalMeals = data.meals.length;
  return totalMeals;
};

export const displayTotalMeals = async () => {
  const totalMeals = await getTotalMeals();
  const meals = document.querySelector(".js-total-meal");
  return (meals.innerHTML = `
  <h2 class="total-meal">Meals(${totalMeals})</h2>`);
};
