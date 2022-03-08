import { all, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { authSocketSaga } from './AuthSocket';
import { socketSaga } from './Socket';
import { sessionSaga } from './Session';
import { addressesSaga } from './Addresses';
import { bankAccountsSaga } from './BankAccounts';
import { rfqSaga } from './Rfq';


export function *rootSaga() {
  // Wait for the persist store
  yield take(REHYDRATE);

  // Run sagas
  yield all([
    authSocketSaga(),
    socketSaga(),
    sessionSaga(),
    addressesSaga(),
    bankAccountsSaga(),
    rfqSaga()
  ]);
}
