import { AddressesAction, AddressesConstants, AddressesState } from './typedef';


export const initialState: AddressesState = {
  addresses: [],
  addressValid: false,
  requestId: null,
  closeCb: null,
  loading: {
    validate: false,
    whitelist: false,
    addresses: true
  },
  error: {
    validate: null,
    whitelist: null,
    addresses: null
  }
};


export const addressesReducer = (state = initialState, action: AddressesAction): AddressesState => {
  switch (action.type) {

    case AddressesConstants.VALIDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, validate: true },
        error: { ...state.error, validate: null }
      };
    case AddressesConstants.VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, validate: false },
        addressValid: action.payload.status
      };
    case AddressesConstants.VALIDATE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, validate: false },
        error: { ...state.error, validate: action.error }
      };

    case AddressesConstants.WHITELIST_ADDRESS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, whitelist: true },
        closeCb: action.payload.closeCb || null,
        error: { ...state.error, whitelist: null }
      };
    case AddressesConstants.WHITELIST_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, whitelist: false },
        closeCb: null
      };
    case AddressesConstants.WHITELIST_ADDRESS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, whitelist: false },
        closeCb: null,
        error: { ...state.error, whitelist: action.error }
      };

    case AddressesConstants.UPDATE_WHITELISTING_REQUEST_ID:
      return { ...state, requestId: action.payload.requestId };

    case AddressesConstants.CANCEL_WHITELISTING_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, whitelist: false },
        requestId: null
      };

    case AddressesConstants.GET_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, addresses: true },
        error: { ...state.error, addresses: null }
      };
    case AddressesConstants.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, addresses: false },
        addresses: action.payload
      };
    case AddressesConstants.GET_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, addresses: false },
        error: { ...state.error, addresses: action.error }
      };

    default:
      return state;
  }
};
