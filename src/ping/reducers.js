import { PING, PONG, TIMER } from './actions';

export const ping = (state = { isPinging: false, timestamp: Date.now() }, action) => {
    switch (action.type) {
      case PING:
        return { ...state, isPinging: true };
  
      case PONG:
        return { ...state, isPinging: false };

      case TIMER:
        return { ...state, timestamp: Date.now()};
  
      default:
        return state;
    }
};
