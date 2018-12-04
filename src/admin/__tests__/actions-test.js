import { toggle, TOGGLE } from '../actions';

describe('toggle', () => {
  it('should return toggle', () => {
    expect(toggle()).toEqual({ type: TOGGLE });
  });
});
