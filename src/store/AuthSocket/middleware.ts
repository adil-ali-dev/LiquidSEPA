import { MiddlewareAPI, AnyAction } from 'redux';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { APP_DEV } from '../../constants';
import { AuthSocketRes, StatusModalType } from '../../typedef';
import { AuthSocketAction, AuthSocketConstants } from './typedef';
import { alertActions } from '../Alert';
import { authSocketActions } from './actions';
import { authSocketExternalHandlers } from './handlers';


const logger = (url?: string, message?: string, meta?: Event | Record<string, any>): void => {
  if (APP_DEV) {
    // eslint-disable-next-line no-console
    console.log(`[${url}] ${message}.`, meta || '');
  }
};


export const createAuthSocketMiddleware = (url?: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket;

    const createSocket = () => {
      if (!url) return;

      socket = new WebSocket(url);

      socket.onopen = () => {
        store.dispatch(authSocketActions.connect());

        logger(url, 'Connected');
      };

      socket.onerror = event => {
        logger(url, 'Error', event);
      };

      socket.onmessage = event => {
        logger(url, 'Received', JSON.parse(event.data));

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
          logger(url, 'Unexpectedly closed (Reconnect will be attempted in 1 second)', event);

          setTimeout(createSocket, 1000);
        } else {
          logger(url, 'Expectedly closed');
        }
      };
    };

    createSocket();

    return (next: (action: AuthSocketAction) => void) => (action: AuthSocketAction) => {
      if (action.type && socket?.readyState === 1 && action.type === AuthSocketConstants.SEND) {
        const snakeCasedPayload = snakecaseKeys(action.payload, { deep: true });

        socket.send(JSON.stringify(snakeCasedPayload));
        logger(url, 'Sent', snakeCasedPayload);
      }

      if (action.type.endsWith('FAILURE') && (action as AnyAction).error) {
        store.dispatch(alertActions.show({
          type: StatusModalType.ERROR,
          message: (action as AnyAction).error
        }))
      }

      return next(action);
    };
  };
};
