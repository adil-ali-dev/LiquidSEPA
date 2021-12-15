import { Action, FailureAction, SocketReq, SocketEndpoint, StableCurrency, RfqData } from '../../typedef';


export enum RfqConstants {
  SELL_REQUEST = '@rfq/SELL_REQUEST',
  SELL_SUCCESS = '@rfq/SELL_SUCCESS',
  SELL_FAILURE = '@rfq/SELL_FAILURE',

  BUY_REQUEST = '@rfq/BUY_REQUEST',
  BUY_SUCCESS = '@rfq/BUY_SUCCESS',
  BUY_FAILURE = '@rfq/BUY_FAILURE',

  CONFIRM_REQUEST = '@rfq/CONFIRM_REQUEST',
  CONFIRM_SUCCESS = '@rfq/CONFIRM_SUCCESS',
  CONFIRM_FAILURE = '@rfq/CONFIRM_FAILURE',

  UPDATE_RFQ_STATUS = '@rfq/UPDATE_RFQ_STATUS'
}


/*
 * Request
 */

export type SellReq = {
  amount: number;
  stableCurrency: StableCurrency;
  iban: string;
};

export type BuyReq = {
  amount: number;
  stableCurrency: StableCurrency;
  label: string;
};

export type AnyActionReq = {
  amount: number;
  stableCurrency: StableCurrency;
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

export type SellApiReq = SocketReq<SocketEndpoint.RFQ_SELL, AnyActionReq>;
export type BuyApiReq = SocketReq<SocketEndpoint.RFQ_BUY, AnyActionReq>;
export type ConfirmApiReq = SocketReq<SocketEndpoint.CONFIRM_RFQ, ConfirmExtendedReq>;

export type RfqApiMainReqs = SellApiReq | BuyApiReq | ConfirmApiReq;


/*
 * API Response
 */

export type AnyActionRes = {
  rfqId: string;
  isValid: boolean;
  payoutEstimation: number;
  fee: number;
  charge: number;
};

export type ConfirmRes = {
  trackingCode: string;
  rfqId: string;
  isValid: boolean
};

type UpdateRfqStatusRes = RfqData;


/*
 * Single Action
 */

export type Sell = Action<RfqConstants.SELL_REQUEST, SellReq>;
export type SellSuccess = Action<RfqConstants.SELL_SUCCESS, AnyActionRes>;
export type SellFailure = FailureAction<RfqConstants.SELL_FAILURE>;

export type Buy = Action<RfqConstants.BUY_REQUEST, BuyReq>;
export type BuySuccess = Action<RfqConstants.BUY_SUCCESS, AnyActionRes>;
export type BuyFailure = FailureAction<RfqConstants.BUY_FAILURE>;

export type Confirm = Action<RfqConstants.CONFIRM_REQUEST, ConfirmReq>;
export type ConfirmSuccess = Action<RfqConstants.CONFIRM_SUCCESS, ConfirmRes>;
export type ConfirmFailure = FailureAction<RfqConstants.CONFIRM_FAILURE>;

export type UpdateRfqStatus = Action<RfqConstants.UPDATE_RFQ_STATUS, UpdateRfqStatusRes>;


/*
 * Action
 */

export type RfqAction = Sell | SellSuccess | SellFailure
| Buy | BuySuccess | BuyFailure
| Confirm | ConfirmSuccess | ConfirmFailure
| UpdateRfqStatus;


/*
 * Actions
 */

export type RfqActions = {
  sell: (payload: SellReq) => Sell;
  sellSuccess: (payload: AnyActionRes) => SellSuccess;
  sellFailure: (error: string) => SellFailure;

  buy: (payload: BuyReq) => Buy;
  buySuccess: (payload: AnyActionRes) => BuySuccess;
  buyFailure: (error: string) => BuyFailure;

  confirm: (payload: ConfirmReq) => Confirm;
  confirmSuccess: (payload: ConfirmRes) => ConfirmSuccess;
  confirmFailure: (error: string) => ConfirmFailure;

  updateRfqStatus: (payload: UpdateRfqStatusRes) => UpdateRfqStatus;
};


/*
 * State
 */

type ActionKeys = 'sell'
| 'buy'
| 'confirm';

export type RfqState = {
  data: null | RfqData;
  reference: null | string;
  loading: { [K in ActionKeys]: boolean };
  error: { [K in ActionKeys]: null | string };
};
