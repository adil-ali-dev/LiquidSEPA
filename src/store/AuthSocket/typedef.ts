import { AnyAction } from 'redux';

import { AuthSocketReq, AuthSocketEndpoint, Action, EmptyAction, FailureAction, AuthEidStatus } from '../../typedef';


export enum AuthSocketConstants {
  CLOSE = '@auth-socket/CLOSE',
  CONNECT = '@auth-socket/CONNECT',
  RESET = '@auth-socket/RESET',
  SEND = '@auth-socket/SEND',
  ERROR = '@auth-socket/ERROR'
}


/*
 * Handler
 */


type SuccessHandler<P = any> =(payload: P) => AnyAction;
type ErrorHandler = (error: string) => AnyAction;

export type AuthSocketHandler = {
  [K in AuthSocketEndpoint]: [null | SuccessHandler, null | ErrorHandler];
};


/*
 * Api Requests
 */

type SendReq = AuthSocketReq<any>;


/*
 * Single Action
 */

export type Connect = EmptyAction<AuthSocketConstants.CONNECT>;
export type Send = Action<AuthSocketConstants.SEND, SendReq>;
export type Error = FailureAction<AuthSocketConstants.ERROR>;
export type Close = EmptyAction<AuthSocketConstants.CLOSE>;


/*
 * Action
 */

export type AuthSocketAction = Connect
| Send
| Error
| Close;


/*
 * Actions
 */

export type AuthSocketActions = {
  connect: () => Connect;
  send: (payload: SendReq) => Send;
  error: (error: string) => Error;
  close: () => Close;
};


/*
 * State
 */

export type AuthSocketState = {
  status: boolean;
  error: null | string;
};
