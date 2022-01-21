import { delay, select, takeLatest, put } from 'redux-saga/effects';

import { SocketEndpoint } from '../../typedef';
import { AuthEidStatus, AuthSocketEndpoint, StatusModalType } from '../../typedef';
import { CreateSessionSuccess, Refresh, SessionConstants, UpdateCreateSessionStatus, UpdateCreateAccountStatus, Authorize, AuthorizeSuccess, RefreshSuccess } from './typedef';
import { authSocketActions } from '../AuthSocket';
import { sessionTokenExpiresInSelector, sessionTokenValueSelector } from './selectors';
import { alertActions } from '../Alert';
import { sessionActions } from './actions';
import { socketActions } from '../Socket';


const authEidErrors = {
  [AuthEidStatus.CANCELLED]: 'Auth eID signature has cancelled',
  [AuthEidStatus.REQUEST_CANCELLED]: 'Auth eID signature has cancelled',
  [AuthEidStatus.ACCOUNT_NOT_VERIFIED]: 'Auth eID account is not verified'
};

const authEidRegisterErrors = {
  ...authEidErrors,
  [AuthEidStatus.REQUEST_ERROR]: 'You already registered this account'
};

const authEidLoginErrors = {
  ...authEidErrors,
  [AuthEidStatus.REQUEST_ERROR]: 'You need to register this account first'
};


function *createSession() {
  yield put(authSocketActions.send({
    method: AuthSocketEndpoint.LOG_IN,
    api: 'login',
    messageId: `${Date.now()}`,
    // TODO: Uncomment the line below when BE is ready.
    // args: { serviceUrl: WS_MAIN_URL }
    args: { serviceUrl: 'https://liquidsepa.com' }
  }));
}

function *createAccount() {
  yield put(authSocketActions.send({
    method: AuthSocketEndpoint.REGISTER,
    api: 'signup',
    messageId: `${Date.now()}`,
    args: {}
  }));
}

function *updateCreateAccountStatus({ payload }: UpdateCreateAccountStatus) {
  switch (payload.status) {
    case AuthEidStatus.NOT_SCANNED:
    case AuthEidStatus.NOT_READY:
      break;

    // Refreshing the QR when timeout.
    case AuthEidStatus.TIMEOUT:
      yield put(sessionActions.createAccount());
      break;

    case AuthEidStatus.SUCCESS:
      yield put(sessionActions.createAccountSuccess());
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
  yield put(authSocketActions.send({
    method: AuthSocketEndpoint.REFRESH_SESSION,
    api: 'login',
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *createAccountSuccess() {
  yield put(alertActions.show({
    type: StatusModalType.SUCCESS,
    message: 'Account has been created'
  }));
}

function *createSessionSuccess({ payload }: CreateSessionSuccess) {
  yield put(sessionActions.authorize({ accessToken: payload.accessToken }));
}

function *refreshSessionSuccess({ payload }: RefreshSuccess) {
  yield put(sessionActions.authorize({ accessToken: payload.accessToken }));
}

function *authorizeSuccess() {
  const expiresIn: undefined | number = yield select(sessionTokenExpiresInSelector);
  const accessToken: undefined | string = yield select(sessionTokenValueSelector);
  if (!expiresIn || !accessToken) return;

  yield delay((expiresIn - 60) * 1000);
  yield put(sessionActions.refresh({ accessToken }));
}


export function *sessionSaga() {
  yield takeLatest(SessionConstants.CREATE_ACCOUNT_REQUEST, createAccount);
  yield takeLatest(SessionConstants.CREATE_SESSION_REQUEST, createSession);
  yield takeLatest(SessionConstants.AUTHORIZE_SESSION_REQUEST, authorize);
  yield takeLatest(SessionConstants.REFRESH_SESSION_REQUEST, refresh);

  yield takeLatest(SessionConstants.UPDATE_CREATE_ACCOUNT_STATUS, updateCreateAccountStatus);
  yield takeLatest(SessionConstants.UPDATE_CREATE_SESSION_STATUS, updateCreateSessionStatus);

  yield takeLatest(SessionConstants.CREATE_ACCOUNT_SUCCESS, createAccountSuccess);
  yield takeLatest(SessionConstants.REFRESH_SESSION_SUCCESS, refreshSessionSuccess);
  yield takeLatest(SessionConstants.CREATE_SESSION_SUCCESS, createSessionSuccess);
  yield takeLatest(SessionConstants.AUTHORIZE_SESSION_SUCCESS, authorizeSuccess);
}
