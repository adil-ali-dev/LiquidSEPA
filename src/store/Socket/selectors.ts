import { AppState } from '../typedef';

export const socketSelector = (state: AppState) => state.socket;
export const socketStatusSelector = (state: AppState) => state.socket.status;
export const socketErrorSelector = (state: AppState) => state.socket.error;
