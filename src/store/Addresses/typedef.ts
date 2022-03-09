import {
  Action,
  FailureAction,
  EmptyAction,
  Address,
  SocketReq,
  SocketEndpoint,
  AuthEidStatus,
  AuthSocketEndpoint
} from '../../typedef';


export enum AddressesConstants {
  VALIDATE_ADDRESS_REQUEST = '@addresses/VALIDATE_ADDRESS_REQUEST',
  VALIDATE_ADDRESS_SUCCESS = '@addresses/VALIDATE_ADDRESS_SUCCESS',
  VALIDATE_ADDRESS_FAILURE = '@addresses/VALIDATE_ADDRESS_FAILURE',

  WHITELIST_ADDRESS_REQUEST = '@addresses/WHITELIST_ADDRESS_REQUEST',
  WHITELIST_ADDRESS_SUCCESS = '@addresses/WHITELIST_ADDRESS_SUCCESS',
  WHITELIST_ADDRESS_FAILURE = '@addresses/WHITELIST_ADDRESS_FAILURE',

  UPDATE_WHITELISTING_REQUEST_ID = '@addresses/UPDATE_WHITELISTING_REQUEST_ID',

  CANCEL_WHITELISTING_REQUEST = '@addresses/CANCEL_WHITELISTING_REQUEST',
  CANCEL_WHITELISTING_SUCCESS = '@addresses/CANCEL_WHITELISTING_SUCCESS',
  CANCEL_WHITELISTING_FAILURE = '@addresses/CANCEL_WHITELISTING_FAILURE',

  UPDATE_WHITELISTING_STATUS = '@addresses/UPDATE_WHITELISTING_STATUS',

  GET_ADDRESSES_REQUEST = '@addresses/GET_ADDRESSES_REQUEST',
  GET_ADDRESSES_SUCCESS = '@addresses/GET_ADDRESSES_SUCCESS',
  GET_ADDRESSES_FAILURE = '@addresses/GET_ADDRESSES_FAILURE'
}


/*
 * Request
 */

export type ValidateAddressReq = {
  address: string;
};

export type WhitelistAddressReq = {
  address: string;
  label: string;
  closeCbSuccess?: null | (() => void);
  closeCbFailure?: null | (() => void);
};

export type CancelAuthEidReq = {
  requestId: string;
};

export type GetAddressesReq = Record<string, unknown>;


/*
 * API Request
 */

export type ValidateAddressApiReq = SocketReq<SocketEndpoint.VALIDATE_ADDRESS, ValidateAddressReq>;
export type WhitelistAddressApiReq = SocketReq<SocketEndpoint.WHITELIST_ADDRESS, WhitelistAddressReq>;
export type GetAddressesApiReq = SocketReq<SocketEndpoint.GET_ADDRESSES, GetAddressesReq>;

export type CancelWhitelistingReq = SocketReq<AuthSocketEndpoint.CANCEL_REQUEST, CancelAuthEidReq>;

export type AddressesApiAuthReqs = CancelWhitelistingReq;
export type AddressesApiMainReqs = ValidateAddressApiReq | WhitelistAddressApiReq | GetAddressesApiReq;


/*
 * API Response
 */

export type WhitelistingStatusRes = {
  status: AuthEidStatus;
};

export type AuthEidIdRes = {
  requestId: string;
};

export type ValidateAddressRes = {
  status: boolean;
};

type GetAddressesRes = Address[];


/*
 * Single Action
 */

export type ValidateAddress = Action<AddressesConstants.VALIDATE_ADDRESS_REQUEST, ValidateAddressReq>;
export type ValidateAddressSuccess = Action<AddressesConstants.VALIDATE_ADDRESS_SUCCESS, ValidateAddressRes>;
export type ValidateAddressFailure = FailureAction<AddressesConstants.VALIDATE_ADDRESS_FAILURE>;

export type WhitelistAddress = Action<AddressesConstants.WHITELIST_ADDRESS_REQUEST, WhitelistAddressReq>;
export type WhitelistAddressSuccess = EmptyAction<AddressesConstants.WHITELIST_ADDRESS_SUCCESS>;
export type WhitelistAddressFailure = FailureAction<AddressesConstants.WHITELIST_ADDRESS_FAILURE>;

export type UpdateWhitelistingRequestId = Action<AddressesConstants.UPDATE_WHITELISTING_REQUEST_ID, AuthEidIdRes>;

export type CancelWhitelisting = Action<AddressesConstants.CANCEL_WHITELISTING_REQUEST, CancelAuthEidReq>;
export type CancelWhitelistingSuccess = EmptyAction<AddressesConstants.CANCEL_WHITELISTING_SUCCESS>;
export type CancelWhitelistingFailure = FailureAction<AddressesConstants.CANCEL_WHITELISTING_FAILURE>;

export type UpdateWhitelistingStatus = Action<AddressesConstants.UPDATE_WHITELISTING_STATUS, WhitelistingStatusRes>;

export type GetAddresses = EmptyAction<AddressesConstants.GET_ADDRESSES_REQUEST>;
export type GetAddressesSuccess = Action<AddressesConstants.GET_ADDRESSES_SUCCESS, GetAddressesRes>;
export type GetAddressesFailure = FailureAction<AddressesConstants.GET_ADDRESSES_FAILURE>;


/*
 * Action
 */

export type AddressesAction =
  ValidateAddress | ValidateAddressSuccess | ValidateAddressFailure
  | WhitelistAddress | WhitelistAddressSuccess | WhitelistAddressFailure
  | UpdateWhitelistingRequestId
  | CancelWhitelisting | CancelWhitelistingSuccess | CancelWhitelistingFailure
  | UpdateWhitelistingStatus
  | GetAddresses | GetAddressesSuccess | GetAddressesFailure;


/*
 * Actions
 */

export type AddressesActions = {
  validateAddress: (payload: ValidateAddressReq) => ValidateAddress;
  validateAddressSuccess: (payload: ValidateAddressRes) => ValidateAddressSuccess;
  validateAddressFailure: (error: string) => ValidateAddressFailure;

  whitelistAddress: (payload: WhitelistAddressReq) => WhitelistAddress;
  whitelistAddressSuccess: () => WhitelistAddressSuccess;
  whitelistAddressFailure: (error: string) => WhitelistAddressFailure;

  updateWhitelistingRequestId: (payload: AuthEidIdRes) => UpdateWhitelistingRequestId;

  cancelWhitelisting: (payload: CancelAuthEidReq) => CancelWhitelisting;
  cancelWhitelistingSuccess: () => CancelWhitelistingSuccess;
  cancelWhitelistingFailure: (error: string) => CancelWhitelistingFailure;

  updateWhitelistingStatus: (payload: WhitelistingStatusRes) => UpdateWhitelistingStatus;

  getAddresses: () => GetAddresses;
  getAddressesSuccess: (payload: GetAddressesRes) => GetAddressesSuccess;
  getAddressesFailure: (error: string) => GetAddressesFailure;
};


/*
 * State
 */

type ActionKeys = 'validate'
| 'whitelist'
| 'addresses';

export type AddressesState = {
  addresses: Address[];
  addressValid: boolean;
  requestId: null | string;
  closeCbSuccess: null | (() => void);
  closeCbFailure: null | (() => void);
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
