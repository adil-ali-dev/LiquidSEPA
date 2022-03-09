import { AppState } from '../typedef';
import { createSelector } from 'reselect';
import { NORDIGEN_BANK_LOGO_PREFIX } from '../../constants';


export const bankAccountsSelector = (state: AppState) => state.bankAccounts;
export const bankAccountsItemsLoadingSelector = (state: AppState) => state.bankAccounts.loading.bankAccounts;
export const bankAccountsRawItemsSelector = (state: AppState) => state.bankAccounts.bankAccounts;
export const bankAccountsAgreementLinkSelector = (state: AppState) => state.bankAccounts.agreementLink;
export const bankAccountsAgreementLinkLoadingSelector = (state: AppState) => state.bankAccounts.loading.agreementLink;
export const bankAccountsSupportedBanksSelector = (state: AppState) => state.bankAccounts.supportedBanks;
export const bankAccountsSupportedBanksLoadingSelector = (state: AppState) => state.bankAccounts.loading.supportedBanks;
export const bankAccountsCreateLoadingSelector = (state: AppState) => state.bankAccounts.loading.create;
export const bankAccountsWaitingForContinueSelector = (state: AppState) => state.bankAccounts.waitingForContinue;
export const bankAccountsCbSuccessSelector = (state: AppState) => state.bankAccounts.closeCbSuccess;
export const bankAccountsCbFailureSelector = (state: AppState) => state.bankAccounts.closeCbFailure;

export const bankAccountsItemsSelector = createSelector([bankAccountsRawItemsSelector], accounts => {
  return accounts.map(account => ({ ...account, logo: `${NORDIGEN_BANK_LOGO_PREFIX}${account.accountDetails?.bankId}.png` }))
});
