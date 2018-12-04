import { admin } from '../reducers';
import { toggle } from '../actions';

describe('admin', () => {
  it('should return inital state', () => {
    expect(admin(void 0, {})).toEqual({isOpen: false});
  });

  it('should return new state', () => {
    expect(admin({isOpen: false}, toggle())).toEqual({isOpen: true});
  });
});