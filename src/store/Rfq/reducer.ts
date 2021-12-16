import { RfqAction, RfqConstants, RfqState } from './typedef';


export const initialState: RfqState = {
  data: null,
  confirmation: null,
  loading: {
    sell: false,
    buy: false,
    confirm: false
  },
  error: {
    sell: null,
    buy: null,
    confirm: null
  }
};


export const rfqReducer = (state = initialState, action: RfqAction): RfqState => {
  switch (action.type) {

    case RfqConstants.SELL_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, sell: true },
        error: { ...state.error, sell: null },
        data: null,
        confirmation: null
      };
    case RfqConstants.SELL_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, sell: false },
        error: { ...state.error, sell: action.error }
      };

    case RfqConstants.BUY_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, buy: true },
        error: { ...state.error, buy: null },
        data: null,
        confirmation: null
      };
    case RfqConstants.BUY_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, buy: false },
        error: { ...state.error, buy: action.error }
      };

    case RfqConstants.CONFIRM_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, confirm: true },
        error: { ...state.error, confirm: null }
      };
    case RfqConstants.CONFIRM_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, confirm: false, sell: false, buy: false },
        confirmation: action.payload
      };
    case RfqConstants.CONFIRM_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, confirm: false, sell: false, buy: false },
        error: { ...state.error, confirm: action.error }
      };

    case RfqConstants.UPDATE_RFQ_STATUS:
      return { ...state, data: action.payload };

    case RfqConstants.RESET_DATA:
      return initialState;

    default:
      return state;
  }
};
