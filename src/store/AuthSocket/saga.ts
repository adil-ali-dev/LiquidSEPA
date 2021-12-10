import { put, takeLatest, select } from 'redux-saga/effects';

import { AuthSocketConstants } from './typedef';
import { sessionActions, sessionTokenValueSelector } from '../Session';


function *connect() {
  const accessToken: null | string = yield select(sessionTokenValueSelector);
  if (!accessToken) return;

  yield put(sessionActions.refresh({ accessToken }));
}


export function *authSocketSaga() {
  yield takeLatest(AuthSocketConstants.CONNECT, connect);
}
