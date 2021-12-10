import { call, takeLatest, select } from 'redux-saga/effects';

import { AlertConstants } from './typedef';
import { alertButtonHandlerSelector } from './selectors';


function *hide() {
  const handleButtonPress: undefined | (() => void) =  yield select(alertButtonHandlerSelector);
  if (!handleButtonPress) return;

  yield call(handleButtonPress);
}


export function *alertSaga() {
  yield takeLatest(AlertConstants.HIDE, hide);
}
