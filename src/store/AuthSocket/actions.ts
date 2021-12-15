import { AuthSocketConstants, AuthSocketActions } from './typedef';

export const authSocketActions: AuthSocketActions = {
  connect: () => ({ type: AuthSocketConstants.CONNECT }),
  send: payload => ({ type: AuthSocketConstants.SEND, payload }),
  close: () => ({ type: AuthSocketConstants.CLOSE }),
  error: error => ({ type: AuthSocketConstants.ERROR, error })
};
