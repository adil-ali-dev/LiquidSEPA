import { AnyAction } from 'redux';

import { SocketRes, Action, EmptyAction, FailureAction, SocketEndpoint } from '../../typedef';
import { SessionApiMainReqs } from '../Session';
import { AddressesApiMainReqs } from '../Addresses';
import { BankAccountsApiMainReqs } from '../BankAccounts';
import { RfqApiMainReqs } from '../Rfq';


export enum SocketConstants {
  CLOSE = '@socket/CLOSE',
  CONNECT = '@socket/CONNECT',
  RESET = '@socket/RESET',
  SEND = '@socket/SEND',
  ERROR = '@socket/ERROR'
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
export type Send = Action<SocketConstants.SEND, SendReq>;
export type Error = FailureAction<SocketConstants.ERROR>;
export type Close = EmptyAction<SocketConstants.CLOSE>;


/*
 * Action
 */

export type SocketAction = Connect
| Send
| Error
| Close;


/*
 * Actions
 */

export type SocketActions = {
  connect: () => Connect;
  send: (payload: SendReq) => Send;
  error: (error: string) => Error;
  close: () => Close;
};


/*
 * State
 */

export type SocketState = {
  status: boolean;
  error: null | string;
};
