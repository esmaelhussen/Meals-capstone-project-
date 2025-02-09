import { getTotalMeals } from '../../modules/totalMeals.js';
import { getMeals } from '../../modules/getMeals.js';

jest.mock('../../modules/getMeals.js', () => ({
  getMeals: jest.fn(),
}));

describe('getTotalMeals', () => {
  it('should return the total number of meals', async () => {
    const mockMeals = [{}, {}, {}, {}, {}];
    getMeals.mockResolvedValue(mockMeals);

    const result = await getTotalMeals();

    expect(result).toBe(5);
  });

  it('should return 0 if there are no meals', async () => {
    getMeals.mockResolvedValue([]);

    const result = await getTotalMeals();

    expect(result).toBe(0);
  });
});
