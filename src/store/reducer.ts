import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppState } from './typedef';
import { alertReducer } from './Alert';
import { authSocketReducer } from './AuthSocket';
import { sessionReducer } from './Session';


const appReducer = combineReducers<AppState>({
  // Misc:
  alert: alertReducer,

  // Main:
  authSocket: authSocketReducer,
  session: sessionReducer
});


export const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};
