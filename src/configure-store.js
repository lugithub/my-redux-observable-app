import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer, rootEpic } from './root';

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(rootReducer,
    applyMiddleware(epicMiddleware)
  );
  
  epicMiddleware.run(rootEpic);
  return store;
}

