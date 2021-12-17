import { RfqActions, RfqConstants } from './typedef';


export const rfqActions: RfqActions = {
  getEstimation: payload => ({ type: RfqConstants.GET_ESTIMATION_REQUEST, payload }),
  getEstimationSuccess: payload => ({ type: RfqConstants.GET_ESTIMATION_SUCCESS, payload }),
  getEstimationFailure: error => ({ type: RfqConstants.GET_ESTIMATION_FAILURE, error }),

  sell: payload => ({ type: RfqConstants.SELL_REQUEST, payload }),
  sellSuccess: payload => ({ type: RfqConstants.SELL_SUCCESS, payload }),
  sellFailure: error => ({ type: RfqConstants.SELL_FAILURE, error }),

  buy: payload => ({ type: RfqConstants.BUY_REQUEST, payload }),
  buySuccess: payload => ({ type: RfqConstants.BUY_SUCCESS, payload }),
  buyFailure: error => ({ type: RfqConstants.BUY_FAILURE, error }),

  confirm: payload => ({ type: RfqConstants.CONFIRM_REQUEST, payload }),
  confirmSuccess: payload => ({ type: RfqConstants.CONFIRM_SUCCESS, payload }),
  confirmFailure: error => ({ type: RfqConstants.CONFIRM_FAILURE, error }),

  updateRfqData: payload => ({ type: RfqConstants.UPDATE_RFQ_DATA, payload }),
  updateTxData: payload => ({ type: RfqConstants.UPDATE_TX_DATA, payload }),

  resetEstimation: () => ({ type: RfqConstants.RESET_ESTIMATION }),
  resetData: () => ({ type: RfqConstants.RESET_DATA })
};
