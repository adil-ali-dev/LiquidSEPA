import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { SocketCloseStatus, StatusModalType } from '../typedef';
import { AppState } from './typedef';
import { authSocketActions, AuthSocketConstants } from './AuthSocket';
import { socketActions } from './Socket';
import { SessionConstants } from './Session';
import { alertActions } from './Alert';


export const createAppMiddleware = () => {
  return (store: MiddlewareAPI<Dispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (
        action.type !== SessionConstants.REFRESH_SESSION_FAILURE
        && action.type !== SessionConstants.AUTHORIZE_SESSION_FAILURE
        && action.type.endsWith('FAILURE')
        && (action as AnyAction).error
      ) {
        store.dispatch(alertActions.show({
          type: StatusModalType.ERROR,
          message: (action as AnyAction).error
        }));
      }

      return next(action);
    };
  };
};
