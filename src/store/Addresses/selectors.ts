import { AppState } from '../typedef';


export const addressesSelector = (state: AppState) => state.addresses;
export const addressesItemsLoadingSelector = (state: AppState) => state.addresses.loading.addresses;
export const addressesItemsSelector = (state: AppState) => state.addresses.addresses;
export const addressesAddressValidSelector = (state: AppState) => state.addresses.addressValid;
export const addressesValidateAddressLoadingSelector = (state: AppState) => state.addresses.loading.validate;
export const addressesWhitelistAddressLoadingSelector = (state: AppState) => state.addresses.loading.whitelist;
export const addressesWhitelistAddressErrorSelector = (state: AppState) => state.addresses.error.whitelist;
export const addressesWhitelistingRequestIdSelector = (state: AppState) => state.addresses.requestId;
export const addressesWhitelistingCbSelector = (state: AppState) => state.addresses.closeCb;
