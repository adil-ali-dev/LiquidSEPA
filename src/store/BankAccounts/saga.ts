import { takeLatest, put } from 'redux-saga/effects';

import { LIVE } from '../../constants';
import { SocketEndpoint } from '../../typedef';
import { BankAccountsConstants, CreateAgreementLink, CreateBankAccount, GetSupportedBanks } from './typedef';
import { socketActions } from '../Socket';


const ACCOUNT_API = 'account';

function *getBankAccounts() {
  yield put(socketActions.send({
    method: SocketEndpoint.GET_BANK_ACCOUNTS,
    api: ACCOUNT_API,
    messageId: `${Date.now()}`,
    args: {}
  }));
}

function *getSupportedBanks({ payload }: GetSupportedBanks) {
  yield put(socketActions.send({
    method: SocketEndpoint.GET_SUPPORTED_BANKS,
    api: ACCOUNT_API,
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *createAgreementLink({ payload }: CreateAgreementLink) {
  yield put(socketActions.send({
    method: SocketEndpoint.CREATE_BANK_AGREEMENT_LINK,
    api: ACCOUNT_API,
    messageId: `${Date.now()}`,
    args: { ...payload, sandbox: !LIVE, redirectUrl: window.location.origin }
  }));
}

function *createBankAccount({ payload }: CreateBankAccount) {
  yield put(socketActions.send({
    method: SocketEndpoint.CREATE_BANK_ACCOUNT,
    api: ACCOUNT_API,
    messageId: `${Date.now()}`,
    args: payload
  }));
}

export function *bankAccountsSaga() {
  yield takeLatest(BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST, getBankAccounts);
  yield takeLatest(BankAccountsConstants.GET_SUPPORTED_BANKS_REQUEST, getSupportedBanks);
  yield takeLatest(BankAccountsConstants.CREATE_AGREEMENT_LINK_REQUEST, createAgreementLink);
  yield takeLatest(BankAccountsConstants.CREATE_BANK_ACCOUNT_REQUEST, createBankAccount);
}
