import { AlertState } from './Alert';
import { AuthSocketState } from './AuthSocket';
import { SessionState } from './Session';


export interface AppState {
  // Misc:
  alert: AlertState;

  // Main:
  authSocket: AuthSocketState;
  session: SessionState;
}


declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}
