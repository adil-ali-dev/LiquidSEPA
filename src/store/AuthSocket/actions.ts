import { AuthSocketActions, AuthSocketConstants } from './typedef';

export const authSocketActions: AuthSocketActions = {
  connect: () => ({ type: AuthSocketConstants.CONNECT }),
  send: payload => ({ type: AuthSocketConstants.SEND, payload }),
  disposableSend: payload => ({ type: AuthSocketConstants.DISPOSABLE_SEND, payload }),
  removeDisposablePayload: () => ({ type: AuthSocketConstants.REMOVE_DISPOSABLE_PAYLOAD }),
  close: payload => ({ type: AuthSocketConstants.CLOSE, payload }),
  error: error => ({ type: AuthSocketConstants.ERROR, error })
};
