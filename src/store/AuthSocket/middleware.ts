import { MiddlewareAPI, AnyAction } from 'redux';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { AuthSocketRes } from '../../typedef';
import { AuthSocketAction, AuthSocketConstants } from './typedef';
import { authSocketActions } from './actions';
import { authSocketExternalHandlers } from './handlers';


export const createAuthSocketMiddleware = (url?: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket;

    const createSocket = () => {
      if (!url) return;

      socket = new WebSocket(url);

      socket.onopen = () => {
        store.dispatch(authSocketActions.connect());
      };

      socket.onerror = event => {
        console.error(event);
      };

      socket.onmessage = event => {
        const response: AuthSocketRes = camelcaseKeys(JSON.parse(event.data), { deep: true });
        const { error, data, method } = response;
        if (!authSocketExternalHandlers[method]) return;

        const [success, failure] = authSocketExternalHandlers[method];

        if (error && failure) {
          const errorMsg = typeof error === 'number' ? 'Something went wrong' : error;

          store.dispatch(failure(errorMsg));
        } else if (!error && success) {
          store.dispatch(success(data));
        }
      };

      socket.onclose = event => {
        store.dispatch(authSocketActions.close());

        if (event.code !== 1005) {
          setTimeout(createSocket, 1000);
        }
      };
    };

    createSocket();

    return (next: (action: AuthSocketAction) => void) => (action: AuthSocketAction) => {
      if (action.type && socket?.readyState === 1 && action.type === AuthSocketConstants.SEND) {
        const snakeCasedPayload = snakecaseKeys(action.payload, { deep: true });

        socket.send(JSON.stringify(snakeCasedPayload));
      }

      return next(action);
    };
  };
};
