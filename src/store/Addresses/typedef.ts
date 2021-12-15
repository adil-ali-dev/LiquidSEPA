import { Action, FailureAction, EmptyAction, AccountType, Address, SocketReq, SocketEndpoint } from '../../typedef';


export enum AddressesConstants {
  VALIDATE_ADDRESS_REQUEST = '@addresses/VALIDATE_ADDRESS_REQUEST',
  VALIDATE_ADDRESS_SUCCESS = '@addresses/VALIDATE_ADDRESS_SUCCESS',
  VALIDATE_ADDRESS_FAILURE = '@addresses/VALIDATE_ADDRESS_FAILURE',

  WHITELIST_ADDRESS_REQUEST = '@addresses/WHITELIST_ADDRESS_REQUEST', 
  WHITELIST_ADDRESS_SUCCESS = '@addresses/WHITELIST_ADDRESS_SUCCESS', 
  WHITELIST_ADDRESS_FAILURE = '@addresses/WHITELIST_ADDRESS_FAILURE', 

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
};

export type GetAddressesReq = {
  accountType: AccountType.WALLET;
};


/*
 * API Request
 */

export type ValidateAddressApiReq = SocketReq<SocketEndpoint.VALIDATE_ADDRESS, ValidateAddressReq>;
export type WhitelistAddressApiReq = SocketReq<SocketEndpoint.WHITELIST_ADDRESS, WhitelistAddressReq>;
export type GetAddressesApiReq = SocketReq<SocketEndpoint.GET_ACCOUNTS, GetAddressesReq>;

export type AddressesApiMainReqs = ValidateAddressApiReq | WhitelistAddressApiReq | GetAddressesApiReq;


/*
 * API Response
 */

export type ValidateAddressRes = {
  status: boolean;
};

export type WhitelistAddressRes = {
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
export type WhitelistAddressSuccess = Action<AddressesConstants.WHITELIST_ADDRESS_SUCCESS, WhitelistAddressRes>;
export type WhitelistAddressFailure = FailureAction<AddressesConstants.WHITELIST_ADDRESS_FAILURE>;

export type GetAddresses = EmptyAction<AddressesConstants.GET_ADDRESSES_REQUEST>;
export type GetAddressesSuccess = Action<AddressesConstants.GET_ADDRESSES_SUCCESS, GetAddressesRes>;
export type GetAddressesFailure = FailureAction<AddressesConstants.GET_ADDRESSES_FAILURE>;


/*
 * Action
 */

export type AddressesAction = ValidateAddress | ValidateAddressSuccess | ValidateAddressFailure
| WhitelistAddress | WhitelistAddressSuccess | WhitelistAddressFailure
| GetAddresses | GetAddressesSuccess | GetAddressesFailure;


/*
 * Actions
 */

export type AddressesActions = {
  validateAddress: (payload: ValidateAddressReq) => ValidateAddress;
  validateAddressSuccess: (payload: ValidateAddressRes) => ValidateAddressSuccess;
  validateAddressFailure: (error: string) => ValidateAddressFailure;

  whitelistAddress: (payload: WhitelistAddressReq) => WhitelistAddress;
  whitelistAddressSuccess: (payload: WhitelistAddressRes) => WhitelistAddressSuccess;
  whitelistAddressFailure: (error: string) => WhitelistAddressFailure;

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
  addressValid: null | boolean;
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
