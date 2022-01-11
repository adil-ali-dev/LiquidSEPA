import { AnyAction } from 'redux';

import { AuthSocketEndpoint, Action, EmptyAction, FailureAction, AuthSocketRes } from '../../typedef';
import { SessionApiAuthReqs } from '../Session';


export enum AuthSocketConstants {
  CONNECT = '@auth-socket/CONNECT',
  CONNECTED = '@auth-socket/CONNECTED',
  CLOSE = '@auth-socket/CLOSE',
  CLOSED = '@auth-socket/CLOSED',
  SEND = '@auth-socket/SEND',
  ERROR = '@auth-socket/ERROR'
}

/*
 * Api Requests
 */

type SendReq = SessionApiAuthReqs;

/*
 * API Responses
 */

export type SendRes = AuthSocketRes<SendReq['method']>;


/*
 * Handler
 */


type SuccessHandler<P = any> =(payload: P) => AnyAction;
type ErrorHandler = (error: string) => AnyAction;

export type AuthSocketHandler = {
  [K in AuthSocketEndpoint]: [null | SuccessHandler, null | ErrorHandler];
};


/*
 * Single Action
 */

export type Connect = EmptyAction<AuthSocketConstants.CONNECT>;
export type Connected = EmptyAction<AuthSocketConstants.CONNECTED>;
export type Send = Action<AuthSocketConstants.SEND, SendReq>;
export type Error = FailureAction<AuthSocketConstants.ERROR>;
export type Close = EmptyAction<AuthSocketConstants.CLOSE>;
export type Closed = EmptyAction<AuthSocketConstants.CLOSED>;


/*
 * Action
 */

export type AuthSocketAction = Connect
| Connected
| Send
| Error
| Close
| Closed;


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
