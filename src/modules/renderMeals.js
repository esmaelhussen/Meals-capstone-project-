import { getLikes, postLike } from "./likes.js";
import { getMeals } from "./getMeals.js";
import { getComments, postComment, getTotalComments } from "./comments.js";
import like from "../picture/like.png";
import {
  getReservations,
  postReservation,
  getTotalReservations,
} from "./reservations.js";

const displayMeals = async () => {
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
      <img src="${meal.image}" class="meal-image" alt="${meal.name}">
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
      const currentLikes = parseInt(likeCountSpan.textContent, 10);
      likeCountSpan.textContent = `${currentLikes + 1} Likes`;
    });
  });

  const showPopup = async (meal, type) => {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    let commentsHTML = "";
    let reservationsHTML = "";
    let totalComments = 0;
    let totalReservations = 0;

    let content = "";
    if (type === "comment") {
      const comments = await getComments(meal.id);
      totalComments = await getTotalComments(meal.id);

      if (Array.isArray(comments) && totalComments > 0) {
        commentsHTML = comments
          .map(
            (comment) =>
              `<p class="comment-list">${comment.creation_date} ${comment.username}: ${comment.comment}</p>`
          )
          .join("");
      } else {
        commentsHTML = "";
      }

      content = `
      <h3 class="commentts">Comments(${totalComments})</h3>
      <div class="comments-list all-comment-list">${commentsHTML}</div>
      <h3 class="add-comment">Add a comment</h3>

      <div class="comment-info">
        <input type="text" placeholder="Your name" class="name name-input">
        <textarea placeholder="Your insights" class="insight comment-input"></textarea>
        <button class="comment js-comment" data-id="${meal.id}">Comment</button>
      </div>
      `;
    } else if (type === "reservation") {
      const reservations = await getReservations(meal.id);
      totalReservations = await getTotalReservations(meal.id);

      if (Array.isArray(reservations) && totalReservations > 0) {
        reservationsHTML = reservations
          .map(
            (reservation) =>
              `<p class="reservation-list">${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</p>`
          )
          .join("");
      } else {
        reservationsHTML = "";
      }

      content = `
        <h3 class="reservattions reserve">Reservations(${totalReservations})</h3>
        <div class="reservation-list all-reservation-list">${reservationsHTML}</div>
        <h3 class="add-reservations">Add a reservation</h3>

        <div class="reservation-info">
        <input type="text" placeholder="Your name" class="name js-name-input"></input>
        <input type="date"  class="start-date js-start-date"></input>
        <input type="date"  class="end-date js-end-date"></input>
        <button class="reservation js-reservation" dat-id="${meal.id}">Reserve</button>
        </div>
      `;
    }

    popup.innerHTML = `
      <div class="popup-content">
        <button class="close-popup">&times;</button>
        <img src="${meal.image}" class="js-meal-image" alt="${meal.name}">
        <h2 class="meal-name">${meal.name}</h2>
        <div class="meal-information">
        <h3>Country: ${meal.country}</h3>
        <h3>Category:${meal.category}</h3>
        <h3>Ingredient 1:${meal.ingredient_1}</h3>
        <h3>Ingredient 2:${meal.ingredient_2}</h3>
        </div>
        ${content}
      </div>
    `;

    document.body.appendChild(popup);

    document.querySelector(".close-popup").addEventListener("click", () => {
      popup.remove();
    });

    if (type === "comment") {
      document
        .querySelector(".js-comment")
        .addEventListener("click", async () => {
          const userName = document.querySelector(".name-input").value.trim();
          const commentText = document
            .querySelector(".comment-input")
            .value.trim();

          if (userName && commentText) {
            await postComment(meal.id, userName, commentText);

            const commentsList = document.querySelector(".all-comment-list");
            const currentDate = new Date().toISOString().split("T")[0];
            const newComment = document.createElement("p");
            newComment.classList.add("comment-list");
            newComment.innerHTML = `${currentDate} ${userName}: ${commentText}`;
            commentsList.appendChild(newComment);

            const totalCommentsElement = document.querySelector(".commentts");
            const totalComments = await getTotalComments(meal.id);
            totalCommentsElement.textContent = `Comments(${totalComments})`;

            document.querySelector(".name-input").value = "";
            document.querySelector(".comment-input").value = "";
          }
        });
    } else if (type === "reservation") {
      document
        .querySelector(".js-reservation")
        .addEventListener("click", async () => {
          const userName = document
            .querySelector(".js-name-input")
            .value.trim();
          const dateStart = document
            .querySelector(".js-start-date")
            .value.trim();

          const dateEnd = document.querySelector(".js-end-date").value.trim();

          if (userName && dateStart && dateEnd) {
            await postReservation(meal.id, userName, dateStart, dateEnd);

            const reservationsList = document.querySelector(
              ".all-reservation-list"
            );

            const newReservation = document.createElement("p");
            newReservation.classList.add("reservation-list");
            newReservation.innerHTML = `${dateStart} - ${dateEnd} by ${userName}`;
            reservationsList.appendChild(newReservation);

            const totalReservationsElement = document.querySelector(".reserve");
            const totalReservations = await getTotalReservations(meal.id);
            totalReservationsElement.textContent = `Reservations(${totalReservations})`;

            document.querySelector(".js-name-input").value = "";
            document.querySelector(".js-start-date").value = "";
            document.querySelector(".js-end-date").value = "";
          }
        });
    }
  };

  document.querySelectorAll(".comment").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const itemId = event.currentTarget.dataset.id;
      const meal = meals.find((m) => m.id === itemId);
      if (meal) showPopup(meal, "comment");
    });
  });

  document.querySelectorAll(".reservation").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const itemId = event.currentTarget.dataset.id;
      const meal = meals.find((m) => m.id === itemId);
      if (meal) showPopup(meal, "reservation");
    });
  });
};

export default displayMeals;
