import { AppState } from '../typedef';


export const alertDataSelector = (state: AppState) => state.alert.data;
export const alertButtonHandlerSelector = (state: AppState) => state.alert.data?.onButtonPress;
