import { of } from 'rxjs';
import { concatMap, delay, throttleTime } from 'rxjs/operators';
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

  it('should generate time progression', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const input = ' -a 10ms b-c|';
      const expected = '-- 9ms a 10ms b 9ms (c|)';

      /*      
      // Depending on your personal preferences you could also
      // use frame dashes to keep vertical aligment with the input
      const input = ' -a-b-c|';
      const expected = '------- 4ms a 9ms b 9ms (c|)';
      // or
      const expected = '-----------a 9ms b 9ms (c|)';      
      */
      
      const result = cold(input).pipe(
        concatMap(d => of(d).pipe(
          delay(10)
        ))
      );
      
      expectObservable(result).toBe(expected);    
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
