import { put, select, takeLatest } from 'redux-saga/effects';

import { AuthSocketConstants, DisposableSend } from './typedef';
import { socketActions, socketStatusSelector } from '../Socket';
import { authSocketCallbackPayloadSelector, authSocketStatusSelector } from './selectors';
import { authSocketActions } from './actions';
import { AuthSocketEndpoint, SocketCloseStatus } from '../../typedef';


function *disposableSend({ payload }: DisposableSend) {
  const status: boolean = yield select(authSocketStatusSelector);

  yield put(status ? authSocketActions.send(payload) : authSocketActions.connect());
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

  if (payload.method === AuthSocketEndpoint.CANCEL_REQUEST) {
    yield put(authSocketActions.close({ code: SocketCloseStatus.WITHOUT_RECONNECT }));
  }
}


export function *authSocketSaga() {
  yield takeLatest(AuthSocketConstants.DISPOSABLE_SEND, disposableSend);

  yield takeLatest(AuthSocketConstants.CONNECTED, connected);
}
