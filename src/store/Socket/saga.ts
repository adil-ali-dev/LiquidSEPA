import { put, takeLatest, select } from 'redux-saga/effects';

import { SocketConstants } from './typedef';
import { sessionActions, sessionTokenValueSelector, sessionTokenExpirationDateSelector } from '../Session';


function *connected() {
  const accessToken: null | string = yield select(sessionTokenValueSelector);
  const expirationDate: null | number = yield select(sessionTokenExpirationDateSelector);

  if (!accessToken) return;

  if (!expirationDate || Date.now() >= expirationDate) {
    yield put(sessionActions.refreshFailure('Session has expired'));
    return;
  }

  yield put(sessionActions.refresh({ accessToken }));
}


export function *socketSaga() {
  yield takeLatest(SocketConstants.CONNECTED, connected);
}
