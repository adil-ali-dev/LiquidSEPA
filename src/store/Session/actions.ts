import { SessionActions, SessionConstants } from './typedef';

export const sessionActions: SessionActions = {
  updateCreateAccountRequestId: payload => ({ type: SessionConstants.UPDATE_CREATE_ACCOUNT_REQUEST_ID, payload }),
  updateCreateSessionRequestId: payload => ({ type: SessionConstants.UPDATE_CREATE_SESSION_REQUEST_ID, payload }),

  updateCreateAccountStatus: payload => ({ type: SessionConstants.UPDATE_CREATE_ACCOUNT_STATUS, payload }),
  updateCreateSessionStatus: payload => ({ type: SessionConstants.UPDATE_CREATE_SESSION_STATUS, payload }),

  cancelAuthEid: payload => ({ type: SessionConstants.CANCEL_AUTH_EID_REQUEST, payload }),
  cancelAuthEidSuccess: () => ({ type: SessionConstants.CANCEL_AUTH_EID_SUCCESS }),
  cancelAuthEidFailure: error => ({ type: SessionConstants.CANCEL_AUTH_EID_FAILURE, error }),

  createSession: () => ({ type: SessionConstants.CREATE_SESSION_REQUEST }),
  createSessionSuccess: payload => ({ type: SessionConstants.CREATE_SESSION_SUCCESS, payload }),
  createSessionFailure: error => ({ type: SessionConstants.CREATE_SESSION_FAILURE, error }),

  createAccount: () => ({ type: SessionConstants.CREATE_ACCOUNT_REQUEST }),
  createAccountSuccess: () => ({ type: SessionConstants.CREATE_ACCOUNT_SUCCESS }),
  createAccountFailure: error => ({ type: SessionConstants.CREATE_ACCOUNT_FAILURE, error }),

  authorize: payload => ({ type: SessionConstants.AUTHORIZE_SESSION_REQUEST, payload }),
  authorizeSuccess: payload => ({ type: SessionConstants.AUTHORIZE_SESSION_SUCCESS, payload }),
  authorizeFailure: error => ({ type: SessionConstants.AUTHORIZE_SESSION_FAILURE, error }),

  refresh: payload => ({ type: SessionConstants.REFRESH_SESSION_REQUEST, payload }),
  refreshSuccess: payload => ({ type: SessionConstants.REFRESH_SESSION_SUCCESS, payload }),
  refreshFailure: error => ({ type: SessionConstants.REFRESH_SESSION_FAILURE, error }),

  destroy: () => ({ type: SessionConstants.DESTROY_SESSION_REQUEST }),
  destroySuccess: () => ({ type: SessionConstants.DESTROY_SESSION_SUCCESS }),
  destroyFailure: error => ({ type: SessionConstants.DESTROY_SESSION_FAILURE, error })
};
