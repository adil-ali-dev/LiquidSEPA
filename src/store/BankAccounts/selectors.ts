import { AppState } from '../typedef';


export const bankAccountsSelector = (state: AppState) => state.bankAccounts;
export const bankAccountsItemsLoadingSelector = (state: AppState) => state.bankAccounts.loading.bankAccounts;
export const bankAccountsItemsSelector = (state: AppState) => state.bankAccounts.bankAccounts;
export const bankAccountsAgreementLinkSelector = (state: AppState) => state.bankAccounts.agreementLink;
export const bankAccountsAgreementLinkLoadingSelector = (state: AppState) => state.bankAccounts.loading.agreementLink;
export const bankAccountsSupportedBanksSelector = (state: AppState) => state.bankAccounts.supportedBanks;
export const bankAccountsSupportedBanksLoadingSelector = (state: AppState) => state.bankAccounts.loading.supportedBanks;
export const bankAccountsCreateLoadingSelector = (state: AppState) => state.bankAccounts.loading.create;
export const bankAccountsWaitingForContinueSelector = (state: AppState) => state.bankAccounts.waitingForContinue;
