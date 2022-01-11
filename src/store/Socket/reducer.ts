import { SocketConstants, SocketState, SocketAction } from './typedef';

const initialState: SocketState = {
  status: false,
  error: null
};

export const socketReducer = (state = initialState, action: SocketAction): SocketState => {
  switch (action.type) {

    case SocketConstants.CONNECTED:
      return { ...state, status: true };

    case SocketConstants.ERROR:
      return { ...state, error: action.error };

    case SocketConstants.CLOSED:
      return { ...state, status: false };

    default:
      return state;
  }
};
