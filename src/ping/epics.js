import { delay, filter, mapTo } from 'rxjs/operators';

import { PING, pong } from './actions';

export const pingEpic = action$ => action$.pipe(
  filter(v => v.type === PING),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo(pong())
);
