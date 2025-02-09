import { getComments, postComment } from '../../modules/comments.js';

global.fetch = jest.fn();

describe('Comments API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getComments should return an array of comments', async () => {
    const mockComments = [
      { username: 'Alice', comment: 'Nice!' },
      { username: 'Bob', comment: 'Great work!' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(JSON.stringify(mockComments)),
    });
    const itemId = 'item123';

    const comments = await getComments(itemId);

    expect(fetch).toHaveBeenCalledWith(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UxI6SiKH6YcJVdhweXUy/comments?item_id=${itemId}`,
    );
    expect(comments).toEqual(mockComments);
  });

  test('getComments should return an empty array when no data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(''),
    });
    const itemId = 'item123';

    const comments = await getComments(itemId);

    expect(comments).toEqual([]);
  });

  test('postComment should make a POST request with correct payload', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    const itemId = 'item123';
    const userName = 'Alice';
    const commentText = 'Awesome!';
    const expectedBody = JSON.stringify({
      item_id: itemId,
      username: userName,
      comment: commentText,
    });

    await postComment(itemId, userName, commentText);

    expect(fetch).toHaveBeenCalledWith(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/UxI6SiKH6YcJVdhweXUy/comments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expectedBody,
      },
    );
  });
});
