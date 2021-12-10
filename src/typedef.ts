import { Action as ReduxAction } from 'redux';


/*
 * Redux
 */

export interface EmptyAction<T> extends ReduxAction<T> {}
export interface Action<T, P> extends ReduxAction<T> { payload: P }
export interface FailureAction<T> extends ReduxAction<T> { error: string }


/*
 * Environment
 */

export enum Environment {
  DEV = 'dev',
  LIVE = 'live'
}


/*
 * Auth WS API
 */

export enum AuthSocketEndpoint {
  REGISTER = 'signup_init',
  REGISTER_STATUS = 'signup_status',

  LOG_IN = 'login_init',
  LOG_IN_STATUS = 'sign_status',

  REFRESH_SESSION = 'renew'
}

export type AuthSocketReq<A = Record<string, unknown>> = {
  method: AuthSocketEndpoint;
  args: A;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};

export type AuthSocketRes<D = Record<string, unknown>> = {
  method: AuthSocketEndpoint;
  error: null | number | string;
  data: D;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};


/*
 * Auth eID
 */

export enum AuthEidStatus {
  // Waiting for sign via mobile app:
  WAITING_FOR_SIGNATURE = 'NOT_READY',

  // Success:
  SUCCESS = 'SUCCESS',

  // Auth eID errors:
  TIMEOUT = 'TIMEOUT',
  CANCELLED = 'USER_CANCELLED',
  REQUEST_CANCELLED = 'PR_CANCELLED',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',

  // API errors:
  REQUEST_ERROR = 'REQUEST_ERROR',
}


/*
 * Status modal
 */

export enum StatusModalType {
  SUCCESS = 'Success',
  PROCESSING = 'Processing',
  ERROR = 'Error'
}


/*
 * Alert
 */

export type Alert = {
  type: StatusModalType;
  message: string;
  button?: string;
  onButtonPress?: () => void;
};
