import { TestScheduler } from 'rxjs/testing';

import { fetchUserEpic } from "../epics";

let scheduler;
beforeEach(() => {
  scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

describe('fetchUserEpic', () => {
  it('should fetch user', () => {
    scheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a|', {
        a: { type: 'FETCH_USER', id: '123' }
      });

      const dependencies = {
        getJSON: url => cold('--a|', {
          a: { url }
        })
      };
    
      const output$ = fetchUserEpic(action$, dependencies);
    
      expectObservable(output$).toBe('---a|', {
        a: {
          type: 'FETCH_USER_FULFILLED',
          response: {
            url: 'https://api.github.com/users/123'
          }
        }
      });
    });    
  });
});
