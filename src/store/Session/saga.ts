import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { WS_MAIN_URL } from '../../constants';
import { AuthEidStatus, AuthSocketEndpoint, SocketCloseStatus, SocketEndpoint } from '../../typedef';
import { Authorize, CancelAuthEid, CreateSessionSuccess, Refresh, RefreshSuccess, SessionConstants, UpdateCreateAccountStatus, UpdateCreateSessionStatus } from './typedef';
import { authSocketActions } from '../AuthSocket';
import { sessionTokenExpiresInSelector, sessionTokenValueSelector } from './selectors';
import { sessionActions } from './actions';
import { socketActions } from '../Socket';


const authEidErrors = {
  [AuthEidStatus.CANCELLED]: 'Auth eID signing cancelled',
  [AuthEidStatus.REQUEST_CANCELLED]: 'Auth eID signing cancelled',
  [AuthEidStatus.ACCOUNT_NOT_VERIFIED]: 'Auth eID account not verified'
};

const authEidRegisterErrors = {
  ...authEidErrors,
  [AuthEidStatus.REQUEST_ERROR]: 'Account already registered'
};

const authEidLoginErrors = {
  ...authEidErrors,
  [AuthEidStatus.REQUEST_ERROR]: 'Account not found, please register'
};


function *createSession() {
  yield put(authSocketActions.disposableSend({
    method: AuthSocketEndpoint.LOG_IN,
    api: 'login',
    messageId: `${Date.now()}`,
    args: { serviceUrl: WS_MAIN_URL }
  }));
}

function *createAccount() {
  yield put(authSocketActions.disposableSend({
    method: AuthSocketEndpoint.REGISTER,
    api: 'signup',
    messageId: `${Date.now()}`,
    args: { serviceUrl: WS_MAIN_URL }
  }));
}

function *cancelRequest({ payload }: CancelAuthEid) {
  yield put(authSocketActions.disposableSend({
    method: AuthSocketEndpoint.CANCEL_REQUEST,
    api: 'login',
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *updateCreateAccountStatus({ payload }: UpdateCreateAccountStatus) {
  if (payload.accessToken) {
    yield put(sessionActions.createAccountSuccess(payload));
    return;
  }

  switch (payload.status) {
    case AuthEidStatus.NOT_SCANNED:
    case AuthEidStatus.NOT_READY:
    case AuthEidStatus.SUCCESS:
      break;

    case AuthEidStatus.REQUEST_CANCELLED:
      yield put(sessionActions.cancelAuthEidSuccess());
      break;

    // Refreshing the QR when timeout.
    case AuthEidStatus.TIMEOUT:
      yield put(sessionActions.createAccount());
      break;

    default:
      yield put(sessionActions.createAccountFailure(authEidRegisterErrors[payload.status]));
      break;
  }
}

function *updateCreateSessionStatus({ payload }: UpdateCreateSessionStatus) {
  if (payload.accessToken) {
    yield put(sessionActions.createSessionSuccess(payload));
    return;
  }

  switch (payload.status) {
    case AuthEidStatus.NOT_SCANNED:
    case AuthEidStatus.NOT_READY:
    case AuthEidStatus.SUCCESS:
      break;

    case AuthEidStatus.REQUEST_CANCELLED:
      yield put(sessionActions.cancelAuthEidSuccess());
      break;

    // Refreshing the QR when timeout.
    case AuthEidStatus.TIMEOUT:
      yield put(sessionActions.createSession());
      break;

    default:
      yield put(sessionActions.createSessionFailure(authEidLoginErrors[payload.status]));
      break;
  }
}

function *authorize({ payload }: Authorize) {
  yield put(socketActions.send({
    method: SocketEndpoint.AUTHORIZE,
    api: 'session',
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *refresh({ payload }: Refresh) {
  yield put(authSocketActions.disposableSend({
    method: AuthSocketEndpoint.REFRESH_SESSION,
    api: 'login',
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *createSessionSuccess({ payload }: CreateSessionSuccess) {
  yield call(closeAuthSocket);

  yield put(sessionActions.authorize({ accessToken: payload.accessToken }));
}

function *refreshSessionSuccess({ payload }: RefreshSuccess) {
  yield call(closeAuthSocket);

  yield put(sessionActions.authorize({ accessToken: payload.accessToken }));
}

function *authorizeSuccess() {
  const expiresIn: undefined | number = yield select(sessionTokenExpiresInSelector);
  const accessToken: undefined | string = yield select(sessionTokenValueSelector);
  if (!expiresIn || !accessToken) return;

  yield delay(expiresIn);
  yield put(sessionActions.refresh({ accessToken }));
}

function *closeAuthSocket() {
  yield put(authSocketActions.close({ code: SocketCloseStatus.WITHOUT_RECONNECT }));
}

function *closeMainSocket() {
  yield put(socketActions.close({ code: SocketCloseStatus.WITH_RECONNECT }));
}


export function *sessionSaga() {
  yield takeLatest(SessionConstants.CREATE_ACCOUNT_REQUEST, createAccount);
  yield takeLatest(SessionConstants.CREATE_SESSION_REQUEST, createSession);
  yield takeLatest(SessionConstants.AUTHORIZE_SESSION_REQUEST, authorize);
  yield takeLatest(SessionConstants.REFRESH_SESSION_REQUEST, refresh);

  yield takeLatest(SessionConstants.UPDATE_CREATE_ACCOUNT_STATUS, updateCreateAccountStatus);
  yield takeLatest(SessionConstants.UPDATE_CREATE_SESSION_STATUS, updateCreateSessionStatus);

  yield takeLatest(SessionConstants.CANCEL_AUTH_EID_REQUEST, cancelRequest);

  yield takeLatest(SessionConstants.REFRESH_SESSION_SUCCESS, refreshSessionSuccess);
  yield takeLatest(SessionConstants.AUTHORIZE_SESSION_SUCCESS, authorizeSuccess);
  yield takeLatest([
    SessionConstants.CREATE_SESSION_SUCCESS,
    SessionConstants.CREATE_ACCOUNT_SUCCESS
  ], createSessionSuccess);

  // Main socket management
  yield takeLatest(SessionConstants.DESTROY_SESSION_REQUEST, closeMainSocket);
}
