import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { APP_DEV } from '../constants';
import { AppState } from './typedef';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';


const persistConfig: PersistConfig<AppState | Record<string, unknown>> = {
  version: 1,
  key: 'root',
  storage,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
  transforms: []
};


const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Middleware[] = [sagaMiddleware];

  if (APP_DEV) {
    middleware.push(createLogger());
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, undefined, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};


export const { store, persistor } = initStore();
