import { all, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';


export function *rootSaga() {
  // Wait for the persist store
  yield take(REHYDRATE);

  // Run sagas
  yield all([]);
}
