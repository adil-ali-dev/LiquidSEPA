import { Action, FailureAction, EmptyAction, BankAccount, SocketReq, SocketEndpoint, SupportedBank } from '../../typedef';


export enum BankAccountsConstants {
  GET_BANK_ACCOUNTS_REQUEST = '@bank-accounts/GET_BANK_ACCOUNTS_REQUEST',
  GET_BANK_ACCOUNTS_SUCCESS = '@bank-accounts/GET_BANK_ACCOUNTS_SUCCESS',
  GET_BANK_ACCOUNTS_FAILURE = '@bank-accounts/GET_BANK_ACCOUNTS_FAILURE',

  GET_SUPPORTED_BANKS_REQUEST = '@bank-accounts/GET_SUPPORTED_BANKS_REQUEST',
  GET_SUPPORTED_BANKS_SUCCESS = '@bank-accounts/GET_SUPPORTED_BANKS_SUCCESS',
  GET_SUPPORTED_BANKS_FAILURE = '@bank-accounts/GET_SUPPORTED_BANKS_FAILURE',

  CREATE_AGREEMENT_LINK_REQUEST = '@bank-accounts/CREATE_AGREEMENT_LINK_REQUEST',
  CREATE_AGREEMENT_LINK_SUCCESS = '@bank-accounts/CREATE_AGREEMENT_LINK_SUCCESS',
  CREATE_AGREEMENT_LINK_FAILURE = '@bank-accounts/CREATE_AGREEMENT_LINK_FAILURE',

  CREATE_BANK_ACCOUNT_REQUEST = '@bank-accounts/CREATE_BANK_ACCOUNT_REQUEST',
  CREATE_BANK_ACCOUNT_SUCCESS = '@bank-accounts/CREATE_BANK_ACCOUNT_SUCCESS',
  CREATE_BANK_ACCOUNT_FAILURE = '@bank-accounts/CREATE_BANK_ACCOUNT_FAILURE',

  RESET_WAITING_FOR_CONTINUE = '@bank-accounts/RESET_WAITING_FOR_CONTINUE'
}


/*
 * Request
 */

export type GetBankAccountsReq = Record<string, unknown>;

export type GetSupportedBanksReq = {
  countryCode: string;
};

export type CreateAgreementLinkReq = {
  bankId: string;
};

export type CreateAgreementLinkExtendedReq = CreateAgreementLinkReq & {
  redirectUrl: string;
  sandbox: boolean;
};

export type CreateBankAccountReq = {
  ref: string;
  closeCbSuccess?: null | (() => void);
  closeCbFailure?: null | (() => void);
};


/*
 * API Request
 */

export type GetBankAccountsApiReq = SocketReq<SocketEndpoint.GET_BANK_ACCOUNTS, GetBankAccountsReq>;
export type GetSupportedBanksApiReq = SocketReq<SocketEndpoint.GET_SUPPORTED_BANKS, GetSupportedBanksReq>;
export type CreateAgreementLinkApiReq = SocketReq<SocketEndpoint.CREATE_BANK_AGREEMENT_LINK, CreateAgreementLinkExtendedReq>;
export type CreateBankAccountApiReq = SocketReq<SocketEndpoint.CREATE_BANK_ACCOUNT, CreateBankAccountReq>;

export type BankAccountsApiMainReqs = GetBankAccountsApiReq
| GetSupportedBanksApiReq
| CreateAgreementLinkApiReq
| CreateBankAccountApiReq;


/*
 * API Response
 */

export type GetBankAccountsRes = BankAccount[];

export type GetSupportedBanksRes = SupportedBank[];

export type CreateAgreementLinkRes = {
  initiate: string;
};

export type CreateBankAccountRes = {
  success: boolean;
};


/*
 * Single Action
 */

