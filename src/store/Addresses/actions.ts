import { AddressesActions, AddressesConstants } from './typedef';


export const addressesActions: AddressesActions = {
  validateAddress: payload => ({ type: AddressesConstants.VALIDATE_ADDRESS_REQUEST, payload }),
  validateAddressSuccess: payload => ({ type: AddressesConstants.VALIDATE_ADDRESS_SUCCESS, payload }),
  validateAddressFailure: error => ({ type: AddressesConstants.VALIDATE_ADDRESS_FAILURE, error }),

  whitelistAddress: payload => ({ type: AddressesConstants.WHITELIST_ADDRESS_REQUEST, payload }),
  whitelistAddressSuccess: () => ({ type: AddressesConstants.WHITELIST_ADDRESS_SUCCESS }),
  whitelistAddressFailure: error => ({ type: AddressesConstants.WHITELIST_ADDRESS_FAILURE, error }),

  updateWhitelistingRequestId: payload => ({ type: AddressesConstants.UPDATE_WHITELISTING_REQUEST_ID, payload }),

  cancelWhitelisting: payload => ({ type: AddressesConstants.CANCEL_WHITELISTING_REQUEST, payload }),
  cancelWhitelistingSuccess: () => ({ type: AddressesConstants.CANCEL_WHITELISTING_SUCCESS }),
  cancelWhitelistingFailure: error => ({ type: AddressesConstants.CANCEL_WHITELISTING_FAILURE, error }),

  updateWhitelistingStatus: payload => ({ type: AddressesConstants.UPDATE_WHITELISTING_STATUS, payload }),

  getAddresses: () => ({ type: AddressesConstants.GET_ADDRESSES_REQUEST }),
  getAddressesSuccess: payload => ({ type: AddressesConstants.GET_ADDRESSES_SUCCESS, payload }),
  getAddressesFailure: error => ({ type: AddressesConstants.GET_ADDRESSES_FAILURE, error })
};
