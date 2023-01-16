import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig, createTransform } from 'redux-persist';
import { createSocketMiddleware } from 'redux-awesome-socket-middleware'
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { APP_DEV } from '../constants';
import { AppState } from './typedef';
import { authSocketOptions, AuthSocketConstants } from './AuthSocket';
import { SessionState } from './Session';
import { BankAccountsState } from './BankAccounts';
import { mainSocketOptions, SocketConstants } from './Socket';
import  rootReducer  from './reducer';
import { rootSaga } from './saga';
import { createAppMiddleware } from './middleware';

import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import { PERSIST,PURGE } from 'redux-persist/es/constants';

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
  const authSocketMiddleware = createSocketMiddleware(authSocketOptions);
  const mainSocketMiddleware = createSocketMiddleware(mainSocketOptions);
  const sagaMiddleware = createSagaMiddleware();
  const appMiddleware = createAppMiddleware();
  const middleware: Middleware[] = [createStateSyncMiddleware({blacklist: [PERSIST, PURGE],predicate: action => action.type !== '@status-modal/SHOW', }),authSocketMiddleware, mainSocketMiddleware, appMiddleware, sagaMiddleware];

  if (APP_DEV) {
    const loggerMiddleware = createLogger({
      collapsed: true,
      predicate: (_, action) => !blacklistedActions.has(action.type)
    });

    middleware.unshift(loggerMiddleware);
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(...middleware)
  );
  initStateWithPrevTab(store)
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (module.hot && APP_DEV) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }

  return { store, persistor };
};


export const { store, persistor } = initStore();
