const involveUrl =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";
const appId = "UxI6SiKH6YcJVdhweXUy";

export const getLikes = async () => {
  try {
    const response = await fetch(`${involveUrl}/apps/${appId}/likes`);

    const text = await response.text();
    if (!text) {
      throw new Error("Empty response received from API");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching likes:", error);
    return [];
  }
};

export const postLike = async (itemId) => {
  await fetch(`${involveUrl}/apps/${appId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item_id: itemId }),
  });
};

/*

// Function to create new game in involvement API

const newGame = async () => {
  const data = await fetch(
    "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  const result = await data.json();
  console.log(result);
};
*/
