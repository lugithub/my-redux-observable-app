import { throttleTime } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { pingEpic } from '../epics';
import { PING, PONG } from '../actions';

let scheduler;
beforeEach(() => {
  scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

describe('pingEpic', () => {
  it('should generate the stream correctly', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const action$ =  cold('-a 1s  a   -|', { a: {type: PING}});
      const subs =          '^- 1s  -   -!';
      const expected = '     - 1s a 1s a-|';      
      const output$ = pingEpic(action$);
      expectObservable(output$).toBe(expected, {a: {type: PONG}});
      expectSubscriptions(action$.subscriptions).toBe(subs);
    });    
  });

  it('should generate error correctly', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const action$ =  cold('-a 1s  #   -|', { a: {type: PING}});
      const subs =          '^- 1s  !';
      const expected = '     - 1s a #';      
      const output$ = pingEpic(action$);
      expectObservable(output$).toBe(expected, {a: {type: PONG}});
      expectSubscriptions(action$.subscriptions).toBe(subs);
    });    
  });

  it('should generate sync group correctly', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const action$ =  cold('-(aaa) 1s  a   -|', { a: {type: PING}});
      const subs =          '^----- 1s  -   -!';
      const expected = '     - 1s (aaa) 1s a-|';      
      const output$ = pingEpic(action$);
      expectObservable(output$).toBe(expected, {a: {type: PONG}});
      expectSubscriptions(action$.subscriptions).toBe(subs);
    });    
  });

  it('generate the stream correctly 2', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 =  cold('-a--b--c---|');
      const subs =     '^----------!';
      const expected = '-a-----c---|';
  
      expectObservable(e1.pipe(throttleTime(3))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  });  
});
