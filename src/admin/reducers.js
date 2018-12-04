import { TOGGLE } from './actions';

export function admin(state = { isOpen: false }, action) {
  switch (action.type) {
    case TOGGLE:
      return { isOpen: !state.isOpen };
    default:
      return state;
  }
}
