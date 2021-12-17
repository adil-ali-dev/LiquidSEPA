import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig, createTransform } from 'redux-persist';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { WS_AUTH_URL, WS_MAIN_URL, APP_DEV } from '../constants';
import { AppState } from './typedef';
import { AuthSocketConstants, createAuthSocketMiddleware } from './AuthSocket';
import { SessionState } from './Session';
import { BankAccountsState } from './BankAccounts';
import { createSocketMiddleware, SocketConstants } from './Socket';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';


const blacklistedActions = new Set([SocketConstants.SEND, AuthSocketConstants.SEND]);

const sessionTransform = createTransform<SessionState, {}>(
  state => ({ token: state.token }),
  null,
  { whitelist: ['session'] }
);

const bankAccountsTransform = createTransform<BankAccountsState, {}>(
  state => ({ waitingForContinue: state.waitingForContinue }),
  null,
  { whitelist: ['bankAccounts'] }
);

const persistConfig: PersistConfig<AppState | {}> = {
  version: 1,
  key: 'root',
  storage,
  whitelist: ['session', 'bankAccounts'],
  stateReconciler: autoMergeLevel2,
  transforms: [sessionTransform, bankAccountsTransform]
};


const initStore = () => {
  const authSocketMiddleware = createAuthSocketMiddleware(WS_AUTH_URL);
  const socketMiddleware = createSocketMiddleware(WS_MAIN_URL);
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Middleware[] = [authSocketMiddleware, socketMiddleware, sagaMiddleware];

  if (APP_DEV) {
    const loggerMiddleware = createLogger({
      collapsed: true,
      predicate: (_, action) => !blacklistedActions.has(action.type)
    });

    middleware.push(loggerMiddleware);
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, undefined, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};


export const { store, persistor } = initStore();
