import { takeLatest, put } from 'redux-saga/effects';

import { AuthEidStatus, SocketEndpoint, StatusModalType } from '../../typedef';
import { AddressesConstants, ValidateAddress, WhitelistAddress, UpdateWhitelistingStatus } from './typedef';
import { socketActions } from '../Socket';
import { alertActions } from '../Alert';
import { addressesActions } from './actions';


const authEidErrors = {
  [AuthEidStatus.TIMEOUT]: 'Auth eID signature timeout',
  [AuthEidStatus.CANCELLED]: 'Auth eID signature has cancelled',
  [AuthEidStatus.REQUEST_CANCELLED]: 'Auth eID signature has cancelled',
  [AuthEidStatus.ACCOUNT_NOT_VERIFIED]: 'Auth eID account is not verified',
  [AuthEidStatus.REQUEST_ERROR]: 'Something went wrong'
};


function *validateAddress({ payload }: ValidateAddress) {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.VALIDATE_ADDRESS,
      api: 'account',
      messageId: `${Date.now()}`,
      args: payload
    }));
  } catch {
    yield put(addressesActions.validateAddressFailure('Socket is not connected'))
  }
}

function *whitelistAddress({ payload }: WhitelistAddress) {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.WHITELIST_ADDRESS,
      api: 'account',
      messageId: `${Date.now()}`,
      args: payload
    }));
  } catch {
    yield put(addressesActions.whitelistAddressFailure('Socket is not connected'))
  }
}

function *getAddresses() {
  try {
    yield put(socketActions.send({
      method: SocketEndpoint.GET_ADDRESSES,
      api: 'account',
      messageId: `${Date.now()}`,
      args: {}
    }));
  } catch {
    yield put(addressesActions.getAddressesFailure('Socket is not connected'))
  }
}

function *updateWhitelistingStatus({ payload }: UpdateWhitelistingStatus) {
  switch (payload.status) {
    case AuthEidStatus.NOT_SCANNED:
    case AuthEidStatus.NOT_READY:
      break;

    case AuthEidStatus.SUCCESS:
      yield put(addressesActions.whitelistAddressSuccess());
      break;

    default:
      yield put(addressesActions.whitelistAddressFailure(authEidErrors[payload.status]));
      break;
  }
}


function *whitelistAddressSuccess() {
  yield put(addressesActions.getAddresses());

  yield put(alertActions.show({
    type: StatusModalType.SUCCESS,
    message: 'Address whitelisted successfully'
  }));
}


export function *addressesSaga() {
  yield takeLatest(AddressesConstants.VALIDATE_ADDRESS_REQUEST, validateAddress);
  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_REQUEST, whitelistAddress);
  yield takeLatest(AddressesConstants.GET_ADDRESSES_REQUEST, getAddresses);

  yield takeLatest(AddressesConstants.UPDATE_WHITELISTING_STATUS, updateWhitelistingStatus);

  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_SUCCESS, whitelistAddressSuccess);
}
