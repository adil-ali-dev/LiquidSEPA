import { takeLatest, put, select } from 'redux-saga/effects';

import { LIVE } from '../../constants';
import { SocketEndpoint, StatusModalType } from '../../typedef';
import { BankAccountsConstants, CreateAgreementLink, CreateBankAccount, CreateBankAccountFailure, GetSupportedBanks } from './typedef';
import { alertActions } from '../Alert';
import { socketActions } from '../Socket';
import { bankAccountsActions } from './actions';
import { bankAccountsCbSuccessSelector, bankAccountsCbFailureSelector } from './selectors';


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
    yield put(bankAccountsActions.getBankAccountsFailure('Socket not connected'))
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
    yield put(bankAccountsActions.getSupportedBanksFailure('Socket not connected'))
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
    yield put(bankAccountsActions.createAgreementLinkFailure('Socket not connected'))
  }
}

function *createBankAccount({ payload }: CreateBankAccount) {
  const { closeCbFailure, closeCbSuccess, ...args } = payload;

  try {
    yield put(socketActions.send({
      method: SocketEndpoint.CREATE_BANK_ACCOUNT,
      api: ACCOUNT_API,
      messageId: `${Date.now()}`,
      args
    }));
  } catch {
    yield put(bankAccountsActions.getBankAccountsFailure('Socket not connected'))
  }
}

function *createBankAccountSuccess() {
  const onClose: null | (() => void) = yield select(bankAccountsCbSuccessSelector);

  yield put(bankAccountsActions.getBankAccounts());

  yield put(alertActions.show({
    type: StatusModalType.SUCCESS,
    message: 'Your account is now verified',
    onClose
  }));
}

function *createBankAccountFailure({ error }: CreateBankAccountFailure) {
  const onClose: null | (() => void) = yield select(bankAccountsCbFailureSelector);

  yield put(alertActions.show({
    type: StatusModalType.ERROR,
    message: error,
    onClose
  }));
}


export function *bankAccountsSaga() {
  yield takeLatest(BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST, getBankAccounts);
  yield takeLatest(BankAccountsConstants.GET_SUPPORTED_BANKS_REQUEST, getSupportedBanks);
  yield takeLatest(BankAccountsConstants.CREATE_AGREEMENT_LINK_REQUEST, createAgreementLink);
  yield takeLatest(BankAccountsConstants.CREATE_BANK_ACCOUNT_REQUEST, createBankAccount);

  yield takeLatest(BankAccountsConstants.CREATE_BANK_ACCOUNT_SUCCESS, createBankAccountSuccess);
  yield takeLatest(BankAccountsConstants.CREATE_BANK_ACCOUNT_FAILURE, createBankAccountFailure);
}
