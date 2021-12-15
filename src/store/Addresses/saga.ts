import { takeLatest, put } from 'redux-saga/effects';

import { SocketEndpoint, AccountType } from '../../typedef';
import { AddressesConstants, ValidateAddress, WhitelistAddress } from './typedef';
import { socketActions } from '../Socket';
import { addressesActions } from './actions';


function *validateAddress({ payload }: ValidateAddress) {
  yield put(socketActions.send({
    method: SocketEndpoint.VALIDATE_ADDRESS,
    api: 'account',
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *whitelistAddress({ payload }: WhitelistAddress) {
  yield put(socketActions.send({
    method: SocketEndpoint.WHITELIST_ADDRESS,
    api: 'account',
    messageId: `${Date.now()}`,
    args: payload
  }));
}

function *getAddresses() {
  yield put(socketActions.send({
    method: SocketEndpoint.GET_ACCOUNTS,
    api: 'account',
    messageId: `${Date.now()}`,
    args: { accountType: AccountType.WALLET }
  }));
}

function *whitelistAddressSuccess() {
  put(addressesActions.getAddresses());
}


export function *addressesSaga() {
  yield takeLatest(AddressesConstants.VALIDATE_ADDRESS_REQUEST, validateAddress);
  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_REQUEST, whitelistAddress);
  yield takeLatest(AddressesConstants.GET_ADDRESSES_REQUEST, getAddresses);

  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_SUCCESS, whitelistAddressSuccess);
}
