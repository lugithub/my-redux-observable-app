export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

export function fetchUserFulfilled(response) {
  return {
    response,
    type: FETCH_USER_FULFILLED,
  }
}

