import { createSelector } from 'reselect';

const getPing = state => state.ping;

export const getIsPing = createSelector(getPing, ping => {
  return ping.isPinging;
});

export const getTimestamp = createSelector(getPing, ping => {
  return ping.timestamp;
});
