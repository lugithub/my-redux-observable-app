import { filter, mergeMap, map } from 'rxjs/operators';

import { FETCH_USER, fetchUserFulfilled } from './actions';

export const fetchUserEpic = (action$, { getJSON }) => action$.pipe(
  filter(v => v.type === FETCH_USER),
  mergeMap(action =>
    getJSON(`https://api.github.com/users/${action.id}`).pipe(
      map(fetchUserFulfilled)
    )
  )
);
