export const PING = 'PING';
export const PONG = 'PONG';
export const TIMER = 'TIMER';

export const ping = id => ({
  id,
  type: PING,
});
export const pong = id => ({
  id,
  type: PONG,
});
export const timer = () => ({
  type: TIMER,
});
