import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { AuthEidStatus, StatusModalType } from '../typedef';
import { AppState } from './typedef';
import { AuthSocketConstants } from './AuthSocket';
import { socketActions } from './Socket';
import { SessionConstants } from './Session';
import { alertActions } from './Alert';


export const createAppMiddleware = () => {
  return (store: MiddlewareAPI<Dispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Connecting only if auth socket is already connected.
      if (action.type === AuthSocketConstants.CONNECTED && !store.getState().socket.status) {
        store.dispatch(socketActions.connect());
      }

      if (action.type === SessionConstants.DESTROY_SESSION_REQUEST) {
        store.dispatch(socketActions.close({ code: 1000 }));
      }

      if (action.type !== SessionConstants.REFRESH_SESSION_FAILURE
        && action.type !== SessionConstants.AUTHORIZE_SESSION_FAILURE
        && action.type.endsWith('FAILURE')
        && (action as AnyAction).error) {
        store.dispatch(alertActions.show({
          type: StatusModalType.ERROR,
          message: (action as AnyAction).error
        }))
      }

      return next(action);
    };
  };
};
