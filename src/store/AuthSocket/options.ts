import { MiddlewareOptions } from 'redux-awesome-socket-middleware';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { WS_AUTH_URL } from '../../constants';
import { AuthSocketRes, AuthSocketReq, SocketCloseStatus } from '../../typedef';
import { AuthSocketConstants } from './typedef';
import { messageHandler } from './handlers';


export const authSocketOptions: MiddlewareOptions<AuthSocketReq, AuthSocketRes, unknown> = {
  url: WS_AUTH_URL,
  actionTypes: [AuthSocketConstants.SEND, AuthSocketConstants.CONNECT, AuthSocketConstants.CLOSE],
  completedActionTypes: [AuthSocketConstants.CONNECTED, AuthSocketConstants.CLOSED],
  autoConnect: true,
  reconnectionInterval: [0, 1000, 5000],
  shouldReconnect: ({ code }) => code !== SocketCloseStatus.WITHOUT_RECONNECT,

  onMessage: messageHandler,
  serialize: data => snakecaseKeys(data, { deep: true }),
  deserialize: data => camelcaseKeys(data, { deep: true })
}
