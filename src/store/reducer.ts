import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppState } from './typedef';
import { alertReducer } from './Alert';
import { authSocketReducer } from './AuthSocket';
import { SocketConstants, socketReducer } from './Socket';
import { sessionReducer, initialState as sessionInitialState, SessionState } from './Session';
import { addressesReducer } from './Addresses';
import { bankAccountsReducer, initialState as bankAccountsInitialState } from './BankAccounts';
import { rfqReducer } from './Rfq';


const appReducer = combineReducers<AppState | { session: SessionState }>({
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
  if (state && action.type === SocketConstants.CLOSED) {
    const { session, bankAccounts } = state;

    const newState = {
      session: { ...sessionInitialState, token: session.token },
      bankAccounts: { ...bankAccountsInitialState, waitingForContinue: bankAccounts.waitingForContinue },
    };

    return appReducer(newState, action);
  }

  return appReducer(state, action);
};
