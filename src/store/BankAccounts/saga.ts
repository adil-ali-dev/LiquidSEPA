import { takeLatest, put } from 'redux-saga/effects';

import { SocketEndpoint, AccountType } from '../../typedef';
import { BankAccountsConstants } from './typedef';
import { socketActions } from '../Socket';


function *getBankAccounts() {
  yield put(socketActions.send({
    method: SocketEndpoint.GET_ACCOUNTS,
    api: 'account',
    messageId: `${Date.now()}`,
    args: { accountType: AccountType.BANK }
  }));
}

export function *bankAccountsSaga() {
  yield takeLatest(BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST, getBankAccounts);
}
