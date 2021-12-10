import { AppState } from '../typedef';


export const sessionSelector = (state: AppState) => state.session;
export const sessionStatusSelector = (state: AppState) => state.session.authenticated;
export const sessionTokenSelector = (state: AppState) => state.session.token;
export const sessionTokenValueSelector = (state: AppState) => state.session.token?.value;
export const sessionRequestIdSelector = (state: AppState) => state.session.requestId;
export const sessionWaitingForSignatureSelector = (state: AppState) => state.session.loading.signature;
export const sessionErrorSelector = (state: AppState) => state.session.error;
export const sessionCreateLoadingSelector = (state: AppState) => state.session.loading.createSession;
export const sessionCreateAccountLoadingSelector = (state: AppState) => state.session.loading.createAccount;
export const sessionCreateErrorSelector = (state: AppState) => state.session.error.createSession;
export const sessionCreateAccountErrorSelector = (state: AppState) => state.session.error.createAccount;
export const sessionCountryValueSelector = (state: AppState, value: string) => value;
