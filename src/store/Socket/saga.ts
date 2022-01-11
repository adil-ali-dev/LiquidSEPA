import { put, takeLatest, select } from 'redux-saga/effects';

import { SocketConstants } from './typedef';
import { sessionActions, sessionTokenValueSelector } from '../Session';

function *connect() {
  const accessToken: null | string = yield select(sessionTokenValueSelector);
  yield (accessToken
      ? put(sessionActions.authorize({ accessToken }))
      : put(sessionActions.authorizeFailure('No Token'))
  );
}

export function *socketSaga() {
  yield takeLatest(SocketConstants.CONNECT, connect);
}
