import { getComments, postComment } from "./comments.js";

export const getTotalComments = async (itemId) => {
  const comments = await getComments(itemId);
  let totalComments = 0;

  comments.forEach(() => {
    totalComments++;
  });
  return totalComments;
};
