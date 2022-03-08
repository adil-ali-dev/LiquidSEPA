import { Action, FailureAction, EmptyAction, AuthEidStatus, SocketReq, AuthSocketEndpoint, SocketEndpoint, AuthSocketReq, SessionToken } from '../../typedef';


export enum SessionConstants {
  CANCEL_AUTH_EID_REQUEST = '@session/CANCEL_AUTH_EID_REQUEST',
  CANCEL_AUTH_EID_SUCCESS = '@session/CANCEL_AUTH_EID_SUCCESS',
  CANCEL_AUTH_EID_FAILURE = '@session/CANCEL_AUTH_EID_FAILURE',

  UPDATE_CREATE_ACCOUNT_REQUEST_ID = '@session/UPDATE_CREATE_ACCOUNT_REQUEST_ID',
  UPDATE_CREATE_SESSION_REQUEST_ID = '@session/UPDATE_CREATE_SESSION_REQUEST_ID',

  UPDATE_CREATE_SESSION_STATUS = '@session/UPDATE_CREATE_SESSION_STATUS',
  UPDATE_CREATE_ACCOUNT_STATUS = '@session/UPDATE_CREATE_ACCOUNT_STATUS',

  CREATE_SESSION_REQUEST = '@session/CREATE_SESSION_REQUEST',
  CREATE_SESSION_SUCCESS = '@session/CREATE_SESSION_SUCCESS',
  CREATE_SESSION_FAILURE = '@session/CREATE_SESSION_FAILURE',

  CREATE_ACCOUNT_REQUEST = '@session/CREATE_ACCOUNT_REQUEST',
  CREATE_ACCOUNT_SUCCESS = '@session/CREATE_ACCOUNT_SUCCESS',
  CREATE_ACCOUNT_FAILURE = '@session/CREATE_ACCOUNT_FAILURE',

  AUTHORIZE_SESSION_REQUEST = '@session/AUTHORIZE_SESSION_REQUEST',
  AUTHORIZE_SESSION_SUCCESS = '@session/AUTHORIZE_SESSION_SUCCESS',
  AUTHORIZE_SESSION_FAILURE = '@session/AUTHORIZE_SESSION_FAILURE',

  REFRESH_SESSION_REQUEST = '@session/REFRESH_SESSION_REQUEST',
  REFRESH_SESSION_SUCCESS = '@session/REFRESH_SESSION_SUCCESS',
  REFRESH_SESSION_FAILURE = '@session/REFRESH_SESSION_FAILURE',

  DESTROY_SESSION_REQUEST = '@session/DESTROY_SESSION_REQUEST',
  DESTROY_SESSION_SUCCESS = '@session/DESTROY_SESSION_SUCCESS',
  DESTROY_SESSION_FAILURE = '@session/DESTROY_SESSION_FAILURE'
}


/*
 * Request
 */

export type CreateSessionReq = {
  serviceUrl: string;
};

export type AuthEidReq = {
  requestId: null | string;
};

export type CancelAuthEidReq = {
  requestId: string;
};

export type RefreshReq = {
  accessToken: string;
};

export type UpdateWelcomeMessageStatusReq = {
  status: boolean;
};

export type AuthorizeReq = {
  accessToken: string;
};


/*
 * API Request
 */

export type CreateSessionApiReq = AuthSocketReq<AuthSocketEndpoint.LOG_IN, CreateSessionReq>;
export type CreateAccountApiReq = AuthSocketReq<AuthSocketEndpoint.REGISTER, CreateSessionReq>;
export type RefreshApiReq = AuthSocketReq<AuthSocketEndpoint.REFRESH_SESSION, RefreshReq>;
export type CancelAuthEidReqApiReq = AuthSocketReq<AuthSocketEndpoint.CANCEL_REQUEST, CancelAuthEidReq>;

export type AuthenticateApiReq = SocketReq<SocketEndpoint.AUTHORIZE, AuthorizeReq>;

export type SessionApiAuthReqs = CreateSessionApiReq | CreateAccountApiReq | RefreshApiReq | CancelAuthEidReqApiReq;
export type SessionApiMainReqs = AuthenticateApiReq;


/*
 * API Response
 */

export type AuthEidIdRes = {
  requestId: string;
};

export type AuthEidIdStatusRes = {
  status: AuthEidStatus;
};

export type CreateSessionRes = {
  accessToken: string;
  expiresIn: number; // Seconds
};

export type CreateSessionStatusRes = AuthEidIdStatusRes & CreateSessionRes;

export type RefreshRes = {
  accessToken: string;
  expiresIn: number; // Seconds
  valid: boolean;
};

export type AuthorizeRes = {
  session: {
    valid: boolean;
    info: {
      user: string;
    }
  }
};


/*
 * Single Action
 */

export type UpdateCreateAccountRequestId = Action<SessionConstants.UPDATE_CREATE_ACCOUNT_REQUEST_ID, AuthEidReq>;
export type UpdateCreateSessionRequestId = Action<SessionConstants.UPDATE_CREATE_SESSION_REQUEST_ID, AuthEidReq>;

