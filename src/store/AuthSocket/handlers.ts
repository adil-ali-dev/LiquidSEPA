import { AuthSocketEndpoint } from '../../typedef';
import { AuthSocketHandler } from './typedef';
import { sessionActions } from '../Session';


export const authSocketExternalHandlers: AuthSocketHandler = {
  [AuthSocketEndpoint.REGISTER]: [sessionActions.updateAuthEidRequestId, sessionActions.createAccountFailure],
  [AuthSocketEndpoint.REGISTER_STATUS]: [sessionActions.updateCreateAccountStatus, sessionActions.createAccountFailure],

  [AuthSocketEndpoint.LOG_IN]: [sessionActions.updateAuthEidRequestId, sessionActions.createSessionFailure],
  [AuthSocketEndpoint.LOG_IN_STATUS]: [sessionActions.updateCreateSessionStatus, sessionActions.createSessionFailure],

  [AuthSocketEndpoint.REFRESH_SESSION]: [sessionActions.refreshSuccess, sessionActions.refreshFailure]
};
