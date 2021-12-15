import { BankAccountsActions, BankAccountsConstants } from './typedef';


export const addressesActions: BankAccountsActions = {
  getBankAccounts: () => ({ type: BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST }),
  getBankAccountsSuccess: payload => ({ type: BankAccountsConstants.GET_BANK_ACCOUNTS_SUCCESS, payload }),
  getBankAccountsFailure: error => ({ type: BankAccountsConstants.GET_BANK_ACCOUNTS_FAILURE, error })
};
