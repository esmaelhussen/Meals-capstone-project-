const involveUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const appId = 'UxI6SiKH6YcJVdhweXUy';

export const getReservations = async (itemId) => {
  try {
    const response = await fetch(
      `${involveUrl}/apps/${appId}/reservations?item_id=${itemId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      return [];
    }

    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export const postReservation = async (itemId, userName, dateStart, dateEnd) => {
  await fetch(`${involveUrl}/apps/${appId}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
      username: userName,
      date_start: dateStart,
      date_end: dateEnd,
    }),
  });
};

export const getTotalReservations = async (itemId) => {
  const reservations = await getReservations(itemId);
  let totalReservations = 0;

  reservations.forEach(() => {
    totalReservations += 1;
  });
  return totalReservations;
};
