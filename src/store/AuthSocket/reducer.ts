import { AuthSocketConstants, AuthSocketState, AuthSocketAction } from './typedef';


const initialState: AuthSocketState = {
  status: false,
  error: null
};

export const authSocketReducer = (state = initialState, action: AuthSocketAction): AuthSocketState => {
  switch (action.type) {

    case AuthSocketConstants.CONNECTED:
      return { ...state, status: true };

    case AuthSocketConstants.ERROR:
      return { ...state, error: action.error };

    case AuthSocketConstants.CLOSED:
      return { ...state, status: false };

    default:
      return state;
  }
};
