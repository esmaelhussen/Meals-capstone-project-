import { getMeals } from './getMeals.js';

// instead of getting numbers from the API calculating it with foreach loop

// const getTotalMeals = async () => {
//   const meals = await getMeals();
//   return meals.length;
// };
export const getTotalMeals = async () => {
  const meals = await getMeals();
  let totalmeals = 0;
  meals.forEach(() => {
    totalmeals += 1;
  });
  return totalmeals;
};

export const displayTotalMeals = async () => {
  const totalMeals = await getTotalMeals();
  const meals = document.querySelector('.js-total-meal');
  meals.innerHTML = ` <h2 class="total-meal">Meals(${totalMeals})</h2>`;
  return meals.innerHTML;
};
