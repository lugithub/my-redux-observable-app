import { delay, mapTo } from 'rxjs/operators';

import { PING, pong } from './actions';

export const pingEpic = action$ => action$.ofType(PING).pipe(
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo(pong())
  );
