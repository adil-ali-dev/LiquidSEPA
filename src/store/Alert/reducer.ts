import { AlertAction, AlertConstants, AlertState } from './typedef';


export const initialState: AlertState = {
  data: null
};

export const alertReducer = (state = initialState, action: AlertAction): AlertState => {
  switch (action.type) {

    case AlertConstants.SHOW:
      return { ...state, data: action.payload };

    case AlertConstants.HIDE:
      return initialState;

    default:
      return state;
  }
};
