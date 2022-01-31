import { takeLatest, put } from 'redux-saga/effects';

import { LIVE } from '../../constants';
import { SocketEndpoint, StatusModalType } from '../../typedef';
import { BankAccountsConstants, CreateAgreementLink, CreateBankAccount, GetSupportedBanks } from './typedef';
import { alertActions } from '../Alert';
import { socketActions } from '../Socket';
import { bankAccountsActions } from './actions';


const ACCOUNT_API = 'account';


function *getBankAccounts() {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.GET_BANK_ACCOUNTS,
      api: ACCOUNT_API,
      messageId: `${Date.now()}`,
      args: {}
    }));
  } catch {
    yield put(bankAccountsActions.getBankAccountsFailure('Socket is not connected'))
  }
}

function *getSupportedBanks({ payload }: GetSupportedBanks) {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.GET_SUPPORTED_BANKS,
      api: ACCOUNT_API,
      messageId: `${Date.now()}`,
      args: payload
    }));
  } catch {
    yield put(bankAccountsActions.getSupportedBanksFailure('Socket is not connected'))
  }
}

function *createAgreementLink({ payload }: CreateAgreementLink) {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.CREATE_BANK_AGREEMENT_LINK,
      api: ACCOUNT_API,
      messageId: `${Date.now()}`,
      args: { ...payload, sandbox: !LIVE, redirectUrl: window.location.origin }
    }));
  } catch {
    yield put(bankAccountsActions.createAgreementLinkFailure('Socket is not connected'))
  }
}

function *createBankAccount({ payload }: CreateBankAccount) {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.CREATE_BANK_ACCOUNT,
      api: ACCOUNT_API,
      messageId: `${Date.now()}`,
      args: payload
    }));
  } catch {
    yield put(bankAccountsActions.getBankAccountsFailure('Socket is not connected'))
  }
}

function *createBankAccountSuccess() {
  yield put(bankAccountsActions.getBankAccounts());

  yield put(alertActions.show({
    type: StatusModalType.SUCCESS,
    message: 'Account added successfully'
  }));
}


export function *bankAccountsSaga() {
  yield takeLatest(BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST, getBankAccounts);
  yield takeLatest(BankAccountsConstants.GET_SUPPORTED_BANKS_REQUEST, getSupportedBanks);
  yield takeLatest(BankAccountsConstants.CREATE_AGREEMENT_LINK_REQUEST, createAgreementLink);
  yield takeLatest(BankAccountsConstants.CREATE_BANK_ACCOUNT_REQUEST, createBankAccount);

  yield takeLatest(BankAccountsConstants.CREATE_BANK_ACCOUNT_SUCCESS, createBankAccountSuccess);
}
