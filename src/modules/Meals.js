import like from "../picture/like.png";

const mealsUrl = "https://themealdb.com/api/json/v1/1/search.php?f=b";

const getMeals = async () => {
  const response = await fetch(mealsUrl);
  const data = await response.json();

  return data.meals.map((meal) => ({
    name: meal.strMeal,
    image: meal.strMealThumb,
  }));
};

export const displayMeals = async () => {
  const meals = await getMeals();
  const mealContainer = document.querySelector(".js-meal-Container");

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");

    mealDiv.innerHTML = `
                    <img src="${meal.image}" alt="${meal.name}">
                    <div class="name-like">
                    <h3 class="meal-name">${meal.name}</h3>
                    <button class="like-image-button"><img src=${like} alt="like image" class="like-image" width="100px"></button>
                    </div>
                    <div class="comment-reservation">
                    <button class="comment">Comments</button>
                    <button class="reservation">Reservations</button>
                    </div>
                `;

    mealContainer.appendChild(mealDiv);
  });
};
