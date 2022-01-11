import { createSelector } from 'reselect';

import { BLOCKSTREAM_ASSET_ID, SIDESWAP_PREFIX } from '../../constants';
import { Currency } from '../../typedef';
import { AppState } from '../typedef';


const ADDRESS_TYPE = 'liquidnetwork';


export const rfqSelector = (state: AppState) => state.rfq;
export const rfqEstimationSelector = (state: AppState) => state.rfq.estimation;
export const rfqEstimationLoadingSelector = (state: AppState) => state.rfq.loading.estimation;
export const rfqSellLoadingSelector = (state: AppState) => state.rfq.loading.sell;
export const rfqBuyLoadingSelector = (state: AppState) => state.rfq.loading.buy;
export const rfqConfirmationLoadingSelector = (state: AppState) => state.rfq.loading.confirm;
export const rfqConfirmationSelector = (state: AppState) => state.rfq.confirmation;
export const rfqDataSelector = (state: AppState) => state.rfq.rfqData;
export const rfqTxDataSelector = (state: AppState) => state.rfq.txData;
export const rfqTxConfCountSelector = (state: AppState) => state.rfq.txData?.confs;

export const rfqDeliverAmountSelector = (_: AppState, deliverAmount: number) => deliverAmount;
export const rfqDeliverProductSelector = (_: AppState, deliverProduct: Currency) => deliverProduct;

export const rfqEstimatedFeeSelector = createSelector([rfqEstimationSelector], estimation => {
  if (!estimation?.charge) return 0;

  const { charge, fee } = estimation;
  const newFee = charge + fee;

  return charge > 0 ? newFee : 0;
});

export const rfqEstimatedReceiveSelector = createSelector([rfqEstimationSelector], estimation => {
  if (!estimation?.payoutEstimation) return 0;

  const { payoutEstimation } = estimation;

  return payoutEstimation > 0 ? payoutEstimation : 0;
});

export const rfqAnyActionLoadingSelector = createSelector(
  [rfqSellLoadingSelector, rfqBuyLoadingSelector, rfqConfirmationLoadingSelector],
  (loadingSell, loadingBuy, loadingConfirmation) => loadingSell || loadingBuy || loadingConfirmation
);

export const rfqTxConfirmationsCountSelector = createSelector(
  [rfqTxConfCountSelector],
  confirmations => confirmations || 0
);

export const rfqConfirmationDetailsSelector = createSelector(
  [rfqConfirmationSelector, rfqDeliverAmountSelector, rfqDeliverProductSelector],
  (confirmation, amount, product) => {
    if (!confirmation) return null;

    const address = confirmation?.trackingCode;

    const commonQuery = {
      amount: amount.toString(),
      label: product,
      message: product,
      assetid: BLOCKSTREAM_ASSET_ID
    };

    const qrQuery = new URLSearchParams(commonQuery);
    const appToAppQuery = new URLSearchParams({ ...commonQuery, address, addressType: ADDRESS_TYPE });

    return {
      ...confirmation,
      appToAppValue: `${SIDESWAP_PREFIX}/?${appToAppQuery}`,
      qrValue: `${ADDRESS_TYPE}:${address}?${qrQuery}`
    };
  }
);

export const rfqPaymentDetailsSelector = createSelector(
  [rfqDataSelector, rfqTxDataSelector],
  (rfq, tx) => {
    if (!rfq || !tx) return null;

    return {
      txId: tx.txid,
      link: tx.unblindedLink,
      received: {
        amount: rfq.depositAmount,
        iban: rfq.depositorIban,
        nameOnAccount: rfq.depositorName
      },
      sending: {
        amount: rfq.payoutAmount,
        iban: rfq.payoutIban,
        nameOnAccount: rfq.payoutAccountOwner
      }
    };
  }
);
