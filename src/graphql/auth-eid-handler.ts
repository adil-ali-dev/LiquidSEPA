import { SignatureStatus } from './typedef';

export const authEidStatusHandler = (status: SignatureStatus, callbacks: ((error?: string) => void)[]) => {
  switch (status) {
    case SignatureStatus.SUCCESS:
      callbacks[0]();
      break;

    case SignatureStatus.WAITING:
      callbacks[1]();
      break;

    case SignatureStatus.TIMEOUT:
      callbacks[2]('Auth eID signature timeout');
      break;

    case SignatureStatus.USER_CANCELLED:
      callbacks[2]('Auth eID signature cancelled');
      break;

    case SignatureStatus.RP_CANCELLED:
      callbacks[2]('Auth eID signature RP cancelled');
      break;

    case SignatureStatus.ACCOUNT_NOT_VERIFIED:
      callbacks[2]('Auth eID account is not verified');
      break;
  }
}
