import { getIsOpen } from '../selectors';

describe('selectors getIsOpen', () => {
  it('should return true', () => {
    expect(getIsOpen({ admin: { isOpen: true}})).toBe(true);
  });

  it('should not recompute', () => {
    getIsOpen.resetRecomputations()
    const state = { admin: { isOpen: true }};
    getIsOpen(state);
    getIsOpen(state);

    expect(getIsOpen.recomputations()).toBe(1);
  });  
});
