import { put, takeLatest, select } from 'redux-saga/effects';

import { AuthSocketConstants, DisposableSend } from './typedef';
import { socketActions, socketStatusSelector } from '../Socket';
import { authSocketCallbackPayloadSelector, authSocketStatusSelector } from './selectors';
import { authSocketActions } from './actions';


function *disposableSend({ payload }: DisposableSend) {
  const status: boolean = yield select(authSocketStatusSelector);

  if (status) {
    yield put(authSocketActions.send(payload));
  } else {
    yield put(authSocketActions.connect());
  }
}

function *connected() {
  // Connecting to the main socket if it's not yet connected.
  const mainSocketStatus: boolean = yield select(socketStatusSelector);
  if (!mainSocketStatus) {
    yield put(socketActions.connect());
  }

  // Sending the disposable payload.
  const payload: null | DisposableSend['payload'] = yield select(authSocketCallbackPayloadSelector);
  if (!payload) return;

  yield put(authSocketActions.send(payload));
}


export function *authSocketSaga() {
  yield takeLatest(AuthSocketConstants.DISPOSABLE_SEND, disposableSend);

  yield takeLatest(AuthSocketConstants.CONNECTED, connected);
}