export type GetBankAccounts = EmptyAction<BankAccountsConstants.GET_BANK_ACCOUNTS_REQUEST>;
export type GetBankAccountsSuccess = Action<BankAccountsConstants.GET_BANK_ACCOUNTS_SUCCESS, GetBankAccountsRes>;
export type GetBankAccountsFailure = FailureAction<BankAccountsConstants.GET_BANK_ACCOUNTS_FAILURE>;

export type GetSupportedBanks = Action<BankAccountsConstants.GET_SUPPORTED_BANKS_REQUEST, GetSupportedBanksReq>;
export type GetSupportedBanksSuccess = Action<BankAccountsConstants.GET_SUPPORTED_BANKS_SUCCESS, GetSupportedBanksRes>;
export type GetSupportedBanksFailure = FailureAction<BankAccountsConstants.GET_SUPPORTED_BANKS_FAILURE>;

export type CreateAgreementLink = Action<BankAccountsConstants.CREATE_AGREEMENT_LINK_REQUEST, CreateAgreementLinkReq>;
export type CreateAgreementLinkSuccess = Action<BankAccountsConstants.CREATE_AGREEMENT_LINK_SUCCESS, CreateAgreementLinkRes>;
export type CreateAgreementLinkFailure = FailureAction<BankAccountsConstants.CREATE_AGREEMENT_LINK_FAILURE>;

export type CreateBankAccount = Action<BankAccountsConstants.CREATE_BANK_ACCOUNT_REQUEST, CreateBankAccountReq>;
export type CreateBankAccountSuccess = Action<BankAccountsConstants.CREATE_BANK_ACCOUNT_SUCCESS, CreateBankAccountRes>;
export type CreateBankAccountFailure = FailureAction<BankAccountsConstants.CREATE_BANK_ACCOUNT_FAILURE>;

export type ResetWaitingForContinue = EmptyAction<BankAccountsConstants.RESET_WAITING_FOR_CONTINUE>;


/*
 * Action
 */

export type BankAccountsAction = GetBankAccounts | GetBankAccountsSuccess | GetBankAccountsFailure
| GetSupportedBanks | GetSupportedBanksSuccess | GetSupportedBanksFailure
| CreateAgreementLink | CreateAgreementLinkSuccess | CreateAgreementLinkFailure
| CreateBankAccount | CreateBankAccountSuccess | CreateBankAccountFailure
| ResetWaitingForContinue;


/*
 * Actions
 */

export type BankAccountsActions = {
  getBankAccounts: () => GetBankAccounts;
  getBankAccountsSuccess: (payload: GetBankAccountsRes) => GetBankAccountsSuccess;
  getBankAccountsFailure: (error: string) => GetBankAccountsFailure;

  getSupportedBanks: (payload: GetSupportedBanksReq) => GetSupportedBanks;
  getSupportedBanksSuccess: (payload: GetSupportedBanksRes) => GetSupportedBanksSuccess;
  getSupportedBanksFailure: (error: string) => GetSupportedBanksFailure;

  createAgreementLink: (payload: CreateAgreementLinkReq) => CreateAgreementLink;
  createAgreementLinkSuccess: (payload: CreateAgreementLinkRes) => CreateAgreementLinkSuccess;
  createAgreementLinkFailure: (error: string) => CreateAgreementLinkFailure;

  createBankAccount: (payload: CreateBankAccountReq) => CreateBankAccount;
  createBankAccountSuccess: (payload: CreateBankAccountRes) => CreateBankAccountSuccess;
  createBankAccountFailure: (error: string) => CreateBankAccountFailure;

  resetWaitingForContinue: () => ResetWaitingForContinue;
};


/*
 * State
 */

type ActionKeys = 'bankAccounts'
| 'supportedBanks'
| 'agreementLink'
| 'create';

export type BankAccountsState = {
  bankAccounts: BankAccount[];
  supportedBanks: SupportedBank[];
  agreementLink: null | string;
  waitingForContinue: boolean;
  closeCbSuccess: null | (() => void);
  closeCbFailure: null | (() => void);
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
