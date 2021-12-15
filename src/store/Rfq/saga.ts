import { takeLatest, put } from 'redux-saga/effects';

import { SocketEndpoint } from '../../typedef';
import { Sell, Buy, SellSuccess , BuySuccess, Confirm, RfqConstants } from './typedef';
import { socketActions } from '../Socket';
import { rfqActions } from './actions';


const RFQ_API = 'rfq' as const;


function *sell({ payload }: Sell) {
  const { iban, ...restArgs } = payload;

  yield put(socketActions.send({
    method: SocketEndpoint.RFQ_SELL,
    api: RFQ_API,
    messageId: `${Date.now()}`,
    args: { ...restArgs, payoutAccount: iban }
  }));
}

function *buy({ payload }: Buy) {
  const { label, ...restArgs } = payload;

  yield put(socketActions.send({
    method: SocketEndpoint.RFQ_BUY,
    api: RFQ_API,
    messageId: `${Date.now()}`,
    args: { ...restArgs, payoutAccount: label }
  }));
}

function *confirm({ payload }: Confirm) {
  yield put(socketActions.send({
    method: SocketEndpoint.CONFIRM_RFQ,
    api: RFQ_API,
    messageId: `${Date.now()}`,
    args: { ...payload, confirm: true }
  }));
}

function *sellSuccess({ payload }: SellSuccess) {
  put(rfqActions.confirm({ rfqId: payload.rfqId }));
}

function *buySuccess({ payload }: BuySuccess) {
  put(rfqActions.confirm({ rfqId: payload.rfqId }));
}


export function *rfqSaga() {
  yield takeLatest(RfqConstants.SELL_REQUEST, sell);
  yield takeLatest(RfqConstants.BUY_REQUEST, buy);
  yield takeLatest(RfqConstants.CONFIRM_REQUEST, confirm);

  yield takeLatest(RfqConstants.SELL_SUCCESS, sellSuccess);
  yield takeLatest(RfqConstants.BUY_SUCCESS, buySuccess);
}
