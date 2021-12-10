import { Action, Alert, EmptyAction, StatusModalType } from '../../typedef';


export enum AlertConstants {
  SHOW = '@status-modal/SHOW',
  HIDE = '@status-modal/HIDE',
}


/*
 * Request
 */

export type CreateReq = {
  type: StatusModalType;
  message: string;
  button?: string;
  onClose?: () => void;
};


/*
 * Single Action
 */

export type Show = Action<AlertConstants.SHOW, CreateReq>;
export type Hide = EmptyAction<AlertConstants.HIDE>;


/*
 * Action
 */

export type AlertAction = Show | Hide;


/*
 * Actions
 */

export type AlertActions = {
  show: (payload: CreateReq) => Show;
  hide: () => Hide;
};


/*
 * State
 */

export type AlertState = {
  data: null | Alert;
};
