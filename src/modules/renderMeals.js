import { getLikes, postLike } from "./likes.js";
import { getMeals } from "./getMeals.js";
import like from "../picture/like.png";

export const displayMeals = async () => {
  const meals = await getMeals();
  const likes = await getLikes();
  const mealContainer = document.querySelector(".js-meal-Container");

  mealContainer.innerHTML = "";

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");

    const mealLikes =
      likes.find((like) => like.item_id === meal.id)?.likes || 0;

    mealDiv.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}">
      <div class="name-like">
        <h3 class="meal-name">${meal.name}</h3>
        <button class="like-image-button" data-id="${meal.id}">
          <img src=${like} alt="like image" class="like-image" width="100px">
        </button>
      </div>
      <p class="like-count" id="like-count-${meal.id}">${mealLikes} Likes</p>
      <div class="comment-reservation">
        <button class="comment" data-id="${meal.id}">Comments</button>
        <button class="reservation" data-id="${meal.id}">Reservations</button>
      </div>
    `;

    mealContainer.appendChild(mealDiv);
  });

  document.querySelectorAll(".like-image-button").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const itemId = event.currentTarget.dataset.id;
      await postLike(itemId);

      const likeCountSpan = document.getElementById(`like-count-${itemId}`);
      let currentLikes = parseInt(likeCountSpan.textContent);
      likeCountSpan.textContent = `${currentLikes + 1} Likes`;
    });
  });
};
