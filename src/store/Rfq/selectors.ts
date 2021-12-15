import { createSelector } from 'reselect';

import { AppState } from '../typedef';


export const rfqSelector = (state: AppState) => state.rfq;
export const rfqSellLoadingSelector = (state: AppState) => state.rfq.loading.sell;
export const rfqBuyLoadingSelector = (state: AppState) => state.rfq.loading.buy;
export const rfqConfirmLoadingSelector = (state: AppState) => state.rfq.loading.confirm;
export const rfqDataSelector = (state: AppState) => state.rfq.data;

export const rfqAnyActionLoading = createSelector(
  [rfqSellLoadingSelector, rfqBuyLoadingSelector, rfqConfirmLoadingSelector],
  (loadingSell, loadingBuy, loadingConfirm) => loadingSell || loadingBuy || loadingConfirm
)
