import { SessionToken } from '../../typedef';
import { RefreshRes, CreateSessionRes } from './typedef';


export const serializeToken = (payload: RefreshRes | CreateSessionRes): SessionToken => {
  const expiresIn = (payload.expiresIn - 60) * 1000;

  return {
    value: payload.accessToken,
    expiresIn,
    expirationDate: Date.now() + expiresIn
  };
};
