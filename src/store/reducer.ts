import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppState } from './typedef';


const appReducer = combineReducers<AppState>({});


export const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  return appReducer(state, action);
};
