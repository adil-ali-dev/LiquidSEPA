import { BankAccountsAction, BankAccountsConstants, BankAccountsState } from './typedef';


export const initialState: BankAccountsState = {
  bankAccounts: [],
  supportedBanks: [],
  agreementLink: null,
  waitingForContinue: false,
  closeCb: null,
  loading: {
    bankAccounts: true,
    supportedBanks: false,
    agreementLink: false,
    create: false
  },
  error: {
    bankAccounts: null,
    supportedBanks: null,
    agreementLink: null,
    create: null
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

    case BankAccountsConstants.GET_SUPPORTED_BANKS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, supportedBanks: true },
        error: { ...state.error, supportedBanks: null }
      };
    case BankAccountsConstants.GET_SUPPORTED_BANKS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, supportedBanks: false },
        supportedBanks: action.payload
      };
    case BankAccountsConstants.GET_SUPPORTED_BANKS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, supportedBanks: false },
        error: { ...state.error, supportedBanks: action.error }
      };

    case BankAccountsConstants.CREATE_AGREEMENT_LINK_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, agreementLink: true },
        error: { ...state.error, agreementLink: null }
      };
    case BankAccountsConstants.CREATE_AGREEMENT_LINK_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, agreementLink: false },
        agreementLink: action.payload.initiate,
        waitingForContinue: true
      };
    case BankAccountsConstants.CREATE_AGREEMENT_LINK_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, agreementLink: false },
        error: { ...state.error, agreementLink: action.error }
      };

    case BankAccountsConstants.CREATE_BANK_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, create: true },
        closeCb: action.payload.closeCb || null,
        error: { ...state.error, create: null }
      };
    case BankAccountsConstants.CREATE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, create: false },
        closeCb: null,
        waitingForContinue: false
      };
    case BankAccountsConstants.CREATE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, create: false },
        closeCb: null,
        waitingForContinue: false,
        error: { ...state.error, create: action.error }
      };

    default:
      return state;
  }
};
