import { AnyAction } from 'redux';
import { CloseAction, ClosedAction } from 'redux-awesome-socket-middleware';

import { AuthSocketEndpoint, Action, EmptyAction, FailureAction, AuthSocketRes } from '../../typedef';
import { SessionApiAuthReqs } from '../Session';
import { AddressesApiAuthReqs } from '../Addresses';


export enum AuthSocketConstants {
  CONNECT = '@auth-socket/CONNECT',
  CONNECTED = '@auth-socket/CONNECTED',
  CLOSE = '@auth-socket/CLOSE',
  CLOSED = '@auth-socket/CLOSED',
  SEND = '@auth-socket/SEND',
  DISPOSABLE_SEND = '@auth-socket/DISPOSABLE_SEND',
  ERROR = '@auth-socket/ERROR'
}


/*
 * Requests
 */

export type CloseReq = {
  code: number
}


/*
 * Api Requests
 */

type SendReq = SessionApiAuthReqs | AddressesApiAuthReqs;


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
export type DisposableSend = Action<AuthSocketConstants.DISPOSABLE_SEND, SendReq>;
export type Error = FailureAction<AuthSocketConstants.ERROR>;
export type Close = CloseAction<AuthSocketConstants.CLOSE>;
export type Closed = ClosedAction<AuthSocketConstants.CLOSED>;


/*
 * Action
 */

export type AuthSocketAction =
  Connect
  | Connected
  | Send
  | DisposableSend
  | Error
  | Close
  | Closed;


/*
 * Actions
 */

export type AuthSocketActions = {
  connect: () => Connect;
  send: (payload: SendReq) => Send;
  disposableSend: (payload: SendReq) => DisposableSend;
  error: (error: string) => Error;
  close: (payload?: CloseReq) => Close;
};


/*
 * State
 */

export type AuthSocketState = {
  status: boolean;
  callbackPayload: null | DisposableSend['payload'];
  error: null | string;
};
