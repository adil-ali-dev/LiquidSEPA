import { delay, select, takeLatest, put } from 'redux-saga/effects';

import { AuthEidStatus, AuthSocketEndpoint, StatusModalType } from '../../typedef';
import { CreateSessionSuccess, Refresh, SessionConstants, UpdateCreateSessionStatus, UpdateCreateAccountStatus } from './typedef';
import { authSocketActions } from '../AuthSocket';
import { sessionTokenValueSelector } from './selectors';
import { alertActions } from '../Alert';
import { sessionActions } from './actions';


const authEidErrors = {
  [AuthEidStatus.TIMEOUT]: 'Auth eID signature timeout',
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
    args: { serviceUrl: '' }
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
  if (payload.status === AuthEidStatus.WAITING_FOR_SIGNATURE) return;

  if (payload.status === AuthEidStatus.SUCCESS) {
    yield put(sessionActions.createAccountSuccess());
    return;
  }

  yield put(sessionActions.createAccountFailure(authEidRegisterErrors[payload.status]));
}

function *updateCreateSessionStatus({ payload }: UpdateCreateSessionStatus) {
  if (payload.status === AuthEidStatus.WAITING_FOR_SIGNATURE) return;

  if (payload.status === AuthEidStatus.SUCCESS || payload.accessToken) {
    yield put(sessionActions.createSessionSuccess(payload));

    return;
  }

  yield put(sessionActions.createSessionFailure(authEidLoginErrors[payload.status]));
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
  yield put(alertActions.show({
    type: StatusModalType.SUCCESS,
    message: 'Session has been created'
  }));

  yield delay((payload.expiresIn - 60) * 1000);
  // yield delay(10000);

  const accessToken: string = yield select(sessionTokenValueSelector);
  if (!accessToken) return;

  yield put(sessionActions.refresh({ accessToken }));
}


export function *sessionSaga() {
  yield takeLatest(SessionConstants.CREATE_ACCOUNT_REQUEST, createAccount);
  yield takeLatest(SessionConstants.CREATE_SESSION_REQUEST, createSession);
  yield takeLatest(SessionConstants.REFRESH_SESSION_REQUEST, refresh);

  yield takeLatest(SessionConstants.UPDATE_CREATE_ACCOUNT_STATUS, updateCreateAccountStatus);
  yield takeLatest(SessionConstants.UPDATE_CREATE_SESSION_STATUS, updateCreateSessionStatus);

  yield takeLatest(SessionConstants.CREATE_ACCOUNT_SUCCESS, createAccountSuccess);
  yield takeLatest(SessionConstants.CREATE_SESSION_SUCCESS, createSessionSuccess);
}
