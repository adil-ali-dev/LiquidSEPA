import { createSelector } from 'reselect';

import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { AppState } from '../typedef';


export const sessionSelector = (state: AppState) => state.session;
export const sessionStatusSelector = (state: AppState) => state.session.authenticated;
export const sessionTokenSelector = (state: AppState) => state.session.token;
export const sessionTokenValueSelector = (state: AppState) => state.session.token?.value;
export const sessionTokenExpirationDateSelector = (state: AppState) => state.session.token?.expirationDate;
export const sessionTokenExpiresInSelector = (state: AppState) => state.session.token?.expiresIn;
export const sessionLoginRequestIdSelector = (state: AppState) => state.session.loginRequestId;
export const sessionRegisterRequestIdSelector = (state: AppState) => state.session.registerRequestId;
export const sessionWaitingForSignatureSelector = (state: AppState) => state.session.loading.signature;
export const sessionErrorSelector = (state: AppState) => state.session.error;
export const sessionCreateLoadingSelector = (state: AppState) => state.session.loading.createSession;
export const sessionCreateAccountLoadingSelector = (state: AppState) => state.session.loading.createAccount;
export const sessionCreateErrorSelector = (state: AppState) => state.session.error.createSession;
export const sessionCreateAccountErrorSelector = (state: AppState) => state.session.error.createAccount;
export const sessionWelcomeMessageStatusSelector = (state: AppState) => state.session.welcomeMessageSeen;
export const sessionCountryValueSelector = (state: AppState, value: string) => value;

export const sessionLoginUrlSelector = createSelector(
  [sessionLoginRequestIdSelector],
  requestId => requestId ? `${ AUTH_EID_URL_REQ_PREFIX }${ requestId }` : null
);

export const sessionRegisterUrlSelector = createSelector(
  [sessionRegisterRequestIdSelector],
  requestId => requestId ? `${ AUTH_EID_URL_REQ_PREFIX }${ requestId }` : null
);

export const sessionStatusForUISelector = createSelector(
  [sessionTokenValueSelector, sessionTokenExpirationDateSelector],
  (token, expirationDate) => {
    return !!token && !!expirationDate && Date.now() < expirationDate
  }
);
