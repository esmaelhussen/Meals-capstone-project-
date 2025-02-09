import { getReservations } from "./reservations.js";

export const getTotalReservations = async (itemId) => {
  const reservations = await getReservations(itemId);
  let totalReservations = 0;

  reservations.forEach(() => {
    totalReservations++;
  });
  return totalReservations;
};
