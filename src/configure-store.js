import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer, rootEpic } from './root';

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    /* preloadedState, */
    composeEnhancers(  
      applyMiddleware(epicMiddleware)
    ),
  );
  
  epicMiddleware.run(rootEpic);
  return store;
}

