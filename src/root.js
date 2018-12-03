import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { ping } from './ping/reducers';
import { pingEpic } from './ping/epics';

export const rootReducer = combineReducers({
    ping,
});

export const rootEpic = combineEpics(
    pingEpic
);
