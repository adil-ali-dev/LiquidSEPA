import { AuthSocketAction, AuthSocketConstants, AuthSocketState } from './typedef';


const initialState: AuthSocketState = {
  status: false,
  callbackPayload: null,
  error: null
};

export const authSocketReducer = (state = initialState, action: AuthSocketAction): AuthSocketState => {
  switch (action.type) {

    case AuthSocketConstants.CONNECTED:
      return { ...state, status: true };

    case AuthSocketConstants.DISPOSABLE_SEND:
      return { ...state, callbackPayload: state.status ? null : action.payload }

    case AuthSocketConstants.ERROR:
      return { ...state, error: action.error };

    case AuthSocketConstants.CLOSED:
      return { ...state, status: false };

    default:
      return state;
  }
};
