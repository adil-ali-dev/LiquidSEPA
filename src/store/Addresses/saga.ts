import { takeLatest, put, select } from 'redux-saga/effects';

import { AuthEidStatus, AuthSocketEndpoint, SocketEndpoint, StatusModalType } from '../../typedef';
import { AddressesConstants, ValidateAddress, WhitelistAddress, UpdateWhitelistingStatus, CancelWhitelisting, WhitelistAddressFailure } from './typedef';
import { socketActions } from '../Socket';
import { alertActions } from '../Alert';
import { addressesActions } from './actions';
import { authSocketActions } from '../AuthSocket';
import { addressesWhitelistingCbSuccessSelector, addressesWhitelistingCbFailureSelector } from './selectors';


const authEidErrors = {
  [AuthEidStatus.TIMEOUT]: 'Auth eID signing elapsed',
  [AuthEidStatus.CANCELLED]: 'Auth eID signing cancelled',
  [AuthEidStatus.REQUEST_CANCELLED]: 'Auth eID signing cancelled',
  [AuthEidStatus.ACCOUNT_NOT_VERIFIED]: 'Auth eID account not verified',
  [AuthEidStatus.REQUEST_ERROR]: 'Address already registered'
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
    yield put(addressesActions.validateAddressFailure('Socket not connected'))
  }
}

function *whitelistAddress({ payload }: WhitelistAddress) {
  const { closeCbFailure, closeCbSuccess, ...args } = payload;

  try {
    yield put(socketActions.send({
      method: SocketEndpoint.WHITELIST_ADDRESS,
      api: 'account',
      messageId: `${Date.now()}`,
      args
    }));
  } catch {
    yield put(addressesActions.whitelistAddressFailure('Socket not connected'))
  }
}

function *cancelRequest({ payload }: CancelWhitelisting) {
  yield put(authSocketActions.disposableSend({
    method: AuthSocketEndpoint.CANCEL_REQUEST,
    api: 'login',
    messageId: `${Date.now()}`,
    args: payload
  }));
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
    yield put(addressesActions.getAddressesFailure('Socket not connected'))
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
  const onClose: null | (() => void) = yield select(addressesWhitelistingCbSuccessSelector);

  yield put(addressesActions.getAddresses());

  yield put(alertActions.show({
    type: StatusModalType.SUCCESS,
    message: 'Your Address is now whitelisted',
    onClose
  }));
}

function *whitelistAddressFailure({ error }: WhitelistAddressFailure) {
  const onClose: null | (() => void) = yield select(addressesWhitelistingCbFailureSelector);

  yield put(alertActions.show({
    type: StatusModalType.ERROR,
    message: error,
    onClose
  }));
}

export function *addressesSaga() {
  yield takeLatest(AddressesConstants.VALIDATE_ADDRESS_REQUEST, validateAddress);
  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_REQUEST, whitelistAddress);
  yield takeLatest(AddressesConstants.GET_ADDRESSES_REQUEST, getAddresses);
  yield takeLatest(AddressesConstants.CANCEL_WHITELISTING_REQUEST, cancelRequest);

  yield takeLatest(AddressesConstants.UPDATE_WHITELISTING_STATUS, updateWhitelistingStatus);

  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_SUCCESS, whitelistAddressSuccess);
  yield takeLatest(AddressesConstants.WHITELIST_ADDRESS_FAILURE, whitelistAddressFailure);
}
