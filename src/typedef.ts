import { Action as ReduxAction } from 'redux';


/*
 * Redux
 */

export interface EmptyAction<T> extends ReduxAction<T> {}
export interface Action<T, P> extends ReduxAction<T> { payload: P }
export interface FailureAction<T> extends ReduxAction<T> { error: string }


/*
 * Environment
 */

export enum Environment {
  TESTING = 'testing',
  LIVE = 'live',
  PROD = 'prod'
}


/*
 * Socket Closing Statuses
 */

export enum SocketCloseStatus {
  WITH_RECONNECT = 1000,
  WITHOUT_RECONNECT = 4000
}


/*
 * Auth WS API
 */

export enum AuthSocketEndpoint {
  REGISTER = 'signup_init',
  REGISTER_STATUS = 'signup_status',

  LOG_IN = 'login_init',
  LOG_IN_STATUS = 'sign_status',

  REFRESH_SESSION = 'renew',

  CANCEL_REQUEST = 'cancel'
}

export type AuthSocketReq<M = AuthSocketEndpoint, A = {}> = {
  method: M;
  args: A;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};

export type AuthSocketRes<M = AuthSocketEndpoint, D = {}> = {
  method: M;
  error: null | number | string;
  data: D;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};


/*
 * Main WS API
 */

export enum SocketEndpoint {
  AUTHORIZE = 'authorize',

  VALIDATE_ADDRESS = 'validate_payout_address',
  WHITELIST_ADDRESS = 'whitelist_address',
  WHITELISTING_STATUS = 'address_status',
  GET_ADDRESSES = 'stable_coin_accounts',

  CREATE_BANK_ACCOUNT = 'save_accounts',
  GET_SUPPORTED_BANKS = 'supported_banks',
  CREATE_BANK_AGREEMENT_LINK = 'create_agreement_link',
  GET_BANK_ACCOUNTS = 'currency_accounts',

  GET_RFQ_ESTIMATION = 'estimate',
  RFQ_SELL = 'sell',
  RFQ_BUY = 'buy',
  CONFIRM_RFQ = 'confirm',
  RFQ_STATUS = 'status',
  RFQ_TX_STATUS = 'tx_status'
}

export type SocketReq<M = SocketEndpoint, A = {}> = {
  method: M;
  args: A;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};

export type SocketRes<M = SocketEndpoint, D = {}> = {
  method: M;
  error: null | number | string;
  data: D;
  // unusable on FE but required on API side:
  api: string;
  messageId: string;
};


/*
 * Auth eID
 */

export enum AuthEidStatus {
  // Waiting for scan:
  NOT_SCANNED = 'WAITING_LOCAL_ACK',

  // Waiting for sign via mobile app:
  NOT_READY = 'NOT_READY',

  // Success:
  SUCCESS = 'SUCCESS',

  // Auth eID errors:
  TIMEOUT = 'TIMEOUT',
  CANCELLED = 'USER_CANCELLED',
  REQUEST_CANCELLED = 'RP_CANCELLED',
  ACCOUNT_NOT_VERIFIED = 'ACCOUNT_NOT_VERIFIED',

  // API errors:
  REQUEST_ERROR = 'REQUEST_ERROR'
}


/*
 * Session Token
 */

export type SessionToken = {
  value: string;
  expirationDate: number;
  expiresIn: number;
}


/*
 * Accounts
 */

export enum AccountType {
  WALLET = 'Wallet',
  BANK = 'Bank'
}

export type AccountDetails = {
  bankId: string;
  bankName: string;
};

export type Account<T = AccountType> = {
  type: T;
  name: string;
  acctNum: string;
  ref: null | string;
  accountDetails?: AccountDetails;
};


/*
 * Addresses
 */

export type Address = Account<AccountType.WALLET>;


/*
 * Bank Accounts
 */

export type BankAccount = Account<AccountType.BANK> & {
  logo?: string;
};


/*
 * Supported Banks
 */

export type SupportedBank = {
  id: string;
  name: string;
  bic: string;
  transactionTotalDays: string;
  logo: string;
}


/*
 * Countries
 */

export type Country = {
  name: string;
  code: string;
};


/*
 * Currencies
 */

export enum Currency {
  EURX = 'EURx',
  USDT = 'USDt',
  EUR = 'EUR'
}

export enum StableCurrency {
  EURX = 'EURx',
  USDT = 'USDt'
}


/*
 * Rfq
 */

export enum RfqDirection {
  BUY = 'buy',
  SELL = 'sell'
}

export enum RfqStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  PENDING_IN_QUE = 'PENDING_IN_QUE',
  COMPLETE = 'COMPLETE'
}

export type RfqData<T> = {
  direction: RfqDirection;
  confirm: boolean;
  payoutAmount: T;
  payoutAccountOwner: string;
  rfqId: string;
  status: RfqStatus;
  depositAmount: T;
  created: string;
  txId: string;
  settled: string;
  payoutIban: string;
  matched: boolean,
  depositAddress: string;
  depositorName: string;
  depositorIban: string;
  payoutAddress: string;
};

export type RfqConfirmation = {
  trackingCode: string;
  rfqId: string;
  isValid: boolean;
};

export type RfqConfirmationDetails = RfqConfirmation & {
  appToAppValue?: string;
  qrValue?: string;
};

export type RfqPaymentDetails = {
  txId: string;
  link: string;
  completed: boolean;
  received: {
    amount: number;
    iban?: string;
    nameOnAccount?: string;
  };
  sending: {
    amount: number;
    iban?: string;
    nameOnAccount?: string;
  }
};

export type RfqTxData = {
  txid: string;
  confs: number;
  address: string;
  unblindedLink: string;
};

export type RfqEstimation<T> = {
  charge: T;
  fee: T;
  payoutEstimation: T;
};


/*
 * Status modal
 */

export enum StatusModalType {
  SUCCESS = 'Success',
  PROCESSING = 'Processing',
  ERROR = 'Error',
  WARNING = 'Warning'
}


/*
 * Alert
 */

export type Alert = {
  type: StatusModalType;
  message: string;
  button?: string;
  onButtonPress?: () => void;
  onExited?: null | (() => void);
};
