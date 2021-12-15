import { AppState } from '../typedef';


export const bankAccountsSelector = (state: AppState) => state.bankAccounts;
export const bankAccountsItemsLoadingSelector = (state: AppState) => state.bankAccounts.loading.bankAccounts;
export const bankAccountsItemsSelector = (state: AppState) => state.bankAccounts.bankAccounts;
