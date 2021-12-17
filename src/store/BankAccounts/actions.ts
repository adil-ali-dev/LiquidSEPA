import { BankAccountsActions, BankAccountsConstants } from './typedef';


export const bankAccountsActions: BankAccountsActions = {
  getBankAccounts: () => ({ type: BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST }),
  getBankAccountsSuccess: payload => ({ type: BankAccountsConstants.GET_BANK_ACCOUNTS_SUCCESS, payload }),
  getBankAccountsFailure: error => ({ type: BankAccountsConstants.GET_BANK_ACCOUNTS_FAILURE, error }),

  getSupportedBanks: payload => ({ type: BankAccountsConstants.GET_SUPPORTED_BANKS_REQUEST, payload }),
  getSupportedBanksSuccess: payload => ({ type: BankAccountsConstants.GET_SUPPORTED_BANKS_SUCCESS, payload }),
  getSupportedBanksFailure: error => ({ type: BankAccountsConstants.GET_SUPPORTED_BANKS_FAILURE, error }),

  createAgreementLink: payload => ({ type: BankAccountsConstants.CREATE_AGREEMENT_LINK_REQUEST, payload }),
  createAgreementLinkSuccess: payload => ({ type: BankAccountsConstants.CREATE_AGREEMENT_LINK_SUCCESS, payload }),
  createAgreementLinkFailure: error => ({ type: BankAccountsConstants.CREATE_AGREEMENT_LINK_FAILURE, error }),

  createBankAccount: payload => ({ type: BankAccountsConstants.CREATE_BANK_ACCOUNT_REQUEST, payload }),
  createBankAccountSuccess: payload => ({ type: BankAccountsConstants.CREATE_BANK_ACCOUNT_SUCCESS, payload }),
  createBankAccountFailure: error => ({ type: BankAccountsConstants.CREATE_BANK_ACCOUNT_FAILURE, error })
};
