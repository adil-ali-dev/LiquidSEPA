import { Action, FailureAction, SocketReq, SocketEndpoint, RfqData, Currency, RfqConfirmation, EmptyAction, RfqTxData, RfqEstimation } from '../../typedef';


export enum RfqConstants {
  GET_ESTIMATION_REQUEST = '@rfq/GET_ESTIMATION_REQUEST',
  GET_ESTIMATION_SUCCESS = '@rfq/GET_ESTIMATION_SUCCESS',
  GET_ESTIMATION_FAILURE = '@rfq/GET_ESTIMATION_FAILURE',

  SELL_REQUEST = '@rfq/SELL_REQUEST',
  SELL_SUCCESS = '@rfq/SELL_SUCCESS',
  SELL_FAILURE = '@rfq/SELL_FAILURE',

  BUY_REQUEST = '@rfq/BUY_REQUEST',
  BUY_SUCCESS = '@rfq/BUY_SUCCESS',
  BUY_FAILURE = '@rfq/BUY_FAILURE',

  CONFIRM_REQUEST = '@rfq/CONFIRM_REQUEST',
  CONFIRM_SUCCESS = '@rfq/CONFIRM_SUCCESS',
  CONFIRM_FAILURE = '@rfq/CONFIRM_FAILURE',

  UPDATE_RFQ_DATA = '@rfq/UPDATE_RFQ_DATA',
  UPDATE_TX_DATA = '@rfq/UPDATE_TX_DATA',

  RESET_ESTIMATION = '@rfq/RESET_ESTIMATION',
  RESET_DATA = '@rfq/RESET_DATA'
}


/*
 * Request
 */

export type GetEstimationReq = {
  amount: number;
};

export type SellReq = {
  amount: number;
  stableCurrency: Currency;
  iban: string;
};

export type BuyReq = {
  amount: number;
  stableCurrency: Currency;
  label: string;
};

export type AnyActionReq = {
  amount: number;
  stableCurrency: Currency;
  payoutAccount: string;
};

export type ConfirmReq = {
  rfqId: string;
};

export type ConfirmExtendedReq = ConfirmReq & {
  confirm: boolean;
};


/*
 * API Request
 */

export type GetEstimationApiReq = SocketReq<SocketEndpoint.GET_RFQ_ESTIMATION, GetEstimationReq>;
export type SellApiReq = SocketReq<SocketEndpoint.RFQ_SELL, AnyActionReq>;
export type BuyApiReq = SocketReq<SocketEndpoint.RFQ_BUY, AnyActionReq>;
export type ConfirmApiReq = SocketReq<SocketEndpoint.CONFIRM_RFQ, ConfirmExtendedReq>;

export type RfqApiMainReqs = GetEstimationApiReq
| SellApiReq
| BuyApiReq
| ConfirmApiReq;


/*
 * API Response
 */

export type GetEstimationRes = RfqEstimation<string>;

export type AnyActionRes = {
  rfqId: string;
  isValid: boolean;
  payoutEstimation: number;
  fee: number;
  charge: number;
};

export type ConfirmRes = RfqConfirmation;

type UpdateRfqDataRes = RfqData<string>;

type UpdateTxDataRes = RfqTxData;


/*
 * Single Action
 */

export type GetEstimation = Action<RfqConstants.GET_ESTIMATION_REQUEST, GetEstimationReq>;
export type GetEstimationSuccess = Action<RfqConstants.GET_ESTIMATION_SUCCESS, GetEstimationRes>;
export type GetEstimationFailure = FailureAction<RfqConstants.GET_ESTIMATION_FAILURE>;

export type Sell = Action<RfqConstants.SELL_REQUEST, SellReq>;
export type SellSuccess = Action<RfqConstants.SELL_SUCCESS, AnyActionRes>;
export type SellFailure = FailureAction<RfqConstants.SELL_FAILURE>;

export type Buy = Action<RfqConstants.BUY_REQUEST, BuyReq>;
export type BuySuccess = Action<RfqConstants.BUY_SUCCESS, AnyActionRes>;
export type BuyFailure = FailureAction<RfqConstants.BUY_FAILURE>;

export type Confirm = Action<RfqConstants.CONFIRM_REQUEST, ConfirmReq>;
export type ConfirmSuccess = Action<RfqConstants.CONFIRM_SUCCESS, ConfirmRes>;
export type ConfirmFailure = FailureAction<RfqConstants.CONFIRM_FAILURE>;

export type UpdateRfqData = Action<RfqConstants.UPDATE_RFQ_DATA, UpdateRfqDataRes>;
export type UpdateTxData = Action<RfqConstants.UPDATE_TX_DATA, UpdateTxDataRes>;

export type ResetEstimation = EmptyAction<RfqConstants.RESET_ESTIMATION>;
export type ResetData = EmptyAction<RfqConstants.RESET_DATA>;


/*
 * Action
 */

export type RfqAction = GetEstimation | GetEstimationSuccess | GetEstimationFailure
| Sell | SellSuccess | SellFailure
| Buy | BuySuccess | BuyFailure
| Confirm | ConfirmSuccess | ConfirmFailure
| UpdateRfqData
| UpdateTxData
| ResetEstimation
| ResetData;


/*
 * Actions
 */

export type RfqActions = {
  getEstimation: (payload: GetEstimationReq) => GetEstimation;
  getEstimationSuccess: (payload: GetEstimationRes) => GetEstimationSuccess;
  getEstimationFailure: (error: string) => GetEstimationFailure;

  sell: (payload: SellReq) => Sell;
  sellSuccess: (payload: AnyActionRes) => SellSuccess;
  sellFailure: (error: string) => SellFailure;

  buy: (payload: BuyReq) => Buy;
  buySuccess: (payload: AnyActionRes) => BuySuccess;
  buyFailure: (error: string) => BuyFailure;

  confirm: (payload: ConfirmReq) => Confirm;
  confirmSuccess: (payload: ConfirmRes) => ConfirmSuccess;
  confirmFailure: (error: string) => ConfirmFailure;

  updateRfqData: (payload: UpdateRfqDataRes) => UpdateRfqData;
  updateTxData: (payload: UpdateTxDataRes) => UpdateTxData;

  resetEstimation: () => ResetEstimation;
  resetData: () => ResetData;
};


/*
 * State
 */

type ActionKeys = 'estimation'
| 'sell'
| 'buy'
| 'confirm';

export type RfqState = {
  rfqData: null | RfqData<number>;
  txData: null | RfqTxData;
  estimation: null | RfqEstimation<number>;
  confirmation: null | RfqConfirmation;
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
