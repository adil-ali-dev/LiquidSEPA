import { put, takeLatest, select } from 'redux-saga/effects';

import { SocketConstants } from './typedef';
import { sessionActions, sessionTokenValueSelector } from '../Session';

function *connected() {
  const accessToken: null | string = yield select(sessionTokenValueSelector);
  yield (accessToken
      ? put(sessionActions.refresh({ accessToken }))
      : put(sessionActions.refreshFailure('No Token'))
  );
}

export function *socketSaga() {
  yield takeLatest(SocketConstants.CONNECTED, connected);
}
