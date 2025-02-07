import { getMeals } from "./getMeals.js";

const getTotalMeals = async () => {
  const meals = await getMeals();
  return meals.length;
};

export const displayTotalMeals = async () => {
  const totalMeals = await getTotalMeals();
  const meals = document.querySelector(".js-total-meal");
  return (meals.innerHTML = `
  <h2 class="total-meal">Meals(${totalMeals})</h2>`);
};
