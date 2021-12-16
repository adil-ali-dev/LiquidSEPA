import { RfqActions, RfqConstants } from './typedef';


export const rfqActions: RfqActions = {
  sell: payload => ({ type: RfqConstants.SELL_REQUEST, payload }),
  sellSuccess: payload => ({ type: RfqConstants.SELL_SUCCESS, payload }),
  sellFailure: error => ({ type: RfqConstants.SELL_FAILURE, error }),

  buy: payload => ({ type: RfqConstants.BUY_REQUEST, payload }),
  buySuccess: payload => ({ type: RfqConstants.BUY_SUCCESS, payload }),
  buyFailure: error => ({ type: RfqConstants.BUY_FAILURE, error }),

  confirm: payload => ({ type: RfqConstants.CONFIRM_REQUEST, payload }),
  confirmSuccess: payload => ({ type: RfqConstants.CONFIRM_SUCCESS, payload }),
  confirmFailure: error => ({ type: RfqConstants.CONFIRM_FAILURE, error }),

  updateRfqStatus: payload => ({ type: RfqConstants.UPDATE_RFQ_STATUS, payload }),

  resetData: () => ({ type: RfqConstants.RESET_DATA })
};