export type UpdateCreateAccountStatus = Action<SessionConstants.UPDATE_CREATE_ACCOUNT_STATUS, CreateSessionStatusRes>;
export type UpdateCreateSessionStatus = Action<SessionConstants.UPDATE_CREATE_SESSION_STATUS, CreateSessionStatusRes>;

export type CancelAuthEid = Action<SessionConstants.CANCEL_AUTH_EID_REQUEST, CancelAuthEidReq>;
export type CancelAuthEidSuccess = EmptyAction<SessionConstants.CANCEL_AUTH_EID_SUCCESS>;
export type CancelAuthEidFailure = FailureAction<SessionConstants.CANCEL_AUTH_EID_FAILURE>;

export type CreateSession = EmptyAction<SessionConstants.CREATE_SESSION_REQUEST>;
export type CreateSessionSuccess = Action<SessionConstants.CREATE_SESSION_SUCCESS, CreateSessionRes>;
export type CreateSessionFailure = FailureAction<SessionConstants.CREATE_SESSION_FAILURE>;

export type CreateAccount = EmptyAction<SessionConstants.CREATE_ACCOUNT_REQUEST>;
export type CreateAccountSuccess = Action<SessionConstants.CREATE_ACCOUNT_SUCCESS, CreateSessionRes>;
export type CreateAccountFailure = FailureAction<SessionConstants.CREATE_ACCOUNT_FAILURE>;

export type Authorize = Action<SessionConstants.AUTHORIZE_SESSION_REQUEST, AuthorizeReq>;
export type AuthorizeSuccess = Action<SessionConstants.AUTHORIZE_SESSION_SUCCESS, AuthorizeRes>;
export type AuthorizeFailure = FailureAction<SessionConstants.AUTHORIZE_SESSION_FAILURE>;

export type Refresh = Action<SessionConstants.REFRESH_SESSION_REQUEST, RefreshReq>;
export type RefreshSuccess = Action<SessionConstants.REFRESH_SESSION_SUCCESS, RefreshRes>;
export type RefreshFailure = FailureAction<SessionConstants.REFRESH_SESSION_FAILURE>;

export type Destroy = EmptyAction<SessionConstants.DESTROY_SESSION_REQUEST>;
export type DestroySuccess = EmptyAction<SessionConstants.DESTROY_SESSION_SUCCESS>;
export type DestroyFailure = FailureAction<SessionConstants.DESTROY_SESSION_FAILURE>;


/*
 * Action
 */

export type SessionAction =
  CancelAuthEid | CancelAuthEidSuccess | CancelAuthEidFailure
  | UpdateCreateAccountRequestId | UpdateCreateSessionRequestId
  | CreateAccount | UpdateCreateAccountStatus | CreateAccountSuccess | CreateAccountFailure
  | CreateSession | UpdateCreateSessionStatus | CreateSessionSuccess | CreateSessionFailure
  | Authorize | AuthorizeSuccess | AuthorizeFailure
  | Refresh | RefreshSuccess | RefreshFailure
  | Destroy | DestroySuccess | DestroyFailure;


/*
 * Actions
 */

export type SessionActions = {
  updateCreateAccountRequestId: (payload: AuthEidReq) => UpdateCreateAccountRequestId;
  updateCreateSessionRequestId: (payload: AuthEidReq) => UpdateCreateSessionRequestId;

  updateCreateAccountStatus: (payload: CreateSessionStatusRes) => UpdateCreateAccountStatus;
  updateCreateSessionStatus: (payload: CreateSessionStatusRes) => UpdateCreateSessionStatus;

  cancelAuthEid: (payload: CancelAuthEidReq) => CancelAuthEid;
  cancelAuthEidSuccess: () => CancelAuthEidSuccess;
  cancelAuthEidFailure: (error: string) => CancelAuthEidFailure;

  createSession: () => CreateSession;
  createSessionSuccess: (payload: CreateSessionRes) => CreateSessionSuccess;
  createSessionFailure: (error: string) => CreateSessionFailure;

  createAccount: () => CreateAccount;
  createAccountSuccess: (payload: CreateSessionRes) => CreateAccountSuccess;
  createAccountFailure: (error: string) => CreateAccountFailure;

  authorize: (payload: AuthorizeReq) => Authorize;
  authorizeSuccess: (payload: AuthorizeRes) => AuthorizeSuccess;
  authorizeFailure: (error: string) => AuthorizeFailure;

  refresh: (payload: RefreshReq) => Refresh;
  refreshSuccess: (payload: RefreshRes) => RefreshSuccess;
  refreshFailure: (error: string) => RefreshFailure;

  destroy: () => Destroy;
  destroySuccess: () => DestroySuccess;
  destroyFailure: (error: string) => DestroyFailure;
};


/*
 * State
 */

type ActionKeys = 'refresh'
  | 'createSession'
  | 'createAccount'
  | 'signature'
  | 'cancel';

export type SessionState = {
  authenticated: null | boolean;
  loginRequestId: null | string;
  registerRequestId: null | string;
  token: null | SessionToken;
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
