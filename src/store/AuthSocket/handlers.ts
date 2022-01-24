import { Dispatch } from 'redux';

import { AuthSocketEndpoint, AuthSocketRes } from '../../typedef';
import { AuthSocketHandler } from './typedef';
import { sessionActions } from '../Session';


const authSocketExternalHandlers: AuthSocketHandler = {
  [AuthSocketEndpoint.REGISTER]: [sessionActions.updateCreateAccountRequestId, sessionActions.createAccountFailure],
  [AuthSocketEndpoint.REGISTER_STATUS]: [sessionActions.updateCreateAccountStatus, sessionActions.createAccountFailure],

  [AuthSocketEndpoint.LOG_IN]: [sessionActions.updateCreateSessionRequestId, sessionActions.createSessionFailure],
  [AuthSocketEndpoint.LOG_IN_STATUS]: [sessionActions.updateCreateSessionStatus, sessionActions.createSessionFailure],

  [AuthSocketEndpoint.REFRESH_SESSION]: [sessionActions.refreshSuccess, sessionActions.refreshFailure],

  // We don't get response to this request
  [AuthSocketEndpoint.CANCEL_REQUEST]: [null, null]
};


export const messageHandler = (res: AuthSocketRes, dispatch: Dispatch) => {
  const { error, data, method } = res;
  if (!authSocketExternalHandlers[method]) return;

  const [success, failure] = authSocketExternalHandlers[method];

  if (error && failure) {
    const errorMsg = typeof error === 'number' ? 'Something went wrong' : error;

    dispatch(failure(errorMsg));
  } else if (!error && success) {
    dispatch(success(data));
  }
}
