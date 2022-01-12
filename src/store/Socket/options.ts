import { MiddlewareOptions } from 'redux-awesome-socket-middleware';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { WS_MAIN_URL } from '../../constants';
import { SocketRes, SocketReq } from '../../typedef';
import { SocketConstants } from './typedef';
import { messageHandler } from './handlers';


export const mainSocketOptions: MiddlewareOptions<SocketReq, SocketRes, unknown> = {
  url: WS_MAIN_URL,
  actionTypes: [SocketConstants.SEND, SocketConstants.CONNECT, SocketConstants.CLOSE],
  completedActionTypes: [SocketConstants.CONNECTED, SocketConstants.CLOSED],
  autoConnect: false,
  reconnectionInterval: [0, 1000, 5000],

  onMessage: messageHandler,
  serialize: data => snakecaseKeys(data, { deep: true }),
  deserialize: data => camelcaseKeys(data, { deep: true })
}
