import { all, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { alertSaga } from './Alert/saga';
import { authSocketSaga, AuthSocketConstants } from './AuthSocket';
import { sessionSaga } from './Session';


export function *rootSaga() {
  // Wait for the persist store
  yield take(REHYDRATE);
  // Wait for the socket connection
  yield take(AuthSocketConstants.CONNECT);

  // Run sagas
  yield all([
    // Misc:
    alertSaga(),

    // Main:
    authSocketSaga(),
    sessionSaga()
  ]);
}
