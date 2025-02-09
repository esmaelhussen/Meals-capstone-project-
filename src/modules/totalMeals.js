import { getMeals } from "./getMeals.js";
import { getComments, postComment } from "./comments.js";
import { getReservations } from "./reservations.js";

//instead of getting numbers from the API calculating it with foreach loop

// const getTotalMeals = async () => {
//   const meals = await getMeals();
//   return meals.length;
// };

export const getTotalMeals = async () => {
  const meals = await getMeals();
  let totalmeals = 0;
  meals.forEach(() => {
    totalmeals++;
  });
  return totalmeals;
};

export const displayTotalMeals = async () => {
  const totalMeals = await getTotalMeals();
  const meals = document.querySelector(".js-total-meal");
  return (meals.innerHTML = `
  <h2 class="total-meal">Meals(${totalMeals})</h2>`);
};

export const getTotalComments = async (itemId) => {
  const comments = await getComments(itemId);
  let totalComments = 0;

  comments.forEach(() => {
    totalComments++;
  });
  return totalComments;
};

export const getTotalReservations = async (itemId) => {
  const reservations = await getReservations(itemId);
  let totalReservations = 0;

  reservations.forEach(() => {
    totalReservations++;
  });
  return totalReservations;
};
