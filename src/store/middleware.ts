import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';

import { StatusModalType } from '../typedef';
import { AppState } from './typedef';
import { SessionConstants } from './Session';
import { alertActions } from './Alert';
import { BankAccountsConstants } from './BankAccounts';
import { AddressesConstants } from './Addresses';


export const createAppMiddleware = () => {
  return (store: MiddlewareAPI<Dispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === BankAccountsConstants.CREATE_BANK_ACCOUNT_FAILURE) {
        store.dispatch(alertActions.show({
          type: StatusModalType.ERROR,
          message: 'Account already registered'
        }));
      }

      if (
        action.type !== SessionConstants.REFRESH_SESSION_FAILURE
        && action.type !== SessionConstants.AUTHORIZE_SESSION_FAILURE
        && action.type !== BankAccountsConstants.CREATE_BANK_ACCOUNT_FAILURE
        && action.type !== AddressesConstants.WHITELIST_ADDRESS_FAILURE
        && action.type.endsWith('FAILURE')
        && (action as AnyAction).error
      ) {
        store.dispatch(alertActions.show({
          type: StatusModalType.ERROR,
          message: (action as AnyAction).error
        }));
      }

      return next(action);
    };
  };
};
