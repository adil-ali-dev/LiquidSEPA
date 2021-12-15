import { SocketConstants, SocketState, SocketAction } from './typedef';

const initialState: SocketState = {
  status: false,
  error: null
};

export const socketReducer = (state = initialState, action: SocketAction): SocketState => {
  switch (action.type) {

    case SocketConstants.CONNECT:
      return { ...state, status: true };

    case SocketConstants.ERROR:
      return { ...state, error: action.error };

    case SocketConstants.CLOSE:
      return { ...state, status: false };

    default:
      return state;
  }
};
