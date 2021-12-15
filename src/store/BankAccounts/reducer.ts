import { BankAccountsAction, BankAccountsConstants, BankAccountsState } from './typedef';


export const initialState: BankAccountsState = {
  bankAccounts: [],
  loading: {
    bankAccounts: false
  },
  error: {
    bankAccounts: null
  }
};


export const bankAccountsReducer = (state = initialState, action: BankAccountsAction): BankAccountsState => {
  switch (action.type) {

    case BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, bankAccounts: true },
        error: { ...state.error, bankAccounts: null }
      };
    case BankAccountsConstants.GET_BANK_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, bankAccounts: false },
        bankAccounts: action.payload
      };
    case BankAccountsConstants.GET_BANK_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, bankAccounts: false },
        error: { ...state.error, bankAccounts: action.error }
      };

    default:
      return state;
  }
};
