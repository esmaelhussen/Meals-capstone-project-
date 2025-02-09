const involveUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const appId = 'UxI6SiKH6YcJVdhweXUy';

export const getComments = async (itemId) => {
  try {
    const response = await fetch(
      `${involveUrl}/apps/${appId}/comments?item_id=${itemId}`,
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

export const postComment = async (itemId, userName, commentText) => {
  await fetch(`${involveUrl}/apps/${appId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: itemId,
      username: userName,
      comment: commentText,
    }),
  });
};

export const getTotalComments = async (itemId) => {
  const comments = await getComments(itemId);
  let totalComments = 0;

  comments.forEach(() => {
    totalComments += 1;
  });
  return totalComments;
};
