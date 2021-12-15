import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppState } from './typedef';
import { alertReducer } from './Alert';
import { authSocketReducer } from './AuthSocket';
import { SocketConstants, socketReducer } from './Socket';
import { sessionReducer } from './Session';
import { addressesReducer } from './Addresses';
import { bankAccountsReducer } from './BankAccounts';
import { rfqReducer } from './Rfq';


const appReducer = combineReducers<AppState>({
  // Misc:
  alert: alertReducer,

  // Main:
  authSocket: authSocketReducer,
  socket: socketReducer,
  session: sessionReducer,
  addresses: addressesReducer,
  bankAccounts: bankAccountsReducer,
  rfq: rfqReducer
});


export const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  // Reset all store data to initial if socket gets closed
  if (state && action.type === SocketConstants.CLOSE) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
