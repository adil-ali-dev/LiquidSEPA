import { AlertState } from './Alert';
import { AuthSocketState } from './AuthSocket';
import { SocketState } from './Socket';
import { SessionState } from './Session';
import { AddressesState } from './Addresses';
import { BankAccountsState } from './BankAccounts';
import { RfqState } from './Rfq';


export interface AppState {
  // Misc:
  alert: AlertState;

  // Main:
  authSocket: AuthSocketState;
  socket: SocketState;
  session: SessionState;
  addresses: AddressesState;
  bankAccounts: BankAccountsState;
  rfq: RfqState;
}


declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}
