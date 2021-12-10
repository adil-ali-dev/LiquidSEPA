import { AlertActions, AlertConstants } from './typedef';


export const alertActions: AlertActions = {
  show: payload => ({ type: AlertConstants.SHOW, payload }),
  hide: () => ({ type: AlertConstants.HIDE })
};
