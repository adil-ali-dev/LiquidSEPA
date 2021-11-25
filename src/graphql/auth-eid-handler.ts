import { SignatureStatus } from './typedef';

export const authEidStatusHandler = (status: SignatureStatus, callbacks: ((error?: string) => void)[]) => {
  switch (status) {
    case SignatureStatus.SUCCESS:
      callbacks[0]();
      break;

    case SignatureStatus.WAITING:
      callbacks[1](status);
      break;

    case SignatureStatus.TIMEOUT:
      callbacks[2]('Login eID signature timeout');
      break;

    case SignatureStatus.USER_CANCELLED:
      callbacks[2]('Login eID signature cancelled');
      break;

    case SignatureStatus.RP_CANCELLED:
      callbacks[2]('Login eID signature RP cancelled');
      break;

    case SignatureStatus.ACCOUNT_NOT_VERIFIED:
      callbacks[2]('Login eID account is not verified');
      break;

    case SignatureStatus.PENDING:
      break;
  }
}
