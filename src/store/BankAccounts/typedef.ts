import { Action, FailureAction, EmptyAction, AccountType, BankAccount, SocketReq, SocketEndpoint } from '../../typedef';


export enum BankAccountsConstants {
  GET_BANK_ACCOUNTS_REQUEST = '@bank-accounts/GET_BANK_ACCOUNTS_REQUEST', 
  GET_BANK_ACCOUNTS_SUCCESS = '@bank-accounts/GET_BANK_ACCOUNTS_SUCCESS', 
  GET_BANK_ACCOUNTS_FAILURE = '@bank-accounts/GET_BANK_ACCOUNTS_FAILURE'
}


/*
 * Request
 */

export type GetBankAccountsReq = {
  accountType: AccountType.BANK;
};


/*
 * API Request
 */

export type GetBankAccountsApiReq = SocketReq<SocketEndpoint.GET_ACCOUNTS, GetBankAccountsReq>;

export type BankAccountsApiMainReqs = GetBankAccountsApiReq;


/*
 * API Response
 */

export type ValidateAddressRes = {
  status: boolean;
};

export type WhitelistAddressRes = {
  status: boolean;
};

type GetBankAccountsRes = BankAccount[];


/*
 * Single Action
 */

export type GetBankAccounts = EmptyAction<BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST>;
export type GetBankAccountsSuccess = Action<BankAccountsConstants.GET_BANK_ACCOUNTS_SUCCESS, GetBankAccountsRes>;
export type GetBankAccountsFailure = FailureAction<BankAccountsConstants.GET_BANK_ACCOUNTS_FAILURE>;


/*
 * Action
 */

export type BankAccountsAction = GetBankAccounts | GetBankAccountsSuccess | GetBankAccountsFailure;


/*
 * Actions
 */

export type BankAccountsActions = {
  getBankAccounts: () => GetBankAccounts;
  getBankAccountsSuccess: (payload: GetBankAccountsRes) => GetBankAccountsSuccess;
  getBankAccountsFailure: (error: string) => GetBankAccountsFailure;
};


/*
 * State
 */

type ActionKeys = 'bankAccounts';

export type BankAccountsState = {
  bankAccounts: BankAccount[];
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
