import { AppState } from '../typedef';


export const authSocketSelector = (state: AppState) => state.authSocket;
export const authSocketStatusSelector = (state: AppState) => state.authSocket.status;
export const authSocketErrorSelector = (state: AppState) => state.authSocket.error;
export const authSocketCallbackPayloadSelector = (state: AppState) => state.authSocket.callbackPayload;
