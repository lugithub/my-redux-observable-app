import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { ping } from './ping/reducers';
import { pingEpic } from './ping/epics';

import { admin } from './admin/reducers';

export const rootReducer = combineReducers({
    ping,
    admin,
});

export const rootEpic = combineEpics(
    pingEpic
);
