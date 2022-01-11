import { AnyAction, MiddlewareAPI } from 'redux';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { SocketRes, StatusModalType } from '../../typedef';
import { SocketAction, SocketConstants } from './typedef';
import { AuthSocketAction, AuthSocketConstants } from '../AuthSocket';
import { SessionAction, SessionConstants } from '../Session';
import { alertActions } from '../Alert';
import { socketActions } from './actions';
import { socketExternalHandlers } from './handlers';

type Action = SocketAction | SessionAction | AuthSocketAction;

export const createSocketMiddleware = (url?: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket;

    const createSocket = () => {
      if (!url) return;

      socket = new WebSocket(url);

      socket.onopen = () => {
        store.dispatch(socketActions.connect());
      };

      socket.onerror = event => {
        // eslint-disable-next-line no-console
        console.error(event);
      };

      socket.onmessage = event => {
        const response: SocketRes = camelcaseKeys(JSON.parse(event.data), { deep: true });
        const { error, data, method } = response;
        if (!socketExternalHandlers[method]) return;

        const [success, failure] = socketExternalHandlers[method];

        if (error && failure) {
          const errorMsg = typeof error === 'number' ? 'Something went wrong' : error;

          store.dispatch(failure(errorMsg));
        } else if (!error && success) {
          store.dispatch(success(data));
        }
      };

      socket.onclose = event => {
        store.dispatch(socketActions.close());

        if (event.code !== 1005) {
          setTimeout(createSocket, 1000);
        }
      };
    };

    return (next: (action: Action) => void) => (action: Action) => {
      if (action.type && socket?.readyState === 1 && action.type === SocketConstants.SEND) {
        const snakeCasedPayload = snakecaseKeys(action.payload, { deep: true });

        socket.send(JSON.stringify(snakeCasedPayload));
      }

      // Connecting only if auth socket is already connected.
      if (action.type === AuthSocketConstants.CONNECT && !socket) {
        createSocket();
      }

      if (action.type === SessionConstants.DESTROY_SESSION_REQUEST) {
        socket.close(1000);
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
