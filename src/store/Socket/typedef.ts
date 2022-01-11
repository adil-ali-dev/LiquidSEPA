import { AnyAction } from 'redux';
import { CloseAction, ClosedAction } from 'redux-awesome-socket-middleware';

import { SocketRes, Action, EmptyAction, FailureAction, SocketEndpoint } from '../../typedef';
import { SessionApiMainReqs } from '../Session';
import { AddressesApiMainReqs } from '../Addresses';
import { BankAccountsApiMainReqs } from '../BankAccounts';
import { RfqApiMainReqs } from '../Rfq';


export enum SocketConstants {
  CONNECT = '@socket/CONNECT',
  CONNECTED = '@socket/CONNECTED',
  CLOSE = '@socket/CLOSE',
  CLOSED = '@socket/CLOSED',
  SEND = '@socket/SEND',
  ERROR = '@socket/ERROR'
}


/*
 * Requests
 */

export type CloseReq = {
  code: number
}


/*
 * API Requests
 */

type SendReq = SessionApiMainReqs
| AddressesApiMainReqs
| BankAccountsApiMainReqs
| RfqApiMainReqs;


/*
 * API Responses
 */

export type SendRes = SocketRes<SendReq['method']>;


/*
 * Handlers
 */

type SuccessHandler<P = any> =(payload: P) => AnyAction;
type ErrorHandler = (error: string) => AnyAction;

export type SocketHandler = {
  [K in SocketEndpoint]: [null | SuccessHandler, null | ErrorHandler];
};


/*
 * Single Action
 */

export type Connect = EmptyAction<SocketConstants.CONNECT>;
export type Connected = EmptyAction<SocketConstants.CONNECTED>;
export type Send = Action<SocketConstants.SEND, SendReq>;
export type Error = FailureAction<SocketConstants.ERROR>;
export type Close = CloseAction<SocketConstants.CLOSE>;
export type Closed = ClosedAction<SocketConstants.CLOSED>;


/*
 * Action
 */

export type SocketAction = Connect
| Connected
| Send
| Error
| Close
| Closed;


/*
 * Actions
 */

export type SocketActions = {
  connect: () => Connect;
  send: (payload: SendReq) => Send;
  error: (error: string) => Error;
  close: (payload?: CloseReq) => Close;
};


/*
 * State
 */

export type SocketState = {
  status: boolean;
  error: null | string;
};
