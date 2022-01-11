import { AuthEidStatus } from '../../typedef';
import { SessionAction, SessionConstants, SessionState } from './typedef';

export const initialState: SessionState = {
  authenticated: null,
  token: null,
  requestId: null,
  loading: {
    signature: false,
    createSession: false,
    createAccount: false,
    refresh: false,
    cancel: false
  },
  error: {
    signature: null,
    createSession: null,
    createAccount: null,
    refresh: null,
    cancel: null
  }
};

export const sessionReducer = (state = initialState, action: SessionAction): SessionState => {
  switch (action.type) {

    case SessionConstants.CANCEL_AUTH_EID_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, signature: false, createSession: false, createAccount: false },
        requestId: null
      };
    case SessionConstants.CANCEL_AUTH_EID_FAILURE:
      return {
        ...state,
        error: { ...state.error, cancel: action.error }
      };

    case SessionConstants.CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, createAccount: true },
        error: { ...state.error, createAccount: null }
      };
    case SessionConstants.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, createAccount: false, signature: false },
        requestId: null
      };
    case SessionConstants.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, createAccount: false, signature: false },
        error: { ...state.error, createAccount: action.error }
      };

    case SessionConstants.UPDATE_AUTH_EID_REQUEST_ID:
      return { ...state, requestId: action.payload.requestId };

    case SessionConstants.UPDATE_CREATE_SESSION_STATUS:
    case SessionConstants.UPDATE_CREATE_ACCOUNT_STATUS:
      return {
        ...state,
        loading: { ...state.loading, signature: action.payload.status === AuthEidStatus.NOT_READY }
      };

    case SessionConstants.CREATE_SESSION_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, createSession: true },
        error: { ...state.error, createSession: null }
      };
    case SessionConstants.CREATE_SESSION_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, createSession: false, signature: false },
        token: {
          value: action.payload.accessToken,
          expiresIn: action.payload.expiresIn
        },
        requestId: null
      };
    case SessionConstants.CREATE_SESSION_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, createSession: false, signature: false },
        error: { ...state.error, createSession: action.error }
      };

    case SessionConstants.AUTHORIZE_SESSION_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, createSession: false },
        authenticated: true
      };
    case SessionConstants.AUTHORIZE_SESSION_FAILURE:
      return {
        ...state,
        authenticated: null,
        token: null,
        loading: { ...state.loading, createSession: false },
        error: { ...state.error, createSession: action.error }
      };

    case SessionConstants.REFRESH_SESSION_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, refresh: true },
        error: { ...state.error, refresh: null }
      };
    case SessionConstants.REFRESH_SESSION_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, refresh: false },
        token: {
          value: action.payload.accessToken,
          expiresIn: action.payload.expiresIn
        }
      };
    case SessionConstants.REFRESH_SESSION_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, refresh: false },
        authenticated: false,
        token: null,
        error: { ...state.error, refresh: action.error }
      };

    case SessionConstants.DESTROY_SESSION_REQUEST:
      return {
        ...state,
        token: null,
        authenticated: false
      }

    default:
      return state;
  }
};
