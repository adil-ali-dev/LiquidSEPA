import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppState } from './typedef';
import { alertReducer } from './Alert';
import { authSocketReducer } from './AuthSocket';
import { SocketConstants, socketReducer } from './Socket';
import { sessionReducer, initialState as sessionInitialState, SessionState, SessionConstants } from './Session';
import { addressesReducer } from './Addresses';
import { bankAccountsReducer } from './BankAccounts';
import { rfqReducer } from './Rfq';
import { withReduxStateSync } from 'redux-state-sync';


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


const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  // Reset all store data to initial if socket gets closed
  if (state) {
    const { session, bankAccounts, authSocket, rfq, addresses, socket } = state;

    if (action.type === SessionConstants.DESTROY_SESSION_REQUEST) {
      return appReducer({ authSocket, socket, session: sessionInitialState }, action);
    }

    if (action.type === SocketConstants.CLOSED) {
      return appReducer({
        authSocket,
        session: { ...session, authenticated: false },
        addresses,
        rfq,
        bankAccounts,
      }, action);
    }
  }

  return appReducer(state, action);
};
export default withReduxStateSync(rootReducer)
